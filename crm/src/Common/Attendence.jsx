"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Clock, MapPin, Briefcase, CalendarDays } from "lucide-react"
import { motion } from "framer-motion"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

// Mock data for demonstration
const mockAttendanceData = [
  { date: "2025-05-09", checkIn: "09:05", checkOut: "18:10", status: "Present", location: "Office" },
  { date: "2025-05-08", checkIn: "08:55", checkOut: "17:45", status: "Present", location: "Remote" },
  { date: "2025-05-07", checkIn: "09:15", checkOut: "18:30", status: "Late", location: "Office" },
  { date: "2025-05-06", checkIn: "08:50", checkOut: "17:30", status: "Present", location: "Office" },
  { date: "2025-05-05", checkIn: "09:30", checkOut: "18:15", status: "Late", location: "Remote" },
]

const mockLeaveBalance = [
  { type: "Casual Leave (CL)", total: 12, used: 4, balance: 8 },
  { type: "Sick Leave (SL)", total: 15, used: 2, balance: 13 },
  { type: "Earned Leave (EL)", total: 15, used: 0, balance: 15 },
  { type: "Leave Without Pay (LWP)", total: "-", used: 1, balance: "-" },
]

const mockHolidays = [
  { date: "2025-01-01", name: "New Year's Day", type: "Global" },
  { date: "2025-01-26", name: "Republic Day", type: "National" },
  { date: "2025-08-15", name: "Independence Day", type: "National" },
  { date: "2025-10-02", name: "Gandhi Jayanti", type: "National" },
  { date: "2025-11-12", name: "Diwali", type: "National" },
  { date: "2025-12-25", name: "Christmas", type: "Global" },
]

const mockShifts = [
  { name: "Morning Shift", startTime: "08:00", endTime: "16:00", type: "Fixed" },
  { name: "Evening Shift", startTime: "16:00", endTime: "00:00", type: "Fixed" },
  { name: "Night Shift", startTime: "00:00", endTime: "08:00", type: "Rotational" },
  { name: "Flexible Hours", startTime: "Flexible", endTime: "Flexible", type: "Flexible" },
]

export default function AttendanceLeaveModule() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [currentLocation, setCurrentLocation] = useState("Detecting...")
  const [leaveApplications, setLeaveApplications] = useState([])
  const [newLeaveApplication, setNewLeaveApplication] = useState({
    leaveType: "Casual Leave (CL)",
    startDate: "",
    endDate: "",
    reason: "",
    status: "Pending",
  })

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    // Simulate location detection
    setTimeout(() => {
      setCurrentLocation("Office - Main Building")
    }, 2000)

    return () => clearInterval(timer)
  }, [])

  const handleCheckInOut = () => {
    setIsCheckedIn(!isCheckedIn)
    // In a real app, you would send this data to your backend
    console.log(
      `User ${!isCheckedIn ? "checked in" : "checked out"} at ${currentTime.toLocaleTimeString()} from ${currentLocation}`,
    )
  }

  const handleLeaveSubmit = (e) => {
    e.preventDefault()
    setLeaveApplications([...leaveApplications, { ...newLeaveApplication, id: Date.now() }])
    setNewLeaveApplication({
      leaveType: "Casual Leave (CL)",
      startDate: "",
      endDate: "",
      reason: "",
      status: "Pending",
    })
    // Close dialog (in a real implementation)
  }

  const formatDate = (dateString) => {
    const options = { weekday: "short", year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="p-4 max-w-7xl mx-auto bg-black/90 border-r border-purple-700/30 backdrop-blur-md rounded-lg shadow-md text-white">
      <h1 className="text-2xl font-bold mb-6 text-white">Attendance & Leave Management</h1>

      <Tabs defaultValue="attendance" className="w-full">
        <TabsList className="flex mb-6 bg-black/60 border border-purple-700/30 p-1 rounded-lg">
          <TabsTrigger
            value="attendance"
            className="flex-1 py-2 rounded-md text-gray-400 data-[state=active]:bg-purple-900/40 data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            <Clock className="w-4 h-4 mr-2 inline" />
            Attendance
          </TabsTrigger>
          <TabsTrigger
            value="leave"
            className="flex-1 py-2 rounded-md text-gray-400 data-[state=active]:bg-purple-900/40 data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            <Calendar className="w-4 h-4 mr-2 inline" />
            Leave
          </TabsTrigger>
          <TabsTrigger
            value="shifts"
            className="flex-1 py-2 rounded-md text-gray-400 data-[state=active]:bg-purple-900/40 data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            <Briefcase className="w-4 h-4 mr-2 inline" />
            Shifts
          </TabsTrigger>
          <TabsTrigger
            value="holidays"
            className="flex-1 py-2 rounded-md text-gray-400 data-[state=active]:bg-purple-900/40 data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            <CalendarDays className="w-4 h-4 mr-2 inline" />
            Holidays
          </TabsTrigger>
        </TabsList>

        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-6">
          <div className="bg-black/60 p-4 rounded-lg border border-purple-700/30">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-medium">Today's Attendance</h3>
                <p className="text-gray-400">
                  {currentTime.toLocaleDateString(undefined, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="text-2xl font-bold">
                {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                <span className="text-gray-300">{currentLocation}</span>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleCheckInOut}
                className={`px-6 py-2 rounded-md font-medium ${
                  isCheckedIn
                    ? "bg-black/90 border border-red-500/50 text-red-400"
                    : "bg-black/90 border border-green-500/50 text-green-400"
                }`}
              >
                {isCheckedIn ? "Check Out" : "Check In"}
              </motion.button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Attendance History</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-black/60 border border-purple-700/30">
                <thead>
                  <tr className="bg-purple-900/20">
                    <th className="py-2 px-4 border-b border-purple-700/30 text-left">Date</th>
                    <th className="py-2 px-4 border-b border-purple-700/30 text-left">Check In</th>
                    <th className="py-2 px-4 border-b border-purple-700/30 text-left">Check Out</th>
                    <th className="py-2 px-4 border-b border-purple-700/30 text-left">Status</th>
                    <th className="py-2 px-4 border-b border-purple-700/30 text-left">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {mockAttendanceData.map((record, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-purple-900/10" : "bg-black/60"}>
                      <td className="py-2 px-4 border-b border-purple-700/30">{formatDate(record.date)}</td>
                      <td className="py-2 px-4 border-b border-purple-700/30">{record.checkIn}</td>
                      <td className="py-2 px-4 border-b border-purple-700/30">{record.checkOut}</td>
                      <td className="py-2 px-4 border-b border-purple-700/30">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs ${
                            record.status === "Present"
                              ? "bg-green-900/30 text-green-400"
                              : record.status === "Late"
                                ? "bg-yellow-900/30 text-yellow-400"
                                : "bg-red-900/30 text-red-400"
                          }`}
                        >
                          {record.status}
                        </span>
                      </td>
                      <td className="py-2 px-4 border-b border-purple-700/30">{record.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Leave Tab */}
        <TabsContent value="leave" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Leave Management</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-purple-800 hover:bg-purple-700 text-white">Apply for Leave</Button>
              </DialogTrigger>
              <DialogContent className="bg-black/90 border border-purple-700/30 backdrop-blur-md p-6 rounded-lg max-w-md mx-auto text-white">
                <DialogTitle className="text-xl font-bold mb-4">Leave Application</DialogTitle>
                <form onSubmit={handleLeaveSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="leaveType" className="block mb-2 text-white">
                      Leave Type
                    </Label>
                    <Select
                      value={newLeaveApplication.leaveType}
                      onValueChange={(value) => setNewLeaveApplication({ ...newLeaveApplication, leaveType: value })}
                    >
                      <SelectTrigger className="w-full border border-purple-700/50 p-2 rounded bg-black/60 text-white">
                        <SelectValue placeholder="Select leave type" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 border border-purple-700/50 text-white">
                        <SelectItem value="Casual Leave (CL)">Casual Leave (CL)</SelectItem>
                        <SelectItem value="Sick Leave (SL)">Sick Leave (SL)</SelectItem>
                        <SelectItem value="Earned Leave (EL)">Earned Leave (EL)</SelectItem>
                        <SelectItem value="Leave Without Pay (LWP)">Leave Without Pay (LWP)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate" className="block mb-2 text-white">
                        From Date
                      </Label>
                      <input
                        type="date"
                        id="startDate"
                        value={newLeaveApplication.startDate}
                        onChange={(e) => setNewLeaveApplication({ ...newLeaveApplication, startDate: e.target.value })}
                        className="w-full border border-purple-700/50 p-2 rounded bg-black/60 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate" className="block mb-2 text-white">
                        To Date
                      </Label>
                      <input
                        type="date"
                        id="endDate"
                        value={newLeaveApplication.endDate}
                        onChange={(e) => setNewLeaveApplication({ ...newLeaveApplication, endDate: e.target.value })}
                        className="w-full border border-purple-700/50 p-2 rounded bg-black/60 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="reason" className="block mb-2 text-white">
                      Reason
                    </Label>
                    <textarea
                      id="reason"
                      value={newLeaveApplication.reason}
                      onChange={(e) => setNewLeaveApplication({ ...newLeaveApplication, reason: e.target.value })}
                      className="w-full border border-purple-700/50 p-2 rounded bg-black/60 text-white min-h-[100px]"
                      required
                    />
                  </div>

                  <div className="flex items-center">
                    <Checkbox id="halfDay" className="mr-2 border-purple-700/50" />
                    <Label htmlFor="halfDay" className="text-white">
                      Half Day
                    </Label>
                  </div>

                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" className="border-purple-700/50 text-white">
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-purple-700 hover:bg-purple-600 text-white">
                      Submit
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-md font-medium mb-3">Leave Balance</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-black/60 border border-purple-700/30">
                  <thead>
                    <tr className="bg-purple-900/20">
                      <th className="py-2 px-4 border-b border-purple-700/30 text-left">Leave Type</th>
                      <th className="py-2 px-4 border-b border-purple-700/30 text-center">Total</th>
                      <th className="py-2 px-4 border-b border-purple-700/30 text-center">Used</th>
                      <th className="py-2 px-4 border-b border-purple-700/30 text-center">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockLeaveBalance.map((leave, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-purple-900/10" : "bg-black/60"}>
                        <td className="py-2 px-4 border-b border-purple-700/30">{leave.type}</td>
                        <td className="py-2 px-4 border-b border-purple-700/30 text-center">{leave.total}</td>
                        <td className="py-2 px-4 border-b border-purple-700/30 text-center">{leave.used}</td>
                        <td className="py-2 px-4 border-b border-purple-700/30 text-center">{leave.balance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h4 className="text-md font-medium mb-3">Leave Applications</h4>
              {leaveApplications.length > 0 ? (
                <div className="space-y-3">
                  {leaveApplications.map((application) => (
                    <div key={application.id} className="border border-purple-700/30 rounded-lg p-3 bg-black/60">
                      <div className="flex justify-between">
                        <span className="font-medium">{application.leaveType}</span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            application.status === "Approved"
                              ? "bg-green-900/30 text-green-400"
                              : application.status === "Rejected"
                                ? "bg-red-900/30 text-red-400"
                                : "bg-yellow-900/30 text-yellow-400"
                          }`}
                        >
                          {application.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-400 mt-1">
                        {formatDate(application.startDate)} to {formatDate(application.endDate)}
                      </div>
                      <div className="text-sm mt-2">{application.reason}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-black/60 rounded-lg border border-dashed border-purple-700/30">
                  <p className="text-gray-400">No leave applications yet</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Shifts Tab */}
        <TabsContent value="shifts" className="space-y-6">
          <div className="bg-black/60 p-4 rounded-lg border border-purple-700/30 mb-6">
            <h3 className="text-lg font-medium mb-2">Current Shift</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold">Morning Shift</p>
                <p className="text-gray-400">08:00 AM - 04:00 PM</p>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="bg-purple-800 hover:bg-purple-700 text-white">Request Change</Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-black/90 border border-purple-700/30 text-white">
                    <p>Request a shift change from your manager</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Available Shifts</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {mockShifts.map((shift, index) => (
                <div key={index} className="border border-purple-700/30 rounded-lg p-4 bg-black/60">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{shift.name}</h4>
                      <p className="text-gray-400">
                        {shift.startTime} - {shift.endTime}
                      </p>
                    </div>
                    <span className="text-xs bg-purple-900/30 px-2 py-1 rounded-full text-purple-400">
                      {shift.type}
                    </span>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center">
                      <Label htmlFor={`auto-assign-${index}`} className="mr-2 text-gray-300">
                        Auto-assign
                      </Label>
                      <Switch id={`auto-assign-${index}`} />
                    </div>
                    <Button variant="link" className="text-purple-400">
                      Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Holidays Tab */}
        <TabsContent value="holidays" className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Holiday Calendar</h3>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px] border border-purple-700/30 p-2 rounded bg-black/60 text-white">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border border-purple-700/30 text-white">
                <SelectItem value="all">All Holidays</SelectItem>
                <SelectItem value="global">Global</SelectItem>
                <SelectItem value="national">National</SelectItem>
                <SelectItem value="regional">Regional</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-black/60 border border-purple-700/30">
              <thead>
                <tr className="bg-purple-900/20">
                  <th className="py-2 px-4 border-b border-purple-700/30 text-left">Date</th>
                  <th className="py-2 px-4 border-b border-purple-700/30 text-left">Holiday</th>
                  <th className="py-2 px-4 border-b border-purple-700/30 text-left">Type</th>
                </tr>
              </thead>
              <tbody>
                {mockHolidays.map((holiday, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-purple-900/10" : "bg-black/60"}>
                    <td className="py-2 px-4 border-b border-purple-700/30">{formatDate(holiday.date)}</td>
                    <td className="py-2 px-4 border-b border-purple-700/30 font-medium">{holiday.name}</td>
                    <td className="py-2 px-4 border-b border-purple-700/30">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs ${
                          holiday.type === "Global"
                            ? "bg-purple-900/30 text-purple-400"
                            : holiday.type === "National"
                              ? "bg-blue-900/30 text-blue-400"
                              : "bg-green-900/30 text-green-400"
                        }`}
                      >
                        {holiday.type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-400">Showing {mockHolidays.length} holidays</p>
            <div className="flex space-x-2">
              <Button variant="outline" className="border-purple-700/30 text-white">
                Previous
              </Button>
              <Button variant="outline" className="border-purple-700/30 bg-purple-900/20 text-white">
                Next
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
