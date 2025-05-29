import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck, Clock } from "lucide-react";
import { useState } from "react";
import Nav from "@/Admin/Nav";
export default function AttendanceComponent() {
  const [todayStatus, setTodayStatus] = useState("Present");
  
  const attendanceRecords = [
    { date: "2024-03-15", status: "Present", time: "09:02 AM" },
    { date: "2024-03-14", status: "Late", time: "09:15 AM" },
    { date: "2024-03-13", status: "Present", time: "08:58 AM" },
    { date: "2024-03-12", status: "Present", time: "08:45 AM" },
    { date: "2024-03-11", status: "Absent", time: "-" },
    { date: "2024-03-10", status: "Present", time: "09:00 AM" }
  ];

  const handleMarkAttendance = () => {
    const currentTime = new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
    alert(`Attendance marked at ${currentTime}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Present":
        return "text-green-600";
      case "Late":
        return "text-yellow-600";
      case "Absent":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="ml-64">
      <Nav/>
         <div className="min-h-screen bg-white p-8">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-200/30 via-gray-100 to-white"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-300/10 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-black">Attendance Management</h2>
          <p className="text-gray-600">Track your daily attendance and view records</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Attendance */}
          <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-black flex items-center gap-2">
                <Clock className="w-5 h-5" /> Today's Attendance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-6 rounded-lg bg-gray-100/50">
                <div className="mb-4">
                  <p className="text-sm text-gray-600">Current Status</p>
                  <p className={`text-3xl font-bold ${getStatusColor(todayStatus)}`}>
                    {todayStatus}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-600">Today's Date</p>
                  <p className="text-lg font-semibold text-black">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
                <Button 
                  onClick={handleMarkAttendance}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  <Clock className="w-4 h-4 mr-2" /> Mark Attendance
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Attendance Summary */}
          <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-black flex items-center gap-2">
                <CalendarCheck className="w-5 h-5" /> Monthly Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-lg bg-green-100/50">
                  <p className="text-2xl font-bold text-green-600">22</p>
                  <p className="text-sm text-gray-600">Present Days</p>
                </div>
                <div className="p-4 rounded-lg bg-yellow-100/50">
                  <p className="text-2xl font-bold text-yellow-600">3</p>
                  <p className="text-sm text-gray-600">Late Days</p>
                </div>
                <div className="p-4 rounded-lg bg-red-100/50">
                  <p className="text-2xl font-bold text-red-600">1</p>
                  <p className="text-sm text-gray-600">Absent Days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Attendance Records */}
        <Card className="mt-6 border border-purple-500/20 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-black flex items-center gap-2">
              <CalendarCheck className="w-5 h-5" /> Recent Attendance Records
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {attendanceRecords.map((record, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-100/50 hover:bg-gray-200/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-medium text-black">{record.date}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(record.date).toLocaleDateString('en-US', { weekday: 'long' })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`font-semibold ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                    <p className="text-sm text-gray-600">{record.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </div>
 
  );
}