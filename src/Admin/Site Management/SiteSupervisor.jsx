import React, { useState, useRef } from 'react';
import Nav from '../Nav';
import { 
  Bell, Users, Clock, AlertTriangle, FileText, 
  Upload, UserCheck, X, Wrench, Camera, 
  CheckCircle2, XCircle, Calendar, Package2,
  ClipboardList, Shield, AlertCircle, Plus
} from 'lucide-react';

export default function SiteSupervisorDashboard() {
  // Attendance Management
  const [attendanceRecords, setAttendanceRecords] = useState([
    { id: 1, name: "John Smith", role: "Mason", trade: "Masonry", status: "absent", checkIn: "", checkOut: "" },
    { id: 2, name: "Mike Johnson", role: "Electrician", trade: "Electrical", status: "absent", checkIn: "", checkOut: "" },
    { id: 3, name: "Sarah Wilson", role: "Plumber", trade: "Plumbing", status: "absent", checkIn: "", checkOut: "" },
    { id: 4, name: "David Brown", role: "Carpenter", trade: "Carpentry", status: "absent", checkIn: "", checkOut: "" },
    { id: 5, name: "Lisa Davis", role: "Safety Officer", trade: "Safety", status: "absent", checkIn: "", checkOut: "" },
    { id: 6, name: "Tom Wilson", role: "Heavy Equipment Operator", trade: "Operations", status: "absent", checkIn: "", checkOut: "" }
  ]);

  // Site Log Management
  const [siteLog, setSiteLog] = useState({
    weather: "",
    temperature: "",
    workDescription: "",
    progress: "",
    materials: "",
    visitors: "",
    notes: ""
  });
  const [siteLogFiles, setSiteLogFiles] = useState([]);

  // Resource Request Management
  const [resourceRequest, setResourceRequest] = useState({ 
    category: "tools", 
    item: "", 
    quantity: "", 
    urgency: "normal",
    justification: "",
    expectedDate: ""
  });

  // Issue Report Management
  const [issueReport, setIssueReport] = useState({ 
    type: "safety", 
    category: "injury",
    location: "",
    description: "", 
    severity: "low",
    immediateAction: "",
    reportedBy: ""
  });
  const [issueFiles, setIssueFiles] = useState([]);

  // File refs
  const siteLogFileRef = useRef(null);
  const issueFileRef = useRef(null);

  // Get current time
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Toggle attendance with proper workflow
  const toggleAttendance = (workerId, action) => {
    const currentTime = getCurrentTime();
    setAttendanceRecords(prev => prev.map(worker => {
      if (worker.id === workerId) {
        if (action === 'checkin' && worker.status === 'absent') {
          return { ...worker, status: 'present', checkIn: currentTime };
        } else if (action === 'checkout' && worker.status === 'present') {
          return { ...worker, status: 'completed', checkOut: currentTime };
        }
      }
      return worker;
    }));
  };

  // File upload handlers
  const handleSiteLogFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setSiteLogFiles(prev => [...prev, ...files]);
  };

  const handleIssueFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setIssueFiles(prev => [...prev, ...files]);
  };

  // Remove file handlers
  const removeSiteLogFile = (index) => {
    setSiteLogFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeIssueFile = (index) => {
    setIssueFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Submit handlers with proper workflow
  const submitSiteLog = () => {
    const requiredFields = ['weather', 'workDescription', 'progress'];
    const missingFields = requiredFields.filter(field => !siteLog[field].trim());
    
    if (missingFields.length > 0) {
      alert(`Please fill in required fields: ${missingFields.join(', ')}`);
      return;
    }

    const logData = {
      ...siteLog,
      files: siteLogFiles.map(file => ({ name: file.name, size: file.size, type: file.type })),
      timestamp: new Date().toISOString(),
      supervisor: "Current User"
    };
    
    console.log("Site log submitted:", logData);
    alert("Daily site log submitted successfully!");
    
    // Reset form
    setSiteLog({
      weather: "",
      temperature: "",
      workDescription: "",
      progress: "",
      materials: "",
      visitors: "",
      notes: ""
    });
    setSiteLogFiles([]);
  };

  const submitResourceRequest = () => {
    if (!resourceRequest.item || !resourceRequest.quantity || !resourceRequest.justification) {
      alert("Please fill in all required fields: Item, Quantity, and Justification");
      return;
    }

    const requestData = {
      ...resourceRequest,
      timestamp: new Date().toISOString(),
      requestId: `REQ-${Date.now()}`,
      status: "pending",
      requestedBy: "Site Supervisor"
    };
    
    console.log("Resource request submitted:", requestData);
    alert(`Resource request ${requestData.requestId} submitted successfully!`);
    
    // Reset form
    setResourceRequest({ 
      category: "tools", 
      item: "", 
      quantity: "", 
      urgency: "normal",
      justification: "",
      expectedDate: ""
    });
  };

  const submitIssueReport = () => {
    if (!issueReport.description || !issueReport.location) {
      alert("Please provide issue description and location");
      return;
    }

    const reportData = {
      ...issueReport,
      files: issueFiles.map(file => ({ name: file.name, size: file.size, type: file.type })),
      timestamp: new Date().toISOString(),
      reportId: `INC-${Date.now()}`,
      status: "open"
    };
    
    console.log("Issue report submitted:", reportData);
    alert(`Issue report ${reportData.reportId} submitted successfully!`);
    
    // Reset form
    setIssueReport({ 
      type: "safety", 
      category: "injury",
      location: "",
      description: "", 
      severity: "low",
      immediateAction: "",
      reportedBy: ""
    });
    setIssueFiles([]);
  };

  // Calculate stats
  const presentWorkers = attendanceRecords.filter(w => w.status === 'present' || w.status === 'completed').length;
  const completedWorkers = attendanceRecords.filter(w => w.status === 'completed').length;

  return (
    <div className="min-h-screen bg-gray-50 ml-64">
      <Nav/>
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Site Supervisor Dashboard</h1>
              <p className="text-gray-600">Construction Site Management System</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Workers Present</p>
                <p className="text-2xl font-bold text-gray-900">{presentWorkers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed Shifts</p>
                <p className="text-2xl font-bold text-gray-900">{completedWorkers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Issues</p>
                <p className="text-2xl font-bold text-gray-900">1</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Attendance Management */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-gray-500 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Daily Attendance</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {attendanceRecords.map((worker) => (
                  <div key={worker.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        worker.status === 'present' ? 'bg-green-500' : 
                        worker.status === 'completed' ? 'bg-blue-500' : 'bg-gray-300'
                      }`} />
                      <div>
                        <p className="font-medium text-gray-900">{worker.name}</p>
                        <p className="text-sm text-gray-500">{worker.role} • {worker.trade}</p>
                        {(worker.checkIn || worker.checkOut) && (
                          <p className="text-xs text-gray-400">
                            {worker.checkIn && `In: ${worker.checkIn}`}
                            {worker.checkOut && ` • Out: ${worker.checkOut}`}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {worker.status === 'absent' && (
                        <button
                          onClick={() => toggleAttendance(worker.id, 'checkin')}
                          className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 flex items-center"
                        >
                          <UserCheck className="w-4 h-4 mr-1" />
                          Check In
                        </button>
                      )}
                      {worker.status === 'present' && (
                        <button
                          onClick={() => toggleAttendance(worker.id, 'checkout')}
                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 flex items-center"
                        >
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          Check Out
                        </button>
                      )}
                      {worker.status === 'completed' && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-md flex items-center">
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          Completed
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Daily Site Log */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-gray-500 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Daily Site Log</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Weather *</label>
                    <select
                      value={siteLog.weather}
                      onChange={(e) => setSiteLog(prev => ({ ...prev, weather: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select weather</option>
                      <option value="sunny">Sunny</option>
                      <option value="cloudy">Cloudy</option>
                      <option value="rainy">Rainy</option>
                      <option value="windy">Windy</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Temperature (°F)</label>
                    <input
                      type="number"
                      value={siteLog.temperature}
                      onChange={(e) => setSiteLog(prev => ({ ...prev, temperature: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="75"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Work Description *</label>
                  <textarea
                    value={siteLog.workDescription}
                    onChange={(e) => setSiteLog(prev => ({ ...prev, workDescription: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="3"
                    placeholder="Describe work activities performed today..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Progress Update *</label>
                  <textarea
                    value={siteLog.progress}
                    onChange={(e) => setSiteLog(prev => ({ ...prev, progress: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="2"
                    placeholder="Overall progress and milestones achieved..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Materials Used</label>
                  <input
                    type="text"
                    value={siteLog.materials}
                    onChange={(e) => setSiteLog(prev => ({ ...prev, materials: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="List materials consumed..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Visitors/Inspections</label>
                  <input
                    type="text"
                    value={siteLog.visitors}
                    onChange={(e) => setSiteLog(prev => ({ ...prev, visitors: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Record any site visitors or inspections..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                  <textarea
                    value={siteLog.notes}
                    onChange={(e) => setSiteLog(prev => ({ ...prev, notes: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="2"
                    placeholder="Any other observations or notes..."
                  />
                </div>

                {/* File attachments for site log */}
                {siteLogFiles.length > 0 && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Attached Files:</label>
                    {siteLogFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-blue-500" />
                          <span className="text-sm text-gray-700">{file.name}</span>
                          <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                        </div>
                        <button
                          onClick={() => removeSiteLogFile(index)}
                          className="text-red-500 hover:bg-red-50 p-1 rounded"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <input
                  type="file"
                  ref={siteLogFileRef}
                  onChange={handleSiteLogFileUpload}
                  multiple
                  accept="image/*,.pdf,.doc,.docx"
                  className="hidden"
                />

                <div className="flex space-x-3">
                  <button
                    onClick={() => siteLogFileRef.current?.click()}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex items-center justify-center"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Add Photos/Documents
                  </button>
                  <button
                    onClick={submitSiteLog}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Submit Daily Log
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Resource Request */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center">
                <Package2 className="w-5 h-5 text-gray-500 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Request Tools/Resources</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={resourceRequest.category}
                    onChange={(e) => setResourceRequest(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="tools">Tools</option>
                    <option value="materials">Materials</option>
                    <option value="equipment">Equipment</option>
                    <option value="safety">Safety Equipment</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Item/Resource Name *</label>
                  <input
                    type="text"
                    value={resourceRequest.item}
                    onChange={(e) => setResourceRequest(prev => ({ ...prev, item: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Concrete Mixer, Safety Helmets, Steel Rebar..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
                    <input
                      type="number"
                      value={resourceRequest.quantity}
                      onChange={(e) => setResourceRequest(prev => ({ ...prev, quantity: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                      value={resourceRequest.urgency}
                      onChange={(e) => setResourceRequest(prev => ({ ...prev, urgency: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="normal">Normal</option>
                      <option value="urgent">Urgent</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expected Delivery Date</label>
                  <input
                    type="date"
                    value={resourceRequest.expectedDate}
                    onChange={(e) => setResourceRequest(prev => ({ ...prev, expectedDate: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Justification *</label>
                  <textarea
                    value={resourceRequest.justification}
                    onChange={(e) => setResourceRequest(prev => ({ ...prev, justification: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="3"
                    placeholder="Explain why this resource is needed and how it will be used..."
                  />
                </div>

                <button
                  onClick={submitResourceRequest}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center"
                >
                  <Wrench className="w-4 h-4 mr-2" />
                  Submit Resource Request
                </button>
              </div>
            </div>
          </div>

          {/* Issue Report */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-gray-500 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Report Issues</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Issue Type</label>
                    <select
                      value={issueReport.type}
                      onChange={(e) => setIssueReport(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="safety">Safety Issue</option>
                      <option value="quality">Quality Issue</option>
                      <option value="security">Security Issue</option>
                      <option value="environmental">Environmental</option>
                      <option value="equipment">Equipment Failure</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={issueReport.category}
                      onChange={(e) => setIssueReport(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="injury">Injury</option>
                      <option value="near-miss">Near Miss</option>
                      <option value="theft">Theft</option>
                      <option value="delay">Project Delay</option>
                      <option value="damage">Property Damage</option>
                      <option value="violation">Safety Violation</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                    <input
                      type="text"
                      value={issueReport.location}
                      onChange={(e) => setIssueReport(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="e.g., Building A - 2nd Floor, Parking Area..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                    <select
                      value={issueReport.severity}
                      onChange={(e) => setIssueReport(prev => ({ ...prev, severity: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reported By</label>
                  <input
                    type="text"
                    value={issueReport.reportedBy}
                    onChange={(e) => setIssueReport(prev => ({ ...prev, reportedBy: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Name of person reporting the issue"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Issue Description *</label>
                  <textarea
                    value={issueReport.description}
                    onChange={(e) => setIssueReport(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    rows="3"
                    placeholder="Provide detailed description of the issue, what happened, when, and any relevant circumstances..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Immediate Action Taken</label>
                  <textarea
                    value={issueReport.immediateAction}
                    onChange={(e) => setIssueReport(prev => ({ ...prev, immediateAction: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    rows="2"
                    placeholder="Describe any immediate actions taken to address the issue..."
                  />
                </div>

                {/* File attachments for issues */}
                {issueFiles.length > 0 && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Evidence/Documentation:</label>
                    {issueFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-red-50 rounded border border-red-200">
                        <div className="flex items-center space-x-2">
                          <Camera className="w-4 h-4 text-red-500" />
                          <span className="text-sm text-gray-700">{file.name}</span>
                          <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                        </div>
                        <button
                          onClick={() => removeIssueFile(index)}
                          className="text-red-500 hover:bg-red-100 p-1 rounded"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <input
                  type="file"
                  ref={issueFileRef}
                  onChange={handleIssueFileUpload}
                  multiple
                  accept="image/*,.pdf,.doc,.docx"
                  className="hidden"
                />

                <div className="flex space-x-3">
                  <button
                    onClick={() => issueFileRef.current?.click()}
                    className="flex-1 px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 flex items-center justify-center"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Add Evidence/Photos
                  </button>
                  <button
                    onClick={submitIssueReport}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center justify-center"
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Submit Issue Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities Summary */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center">
              <ClipboardList className="w-5 h-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Today's Summary</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Attendance Summary */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900 flex items-center">
                  <Users className="w-4 h-4 mr-2 text-green-600" />
                  Attendance Status
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Workers:</span>
                    <span className="font-medium">{attendanceRecords.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Present:</span>
                    <span className="font-medium text-green-600">{presentWorkers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Completed Shifts:</span>
                    <span className="font-medium text-blue-600">{completedWorkers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Absent:</span>
                    <span className="font-medium text-red-600">{attendanceRecords.length - presentWorkers}</span>
                  </div>
                </div>
              </div>

              {/* Safety Status */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900 flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-blue-600" />
                  Safety Status
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Days Without Incident:</span>
                    <span className="font-medium text-green-600">15</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Safety Inspections:</span>
                    <span className="font-medium">2/2 ✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">PPE Compliance:</span>
                    <span className="font-medium text-green-600">100%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Open Issues:</span>
                    <span className="font-medium text-orange-600">1</span>
                  </div>
                </div>
              </div>

              {/* Progress Status */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900 flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-purple-600" />
                  Progress Status
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tasks Completed:</span>
                    <span className="font-medium text-green-600">8/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Project Timeline:</span>
                    <span className="font-medium text-green-600">On Track</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Resource Requests:</span>
                    <span className="font-medium text-yellow-600">3 Pending</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quality Checks:</span>
                    <span className="font-medium">All Passed ✓</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex flex-wrap gap-4">
          <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Meeting
          </button>
          <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 flex items-center">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Quality Inspection
          </button>
          <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 flex items-center">
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </button>
          <button className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            Safety Briefing
          </button>
        </div>
      </div>
    </div>
  );
}