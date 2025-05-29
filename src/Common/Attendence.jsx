// import React, { useState, useEffect } from "react";
// import {
//   Calendar,
//   Clock,
//   MapPin,
//   Users,
//   CheckCircle,
//   AlertTriangle,
//   X,
//   Filter,
//   Download,
//   Search,
//   User,
//   FileText,
//   CreditCard,
//   ChevronRight,
//   Bell,
//   Settings,
//   LogOut,
//   Menu,
//   Home,
//   CalendarDays,
//   Receipt,
//   Phone,
//   Mail,
//   Building,
//   UserCheck,
//   Eye,
//   Edit3,
//   Plus
// } from "lucide-react";

// // Mock user data
// const currentUser = {
//   id: 1,
//   name: "Rahul Sharma",
//   employeeId: "EMP001",
//   department: "Engineering",
//   position: "Senior Software Engineer",
//   email: "rahul.sharma@company.com",
//   phone: "+91 98765 43210",
//   joiningDate: "2022-01-15",
//   reportingManager: "Priya Patel",
//   workLocation: "Bangalore Office",
//   profileImage: "/api/placeholder/150/150"
// };

// // Mock attendance data
// const attendanceData = [
//   { id: 1, name: "Rahul Sharma", department: "Engineering", checkIn: "09:02 AM", checkOut: "06:15 PM", status: "Present", date: "2024-01-20", hours: "9h 13m" },
//   { id: 2, name: "Priya Patel", department: "HR", checkIn: "09:15 AM", checkOut: "06:00 PM", status: "Present", date: "2024-01-20", hours: "8h 45m" },
//   { id: 3, name: "Amit Kumar", department: "Finance", checkIn: "09:30 AM", checkOut: "05:45 PM", status: "Present", date: "2024-01-20", hours: "8h 15m" },
//   { id: 4, name: "Sneha Reddy", department: "Marketing", checkIn: "10:05 AM", checkOut: "06:30 PM", status: "Late", date: "2024-01-20", hours: "8h 25m" },
//   { id: 5, name: "Vikram Singh", department: "Sales", checkIn: "08:55 AM", checkOut: "06:10 PM", status: "Present", date: "2024-01-20", hours: "9h 15m" },
//   { id: 6, name: "Neha Gupta", department: "Customer Support", checkIn: "--:--", checkOut: "--:--", status: "Absent", date: "2024-01-20", hours: "--" },
// ];

// // Mock leave data
// const leaveData = [
//   { id: 1, type: "Annual Leave", startDate: "2024-02-15", endDate: "2024-02-17", days: 3, status: "Approved", reason: "Family vacation" },
//   { id: 2, type: "Sick Leave", startDate: "2024-01-10", endDate: "2024-01-10", days: 1, status: "Approved", reason: "Medical checkup" },
//   { id: 3, type: "Personal Leave", startDate: "2024-03-05", endDate: "2024-03-06", days: 2, status: "Pending", reason: "Personal work" },
// ];

// // Mock payslip data
// const payslipData = [
//   { id: 1, month: "January 2024", basicSalary: 50000, allowances: 15000, deductions: 5000, netSalary: 60000, status: "Processed" },
//   { id: 2, month: "December 2023", basicSalary: 50000, allowances: 18000, deductions: 5200, netSalary: 62800, status: "Processed" },
//   { id: 3, month: "November 2023", basicSalary: 50000, allowances: 15000, deductions: 4800, netSalary: 60200, status: "Processed" },
// ];

// // Mock stats
// const attendanceStats = [
//   { title: "Present Today", value: "42", icon: CheckCircle, color: "text-emerald-600", bgColor: "bg-emerald-50", borderColor: "border-emerald-200" },
//   { title: "Absent Today", value: "3", icon: X, color: "text-red-600", bgColor: "bg-red-50", borderColor: "border-red-200" },
//   { title: "Late Arrivals", value: "5", icon: Clock, color: "text-amber-600", bgColor: "bg-amber-50", borderColor: "border-amber-200" },
//   { title: "On Leave", value: "2", icon: Calendar, color: "text-blue-600", bgColor: "bg-blue-50", borderColor: "border-blue-200" },
// ];

// const ProfessionalAttendanceSystem = () => {
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [isCheckedIn, setIsCheckedIn] = useState(false);
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterDepartment, setFilterDepartment] = useState("All");
//   const [filterStatus, setFilterStatus] = useState("All");
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
//   // Leave application form state
//   const [leaveForm, setLeaveForm] = useState({
//     type: "Annual Leave",
//     startDate: "",
//     endDate: "",
//     reason: "",
//     days: 1
//   });
  
//   const [showLeaveForm, setShowLeaveForm] = useState(false);

//   // Update current time every minute
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 60000);
    
//     return () => clearInterval(timer);
//   }, []);

//   // Handle check in/out
//   const handleCheckInOut = () => {
//     setIsCheckedIn(!isCheckedIn);
//   };

//   // Handle leave form submission
//   const handleLeaveSubmit = (e) => {
//     e.preventDefault();
//     console.log("Leave application submitted:", leaveForm);
//     setLeaveForm({ type: "Annual Leave", startDate: "", endDate: "", reason: "", days: 1 });
//     setShowLeaveForm(false);
//     // In real app, send to backend
//   };

//   // Format time for display
//   const formatTime = (date) => {
//     return date.toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true
//     });
//   };

//   // Filter attendance data
//   const filteredAttendance = attendanceData.filter(employee => {
//     const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                           employee.department.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesDepartment = filterDepartment === "All" || employee.department === filterDepartment;
//     const matchesStatus = filterStatus === "All" || employee.status === filterStatus;
    
//     return matchesSearch && matchesDepartment && matchesStatus;
//   });

//   // Navigation items
//   const navigationItems = [
//     { id: "dashboard", label: "Dashboard", icon: Home },
//     { id: "profile", label: "My Profile", icon: User },
//     { id: "attendance", label: "Attendance", icon: UserCheck },
//     { id: "leave", label: "Leave Management", icon: CalendarDays },
//     { id: "payslips", label: "Payslips", icon: Receipt },
//   ];

//   // Render Dashboard
//   const renderDashboard = () => (
//     <div className="space-y-6">
//       {/* Welcome Section */}
//       <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
//         <div className="flex items-center justify-between">
//           <div>
//             <h2 className="text-2xl font-bold mb-2">Welcome back, {currentUser.name}!</h2>
//             <p className="text-blue-100">Today is {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
//             <p className="text-blue-100">Current time: {formatTime(currentTime)}</p>
//           </div>
//           <div className="text-right">
//             <button
//               onClick={handleCheckInOut}
//               className={`px-6 py-3 rounded-lg font-semibold transition-all ${
//                 isCheckedIn
//                   ? "bg-red-500 hover:bg-red-600 text-white"
//                   : "bg-white text-blue-600 hover:bg-gray-50"
//               }`}
//             >
//               {isCheckedIn ? "Check Out" : "Check In"}
//             </button>
//             <p className="text-sm text-blue-100 mt-2">
//               {isCheckedIn
//                 ? `Checked in at ${formatTime(new Date(currentTime.getTime() - 30 * 60000))}`
//                 : "Not checked in yet"}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {attendanceStats.map((stat, index) => (
//           <div key={index} className={`bg-white rounded-xl p-6 shadow-sm border ${stat.borderColor}`}>
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
//                 <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
//                 <p className="text-xs text-gray-500 mt-1">out of 52 employees</p>
//               </div>
//               <div className={`p-3 rounded-full ${stat.bgColor}`}>
//                 <stat.icon className={`h-6 w-6 ${stat.color}`} />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Quick Actions */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <button
//             onClick={() => setActiveTab("leave")}
//             className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
//           >
//             <CalendarDays className="h-5 w-5 text-blue-600 mr-3" />
//             <span className="font-medium text-blue-900">Apply for Leave</span>
//           </button>
//           <button
//             onClick={() => setActiveTab("payslips")}
//             className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
//           >
//             <Receipt className="h-5 w-5 text-green-600 mr-3" />
//             <span className="font-medium text-green-900">Download Payslip</span>
//           </button>
//           <button
//             onClick={() => setActiveTab("profile")}
//             className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
//           >
//             <User className="h-5 w-5 text-purple-600 mr-3" />
//             <span className="font-medium text-purple-900">View Profile</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   // Render Profile
//   const renderProfile = () => (
//     <div className="space-y-6">
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//         <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
//           <h2 className="text-xl font-bold text-white">My Profile</h2>
//         </div>
        
//         <div className="p-6">
//           <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 mb-6">
//             <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
//               <User className="h-12 w-12 text-gray-400" />
//             </div>
//             <div className="flex-1">
//               <h3 className="text-2xl font-bold text-gray-900">{currentUser.name}</h3>
//               <p className="text-gray-600">{currentUser.position}</p>
//               <p className="text-sm text-gray-500">Employee ID: {currentUser.employeeId}</p>
//             </div>
//             <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
//               <Edit3 className="h-4 w-4 mr-2" />
//               Edit Profile
//             </button>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-4">
//               <div>
//                 <label className="text-sm font-medium text-gray-500">Email</label>
//                 <div className="flex items-center mt-1">
//                   <Mail className="h-4 w-4 text-gray-400 mr-2" />
//                   <span className="text-gray-900">{currentUser.email}</span>
//                 </div>
//               </div>
              
//               <div>
//                 <label className="text-sm font-medium text-gray-500">Phone</label>
//                 <div className="flex items-center mt-1">
//                   <Phone className="h-4 w-4 text-gray-400 mr-2" />
//                   <span className="text-gray-900">{currentUser.phone}</span>
//                 </div>
//               </div>
              
//               <div>
//                 <label className="text-sm font-medium text-gray-500">Department</label>
//                 <div className="flex items-center mt-1">
//                   <Building className="h-4 w-4 text-gray-400 mr-2" />
//                   <span className="text-gray-900">{currentUser.department}</span>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="text-sm font-medium text-gray-500">Joining Date</label>
//                 <div className="flex items-center mt-1">
//                   <Calendar className="h-4 w-4 text-gray-400 mr-2" />
//                   <span className="text-gray-900">{new Date(currentUser.joiningDate).toLocaleDateString()}</span>
//                 </div>
//               </div>
              
//               <div>
//                 <label className="text-sm font-medium text-gray-500">Reporting Manager</label>
//                 <div className="flex items-center mt-1">
//                   <Users className="h-4 w-4 text-gray-400 mr-2" />
//                   <span className="text-gray-900">{currentUser.reportingManager}</span>
//                 </div>
//               </div>
              
//               <div>
//                 <label className="text-sm font-medium text-gray-500">Work Location</label>
//                 <div className="flex items-center mt-1">
//                   <MapPin className="h-4 w-4 text-gray-400 mr-2" />
//                   <span className="text-gray-900">{currentUser.workLocation}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   // Render Attendance
//   const renderAttendance = () => (
//     <div className="space-y-6">
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//         <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//           <h2 className="text-xl font-bold text-gray-900">Attendance Records</h2>
//           <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
//             <Download className="h-4 w-4 mr-2" />
//             Export Data
//           </button>
//         </div>
        
//         <div className="p-6">
//           {/* Filters */}
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//             <div className="relative w-full md:w-64">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//               <input
//                 type="text"
//                 placeholder="Search employees..."
//                 className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
            
//             <div className="flex flex-wrap gap-3">
//               <select
//                 className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 value={filterDepartment}
//                 onChange={(e) => setFilterDepartment(e.target.value)}
//               >
//                 <option value="All">All Departments</option>
//                 <option value="Engineering">Engineering</option>
//                 <option value="HR">HR</option>
//                 <option value="Finance">Finance</option>
//                 <option value="Marketing">Marketing</option>
//                 <option value="Sales">Sales</option>
//               </select>
              
//               <select
//                 className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 value={filterStatus}
//                 onChange={(e) => setFilterStatus(e.target.value)}
//               >
//                 <option value="All">All Status</option>
//                 <option value="Present">Present</option>
//                 <option value="Absent">Absent</option>
//                 <option value="Late">Late</option>
//               </select>
              
//               <input
//                 type="date"
//                 className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 value={selectedDate}
//                 onChange={(e) => setSelectedDate(e.target.value)}
//               />
//             </div>
//           </div>
          
//           {/* Attendance Table */}
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filteredAttendance.map((employee) => (
//                   <tr key={employee.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-gray-900">{employee.name}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-500">{employee.department}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">{employee.checkIn}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">{employee.checkOut}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">{employee.hours}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                         employee.status === "Present" ? "bg-green-100 text-green-800" :
//                         employee.status === "Late" ? "bg-yellow-100 text-yellow-800" :
//                         "bg-red-100 text-red-800"
//                       }`}>
//                         {employee.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   // Render Leave Management
//   const renderLeave = () => (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold text-gray-900">Leave Management</h2>
//         <button
//           onClick={() => setShowLeaveForm(true)}
//           className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           <Plus className="h-4 w-4 mr-2" />
//           Apply for Leave
//         </button>
//       </div>

//       {/* Leave Balance Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Annual Leave</p>
//               <p className="text-2xl font-bold text-gray-900">18</p>
//               <p className="text-xs text-gray-500">Available days</p>
//             </div>
//             <Calendar className="h-8 w-8 text-blue-600" />
//           </div>
//         </div>
        
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Sick Leave</p>
//               <p className="text-2xl font-bold text-gray-900">10</p>
//               <p className="text-xs text-gray-500">Available days</p>
//             </div>
//             <AlertTriangle className="h-8 w-8 text-red-600" />
//           </div>
//         </div>
        
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Personal Leave</p>
//               <p className="text-2xl font-bold text-gray-900">5</p>
//               <p className="text-xs text-gray-500">Available days</p>
//             </div>
//             <User className="h-8 w-8 text-green-600" />
//           </div>
//         </div>
//       </div>

//       {/* Leave Applications */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//         <div className="px-6 py-4 border-b border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-900">My Leave Applications</h3>
//         </div>
//         <div className="p-6">
//           <div className="space-y-4">
//             {leaveData.map((leave) => (
//               <div key={leave.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h4 className="font-medium text-gray-900">{leave.type}</h4>
//                     <p className="text-sm text-gray-600 mt-1">{leave.reason}</p>
//                     <p className="text-sm text-gray-500 mt-1">
//                       {leave.startDate} to {leave.endDate} ({leave.days} day{leave.days > 1 ? 's' : ''})
//                     </p>
//                   </div>
//                   <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
//                     leave.status === "Approved" ? "bg-green-100 text-green-800" :
//                     leave.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
//                     "bg-red-100 text-red-800"
//                   }`}>
//                     {leave.status}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Leave Application Modal */}
//       {showLeaveForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-xl max-w-md w-full p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold text-gray-900">Apply for Leave</h3>
//               <button
//                 onClick={() => setShowLeaveForm(false)}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>
            
//             <form onSubmit={handleLeaveSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
//                 <select
//                   className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   value={leaveForm.type}
//                   onChange={(e) => setLeaveForm({...leaveForm, type: e.target.value})}
//                 >
//                   <option value="Annual Leave">Annual Leave</option>
//                   <option value="Sick Leave">Sick Leave</option>
//                   <option value="Personal Leave">Personal Leave</option>
//                   <option value="Emergency Leave">Emergency Leave</option>
//                 </select>
//               </div>
              
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
//                   <input
//                     type="date"
//                     className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     value={leaveForm.startDate}
//                     onChange={(e) => setLeaveForm({...leaveForm, startDate: e.target.value})}
//                     required
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
//                   <input
//                     type="date"
//                     className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     value={leaveForm.endDate}
//                     onChange={(e) => setLeaveForm({...leaveForm, endDate: e.target.value})}
//                     required
//                   />
//                 </div>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
//                 <textarea
//                   className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   rows="3"
//                   placeholder="Please provide reason for leave..."
//                   value={leaveForm.reason}
//                   onChange={(e) => setLeaveForm({...leaveForm, reason: e.target.value})}
//                   required
//                 />
//               </div>
              
//               <div className="flex justify-end space-x-3 pt-4">
//                 <button
//                   type="button"
//                   onClick={() => setShowLeaveForm(false)}
//                   className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                   Submit Application
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
    
//   );

//   // Render Payslips
//   const renderPayslips = () => (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold text-gray-900">Payslips</h2>
//         <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
//           <Download className="h-4 w-4 mr-2" />
//           Download All
//         </button>
//       </div>

//       {/* Payslip Cards */}
//       <div className="grid gap-6">
//         {payslipData.map((payslip) => (
//           <div key={payslip.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <div className="flex justify-between items-start mb-4">
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900">{payslip.month}</h3>
//                 <p className="text-sm text-gray-600">Employee: {currentUser.name}</p>
//                 <p className="text-sm text-gray-600">Employee ID: {currentUser.employeeId}</p>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
//                   payslip.status === "Processed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
//                 }`}>
//                   {payslip.status}
//                 </span>
//                 <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
//                   <Download className="h-4 w-4 mr-1" />
//                   Download
//                 </button>
//               </div>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//               <div className="bg-blue-50 rounded-lg p-4">
//                 <p className="text-sm font-medium text-blue-600">Basic Salary</p>
//                 <p className="text-xl font-bold text-blue-900">₹{payslip.basicSalary.toLocaleString()}</p>
//               </div>
              
//               <div className="bg-green-50 rounded-lg p-4">
//                 <p className="text-sm font-medium text-green-600">Allowances</p>
//                 <p className="text-xl font-bold text-green-900">₹{payslip.allowances.toLocaleString()}</p>
//               </div>
              
//               <div className="bg-red-50 rounded-lg p-4">
//                 <p className="text-sm font-medium text-red-600">Deductions</p>
//                 <p className="text-xl font-bold text-red-900">₹{payslip.deductions.toLocaleString()}</p>
//               </div>
              
//               <div className="bg-purple-50 rounded-lg p-4">
//                 <p className="text-sm font-medium text-purple-600">Net Salary</p>
//                 <p className="text-xl font-bold text-purple-900">₹{payslip.netSalary.toLocaleString()}</p>
//               </div>
//             </div>
            
//             <div className="mt-4 pt-4 border-t border-gray-200">
//               <div className="flex justify-between items-center">
//                 <p className="text-sm text-gray-600">
//                   Gross Salary: ₹{(payslip.basicSalary + payslip.allowances).toLocaleString()}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   Tax Deducted: ₹{Math.floor(payslip.deductions * 0.8).toLocaleString()}
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Mobile Header */}
//       <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
//         <h1 className="text-xl font-bold text-gray-900">HR Portal</h1>
//         <button
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           className="p-2 text-gray-600 hover:text-gray-900"
//         >
//           <Menu className="h-6 w-6" />
//         </button>
//       </div>

//       <div className="flex">
//         {/* Sidebar */}
//         <div className={`${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out`}>
//           <div className="flex flex-col h-full">
//             {/* Logo */}
//             <div className="flex items-center justify-center h-16 border-b border-gray-200">
//               <h1 className="text-xl font-bold text-gray-900">HR Portal</h1>
//             </div>
            
//             {/* Navigation */}
//             <nav className="flex-1 px-4 py-6 space-y-2">
//               {navigationItems.map((item) => (
//                 <button
//                   key={item.id}
//                   onClick={() => {
//                     setActiveTab(item.id);
//                     setIsMobileMenuOpen(false);
//                   }}
//                   className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
//                     activeTab === item.id
//                       ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
//                       : "text-gray-700 hover:bg-gray-50"
//                   }`}
//                 >
//                   <item.icon className="h-5 w-5 mr-3" />
//                   {item.label}
//                 </button>
//               ))}
//             </nav>
            
//             {/* User Info */}
//             <div className="p-4 border-t border-gray-200">
//               <div className="flex items-center">
//                 <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
//                   <User className="h-6 w-6 text-gray-400" />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-medium text-gray-900 truncate">{currentUser.name}</p>
//                   <p className="text-xs text-gray-500 truncate">{currentUser.department}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Overlay */}
//         {isMobileMenuOpen && (
//           <div
//             className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
//             onClick={() => setIsMobileMenuOpen(false)}
//           />
//         )}

//         {/* Main Content */}
//         <div className="flex-1 lg:ml-0">
//           <main className="p-6">
//             {activeTab === "dashboard" && renderDashboard()}
//             {activeTab === "profile" && renderProfile()}
//             {activeTab === "attendance" && renderAttendance()}
//             {activeTab === "leave" && renderLeave()}
//             {activeTab === "payslips" && renderPayslips()}
//           </main>
//         </div>
//       </div>
//     </div>
//   )};

// export default ProfessionalAttendanceSystem;
 
 
 
 "use client"

import { useState } from "react"
import {
  Search,
  Menu,
  X,
  Plus,
  Eye,
  Edit,
  Trash2,
  Filter,
  Download,
  RefreshCw,
  Clock,
  Calendar,
  Users,
  CheckCircle,
  AlertTriangle,
  UserCheck,
  UserX,
  Timer,
  CalendarDays,
  FileText,
  Settings,
  MapPin,
  Wifi,
  WifiOff,
  BarChart3,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for employees
const initialEmployees = [
  {
    id: 1,
    name: "Rahul Sharma",
    employeeId: "EMP001",
    department: "Engineering",
    position: "Senior Software Engineer",
    email: "rahul.sharma@company.com",
    phone: "+91 98765 43210",
    shift: "Day Shift (9:00 AM - 6:00 PM)",
    manager: "Priya Patel",
    joiningDate: "2022-01-15",
    status: "Active",
    profileImage: "/api/placeholder/40/40",
  },
  {
    id: 2,
    name: "Priya Patel",
    employeeId: "EMP002",
    department: "HR",
    position: "HR Manager",
    email: "priya.patel@company.com",
    phone: "+91 98765 43211",
    shift: "Day Shift (9:00 AM - 6:00 PM)",
    manager: "CEO",
    joiningDate: "2021-03-10",
    status: "Active",
    profileImage: "/api/placeholder/40/40",
  },
  {
    id: 3,
    name: "Amit Kumar",
    employeeId: "EMP003",
    department: "Finance",
    position: "Finance Executive",
    email: "amit.kumar@company.com",
    phone: "+91 98765 43212",
    shift: "Day Shift (9:00 AM - 6:00 PM)",
    manager: "Finance Head",
    joiningDate: "2022-06-20",
    status: "Active",
    profileImage: "/api/placeholder/40/40",
  },
  {
    id: 4,
    name: "Sneha Reddy",
    employeeId: "EMP004",
    department: "Marketing",
    position: "Marketing Specialist",
    email: "sneha.reddy@company.com",
    phone: "+91 98765 43213",
    shift: "Day Shift (9:00 AM - 6:00 PM)",
    manager: "Marketing Head",
    joiningDate: "2023-01-15",
    status: "Active",
    profileImage: "/api/placeholder/40/40",
  },
  {
    id: 5,
    name: "Vikram Singh",
    employeeId: "EMP005",
    department: "Sales",
    position: "Sales Executive",
    email: "vikram.singh@company.com",
    phone: "+91 98765 43214",
    shift: "Day Shift (9:00 AM - 6:00 PM)",
    manager: "Sales Head",
    joiningDate: "2022-11-01",
    status: "Active",
    profileImage: "/api/placeholder/40/40",
  },
  {
    id: 6,
    name: "Neha Gupta",
    employeeId: "EMP006",
    department: "Customer Support",
    position: "Support Executive",
    email: "neha.gupta@company.com",
    phone: "+91 98765 43215",
    shift: "Night Shift (10:00 PM - 7:00 AM)",
    manager: "Support Head",
    joiningDate: "2023-03-01",
    status: "Active",
    profileImage: "/api/placeholder/40/40",
  },
]

// Mock attendance data
const initialAttendanceData = [
  {
    id: 1,
    employeeId: "EMP001",
    name: "Rahul Sharma",
    department: "Engineering",
    date: "2024-01-20",
    checkIn: "09:02 AM",
    checkOut: "06:15 PM",
    status: "Present",
    hours: "9h 13m",
    location: "Office",
    device: "Biometric",
    lateBy: "2 min",
    overtime: "15 min",
  },
  {
    id: 2,
    employeeId: "EMP002",
    name: "Priya Patel",
    department: "HR",
    date: "2024-01-20",
    checkIn: "09:15 AM",
    checkOut: "06:00 PM",
    status: "Present",
    hours: "8h 45m",
    location: "Office",
    device: "Biometric",
    lateBy: "15 min",
    overtime: "0 min",
  },
  {
    id: 3,
    employeeId: "EMP003",
    name: "Amit Kumar",
    department: "Finance",
    date: "2024-01-20",
    checkIn: "09:30 AM",
    checkOut: "05:45 PM",
    status: "Present",
    hours: "8h 15m",
    location: "Office",
    device: "Manual",
    lateBy: "30 min",
    overtime: "0 min",
  },
  {
    id: 4,
    employeeId: "EMP004",
    name: "Sneha Reddy",
    department: "Marketing",
    date: "2024-01-20",
    checkIn: "10:05 AM",
    checkOut: "06:30 PM",
    status: "Late",
    hours: "8h 25m",
    location: "Office",
    device: "Biometric",
    lateBy: "1h 5min",
    overtime: "30 min",
  },
  {
    id: 5,
    employeeId: "EMP005",
    name: "Vikram Singh",
    department: "Sales",
    date: "2024-01-20",
    checkIn: "08:55 AM",
    checkOut: "06:10 PM",
    status: "Present",
    hours: "9h 15m",
    location: "Field",
    device: "Mobile App",
    lateBy: "0 min",
    overtime: "10 min",
  },
  {
    id: 6,
    employeeId: "EMP006",
    name: "Neha Gupta",
    department: "Customer Support",
    date: "2024-01-20",
    checkIn: "--:--",
    checkOut: "--:--",
    status: "Absent",
    hours: "--",
    location: "--",
    device: "--",
    lateBy: "--",
    overtime: "--",
  },
]

// Mock leave applications
const initialLeaveApplications = [
  {
    id: 1,
    employeeId: "EMP001",
    employeeName: "Rahul Sharma",
    department: "Engineering",
    leaveType: "Annual Leave",
    startDate: "2024-02-15",
    endDate: "2024-02-17",
    days: 3,
    reason: "Family vacation",
    status: "Pending",
    appliedDate: "2024-01-15",
    approver: "Priya Patel",
    comments: "",
  },
  {
    id: 2,
    employeeId: "EMP003",
    employeeName: "Amit Kumar",
    department: "Finance",
    leaveType: "Sick Leave",
    startDate: "2024-01-10",
    endDate: "2024-01-10",
    days: 1,
    reason: "Medical checkup",
    status: "Approved",
    appliedDate: "2024-01-08",
    approver: "Finance Head",
    comments: "Approved for medical reasons",
  },
  {
    id: 3,
    employeeId: "EMP004",
    employeeName: "Sneha Reddy",
    department: "Marketing",
    leaveType: "Personal Leave",
    startDate: "2024-03-05",
    endDate: "2024-03-06",
    days: 2,
    reason: "Personal work",
    status: "Rejected",
    appliedDate: "2024-02-20",
    approver: "Marketing Head",
    comments: "Project deadline approaching",
  },
]

// Mock shift data
const initialShifts = [
  {
    id: 1,
    name: "Day Shift",
    startTime: "09:00",
    endTime: "18:00",
    breakDuration: "60",
    description: "Regular day shift",
    isActive: true,
  },
  {
    id: 2,
    name: "Night Shift",
    startTime: "22:00",
    endTime: "07:00",
    breakDuration: "60",
    description: "Night shift for support team",
    isActive: true,
  },
  {
    id: 3,
    name: "Flexible Shift",
    startTime: "10:00",
    endTime: "19:00",
    breakDuration: "60",
    description: "Flexible timing for senior employees",
    isActive: true,
  },
]

// Mock holiday calendar
const initialHolidays = [
  {
    id: 1,
    name: "New Year's Day",
    date: "2024-01-01",
    type: "National Holiday",
    description: "New Year celebration",
  },
  {
    id: 2,
    name: "Republic Day",
    date: "2024-01-26",
    type: "National Holiday",
    description: "Republic Day of India",
  },
  {
    id: 3,
    name: "Holi",
    date: "2024-03-25",
    type: "Festival",
    description: "Festival of colors",
  },
  {
    id: 4,
    name: "Good Friday",
    date: "2024-03-29",
    type: "Religious Holiday",
    description: "Christian holiday",
  },
  {
    id: 5,
    name: "Independence Day",
    date: "2024-08-15",
    type: "National Holiday",
    description: "Independence Day of India",
  },
]

export default function AttendanceManagement() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [employees, setEmployees] = useState(initialEmployees)
  const [attendanceData, setAttendanceData] = useState(initialAttendanceData)
  const [leaveApplications, setLeaveApplications] = useState(initialLeaveApplications)
  const [shifts, setShifts] = useState(initialShifts)
  const [holidays, setHolidays] = useState(initialHolidays)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDepartment, setFilterDepartment] = useState("All")
  const [filterStatus, setFilterStatus] = useState("All")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Modal states
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false)
  const [isEditEmployeeOpen, setIsEditEmployeeOpen] = useState(false)
  const [isAddShiftOpen, setIsAddShiftOpen] = useState(false)
  const [isAddHolidayOpen, setIsAddHolidayOpen] = useState(false)
  const [isLeaveApprovalOpen, setIsLeaveApprovalOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [selectedLeave, setSelectedLeave] = useState(null)

  // Form states
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    employeeId: "",
    department: "Engineering",
    position: "",
    email: "",
    phone: "",
    shift: "Day Shift (9:00 AM - 6:00 PM)",
    manager: "",
    joiningDate: "",
    status: "Active",
  })

  const [newShift, setNewShift] = useState({
    name: "",
    startTime: "",
    endTime: "",
    breakDuration: "60",
    description: "",
    isActive: true,
  })

  const [newHoliday, setNewHoliday] = useState({
    name: "",
    date: "",
    type: "National Holiday",
    description: "",
  })

  // Get unique departments
  const departments = [...new Set(employees.map((emp) => emp.department))]

  // Filter attendance data
  const filteredAttendance = attendanceData.filter((record) => {
    const matchesSearch =
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = filterDepartment === "All" || record.department === filterDepartment
    const matchesStatus = filterStatus === "All" || record.status === filterStatus
    const matchesDate = record.date === selectedDate

    return matchesSearch && matchesDepartment && matchesStatus && matchesDate
  })

  // Calculate attendance statistics
  const attendanceStats = {
    totalEmployees: employees.length,
    presentToday: attendanceData.filter((record) => record.status === "Present" && record.date === selectedDate).length,
    absentToday: attendanceData.filter((record) => record.status === "Absent" && record.date === selectedDate).length,
    lateToday: attendanceData.filter((record) => record.status === "Late" && record.date === selectedDate).length,
    onLeaveToday: leaveApplications.filter(
      (leave) =>
        leave.status === "Approved" &&
        new Date(leave.startDate) <= new Date(selectedDate) &&
        new Date(leave.endDate) >= new Date(selectedDate),
    ).length,
    pendingLeaves: leaveApplications.filter((leave) => leave.status === "Pending").length,
  }

  // Handle employee operations
  const handleAddEmployee = () => {
    const id = employees.length > 0 ? Math.max(...employees.map((e) => e.id)) + 1 : 1
    const employeeToAdd = {
      ...newEmployee,
      id,
      profileImage: "/api/placeholder/40/40",
    }

    setEmployees([...employees, employeeToAdd])
    setIsAddEmployeeOpen(false)
    setNewEmployee({
      name: "",
      employeeId: "",
      department: "Engineering",
      position: "",
      email: "",
      phone: "",
      shift: "Day Shift (9:00 AM - 6:00 PM)",
      manager: "",
      joiningDate: "",
      status: "Active",
    })
  }

  const handleEditEmployee = () => {
    const updatedEmployees = employees.map((emp) => (emp.id === selectedEmployee.id ? selectedEmployee : emp))
    setEmployees(updatedEmployees)
    setIsEditEmployeeOpen(false)
    setSelectedEmployee(null)
  }

  const handleDeleteEmployee = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter((emp) => emp.id !== id))
    }
  }

  // Handle shift operations
  const handleAddShift = () => {
    const id = shifts.length > 0 ? Math.max(...shifts.map((s) => s.id)) + 1 : 1
    const shiftToAdd = {
      ...newShift,
      id,
    }

    setShifts([...shifts, shiftToAdd])
    setIsAddShiftOpen(false)
    setNewShift({
      name: "",
      startTime: "",
      endTime: "",
      breakDuration: "60",
      description: "",
      isActive: true,
    })
  }

  // Handle holiday operations
  const handleAddHoliday = () => {
    const id = holidays.length > 0 ? Math.max(...holidays.map((h) => h.id)) + 1 : 1
    const holidayToAdd = {
      ...newHoliday,
      id,
    }

    setHolidays([...holidays, holidayToAdd])
    setIsAddHolidayOpen(false)
    setNewHoliday({
      name: "",
      date: "",
      type: "National Holiday",
      description: "",
    })
  }

  // Handle leave approval
  const handleLeaveApproval = (action) => {
    const updatedLeaves = leaveApplications.map((leave) =>
      leave.id === selectedLeave.id
        ? { ...leave, status: action, comments: action === "Approved" ? "Approved by manager" : "Rejected by manager" }
        : leave,
    )
    setLeaveApplications(updatedLeaves)
    setIsLeaveApprovalOpen(false)
    setSelectedLeave(null)
  }

  // Export functions
  const handleExportAttendance = () => {
    const headers = [
      "Employee ID",
      "Name",
      "Department",
      "Date",
      "Check In",
      "Check Out",
      "Hours",
      "Status",
      "Location",
    ]
    const csvContent = [
      headers.join(","),
      ...filteredAttendance.map((record) =>
        [
          record.employeeId,
          record.name,
          record.department,
          record.date,
          record.checkIn,
          record.checkOut,
          record.hours,
          record.status,
          record.location,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `attendance_${selectedDate}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Navigation tabs
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: <BarChart3 size={18} /> },
    { id: "attendance", label: "Daily Attendance", icon: <UserCheck size={18} /> },
    { id: "employees", label: "Employee Master", icon: <Users size={18} /> },
    { id: "shifts", label: "Shift Management", icon: <Clock size={18} /> },
    { id: "leaves", label: "Leave Management", icon: <CalendarDays size={18} /> },
    { id: "holidays", label: "Holiday Calendar", icon: <Calendar size={18} /> },
    { id: "reports", label: "Reports & Analytics", icon: <TrendingUp size={18} /> },
    { id: "settings", label: "Settings", icon: <Settings size={18} /> },
  ]

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-primary">Attendance & Leave Management</h1>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Search and controls */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <Search
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search employees..."
                  className="pl-8 pr-4 py-1 rounded-md bg-input border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="font-semibold text-primary-foreground">A</span>
              </div>
            </div>
          </div>

          {/* Navigation tabs */}
          <div className="flex space-x-1 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 overflow-auto p-4 md:p-6">
        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{attendanceStats.totalEmployees}</div>
                  <p className="text-xs text-muted-foreground">Active employees</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Present Today</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{attendanceStats.presentToday}</div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((attendanceStats.presentToday / attendanceStats.totalEmployees) * 100)}% attendance
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Absent Today</CardTitle>
                  <UserX className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{attendanceStats.absentToday}</div>
                  <p className="text-xs text-muted-foreground">Unauthorized absence</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Late Arrivals</CardTitle>
                  <Timer className="h-4 w-4 text-amber-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-600">{attendanceStats.lateToday}</div>
                  <p className="text-xs text-muted-foreground">Late check-ins</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">On Leave</CardTitle>
                  <CalendarDays className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{attendanceStats.onLeaveToday}</div>
                  <p className="text-xs text-muted-foreground">Approved leaves</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Leaves</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">{attendanceStats.pendingLeaves}</div>
                  <p className="text-xs text-muted-foreground">Awaiting approval</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col gap-2"
                    onClick={() => setActiveTab("attendance")}
                  >
                    <UserCheck className="h-6 w-6" />
                    <span>Mark Attendance</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => setActiveTab("leaves")}>
                    <CalendarDays className="h-6 w-6" />
                    <span>Approve Leaves</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col gap-2"
                    onClick={() => setActiveTab("employees")}
                  >
                    <Users className="h-6 w-6" />
                    <span>Manage Employees</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col gap-2"
                    onClick={() => setActiveTab("reports")}
                  >
                    <BarChart3 className="h-6 w-6" />
                    <span>View Reports</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Rahul Sharma checked in</p>
                      <p className="text-sm text-muted-foreground">9:02 AM - Engineering Department</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <CalendarDays className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Leave application submitted</p>
                      <p className="text-sm text-muted-foreground">Amit Kumar - Sick Leave for 1 day</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                    <Timer className="h-5 w-5 text-amber-600" />
                    <div>
                      <p className="font-medium">Late arrival alert</p>
                      <p className="text-sm text-muted-foreground">Sneha Reddy - 1 hour 5 minutes late</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Daily Attendance */}
        {activeTab === "attendance" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <h2 className="text-2xl font-bold">Daily Attendance</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" onClick={handleExportAttendance}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="default" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Sync Biometric
                </Button>
              </div>
            </div>

            {/* Filters */}
            {isFilterOpen && (
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Date</label>
                      <input
                        type="date"
                        className="w-full p-2 rounded-md border border-input bg-background"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Department</label>
                      <select
                        className="w-full p-2 rounded-md border border-input bg-background"
                        value={filterDepartment}
                        onChange={(e) => setFilterDepartment(e.target.value)}
                      >
                        <option value="All">All Departments</option>
                        {departments.map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Status</label>
                      <select
                        className="w-full p-2 rounded-md border border-input bg-background"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                      >
                        <option value="All">All Status</option>
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                        <option value="Late">Late</option>
                      </select>
                    </div>
                    <div className="flex items-end">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setFilterDepartment("All")
                          setFilterStatus("All")
                          setSearchTerm("")
                        }}
                      >
                        Reset Filters
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <input
                type="text"
                placeholder="Search by employee name or ID..."
                className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Attendance Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium">Employee</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Department</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Check In</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Check Out</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Hours</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Location</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredAttendance.map((record) => (
                        <tr key={record.id} className="hover:bg-accent/50">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium">
                                  {record.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </span>
                              </div>
                              <div>
                                <div className="font-medium">{record.name}</div>
                                <div className="text-sm text-muted-foreground">{record.employeeId}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">{record.department}</td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex items-center gap-1">
                              {record.checkIn}
                              {record.lateBy !== "0 min" && record.lateBy !== "--" && (
                                <Badge variant="destructive" className="text-xs">
                                  +{record.lateBy}
                                </Badge>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">{record.checkOut}</td>
                          <td className="px-4 py-3 text-sm">{record.hours}</td>
                          <td className="px-4 py-3">
                            <Badge
                              variant={
                                record.status === "Present"
                                  ? "default"
                                  : record.status === "Late"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {record.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex items-center gap-1">
                              {record.location === "Office" ? (
                                <Wifi className="h-3 w-3 text-green-600" />
                              ) : record.location === "Field" ? (
                                <MapPin className="h-3 w-3 text-blue-600" />
                              ) : (
                                <WifiOff className="h-3 w-3 text-gray-400" />
                              )}
                              {record.location}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Employee Master */}
        {activeTab === "employees" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <h2 className="text-2xl font-bold">Employee Master</h2>
              <Button onClick={() => setIsAddEmployeeOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Employee
              </Button>
            </div>

            {/* Employee Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {employees.map((employee) => (
                <Card key={employee.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                          <span className="font-medium">
                            {employee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold">{employee.name}</h3>
                          <p className="text-sm text-muted-foreground">{employee.employeeId}</p>
                        </div>
                      </div>
                      <Badge variant={employee.status === "Active" ? "default" : "secondary"}>{employee.status}</Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Department:</span>
                        <span>{employee.department}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Position:</span>
                        <span>{employee.position}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Manager:</span>
                        <span>{employee.manager}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          setSelectedEmployee(employee)
                          setIsEditEmployeeOpen(true)
                        }}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteEmployee(employee.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Add Employee Modal */}
            {isAddEmployeeOpen && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="bg-card border border-border rounded-lg p-6 shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Add New Employee</h3>
                    <Button variant="ghost" size="icon" onClick={() => setIsAddEmployeeOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Full Name</label>
                      <input
                        type="text"
                        className="w-full p-2 rounded-md border border-input bg-background"
                        value={newEmployee.name}
                        onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Employee ID</label>
                      <input
                        type="text"
                        className="w-full p-2 rounded-md border border-input bg-background"
                        value={newEmployee.employeeId}
                        onChange={(e) => setNewEmployee({ ...newEmployee, employeeId: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Department</label>
                      <select
                        className="w-full p-2 rounded-md border border-input bg-background"
                        value={newEmployee.department}
                        onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
                      >
                        <option value="Engineering">Engineering</option>
                        <option value="HR">HR</option>
                        <option value="Finance">Finance</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Sales">Sales</option>
                        <option value="Customer Support">Customer Support</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Position</label>
                      <input
                        type="text"
                        className="w-full p-2 rounded-md border border-input bg-background"
                        value={newEmployee.position}
                        onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        className="w-full p-2 rounded-md border border-input bg-background"
                        value={newEmployee.email}
                        onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone</label>
                      <input
                        type="tel"
                        className="w-full p-2 rounded-md border border-input bg-background"
                        value={newEmployee.phone}
                        onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Reporting Manager</label>
                      <input
                        type="text"
                        className="w-full p-2 rounded-md border border-input bg-background"
                        value={newEmployee.manager}
                        onChange={(e) => setNewEmployee({ ...newEmployee, manager: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Joining Date</label>
                      <input
                        type="date"
                        className="w-full p-2 rounded-md border border-input bg-background"
                        value={newEmployee.joiningDate}
                        onChange={(e) => setNewEmployee({ ...newEmployee, joiningDate: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 mt-6">
                    <Button variant="outline" onClick={() => setIsAddEmployeeOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddEmployee}>Add Employee</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Leave Management */}
        {activeTab === "leaves" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <h2 className="text-2xl font-bold">Leave Management</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* Leave Applications */}
            <Card>
              <CardHeader>
                <CardTitle>Leave Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaveApplications.map((leave) => (
                    <div key={leave.id} className="border border-border rounded-lg p-4">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium">
                                {leave.employeeName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-semibold">{leave.employeeName}</h4>
                              <p className="text-sm text-muted-foreground">{leave.department}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">Type: </span>
                              <span className="font-medium">{leave.leaveType}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Duration: </span>
                              <span className="font-medium">
                                {leave.startDate} to {leave.endDate}
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Days: </span>
                              <span className="font-medium">
                                {leave.days} day{leave.days > 1 ? "s" : ""}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm mt-2">
                            <span className="text-muted-foreground">Reason: </span>
                            {leave.reason}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <Badge
                            variant={
                              leave.status === "Approved"
                                ? "default"
                                : leave.status === "Pending"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {leave.status}
                          </Badge>

                          {leave.status === "Pending" && (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="default"
                                onClick={() => {
                                  setSelectedLeave(leave)
                                  handleLeaveApproval("Approved")
                                }}
                              >
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => {
                                  setSelectedLeave(leave)
                                  handleLeaveApproval("Rejected")
                                }}
                              >
                                Reject
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Holiday Calendar */}
        {activeTab === "holidays" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <h2 className="text-2xl font-bold">Holiday Calendar</h2>
              <Button onClick={() => setIsAddHolidayOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Holiday
              </Button>
            </div>

            {/* Holiday List */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium">Holiday Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Description</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {holidays.map((holiday) => (
                        <tr key={holiday.id} className="hover:bg-accent/50">
                          <td className="px-4 py-3 font-medium">{holiday.name}</td>
                          <td className="px-4 py-3">{new Date(holiday.date).toLocaleDateString()}</td>
                          <td className="px-4 py-3">
                            <Badge variant="outline">{holiday.type}</Badge>
                          </td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">{holiday.description}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Add Holiday Modal */}
            {isAddHolidayOpen && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="bg-card border border-border rounded-lg p-6 shadow-lg max-w-md w-full">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Add Holiday</h3>
                    <Button variant="ghost" size="icon" onClick={() => setIsAddHolidayOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Holiday Name</label>
                      <input
                        type="text"
                        className="w-full p-2 rounded-md border border-input bg-background"
                        value={newHoliday.name}
                        onChange={(e) => setNewHoliday({ ...newHoliday, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Date</label>
                      <input
                        type="date"
                        className="w-full p-2 rounded-md border border-input bg-background"
                        value={newHoliday.date}
                        onChange={(e) => setNewHoliday({ ...newHoliday, date: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Type</label>
                      <select
                        className="w-full p-2 rounded-md border border-input bg-background"
                        value={newHoliday.type}
                        onChange={(e) => setNewHoliday({ ...newHoliday, type: e.target.value })}
                      >
                        <option value="National Holiday">National Holiday</option>
                        <option value="Festival">Festival</option>
                        <option value="Religious Holiday">Religious Holiday</option>
                        <option value="Company Holiday">Company Holiday</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Description</label>
                      <textarea
                        className="w-full p-2 rounded-md border border-input bg-background"
                        rows={3}
                        value={newHoliday.description}
                        onChange={(e) => setNewHoliday({ ...newHoliday, description: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 mt-6">
                    <Button variant="outline" onClick={() => setIsAddHolidayOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddHoliday}>Add Holiday</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Shift Management */}
        {activeTab === "shifts" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <h2 className="text-2xl font-bold">Shift Management</h2>
              <Button onClick={() => setIsAddShiftOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Shift
              </Button>
            </div>

            {/* Shift Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {shifts.map((shift) => (
                <Card key={shift.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{shift.name}</h3>
                        <p className="text-sm text-muted-foreground">{shift.description}</p>
                      </div>
                      <Badge variant={shift.isActive ? "default" : "secondary"}>
                        {shift.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Start Time:</span>
                        <span>{shift.startTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">End Time:</span>
                        <span>{shift.endTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Break Duration:</span>
                        <span>{shift.breakDuration} min</span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Add Shift Modal */}
            {isAddShiftOpen && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="bg-card border border-border rounded-lg p-6 shadow-lg max-w-md w-full">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Add Shift</h3>
                    <Button variant="ghost" size="icon" onClick={() => setIsAddShiftOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Shift Name</label>
                      <input
                        type="text"
                        className="w-full p-2 rounded-md border border-input bg-background"
                        value={newShift.name}
                        onChange={(e) => setNewShift({ ...newShift, name: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Start Time</label>
                        <input
                          type="time"
                          className="w-full p-2 rounded-md border border-input bg-background"
                          value={newShift.startTime}
                          onChange={(e) => setNewShift({ ...newShift, startTime: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">End Time</label>
                        <input
                          type="time"
                          className="w-full p-2 rounded-md border border-input bg-background"
                          value={newShift.endTime}
                          onChange={(e) => setNewShift({ ...newShift, endTime: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Break Duration (minutes)</label>
                      <input
                        type="number"
                        className="w-full p-2 rounded-md border border-input bg-background"
                        value={newShift.breakDuration}
                        onChange={(e) => setNewShift({ ...newShift, breakDuration: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Description</label>
                      <textarea
                        className="w-full p-2 rounded-md border border-input bg-background"
                        rows={3}
                        value={newShift.description}
                        onChange={(e) => setNewShift({ ...newShift, description: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 mt-6">
                    <Button variant="outline" onClick={() => setIsAddShiftOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddShift}>Add Shift</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Reports & Analytics */}
        {activeTab === "reports" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Reports & Analytics</h2>

            {/* Report Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Attendance</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">94.2%</div>
                  <p className="text-xs text-muted-foreground">+2.1% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Working Hours</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8.5h</div>
                  <p className="text-xs text-muted-foreground">Per employee per day</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Leave Utilization</CardTitle>
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">68%</div>
                  <p className="text-xs text-muted-foreground">Of allocated leaves used</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Late Arrivals</CardTitle>
                  <Timer className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>
            </div>

            {/* Department-wise Attendance */}
            <Card>
              <CardHeader>
                <CardTitle>Department-wise Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departments.map((dept) => {
                    const deptEmployees = employees.filter((emp) => emp.department === dept)
                    const deptAttendance = attendanceData.filter(
                      (record) => record.department === dept && record.status === "Present",
                    )
                    const attendanceRate =
                      deptEmployees.length > 0 ? Math.round((deptAttendance.length / deptEmployees.length) * 100) : 0

                    return (
                      <div key={dept} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-primary rounded-full"></div>
                          <span className="font-medium">{dept}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-32 bg-muted rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: `${attendanceRate}%` }}></div>
                          </div>
                          <span className="text-sm font-medium w-12 text-right">{attendanceRate}%</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Export Options */}
            <Card>
              <CardHeader>
                <CardTitle>Export Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <FileText className="h-6 w-6" />
                    <span>Monthly Report</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <BarChart3 className="h-6 w-6" />
                    <span>Attendance Analytics</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <CalendarDays className="h-6 w-6" />
                    <span>Leave Summary</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Settings */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Attendance Settings</h2>

            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="biometric">Biometric</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="policies">Policies</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Working Days per Week</label>
                        <select className="w-full p-2 rounded-md border border-input bg-background">
                          <option value="5">5 Days</option>
                          <option value="6">6 Days</option>
                          <option value="7">7 Days</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Grace Period (minutes)</label>
                        <input
                          type="number"
                          className="w-full p-2 rounded-md border border-input bg-background"
                          defaultValue="15"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Overtime Threshold (hours)</label>
                        <input
                          type="number"
                          className="w-full p-2 rounded-md border border-input bg-background"
                          defaultValue="8"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Half Day Hours</label>
                        <input
                          type="number"
                          className="w-full p-2 rounded-md border border-input bg-background"
                          defaultValue="4"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="biometric" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Biometric Integration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h4 className="font-medium">Device 1 - Main Entrance</h4>
                        <p className="text-sm text-muted-foreground">IP: 192.168.1.100</p>
                      </div>
                      <Badge variant="default">Connected</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h4 className="font-medium">Device 2 - Back Entrance</h4>
                        <p className="text-sm text-muted-foreground">IP: 192.168.1.101</p>
                      </div>
                      <Badge variant="destructive">Disconnected</Badge>
                    </div>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Device
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Late Arrival Alerts</label>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Absence Notifications</label>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Leave Application Alerts</label>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Overtime Notifications</label>
                        <input type="checkbox" className="rounded" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="policies" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Leave Policies</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Annual Leave Days</label>
                        <input
                          type="number"
                          className="w-full p-2 rounded-md border border-input bg-background"
                          defaultValue="21"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Sick Leave Days</label>
                        <input
                          type="number"
                          className="w-full p-2 rounded-md border border-input bg-background"
                          defaultValue="12"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Personal Leave Days</label>
                        <input
                          type="number"
                          className="w-full p-2 rounded-md border border-input bg-background"
                          defaultValue="5"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  )
}
