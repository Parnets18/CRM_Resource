import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { 
  Bell, Package, Users, Clock, CheckCircle2, AlertTriangle, 
  ClipboardList, FileText, Wrench, Upload, Calendar, UserCheck, X 
} from "lucide-react";
import Nav from "../Nav";
import { useState, useRef } from "react";

export default function SiteSupervisor() {
  const [attendanceRecords, setAttendanceRecords] = useState([
    { id: 1, name: "John Smith", role: "Mason", status: "present", time: "08:00" },
    { id: 2, name: "Mike Johnson", role: "Electrician", status: "absent", time: "" },
    { id: 3, name: "Sarah Wilson", role: "Plumber", status: "present", time: "07:45" },
    { id: 4, name: "David Brown", role: "Carpenter", status: "present", time: "08:15" }
  ]);

  const [siteLog, setSiteLog] = useState("");
  const [siteLogFiles, setSiteLogFiles] = useState([]);
  const [resourceRequest, setResourceRequest] = useState({ item: "", quantity: "", urgency: "normal" });
  const [issueReport, setIssueReport] = useState({ type: "injury", description: "", severity: "low" });
  const [issueFiles, setIssueFiles] = useState([]);
  
  const siteLogFileRef = useRef(null);
  const issueFileRef = useRef(null);

  const toggleAttendance = (workerId) => {
    const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    setAttendanceRecords(prev => prev.map(worker => 
      worker.id === workerId 
        ? { ...worker, status: worker.status === 'present' ? 'absent' : 'present', time: worker.status === 'absent' ? currentTime : '' }
        : worker
    ));
  };

  const handleSiteLogFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setSiteLogFiles(prev => [...prev, ...files]);
  };

  const handleIssueFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setIssueFiles(prev => [...prev, ...files]);
  };

  const removeSiteLogFile = (index) => {
    setSiteLogFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeIssueFile = (index) => {
    setIssueFiles(prev => prev.filter((_, i) => i !== index));
  };

  const submitSiteLog = () => {
    if (siteLog.trim()) {
      const logData = {
        content: siteLog,
        files: siteLogFiles.map(file => ({ name: file.name, size: file.size, type: file.type })),
        timestamp: new Date().toISOString()
      };
      console.log("Site log submitted:", logData);
      alert(`Site log submitted successfully! ${siteLogFiles.length > 0 ? `With ${siteLogFiles.length} file(s) attached.` : ''}`);
      setSiteLog("");
      setSiteLogFiles([]);
    }
  };

  const submitResourceRequest = () => {
    if (resourceRequest.item && resourceRequest.quantity) {
      const requestData = {
        ...resourceRequest,
        timestamp: new Date().toISOString(),
        requestId: Date.now()
      };
      console.log("Resource request submitted:", requestData);
      alert("Resource request submitted successfully!");
      setResourceRequest({ item: "", quantity: "", urgency: "normal" });
    }
  };

  const submitIssueReport = () => {
    if (issueReport.description) {
      const reportData = {
        ...issueReport,
        files: issueFiles.map(file => ({ name: file.name, size: file.size, type: file.type })),
        timestamp: new Date().toISOString(),
        reportId: Date.now()
      };
      console.log("Issue report submitted:", reportData);
      alert(`Issue report submitted successfully! ${issueFiles.length > 0 ? `With ${issueFiles.length} file(s) attached.` : ''}`);
      setIssueReport({ type: "injury", description: "", severity: "low" });
      setIssueFiles([]);
    }
  };

  const presentWorkers = attendanceRecords.filter(w => w.status === 'present').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-purple-200 lg:ml-64">
      <div className="relative z-10 flex">
        <Nav />

        <div className="flex-1 p-8 mt-16 md:mt-0">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-black">Site Supervisor Dashboard</h2>
              <p className="text-gray-700">Construction Site Management</p>
            </div>
            <Button variant="ghost" size="icon" className="text-purple-700 hover:bg-purple-100">
              <Bell className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="border border-purple-300 bg-white backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-black">Workers Present</CardTitle>
                  <Users className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-black">{presentWorkers}</div>
                  <p className="text-xs text-green-600">of {attendanceRecords.length} total</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="border border-purple-300 bg-white backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-black">Pending Requests</CardTitle>
                  <Clock className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-black">5</div>
                  <p className="text-xs text-red-500">2 urgent</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="border border-purple-300 bg-white backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-black">Site Issues</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-black">2</div>
                  <p className="text-xs text-orange-600">1 critical</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="border border-purple-300 bg-white backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-black">Daily Logs</CardTitle>
                  <FileText className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-black">12</div>
                  <p className="text-xs text-green-600">This month</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card className="border border-purple-300 bg-white backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Daily Attendance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {attendanceRecords.map((worker) => (
                  <motion.div 
                    key={worker.id}
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${worker.status === 'present' ? 'bg-green-500' : 'bg-red-500'}`} />
                      <div>
                        <p className="text-sm font-medium text-black">{worker.name}</p>
                        <p className="text-xs text-gray-600">{worker.role} {worker.time && `• ${worker.time}`}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant={worker.status === 'present' ? 'default' : 'outline'}
                      onClick={() => toggleAttendance(worker.id)}
                      className={worker.status === 'present' ? 'bg-green-600 hover:bg-green-700' : ''}
                    >
                      <UserCheck className="w-4 h-4 mr-1" />
                      {worker.status === 'present' ? 'Present' : 'Mark'}
                    </Button>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            <Card className="border border-purple-300 bg-white backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-black">Upload Daily Site Log</CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="space-y-4">
                    <textarea
                      placeholder="Enter daily site activities, progress, and observations..."
                      value={siteLog}
                      onChange={(e) => setSiteLog(e.target.value)}
                      className="w-full h-24 p-2 rounded bg-gray-100 border border-gray-300 text-black resize-none"
                    />
                    
                    {siteLogFiles.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">Attached Files:</p>
                        {siteLogFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-purple-500" />
                              <span className="text-sm text-gray-700">{file.name}</span>
                              <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeSiteLogFile(index)}
                              className="text-red-500 hover:bg-red-50"
                            >
                              <X className="w-4 h-4" />
                            </Button>
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
                    
                    <div className="flex gap-2">
                      <Button 
                        type="button"
                        variant="outline" 
                        className="flex-1 border-purple-300 text-purple-600"
                        onClick={() => siteLogFileRef.current?.click()}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Add Photos/Files
                      </Button>
                      <Button onClick={submitSiteLog} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">
                        <FileText className="w-4 h-4 mr-2" />
                        Submit Log
                      </Button>
                    </div>
                  </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border border-purple-300 bg-white backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-black">Request Tools/Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Tool/Resource Name"
                    value={resourceRequest.item}
                    onChange={(e) => setResourceRequest(prev => ({ ...prev, item: e.target.value }))}
                    className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-black"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="Quantity"
                      value={resourceRequest.quantity}
                      onChange={(e) => setResourceRequest(prev => ({ ...prev, quantity: e.target.value }))}
                      className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-black"
                    />
                    <select 
                      value={resourceRequest.urgency}
                      onChange={(e) => setResourceRequest(prev => ({ ...prev, urgency: e.target.value }))}
                      className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-black"
                    >
                      <option value="normal">Normal</option>
                      <option value="urgent">Urgent</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                  <Button onClick={submitResourceRequest} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    <Wrench className="w-4 h-4 mr-2" />
                    Submit Request
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="border border-purple-300 bg-white backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-black">Report Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <select 
                      value={issueReport.type}
                      onChange={(e) => setIssueReport(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-black"
                    >
                      <option value="injury">Injury</option>
                      <option value="theft">Theft</option>
                      <option value="delay">Delay</option>
                      <option value="safety">Safety Issue</option>
                    </select>
                    <select 
                      value={issueReport.severity}
                      onChange={(e) => setIssueReport(prev => ({ ...prev, severity: e.target.value }))}
                      className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-black"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                  <textarea
                    placeholder="Describe the issue in detail..."
                    value={issueReport.description}
                    onChange={(e) => setIssueReport(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full h-20 p-2 rounded bg-gray-100 border border-gray-300 text-black resize-none"
                  />
                  
                  {issueFiles.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Attached Files:</p>
                      {issueFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-red-500" />
                            <span className="text-sm text-gray-700">{file.name}</span>
                            <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeIssueFile(index)}
                            className="text-red-500 hover:bg-red-50"
                          >
                            <X className="w-4 h-4" />
                          </Button>
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
                  
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => issueFileRef.current?.click()}
                      className="flex-1 border-red-300 text-red-600"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Add Evidence
                    </Button>
                    <Button onClick={submitIssueReport} className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Submit Report
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}