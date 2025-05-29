import { useState } from "react";
import { CheckCircle, Clock, AlertTriangle, DollarSign, Plus, User, Calendar, Building, Wrench, HardHat } from "lucide-react";
import Nav from "../Nav";

export default function ConstructionWorkOrderSystem() {
  const [selectedProject, setSelectedProject] = useState("");
  const [taskName, setTaskName] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [estimatedHours, setEstimatedHours] = useState("");
  const [priority, setPriority] = useState("medium");

  const projects = [
    { id: 1, name: "Downtown Office Building", client: "Metro Properties", location: "123 Main St", budget: "$2.5M" },
    { id: 2, name: "Residential Complex Phase 2", client: "Green Valley Homes", location: "Oak Ridge", budget: "$1.8M" },
    { id: 3, name: "Shopping Mall Renovation", client: "Retail Dynamics", location: "Westside Plaza", budget: "$900K" },
    { id: 4, name: "Highway Bridge Repair", client: "State DOT", location: "Route 45", budget: "$650K" }
  ];

  const constructionCrew = [
    "Mike Rodriguez - Foreman",
    "John Davis - Electrician", 
    "Sarah Thompson - Plumber",
    "Robert Chen - Carpenter",
    "Lisa Martinez - Mason",
    "David Wilson - Heavy Equipment",
    "Maria Garcia - Safety Inspector",
    "James Johnson - General Labor"
  ];

  const taskTypes = [
    "Foundation Work",
    "Framing",
    "Electrical Installation", 
    "Plumbing Installation",
    "Roofing",
    "Concrete Pour",
    "Drywall Installation",
    "Flooring",
    "HVAC Installation",
    "Painting",
    "Site Preparation",
    "Excavation",
    "Masonry Work",
    "Windows & Doors",
    "Final Inspection",
    "Cleanup"
  ];

  const [workOrders, setWorkOrders] = useState([
    {
      id: 1,
      taskName: "Foundation Pour - Building A",
      project: "Downtown Office Building",
      assignedTo: "Mike Rodriguez - Foreman",
      dueDate: "2025-06-15",
      estimatedHours: 32,
      status: "in-progress",
      createdDate: "2025-05-20",
      priority: "high",
      materials: "Concrete, Rebar, Forms",
      location: "123 Main St"
    },
    {
      id: 2,
      taskName: "Electrical Rough-in Units 1-5",
      project: "Residential Complex Phase 2",
      assignedTo: "John Davis - Electrician",
      dueDate: "2025-06-10",
      estimatedHours: 24,
      status: "completed",
      createdDate: "2025-05-18",
      completedDate: "2025-06-08",
      priority: "medium",
      materials: "Wire, Outlets, Panels",
      location: "Oak Ridge"
    },
    {
      id: 3,
      taskName: "HVAC Ductwork Installation",
      project: "Shopping Mall Renovation",
      assignedTo: "David Wilson - Heavy Equipment",
      dueDate: "2025-06-20",
      estimatedHours: 40,
      status: "pending",
      createdDate: "2025-05-25",
      priority: "medium",
      materials: "Ductwork, Insulation, Fasteners",
      location: "Westside Plaza"
    },
    {
      id: 4,
      taskName: "Bridge Deck Repair Section 3",
      project: "Highway Bridge Repair",
      assignedTo: "Lisa Martinez - Mason",
      dueDate: "2025-06-12",
      estimatedHours: 48,
      status: "completed",
      createdDate: "2025-05-15",
      completedDate: "2025-06-11",
      priority: "high",
      materials: "Concrete Mix, Reinforcement",
      location: "Route 45"
    },
    {
      id: 5,
      taskName: "Framing - Second Floor",
      project: "Downtown Office Building",
      assignedTo: "Robert Chen - Carpenter",
      dueDate: "2025-06-25",
      estimatedHours: 56,
      status: "in-progress",
      createdDate: "2025-05-28",
      priority: "high",
      materials: "Lumber, Nails, Hardware",
      location: "123 Main St"
    }
  ]);

  const [notifications, setNotifications] = useState([]);

  const createWorkOrder = () => {
    if (!selectedProject || !taskName || !assignedTo || !dueDate || !estimatedHours) {
      alert("Please fill in all required fields");
      return;
    }

    const project = projects.find(p => p.id.toString() === selectedProject);
    
    const newOrder = {
      id: workOrders.length + 1,
      taskName: taskName,
      project: project.name,
      assignedTo: assignedTo,
      dueDate: dueDate,
      estimatedHours: parseInt(estimatedHours),
      status: "pending",
      createdDate: new Date().toISOString().split('T')[0],
      priority: priority,
      location: project.location,
      materials: "To be specified"
    };

    setWorkOrders([...workOrders, newOrder]);
    
    // Clear form
    setSelectedProject("");
    setTaskName("");
    setAssignedTo("");
    setDueDate("");
    setEstimatedHours("");
    setPriority("medium");
    
    alert("Work order created successfully!");
  };

  const updateStatus = (id, newStatus) => {
    setWorkOrders(workOrders.map(order => {
      if (order.id === id) {
        const updatedOrder = { ...order, status: newStatus };
        
        if (newStatus === "completed") {
          updatedOrder.completedDate = new Date().toISOString().split('T')[0];
          
          // Add notification for billing
          const notification = {
            id: Date.now(),
            message: `"${order.taskName}" completed by ${order.assignedTo} - ${order.estimatedHours} hours - Ready for billing`,
            workOrderId: id,
            timestamp: new Date().toLocaleString(),
            hours: order.estimatedHours,
            project: order.project
          };
          setNotifications(prev => [notification, ...prev]);
        }
        
        return updatedOrder;
      }
      return order;
    }));
  };

  const markAsBilled = (id) => {
    setWorkOrders(workOrders.map(order => 
      order.id === id ? { ...order, status: "billed", billedDate: new Date().toISOString().split('T')[0] } : order
    ));
    
    // Remove notification
    setNotifications(notifications.filter(n => n.workOrderId !== id));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-orange-600 bg-orange-100';
      case 'billed': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'pending': return <AlertTriangle className="w-4 h-4" />;
      case 'billed': return <DollarSign className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const totalPendingHours = workOrders.filter(w => w.status === 'pending').reduce((sum, w) => sum + w.estimatedHours, 0);
  const totalInProgressHours = workOrders.filter(w => w.status === 'in-progress').reduce((sum, w) => sum + w.estimatedHours, 0);
  const completedThisWeek = workOrders.filter(w => w.status === 'completed' && w.completedDate >= '2025-06-01').length;

  return (
    <div className="min-h-screen bg-gray-50 p-6 ml-64">
      <Nav/>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <HardHat className="w-8 h-8 text-orange-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Construction Work Orders</h1>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-blue-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Pending Hours</p>
                <p className="text-2xl font-bold text-blue-600">{totalPendingHours}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <Wrench className="w-8 h-8 text-orange-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">In Progress Hours</p>
                <p className="text-2xl font-bold text-orange-600">{totalInProgressHours}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Completed This Week</p>
                <p className="text-2xl font-bold text-green-600">{completedThisWeek}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <Building className="w-8 h-8 text-purple-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Active Projects</p>
                <p className="text-2xl font-bold text-purple-600">{projects.length}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Billing Notifications */}
        {notifications.length > 0 && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-800 mb-3 flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Ready for Billing ({notifications.length})
            </h3>
            {notifications.map(notification => (
              <div key={notification.id} className="flex justify-between items-center py-3 border-b border-yellow-200 last:border-b-0">
                <div>
                  <p className="text-yellow-800 font-medium">{notification.message}</p>
                  <p className="text-sm text-yellow-700">Project: {notification.project}</p>
                  <p className="text-xs text-yellow-600">{notification.timestamp}</p>
                </div>
                <button 
                  onClick={() => markAsBilled(notification.workOrderId)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
                >
                  <DollarSign className="w-4 h-4 mr-1" />
                  Bill ${notification.hours * 65}
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Create Work Order Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Create Work Order
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Construction Project</label>
                  <select 
                    value={selectedProject} 
                    onChange={(e) => setSelectedProject(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Project</option>
                    {projects.map(project => (
                      <option key={project.id} value={project.id}>
                        {project.name} - {project.client}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Task/Work Type</label>
                  <select 
                    value={taskName} 
                    onChange={(e) => setTaskName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Task Type</option>
                    {taskTypes.map(task => (
                      <option key={task} value={task}>{task}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assign to Crew Member</label>
                  <select 
                    value={assignedTo} 
                    onChange={(e) => setAssignedTo(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Crew Member</option>
                    {constructionCrew.map(member => (
                      <option key={member} value={member}>{member}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                    <input 
                      type="date" 
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Est. Hours</label>
                    <input 
                      type="number" 
                      placeholder="24"
                      value={estimatedHours}
                      onChange={(e) => setEstimatedHours(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select 
                    value={priority} 
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                </div>

                <button 
                  onClick={createWorkOrder}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center justify-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Work Order
                </button>
              </div>
            </div>
          </div>

          {/* Work Orders List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Active Work Orders ({workOrders.length})</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {workOrders.map(order => (
                  <div key={order.id} className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          {getStatusIcon(order.status)}
                          <h3 className="text-lg font-medium text-gray-900 ml-2">{order.taskName}</h3>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center">
                            <Building className="w-4 h-4 mr-2" />
                            {order.project}
                          </div>
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-2" />
                            {order.assignedTo}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            Due: {new Date(order.dueDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            {order.estimatedHours} hours
                          </div>
                        </div>

                        {order.location && (
                          <p className="text-sm text-gray-500 mb-2">📍 {order.location}</p>
                        )}
                        
                        {order.materials && (
                          <p className="text-sm text-gray-500">🔧 Materials: {order.materials}</p>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-3 ml-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(order.priority)}`}>
                          {order.priority?.toUpperCase()}
                        </span>
                        
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status.replace('-', ' ').toUpperCase()}
                        </span>
                        
                        {order.status === 'pending' && (
                          <button 
                            onClick={() => updateStatus(order.id, 'in-progress')}
                            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                          >
                            Start Work
                          </button>
                        )}
                        
                        {order.status === 'in-progress' && (
                          <button 
                            onClick={() => updateStatus(order.id, 'completed')}
                            className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                          >
                            Mark Complete
                          </button>
                        )}
                        
                        {order.status === 'completed' && !notifications.find(n => n.workOrderId === order.id) && (
                          <span className="text-green-600 text-sm font-medium">✓ Ready for billing</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}