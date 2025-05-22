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
  Search
} from "lucide-react";

// Mock data for attendance
const attendanceData = [
  { id: 1, name: "Rahul Sharma", department: "Engineering", checkIn: "09:02 AM", checkOut: "06:15 PM", status: "Present", date: "2023-06-01" },
  { id: 2, name: "Priya Patel", department: "HR", checkIn: "09:15 AM", checkOut: "06:00 PM", status: "Present", date: "2023-06-01" },
  { id: 3, name: "Amit Kumar", department: "Finance", checkIn: "09:30 AM", checkOut: "05:45 PM", status: "Present", date: "2023-06-01" },
  { id: 4, name: "Sneha Reddy", department: "Marketing", checkIn: "10:05 AM", checkOut: "06:30 PM", status: "Late", date: "2023-06-01" },
  { id: 5, name: "Vikram Singh", department: "Sales", checkIn: "08:55 AM", checkOut: "06:10 PM", status: "Present", date: "2023-06-01" },
  { id: 6, name: "Neha Gupta", department: "Customer Support", checkIn: "--:--", checkOut: "--:--", status: "Absent", date: "2023-06-01" },
];

// Mock data for attendance stats
const attendanceStats = [
  { title: "Present Today", value: "42", icon: CheckCircle, color: "text-green-600", bgColor: "bg-green-100" },
  { title: "Absent Today", value: "3", icon: X, color: "text-red-600", bgColor: "bg-red-100" },
  { title: "Late Arrivals", value: "5", icon: Clock, color: "text-amber-600", bgColor: "bg-amber-100" },
  { title: "On Leave", value: "2", icon: Calendar, color: "text-blue-600", bgColor: "bg-blue-100" },
];

const Attend = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentLocation, setCurrentLocation] = useState("Office - Headquarters");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
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
    // In a real app, you would send this data to your backend
  };
  
  // Filter attendance data
  const filteredAttendance = attendanceData.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          employee.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === "All" || employee.department === filterDepartment;
    const matchesStatus = filterStatus === "All" || employee.status === filterStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });
  
  // Get unique departments for filter
  const departments = ["All", ...new Set(attendanceData.map(item => item.department))];
  
  // Format time for display
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="bg-white min-h-screen p-6 text-black">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Attendance Management</h1>
        <p className="text-gray-600">Track and manage employee attendance</p>
      </header>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {attendanceStats.map((stat, index) => (
          <div key={index} className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
            <div className="flex items-center mb-2">
              <div className={`p-2 ${stat.bgColor} rounded-full mr-3`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <span className="text-black font-medium">{stat.title}</span>
            </div>
            <div className="text-2xl font-bold text-black">{stat.value}</div>
            <div className="text-xs text-gray-600 mt-1">out of 52 employees</div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-300 rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-300 flex justify-between items-center">
              <h2 className="font-bold text-black">Today's Attendance</h2>
              <div className="flex items-center">
                <span className="text-gray-600 mr-2">{currentLocation}</span>
                <button
                  onClick={handleCheckInOut}
                  className={`px-4 py-2 rounded-md font-medium ${
                    isCheckedIn
                      ? "bg-white border border-red-500 text-red-500"
                      : "bg-white border border-green-500 text-green-500"
                  }`}
                >
                  {isCheckedIn ? "Check Out" : "Check In"}
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-700">Current Time: {formatTime(currentTime)}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-700">{currentLocation}</span>
                </div>
              </div>
              
              <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">Your Attendance Status</p>
                    <p className="text-gray-600">
                      {isCheckedIn 
                        ? `Checked in at ${formatTime(new Date(currentTime.getTime() - 30 * 60000))}` 
                        : "You have not checked in yet today."}
                    </p>
                  </div>
                  <button
                    onClick={handleCheckInOut}
                    className={`px-4 py-2 rounded-md font-medium ${
                      isCheckedIn
                        ? "bg-red-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {isCheckedIn ? "Check Out" : "Check In"}
                  </button>
                </div>
              </div>
              
              {/* Attendance Table */}
              <div className="mt-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search employees..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <select
                      className="border border-gray-300 rounded-md px-3 py-2 bg-white text-sm"
                      value={filterDepartment}
                      onChange={(e) => setFilterDepartment(e.target.value)}
                    >
                      {departments.map((dept, index) => (
                        <option key={index} value={dept}>{dept}</option>
                      ))}
                    </select>
                    
                    <select
                      className="border border-gray-300 rounded-md px-3 py-2 bg-white text-sm"
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
                      className="border border-gray-300 rounded-md px-3 py-2 bg-white text-sm"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                    
                    <button className="flex items-center gap-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm">
                      <Download className="h-4 w-4" />
                      Export
                    </button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Employee
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Department
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Check In
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Check Out
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredAttendance.map((employee) => (
                        <tr key={employee.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{employee.department}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{employee.checkIn}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{employee.checkOut}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
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
        </div>

        <div className="bg-white border border-gray-300 rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-300">
            <h2 className="font-bold text-black">Attendance Summary</h2>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Monthly Attendance Rate</h3>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-green-500 rounded-full" style={{ width: "92%" }}></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">92% Present</span>
                  <span className="text-xs text-gray-500">8% Absent</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Punctuality Rate</h3>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-blue-500 rounded-full" style={{ width: "85%" }}></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">85% On Time</span>
                  <span className="text-xs text-gray-500">15% Late</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="p-1 bg-green-100 rounded-full mr-2">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-900">You checked in at 09:02 AM</p>
                      <p className="text-xs text-gray-500">Today</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="p-1 bg-red-100 rounded-full mr-2">
                      <X className="h-3 w-3 text-red-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-900">You were absent</p>
                      <p className="text-xs text-gray-500">Yesterday</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="p-1 bg-yellow-100 rounded-full mr-2">
                      <AlertTriangle className="h-3 w-3 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-900">You were late by 15 minutes</p>
                      <p className="text-xs text-gray-500">June 12, 2023</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Make sure to export the component as default
export default Attend;
