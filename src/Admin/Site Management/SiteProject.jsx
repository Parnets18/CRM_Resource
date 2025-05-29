import { useState } from "react";
import { 
  ClipboardList, 
  Upload, 
  AlertTriangle, 
  Users, 
  CheckCircle, 
  Clock,
  XCircle,
  Plus,
  Trash2,
  Calendar,
  FileText,
  Search,
  Download,
  Building2
} from "lucide-react";
import Nav from "../Nav";

export default function SimpleProjectManager() {
  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      name: "Foundation Excavation & Concrete Pouring", 
      status: "In Progress", 
      assigned: "John Smith", 
      deadline: "2024-06-15", 
      priority: "High",
      progress: 75,
      category: "Structural"
    },
    { 
      id: 2, 
      name: "Steel Frame Installation - Level 1-3", 
      status: "Delayed", 
      assigned: "Sarah Wilson", 
      deadline: "2024-06-20", 
      priority: "Urgent",
      progress: 40,
      category: "Structural"
    },
    { 
      id: 3, 
      name: "Electrical Rough-in Installation", 
      status: "Completed", 
      assigned: "Mike Johnson", 
      deadline: "2024-06-10", 
      priority: "Normal",
      progress: 100,
      category: "MEP"
    },
    { 
      id: 4, 
      name: "HVAC Ductwork Installation", 
      status: "Pending", 
      assigned: "Tom Brown", 
      deadline: "2024-06-25", 
      priority: "Normal",
      progress: 0,
      category: "MEP"
    }
  ]);

  const [newTask, setNewTask] = useState({ 
    name: "", 
    assigned: "", 
    deadline: "", 
    priority: "Normal", 
    category: "General"
  });

  const [alerts, setAlerts] = useState([
    { 
      id: 1, 
      message: "Concrete delivery delayed by 2 hours", 
      time: "2 hours ago", 
      type: "warning"
    },
    { 
      id: 2, 
      message: "Safety inspection scheduled for tomorrow", 
      time: "1 day ago", 
      type: "info"
    }
  ]);

  const [newAlert, setNewAlert] = useState("");
  const [alertType, setAlertType] = useState("info");
  
  const [reports, setReports] = useState([
    { name: "Daily Progress Report - June 12", type: "PDF", date: "2024-06-12" },
    { name: "Site Safety Inspection", type: "PDF", date: "2024-06-11" },
    { name: "Material Delivery Receipt", type: "JPG", date: "2024-06-10" }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const teamMembers = [
    "John Smith", "Sarah Wilson", "Mike Johnson", "Tom Brown", "Lisa Davis", 
    "Robert Chen", "Maria Garcia", "David Kim", "Jennifer Taylor"
  ];

  const categories = ["General", "Structural", "MEP", "Finishing", "Safety"];

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.name && newTask.assigned && newTask.deadline) {
      setTasks([...tasks, { 
        ...newTask, 
        id: Date.now(), 
        status: "Pending", 
        progress: 0
      }]);
      setNewTask({ 
        name: "", 
        assigned: "", 
        deadline: "", 
        priority: "Normal", 
        category: "General"
      });
    }
  };

  const updateTaskStatus = (id, status) => {
    setTasks(tasks.map(task => 
      task.id === id ? { 
        ...task, 
        status,
        progress: status === "Completed" ? 100 : task.progress
      } : task
    ));
  };

  const updateTaskProgress = (id, progress) => {
    setTasks(tasks.map(task => 
      task.id === id ? { 
        ...task, 
        progress: parseInt(progress),
        status: parseInt(progress) === 100 ? "Completed" : task.status === "Completed" ? "In Progress" : task.status
      } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addAlert = () => {
    if (newAlert.trim()) {
      setAlerts([{ 
        id: Date.now(), 
        message: newAlert, 
        time: "Just now", 
        type: alertType
      }, ...alerts]);
      setNewAlert("");
    }
  };

  const deleteAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const newReport = {
          name: file.name,
          type: file.name.split('.').pop().toUpperCase(),
          date: new Date().toISOString().split('T')[0],
          size: (file.size / 1024).toFixed(1) + ' KB',
          file: file
        };
        setReports(prev => [newReport, ...prev]);
      }
    }
    // Reset the input
    event.target.value = '';
  };

  const downloadFile = (report) => {
    if (report.file) {
      const url = URL.createObjectURL(report.file);
      const a = document.createElement('a');
      a.href = url;
      a.download = report.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assigned.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || task.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status) => {
    const icons = {
      "Completed": <CheckCircle className="w-4 h-4 text-green-600" />,
      "In Progress": <Clock className="w-4 h-4 text-blue-600" />,
      "Delayed": <XCircle className="w-4 h-4 text-red-600" />,
      "Pending": <Clock className="w-4 h-4 text-gray-600" />
    };
    return icons[status] || icons["Pending"];
  };

  const getPriorityColor = (priority) => {
    const colors = {
      "Urgent": "text-red-600 bg-red-100",
      "High": "text-orange-600 bg-orange-100",
      "Normal": "text-blue-600 bg-blue-100"
    };
    return colors[priority] || colors["Normal"];
  };

  const getAlertColor = (type) => {
    const colors = {
      "warning": "bg-yellow-100 border-yellow-300 text-yellow-800",
      "error": "bg-red-100 border-red-300 text-red-800",
      "info": "bg-blue-100 border-blue-300 text-blue-800",
      "success": "bg-green-100 border-green-300 text-green-800"
    };
    return colors[type] || colors["info"];
  };

  const completedTasks = tasks.filter(t => t.status === "Completed").length;
  const totalProgress = Math.round(tasks.reduce((sum, t) => sum + t.progress, 0) / tasks.length);

  return (
    <div className="min-h-screen bg-gray-100 p-4 ml-64">
      <Nav/>
      <div className="bg-white p-4 rounded mb-6 shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Building2 className="w-6 h-6 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold">Project Manager</h1>
              <p className="text-gray-600">Construction Project Dashboard</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Progress: {totalProgress}%</p>
            <p className="text-sm text-gray-600">Tasks: {completedTasks}/{tasks.length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Add Task */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add New Task
            </h2>
            <form onSubmit={addTask} className="space-y-3">
              <input
                type="text"
                value={newTask.name}
                onChange={(e) => setNewTask({...newTask, name: e.target.value})}
                className="w-full p-2 border rounded"
                placeholder="Task description"
                required
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <select
                  value={newTask.assigned}
                  onChange={(e) => setNewTask({...newTask, assigned: e.target.value})}
                  className="p-2 border rounded"
                  required
                >
                  <option value="">Select Person</option>
                  {teamMembers.map(member => (
                    <option key={member} value={member}>{member}</option>
                  ))}
                </select>
                
                <select
                  value={newTask.category}
                  onChange={(e) => setNewTask({...newTask, category: e.target.value})}
                  className="p-2 border rounded"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                
                <input
                  type="date"
                  value={newTask.deadline}
                  onChange={(e) => setNewTask({...newTask, deadline: e.target.value})}
                  className="p-2 border rounded"
                  required
                />
              </div>
              
              <div className="flex gap-3">
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                  className="p-2 border rounded"
                >
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
                
                <button 
                  type="submit"
                  className="flex-1 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>

          {/* Task List */}
          <div className="bg-white p-4 rounded shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <ClipboardList className="w-5 h-5" />
                Tasks ({filteredTasks.length})
              </h2>
            </div>
            
            {/* Search and Filter */}
            <div className="flex gap-3 mb-4">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search tasks..."
                  className="w-full pl-10 p-2 border rounded"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Delayed">Delayed</option>
              </select>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredTasks.map(task => (
                <div key={task.id} className="p-3 border rounded">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium">{task.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span>{task.assigned}</span>
                        <span>{task.deadline}</span>
                        <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={() => deleteTask(task.id)} 
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusIcon(task.status)}
                    <select
                      value={task.status}
                      onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                      className="flex-1 text-sm border rounded p-1"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Delayed">Delayed</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-sm">Progress:</span>
                    <div className="flex-1 bg-gray-200 rounded h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded" 
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={task.progress}
                      onChange={(e) => updateTaskProgress(task.id, e.target.value)}
                      className="w-20"
                    />
                    <span className="text-sm font-medium w-12">{task.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* File Upload */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Files & Reports
            </h3>
            
            <div className="mb-4">
              <label className="block w-full p-3 border-2 border-dashed border-gray-300 rounded text-center cursor-pointer hover:border-gray-400">
                <Upload className="w-6 h-6 mx-auto mb-2 text-gray-500" />
                <span className="text-sm text-gray-600">Click to upload files</span>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
                />
              </label>
            </div>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {reports.map((file, index) => (
                <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">{file.type} • {file.date}</p>
                  </div>
                  {file.file && (
                    <button 
                      onClick={() => downloadFile(file)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Alerts
            </h3>
            
            <div className="space-y-2 mb-4">
              <div className="flex gap-2">
                <select
                  value={alertType}
                  onChange={(e) => setAlertType(e.target.value)}
                  className="p-2 border rounded text-sm"
                >
                  <option value="info">Info</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                  <option value="success">Success</option>
                </select>
                <input
                  type="text"
                  value={newAlert}
                  onChange={(e) => setNewAlert(e.target.value)}
                  placeholder="Alert message..."
                  className="flex-1 p-2 border rounded text-sm"
                />
                <button 
                  onClick={addAlert} 
                  className="bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700"
                >
                  Add
                </button>
              </div>
            </div>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {alerts.map(alert => (
                <div key={alert.id} className={`p-3 rounded border ${getAlertColor(alert.type)}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-sm">{alert.message}</p>
                      <p className="text-xs opacity-75 mt-1">{alert.time}</p>
                    </div>
                    <button 
                      onClick={() => deleteAlert(alert.id)} 
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Team ({teamMembers.length})
            </h3>
            <div className="space-y-2">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {member.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="text-sm">{member}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}