import React, { useState, useEffect } from "react";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  CheckCircle, 
  AlertTriangle, 
  X,
  Filter,
  Download,
  Search,
  User,
  FileText,
  CreditCard,
  ChevronRight,
  Bell,
  Settings,
  LogOut,
  Menu,
  Home,
  CalendarDays,
  Receipt,
  Phone,
  Mail,
  Building,
  UserCheck,
  Eye,
  Edit3,
  Plus
} from "lucide-react";

// Mock user data
const currentUser = {
  id: 1,
  name: "Rahul Sharma",
  employeeId: "EMP001",
  department: "Engineering",
  position: "Senior Software Engineer",
  email: "rahul.sharma@company.com",
  phone: "+91 98765 43210",
  joiningDate: "2022-01-15",
  reportingManager: "Priya Patel",
  workLocation: "Bangalore Office",
  profileImage: "/api/placeholder/150/150"
};

// Mock attendance data
const attendanceData = [
  { id: 1, name: "Rahul Sharma", department: "Engineering", checkIn: "09:02 AM", checkOut: "06:15 PM", status: "Present", date: "2024-01-20", hours: "9h 13m" },
  { id: 2, name: "Priya Patel", department: "HR", checkIn: "09:15 AM", checkOut: "06:00 PM", status: "Present", date: "2024-01-20", hours: "8h 45m" },
  { id: 3, name: "Amit Kumar", department: "Finance", checkIn: "09:30 AM", checkOut: "05:45 PM", status: "Present", date: "2024-01-20", hours: "8h 15m" },
  { id: 4, name: "Sneha Reddy", department: "Marketing", checkIn: "10:05 AM", checkOut: "06:30 PM", status: "Late", date: "2024-01-20", hours: "8h 25m" },
  { id: 5, name: "Vikram Singh", department: "Sales", checkIn: "08:55 AM", checkOut: "06:10 PM", status: "Present", date: "2024-01-20", hours: "9h 15m" },
  { id: 6, name: "Neha Gupta", department: "Customer Support", checkIn: "--:--", checkOut: "--:--", status: "Absent", date: "2024-01-20", hours: "--" },
];

// Mock leave data
const leaveData = [
  { id: 1, type: "Annual Leave", startDate: "2024-02-15", endDate: "2024-02-17", days: 3, status: "Approved", reason: "Family vacation" },
  { id: 2, type: "Sick Leave", startDate: "2024-01-10", endDate: "2024-01-10", days: 1, status: "Approved", reason: "Medical checkup" },
  { id: 3, type: "Personal Leave", startDate: "2024-03-05", endDate: "2024-03-06", days: 2, status: "Pending", reason: "Personal work" },
];

// Mock payslip data
const payslipData = [
  { id: 1, month: "January 2024", basicSalary: 50000, allowances: 15000, deductions: 5000, netSalary: 60000, status: "Processed" },
  { id: 2, month: "December 2023", basicSalary: 50000, allowances: 18000, deductions: 5200, netSalary: 62800, status: "Processed" },
  { id: 3, month: "November 2023", basicSalary: 50000, allowances: 15000, deductions: 4800, netSalary: 60200, status: "Processed" },
];

// Mock stats
const attendanceStats = [
  { title: "Present Today", value: "42", icon: CheckCircle, color: "text-emerald-600", bgColor: "bg-emerald-50", borderColor: "border-emerald-200" },
  { title: "Absent Today", value: "3", icon: X, color: "text-red-600", bgColor: "bg-red-50", borderColor: "border-red-200" },
  { title: "Late Arrivals", value: "5", icon: Clock, color: "text-amber-600", bgColor: "bg-amber-50", borderColor: "border-amber-200" },
  { title: "On Leave", value: "2", icon: Calendar, color: "text-blue-600", bgColor: "bg-blue-50", borderColor: "border-blue-200" },
];

const ProfessionalAttendanceSystem = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Leave application form state
  const [leaveForm, setLeaveForm] = useState({
    type: "Annual Leave",
    startDate: "",
    endDate: "",
    reason: "",
    days: 1
  });
  
  const [showLeaveForm, setShowLeaveForm] = useState(false);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  // Handle check in/out
  const handleCheckInOut = () => {
    setIsCheckedIn(!isCheckedIn);
  };

  // Handle leave form submission
  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    console.log("Leave application submitted:", leaveForm);
    setLeaveForm({ type: "Annual Leave", startDate: "", endDate: "", reason: "", days: 1 });
    setShowLeaveForm(false);
    // In real app, send to backend
  };

  // Format time for display
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // Filter attendance data
  const filteredAttendance = attendanceData.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          employee.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === "All" || employee.department === filterDepartment;
    const matchesStatus = filterStatus === "All" || employee.status === filterStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Navigation items
  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "profile", label: "My Profile", icon: User },
    { id: "attendance", label: "Attendance", icon: UserCheck },
    { id: "leave", label: "Leave Management", icon: CalendarDays },
    { id: "payslips", label: "Payslips", icon: Receipt },
  ];

  // Render Dashboard
  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome back, {currentUser.name}!</h2>
            <p className="text-blue-100">Today is {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p className="text-blue-100">Current time: {formatTime(currentTime)}</p>
          </div>
          <div className="text-right">
            <button
              onClick={handleCheckInOut}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                isCheckedIn
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-white text-blue-600 hover:bg-gray-50"
              }`}
            >
              {isCheckedIn ? "Check Out" : "Check In"}
            </button>
            <p className="text-sm text-blue-100 mt-2">
              {isCheckedIn 
                ? `Checked in at ${formatTime(new Date(currentTime.getTime() - 30 * 60000))}` 
                : "Not checked in yet"}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {attendanceStats.map((stat, index) => (
          <div key={index} className={`bg-white rounded-xl p-6 shadow-sm border ${stat.borderColor}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">out of 52 employees</p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => setActiveTab("leave")}
            className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <CalendarDays className="h-5 w-5 text-blue-600 mr-3" />
            <span className="font-medium text-blue-900">Apply for Leave</span>
          </button>
          <button 
            onClick={() => setActiveTab("payslips")}
            className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <Receipt className="h-5 w-5 text-green-600 mr-3" />
            <span className="font-medium text-green-900">Download Payslip</span>
          </button>
          <button 
            onClick={() => setActiveTab("profile")}
            className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <User className="h-5 w-5 text-purple-600 mr-3" />
            <span className="font-medium text-purple-900">View Profile</span>
          </button>
        </div>
      </div>
    </div>
  );

  // Render Profile
  const renderProfile = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
          <h2 className="text-xl font-bold text-white">My Profile</h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 mb-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="h-12 w-12 text-gray-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900">{currentUser.name}</h3>
              <p className="text-gray-600">{currentUser.position}</p>
              <p className="text-sm text-gray-500">Employee ID: {currentUser.employeeId}</p>
            </div>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <div className="flex items-center mt-1">
                  <Mail className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-900">{currentUser.email}</span>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Phone</label>
                <div className="flex items-center mt-1">
                  <Phone className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-900">{currentUser.phone}</span>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Department</label>
                <div className="flex items-center mt-1">
                  <Building className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-900">{currentUser.department}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Joining Date</label>
                <div className="flex items-center mt-1">
                  <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-900">{new Date(currentUser.joiningDate).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Reporting Manager</label>
                <div className="flex items-center mt-1">
                  <Users className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-900">{currentUser.reportingManager}</span>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Work Location</label>
                <div className="flex items-center mt-1">
                  <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-900">{currentUser.workLocation}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Attendance
  const renderAttendance = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Attendance Records</h2>
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </button>
        </div>
        
        <div className="p-6">
          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search employees..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
              >
                <option value="All">All Departments</option>
                <option value="Engineering">Engineering</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
              </select>
              
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Late">Late</option>
              </select>
              
              <input
                type="date"
                className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>
          
          {/* Attendance Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAttendance.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{employee.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{employee.checkIn}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{employee.checkOut}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{employee.hours}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        employee.status === "Present" ? "bg-green-100 text-green-800" :
                        employee.status === "Late" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {employee.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Leave Management
  const renderLeave = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Leave Management</h2>
        <button 
          onClick={() => setShowLeaveForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Apply for Leave
        </button>
      </div>

      {/* Leave Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Annual Leave</p>
              <p className="text-2xl font-bold text-gray-900">18</p>
              <p className="text-xs text-gray-500">Available days</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sick Leave</p>
              <p className="text-2xl font-bold text-gray-900">10</p>
              <p className="text-xs text-gray-500">Available days</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Personal Leave</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
              <p className="text-xs text-gray-500">Available days</p>
            </div>
            <User className="h-8 w-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Leave Applications */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">My Leave Applications</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {leaveData.map((leave) => (
              <div key={leave.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{leave.type}</h4>
                    <p className="text-sm text-gray-600 mt-1">{leave.reason}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {leave.startDate} to {leave.endDate} ({leave.days} day{leave.days > 1 ? 's' : ''})
                    </p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    leave.status === "Approved" ? "bg-green-100 text-green-800" :
                    leave.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {leave.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leave Application Modal */}
      {showLeaveForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Apply for Leave</h3>
              <button 
                onClick={() => setShowLeaveForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleLeaveSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={leaveForm.type}
                  onChange={(e) => setLeaveForm({...leaveForm, type: e.target.value})}
                >
                  <option value="Annual Leave">Annual Leave</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Personal Leave">Personal Leave</option>
                  <option value="Emergency Leave">Emergency Leave</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={leaveForm.startDate}
                    onChange={(e) => setLeaveForm({...leaveForm, startDate: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={leaveForm.endDate}
                    onChange={(e) => setLeaveForm({...leaveForm, endDate: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="Please provide reason for leave..."
                  value={leaveForm.reason}
                  onChange={(e) => setLeaveForm({...leaveForm, reason: e.target.value})}
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowLeaveForm(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    
  );

  // Render Payslips
  const renderPayslips = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Payslips</h2>
        <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <Download className="h-4 w-4 mr-2" />
          Download All
        </button>
      </div>

      {/* Payslip Cards */}
      <div className="grid gap-6">
        {payslipData.map((payslip) => (
          <div key={payslip.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{payslip.month}</h3>
                <p className="text-sm text-gray-600">Employee: {currentUser.name}</p>
                <p className="text-sm text-gray-600">Employee ID: {currentUser.employeeId}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  payslip.status === "Processed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }`}>
                  {payslip.status}
                </span>
                <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm font-medium text-blue-600">Basic Salary</p>
                <p className="text-xl font-bold text-blue-900">₹{payslip.basicSalary.toLocaleString()}</p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm font-medium text-green-600">Allowances</p>
                <p className="text-xl font-bold text-green-900">₹{payslip.allowances.toLocaleString()}</p>
              </div>
              
              <div className="bg-red-50 rounded-lg p-4">
                <p className="text-sm font-medium text-red-600">Deductions</p>
                <p className="text-xl font-bold text-red-900">₹{payslip.deductions.toLocaleString()}</p>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm font-medium text-purple-600">Net Salary</p>
                <p className="text-xl font-bold text-purple-900">₹{payslip.netSalary.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  Gross Salary: ₹{(payslip.basicSalary + payslip.allowances).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  Tax Deducted: ₹{Math.floor(payslip.deductions * 0.8).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">HR Portal</h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-600 hover:text-gray-900"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out`}>
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center justify-center h-16 border-b border-gray-200">
              <h1 className="text-xl font-bold text-gray-900">HR Portal</h1>
            </div>
            
            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </button>
              ))}
            </nav>
            
            {/* User Info */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                  <User className="h-6 w-6 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{currentUser.name}</p>
                  <p className="text-xs text-gray-500 truncate">{currentUser.department}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <main className="p-6">
            {activeTab === "dashboard" && renderDashboard()}
            {activeTab === "profile" && renderProfile()}
            {activeTab === "attendance" && renderAttendance()}
            {activeTab === "leave" && renderLeave()}
            {activeTab === "payslips" && renderPayslips()}
          </main>
        </div>
      </div>
    </div>
  )};