import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck, Clock, MapPin, Wifi, Battery, Signal, User, Settings, Bell, TrendingUp, Calendar, CheckCircle, XCircle, AlertCircle, Download, Filter, Search } from "lucide-react";
import { useState, useEffect } from "react";
import Nav from "@/Admin/Nav";

export default function ProfessionalAttendanceSystem() {
  const [todayStatus, setTodayStatus] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [location, setLocation] = useState("Office - Building A, Floor 3");
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const attendanceRecords = [
    { date: "2024-05-29", status: "Present", checkIn: "08:45 AM", checkOut: "05:30 PM", hours: "8h 45m", location: "Office" },
    { date: "2024-05-28", status: "Present", checkIn: "09:02 AM", checkOut: "06:15 PM", hours: "9h 13m", location: "Office" },
    { date: "2024-05-27", status: "Late", checkIn: "09:35 AM", checkOut: "06:00 PM", hours: "8h 25m", location: "Office" },
    { date: "2024-05-26", status: "Present", checkIn: "08:58 AM", checkOut: "05:45 PM", hours: "8h 47m", location: "Remote" },
    { date: "2024-05-25", status: "Present", checkIn: "08:50 AM", checkOut: "05:30 PM", hours: "8h 40m", location: "Office" },
    { date: "2024-05-24", status: "Absent", checkIn: "-", checkOut: "-", hours: "-", location: "-" },
    { date: "2024-05-23", status: "Present", checkIn: "09:00 AM", checkOut: "06:00 PM", hours: "9h 00m", location: "Office" },
    { date: "2024-05-22", status: "Present", checkIn: "08:45 AM", checkOut: "05:30 PM", hours: "8h 45m", location: "Remote" }
  ];

  const monthlyStats = {
    totalDays: 22,
    presentDays: 19,
    lateDays: 2,
    absentDays: 1,
    avgHours: "8h 35m",
    onTimePercentage: 86
  };

  const handleAttendanceAction = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });

    if (!isCheckedIn) {
      setIsCheckedIn(true);
      setCheckInTime(timeString);
      setTodayStatus("Present");
      // Simulate location detection
      navigator.geolocation?.getCurrentPosition(() => {
        setLocation("Office - Building A, Floor 3 ✓");
      });
    } else {
      setIsCheckedIn(false);
      setCheckInTime(null);
      // This would normally update the checkout time in the backend
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Present":
        return "text-emerald-600";
      case "Late":
        return "text-amber-600";
      case "Absent":
        return "text-red-600";
      default:
        return "text-slate-600";
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case "Present":
        return "bg-emerald-50 border-emerald-200";
      case "Late":
        return "bg-amber-50 border-amber-200";
      case "Absent":
        return "bg-red-50 border-red-200";
      default:
        return "bg-slate-50 border-slate-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Present":
        return <CheckCircle className="w-4 h-4" />;
      case "Late":
        return <AlertCircle className="w-4 h-4" />;
      case "Absent":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesFilter = filterStatus === "All" || record.status === filterStatus;
    const matchesSearch = record.date.includes(searchTerm) || 
                         record.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 ml-64 ">
      <Nav/>
      <div className="lg:hidden bg-slate-900 text-white px-4 py-1 flex justify-between items-center text-xs">
        <div className="flex items-center gap-1">
          <Signal className="w-3 h-3" />
          <Wifi className="w-3 h-3" />
        </div>
        <span className="font-medium">
          {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </span>
        <div className="flex items-center gap-1">
          <span>100%</span>
          <Battery className="w-3 h-3" />
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <CalendarCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">AttendanceHub</h1>
                <p className="text-xs text-slate-500 hidden sm:block">Professional Time Management</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
             
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Live Clock & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Clock & Status */}
          <Card className="lg:col-span-2 border-0 shadow-xl bg-purple-600 text-white overflow-hidden relative">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-white/5 bg-[radial-gradient(circle_at_center,_transparent_1px,_rgba(255,255,255,0.05)_1px)] bg-[length:30px_30px]"></div>
            </div>
            <CardContent className="p-8 relative z-10">
              <div className="text-center space-y-4">
                <div className="text-5xl sm:text-6xl font-bold font-mono tracking-wider">
                  {currentTime.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false 
                  })}
                </div>
                <div className="text-lg opacity-90">
                  {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="flex items-center justify-center gap-2 text-sm opacity-80">
                  <MapPin className="w-4 h-4" />
                  {location}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-slate-800 flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-600" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={handleAttendanceAction}
                className={`w-full h-14 text-lg font-semibold transition-all duration-200 ${
                  isCheckedIn 
                    ? 'bg-red-600 hover:bg-red-700 shadow-red-200' 
                    : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200'
                } shadow-lg`}
              >
                {isCheckedIn ? (
                  <>
                    <XCircle className="w-6 h-6 mr-3" />
                    Check Out
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-6 h-6 mr-3" />
                    Check In
                  </>
                )}
              </Button>
              
              {isCheckedIn && checkInTime && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
                  <p className="text-sm text-emerald-700 font-medium">Checked in at</p>
                  <p className="text-2xl font-bold text-emerald-800">{checkInTime}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="sm" className="flex-col h-16 gap-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs">Schedule</span>
                </Button>
                <Button variant="outline" size="sm" className="flex-col h-16 gap-1">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs">Analytics</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistics Dashboard */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-emerald-700 mb-2">{monthlyStats.presentDays}</div>
              <div className="text-sm text-emerald-600 font-medium">Present Days</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-amber-100">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-amber-700 mb-2">{monthlyStats.lateDays}</div>
              <div className="text-sm text-amber-600 font-medium">Late Days</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-red-700 mb-2">{monthlyStats.absentDays}</div>
              <div className="text-sm text-red-600 font-medium">Absent Days</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-700 mb-2">{monthlyStats.avgHours}</div>
              <div className="text-sm text-blue-600 font-medium">Avg Hours</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-700 mb-2">{monthlyStats.onTimePercentage}%</div>
              <div className="text-sm text-purple-600 font-medium">On Time</div>
            </CardContent>
          </Card>
        </div>

        {/* Attendance Records */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="border-b border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-slate-800 flex items-center gap-2">
                <CalendarCheck className="w-5 h-5 text-indigo-600" />
                Attendance History
              </CardTitle>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search records..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-slate-500" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="All">All Status</option>
                    <option value="Present">Present</option>
                    <option value="Late">Late</option>
                    <option value="Absent">Absent</option>
                  </select>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Date</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Status</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700 hidden sm:table-cell">Check In</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700 hidden sm:table-cell">Check Out</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700 hidden lg:table-cell">Hours</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700 hidden lg:table-cell">Location</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRecords.map((record, index) => (
                    <tr key={index} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6">
                        <div>
                          <div className="font-medium text-slate-900">
                            {new Date(record.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </div>
                          <div className="text-sm text-slate-500">
                            {new Date(record.date).toLocaleDateString('en-US', { weekday: 'short' })}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${getStatusBg(record.status)} ${getStatusColor(record.status)}`}>
                          {getStatusIcon(record.status)}
                          {record.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-700 font-medium hidden sm:table-cell">{record.checkIn}</td>
                      <td className="py-4 px-6 text-slate-700 font-medium hidden sm:table-cell">{record.checkOut}</td>
                      <td className="py-4 px-6 text-slate-700 font-medium hidden lg:table-cell">{record.hours}</td>
                      <td className="py-4 px-6 hidden lg:table-cell">
                        <span className="inline-flex items-center gap-1 text-sm text-slate-600">
                          <MapPin className="w-3 h-3" />
                          {record.location}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredRecords.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                <CalendarCheck className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No attendance records found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}