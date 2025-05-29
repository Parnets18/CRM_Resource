import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Nav from "../Nav";
import { 
  ClipboardList, 
  Upload, 
  AlertTriangle, 
  Users, 
  CheckCircle, 
  Clock,
  XCircle,
  Plus,
  Camera,
  Trash2,
  Edit3
} from "lucide-react";

export default function ProjectManager() {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Foundation Pouring", status: "In Progress", assigned: "John Smith", deadline: "2024-05-30", priority: "High" },
    { id: 2, name: "Steel Framing", status: "Delayed", assigned: "Sarah Wilson", deadline: "2024-06-02", priority: "Urgent" },
    { id: 3, name: "Electrical Wiring", status: "Completed", assigned: "Mike Johnson", deadline: "2024-05-28", priority: "Normal" }
  ]);

  const [newTask, setNewTask] = useState({ name: "", assigned: "", deadline: "", priority: "Normal" });
  const [alerts, setAlerts] = useState([
    { id: 1, message: "Concrete delivery delayed by 2 hours", time: "2 hours ago" },
    { id: 2, message: "Safety inspection scheduled for tomorrow", time: "1 day ago" }
  ]);
  const [newAlert, setNewAlert] = useState("");
  const [reports, setReports] = useState(["daily_report_0524.pdf", "site_progress_0524.jpg"]);

  const manpower = [
    { trade: "Carpenters", allocated: 15, total: 20, efficiency: 75 },
    { trade: "Electricians", allocated: 8, total: 12, efficiency: 67 },
    { trade: "Plumbers", allocated: 6, total: 10, efficiency: 60 },
    { trade: "Labor", allocated: 12, total: 15, efficiency: 80 }
  ];

  const teamMembers = ["John Smith", "Sarah Wilson", "Mike Johnson", "Tom Brown", "Lisa Davis"];

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.name && newTask.assigned) {
      setTasks([...tasks, { ...newTask, id: Date.now(), status: "Pending" }]);
      setNewTask({ name: "", assigned: "", deadline: "", priority: "Normal" });
    }
  };

  const updateTaskStatus = (id, status) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, status } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addAlert = () => {
    if (newAlert.trim()) {
      setAlerts([{ id: Date.now(), message: newAlert, time: "Just now" }, ...alerts]);
      setNewAlert("");
    }
  };

  const deleteAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const handleFileUpload = () => {
    const fileName = `report_${Date.now()}.pdf`;
    setReports([fileName, ...reports]);
  };

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
      "Urgent": "bg-red-100 text-red-800 border-red-200",
      "High": "bg-orange-100 text-orange-800 border-orange-200",
      "Normal": "bg-blue-100 text-blue-800 border-blue-200"
    };
    return colors[priority] || colors["Normal"];
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 ml-64">
      <Nav/>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Project Manager</h1>
          <p className="text-gray-600 text-lg">Downtown Tower Construction - Site Management Dashboard</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Task Assignment */}
          <Card className="shadow-sm">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <ClipboardList className="w-5 h-5" />
                Create New Task
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <input
                  type="text"
                  value={newTask.name}
                  onChange={(e) => setNewTask({...newTask, name: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Task description"
                  required
                />
                <select
                  value={newTask.assigned}
                  onChange={(e) => setNewTask({...newTask, assigned: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Team Member</option>
                  {teamMembers.map(member => (
                    <option key={member} value={member}>{member}</option>
                  ))}
                </select>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="date"
                    value={newTask.deadline}
                    onChange={(e) => setNewTask({...newTask, deadline: e.target.value})}
                    className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                    className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
                <Button onClick={addTask} className="w-full bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Task
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Task Management */}
          <Card className="shadow-sm">
            <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
              <CardTitle className="flex items-center gap-2 text-green-900">
                <CheckCircle className="w-5 h-5" />
                Task Management ({tasks.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 max-h-96 overflow-y-auto">
              <div className="space-y-3">
                {tasks.map(task => (
                  <div key={task.id} className="p-4 border rounded-lg bg-white hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{task.name}</h4>
                        <p className="text-sm text-gray-600">{task.assigned}</p>
                        <p className="text-xs text-gray-500">Due: {task.deadline}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <button onClick={() => deleteTask(task.id)} className="text-red-500 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusIcon(task.status)}
                      <select
                        value={task.status}
                        onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                        className="flex-1 text-sm border rounded px-3 py-1 focus:ring-2 focus:ring-green-500"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Delayed">Delayed</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reports & Alerts */}
          <div className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100">
                <CardTitle className="flex items-center gap-2 text-purple-900">
                  <Upload className="w-5 h-5" />
                  Reports ({reports.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <button 
                  onClick={handleFileUpload}
                  className="w-full border-2 border-dashed border-purple-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors mb-4"
                >
                  <Camera className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                  <p className="text-sm text-gray-600">Upload Report</p>
                </button>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {reports.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded text-sm">
                      <Upload className="w-3 h-3 text-gray-500" />
                      <span className="flex-1 truncate">{file}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="bg-gradient-to-r from-red-50 to-red-100">
                <CardTitle className="flex items-center gap-2 text-red-900">
                  <AlertTriangle className="w-5 h-5" />
                  Site Alerts ({alerts.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={newAlert}
                    onChange={(e) => setNewAlert(e.target.value)}
                    placeholder="Describe alert..."
                    className="flex-1 p-2 border rounded focus:ring-2 focus:ring-red-500"
                  />
                  <Button onClick={addAlert} size="sm" className="bg-red-600 hover:bg-red-700">
                    Add
                  </Button>
                </div>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {alerts.map(alert => (
                    <div key={alert.id} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="text-sm text-gray-800">{alert.message}</p>
                          <p className="text-xs text-gray-500">{alert.time}</p>
                        </div>
                        <button onClick={() => deleteAlert(alert.id)} className="text-red-500 hover:text-red-700">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Manpower Allocation */}
        <Card className="shadow-sm">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100">
            <CardTitle className="flex items-center gap-2 text-indigo-900">
              <Users className="w-5 h-5" />
              Manpower Allocation & Efficiency
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {manpower.map((group, index) => (
                <div key={index} className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-gray-900">{group.trade}</h4>
                    <span className="text-lg font-bold text-indigo-600">{group.allocated}/{group.total}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                    <div 
                      className="bg-indigo-500 h-3 rounded-full transition-all duration-500" 
                      style={{ width: `${(group.allocated/group.total)*100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Efficiency</span>
                    <span className={`font-medium ${group.efficiency >= 70 ? 'text-green-600' : 'text-orange-600'}`}>
                      {group.efficiency}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}