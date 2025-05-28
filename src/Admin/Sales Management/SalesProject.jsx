import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, ClipboardList, CheckCircle, AlertTriangle, Clock, Users, Plus, Calendar, Timer, User, Building, Filter, Search, MoreHorizontal, DollarSign, TrendingUp, Zap } from "lucide-react";
import Nav from "../Nav";

export default function SalesProject() {
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedTask, setSelectedTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [estimatedHours, setEstimatedHours] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const projects = [
    { id: 1, name: "Website Redesign", client: "Acme Corp", color: "bg-gradient-to-r from-blue-500 to-blue-600" },
    { id: 2, name: "Mobile App Development", client: "StartUp Inc", color: "bg-gradient-to-r from-purple-500 to-purple-600" },
    { id: 3, name: "Brand Identity", client: "Global Tech", color: "bg-gradient-to-r from-emerald-500 to-emerald-600" }
  ];

  const tasks = [
    { 
      id: 1, 
      name: "UI Design Mockups", 
      status: "completed", 
      assigned: "Sarah Johnson", 
      project: "Website Redesign",
      dueDate: "2024-02-15",
      estimatedHours: 24,
      completedDate: "2024-02-14",
      priority: "high"
    },
    { 
      id: 2, 
      name: "API Integration", 
      status: "in-progress", 
      assigned: "Mike Chen", 
      project: "Mobile App Development",
      dueDate: "2024-02-20",
      estimatedHours: 32,
      progress: 65,
      priority: "medium"
    },
    { 
      id: 3, 
      name: "QA Testing", 
      status: "pending", 
      assigned: "Lisa Rodriguez", 
      project: "Website Redesign",
      dueDate: "2024-02-25",
      estimatedHours: 16,
      priority: "low"
    },
    { 
      id: 4, 
      name: "Database Setup", 
      status: "completed", 
      assigned: "John Smith", 
      project: "Mobile App Development",
      dueDate: "2024-02-12",
      estimatedHours: 20,
      completedDate: "2024-02-11",
      priority: "high"
    }
  ];

  const [workOrders, setWorkOrders] = useState(tasks);

  const handleCreateWorkOrder = () => {
    if (!selectedProject || !selectedTask || !dueDate || !estimatedHours) {
      alert("Please fill in all required fields");
      return;
    }

    const newOrder = {
      id: workOrders.length + 1,
      name: `${selectedTask} - ${projects.find(p => p.id.toString() === selectedProject)?.name}`,
      status: "pending",
      assigned: "Unassigned",
      project: projects.find(p => p.id.toString() === selectedProject)?.name,
      dueDate: dueDate,
      estimatedHours: parseInt(estimatedHours),
      priority: "medium"
    };

    setWorkOrders([...workOrders, newOrder]);
    
    // Reset form
    setSelectedProject("");
    setSelectedTask("");
    setDueDate("");
    setEstimatedHours("");
    
    alert("Work order created successfully!");
  };

  const handleMarkAsBilled = (taskId) => {
    setWorkOrders(workOrders.map(task => 
      task.id === taskId ? {...task, status: "billed"} : task
    ));
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'in-progress': return <Clock className="w-5 h-5 text-blue-500" />;
      case 'pending': return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'billed': return <DollarSign className="w-5 h-5 text-green-600" />;
      default: return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      'completed': 'bg-emerald-50 text-emerald-700 border border-emerald-200',
      'in-progress': 'bg-blue-50 text-blue-700 border border-blue-200',
      'pending': 'bg-amber-50 text-amber-700 border border-amber-200',
      'billed': 'bg-green-50 text-green-700 border border-green-200'
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status] || styles.pending}`}>
        {status.replace('-', ' ').toUpperCase()}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const styles = {
      'high': 'bg-red-50 text-red-700 border border-red-200',
      'medium': 'bg-yellow-50 text-yellow-700 border border-yellow-200',
      'low': 'bg-gray-50 text-gray-700 border border-gray-200'
    };
    
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${styles[priority]}`}>
        {priority.toUpperCase()}
      </span>
    );
  };

  const filteredTasks = workOrders.filter(task => {
    const matchesFilter = activeFilter === "all" || task.status === activeFilter;
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assigned.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.project.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const completedTasks = workOrders.filter(t => t.status === 'completed');
  const inProgressTasks = workOrders.filter(t => t.status === 'in-progress');
  const pendingTasks = workOrders.filter(t => t.status === 'pending');
  const billedTasks = workOrders.filter(t => t.status === 'billed');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white ml-64">
      <Nav/>
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
         
            
          
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Project Dashboard</h1>
          <p className="text-lg text-gray-600">Track progress, manage work orders, and boost productivity</p>
        </div>

        {/* Enhanced Stats Cards */}
  
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Create Work Order - Improved */}
          <div className="lg:col-span-4">
            <Card className="border border-gray-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-white">
                  <Plus className="w-5 h-5" />
                  Create New Work Order
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 bg-white">
                <div className="space-y-6">
                  {/* Project Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Select Project *
                    </label>
                    <Select value={selectedProject} onValueChange={setSelectedProject}>
                      <SelectTrigger className="w-full h-12 border-2 border-gray-200 focus:border-blue-500 rounded-lg">
                        <SelectValue placeholder="Choose a project..." />
                      </SelectTrigger>
                      <SelectContent>
                        {projects.map((project) => (
                          <SelectItem key={project.id} value={project.id.toString()}>
                            <div className="flex items-center gap-3 py-1">
                              <div className={`w-4 h-4 rounded-full ${project.color}`}></div>
                              <div>
                                <div className="font-medium">{project.name}</div>
                                <div className="text-sm text-gray-500">{project.client}</div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Task Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Task Type *
                    </label>
                    <Select value={selectedTask} onValueChange={setSelectedTask}>
                      <SelectTrigger className="w-full h-12 border-2 border-gray-200 focus:border-blue-500 rounded-lg">
                        <SelectValue placeholder="Select task type..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UI/UX Design">🎨 UI/UX Design</SelectItem>
                        <SelectItem value="Frontend Development">💻 Frontend Development</SelectItem>
                        <SelectItem value="Backend Development">⚙️ Backend Development</SelectItem>
                        <SelectItem value="Testing & QA">🧪 Testing & QA</SelectItem>
                        <SelectItem value="API Integration">🔗 API Integration</SelectItem>
                        <SelectItem value="Deployment">🚀 Deployment</SelectItem>
                        <SelectItem value="Maintenance">🔧 Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Due Date and Hours */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Due Date *
                      </label>
                      <input 
                        type="date" 
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full h-12 px-4 border-2 border-gray-200 focus:border-blue-500 rounded-lg focus:outline-none transition-colors"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Est. Hours *
                      </label>
                      <input 
                        type="number" 
                        placeholder="24"
                        value={estimatedHours}
                        onChange={(e) => setEstimatedHours(e.target.value)}
                        className="w-full h-12 px-4 border-2 border-gray-200 focus:border-blue-500 rounded-lg focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={handleCreateWorkOrder}
                    className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Plus className="w-5 h-5 mr-2" /> 
                    Create Work Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Work Orders List - Improved */}
          <div className="lg:col-span-8">
            <Card className="border border-gray-200 shadow-lg">
              <CardHeader className="bg-gray-50 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Work Orders ({filteredTasks.length})
                  </CardTitle>
                  
                  {/* Search and Filter */}
                  <div className="flex gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-none">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                      />
                    </div>
                    
                    <Select value={activeFilter} onValueChange={setActiveFilter}>
                      <SelectTrigger className="w-40 border-gray-300">
                        <Filter className="w-4 h-4 mr-2 text-gray-500" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Tasks</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="billed">Billed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                  {filteredTasks.length === 0 ? (
                    <div className="p-16 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ClipboardList className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No work orders found</h3>
                      <p className="text-gray-500">Create your first work order to get started</p>
                    </div>
                  ) : (
                    filteredTasks.map((task) => (
                      <div key={task.id} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="flex-shrink-0 mt-1">
                              {getStatusIcon(task.status)}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-semibold text-gray-900 truncate">{task.name}</h3>
                                {task.priority && getPriorityBadge(task.priority)}
                              </div>
                              
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                                <div className="flex items-center gap-2">
                                  <Building className="w-4 h-4 text-gray-400" />
                                  <span className="truncate">{task.project}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <User className="w-4 h-4 text-gray-400" />
                                  <span className="truncate">{task.assigned}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-gray-400" />
                                  <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Timer className="w-4 h-4 text-gray-400" />
                                  <span>{task.estimatedHours}h</span>
                                </div>
                              </div>
                              
                              {/* Progress bar for in-progress tasks */}
                              {task.status === 'in-progress' && task.progress && (
                                <div className="mb-2">
                                  <div className="flex justify-between text-xs text-gray-600 mb-2">
                                    <span className="font-medium">Progress</span>
                                    <span className="font-semibold">{task.progress}%</span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div 
                                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out" 
                                      style={{ width: `${task.progress}%` }}
                                    ></div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 ml-4">
                            {getStatusBadge(task.status)}
                            
                            {task.status === 'completed' && (
                              <Button 
                                size="sm" 
                                onClick={() => handleMarkAsBilled(task.id)}
                                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 shadow-md hover:shadow-lg transition-all"
                              >
                                <DollarSign className="w-4 h-4 mr-2" />
                                Bill Now
                              </Button>
                            )}
                            
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600 hover:bg-gray-100">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
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