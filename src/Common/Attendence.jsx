"use client"

import { useState, useEffect } from "react"

// Mock data for initial state
const initialAttendanceData = [
  { id: 1, date: "2025-05-09", checkIn: "09:05", checkOut: "18:10", status: "Present", location: "Office" },
  { id: 2, date: "2025-05-08", checkIn: "08:55", checkOut: "17:45", status: "Present", location: "Remote" },
  { id: 3, date: "2025-05-07", checkIn: "09:15", checkOut: "18:30", status: "Late", location: "Office" },
  { id: 4, date: "2025-05-06", checkIn: "08:50", checkOut: "17:30", status: "Present", location: "Office" },
  { id: 5, date: "2025-05-05", checkIn: "09:30", checkOut: "18:15", status: "Late", location: "Remote" },
]

const initialLeaveBalance = [
  { id: 1, type: "Casual Leave (CL)", total: 12, used: 4, balance: 8 },
  { id: 2, type: "Sick Leave (SL)", total: 15, used: 2, balance: 13 },
  { id: 3, type: "Earned Leave (EL)", total: 15, used: 0, balance: 15 },
  { id: 4, type: "Leave Without Pay (LWP)", total: "-", used: 1, balance: "-" },
]

const initialHolidays = [
  { id: 1, date: "2025-01-01", name: "New Year's Day", type: "Global" },
  { id: 2, date: "2025-01-26", name: "Republic Day", type: "National" },
  { id: 3, date: "2025-08-15", name: "Independence Day", type: "National" },
  { id: 4, date: "2025-10-02", name: "Gandhi Jayanti", type: "National" },
  { id: 5, date: "2025-11-12", name: "Diwali", type: "National" },
  { id: 6, date: "2025-12-25", name: "Christmas", type: "Global" },
]

const initialShifts = [
  { id: 1, name: "Morning Shift", startTime: "08:00", endTime: "16:00", type: "Fixed" },
  { id: 2, name: "Evening Shift", startTime: "16:00", endTime: "00:00", type: "Fixed" },
  { id: 3, name: "Night Shift", startTime: "00:00", endTime: "08:00", type: "Rotational" },
  { id: 4, name: "Flexible Hours", startTime: "Flexible", endTime: "Flexible", type: "Flexible" },
]

export default function AttendanceLeaveModule() {
  // State for active tab
  const [activeTab, setActiveTab] = useState("attendance")

  // State for current time and check-in status
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [currentLocation, setCurrentLocation] = useState("Detecting...")

  // State for CRUD operations
  const [attendanceData, setAttendanceData] = useState(initialAttendanceData)
  const [leaveBalance, setLeaveBalance] = useState(initialLeaveBalance)
  const [holidays, setHolidays] = useState(initialHolidays)
  const [shifts, setShifts] = useState(initialShifts)

  // State for leave applications
  const [leaveApplications, setLeaveApplications] = useState([])
  const [showLeaveModal, setShowLeaveModal] = useState(false)

  // State for editing
  const [editingHoliday, setEditingHoliday] = useState(null)
  const [showHolidayModal, setShowHolidayModal] = useState(false)
  const [editingShift, setEditingShift] = useState(null)
  const [showShiftModal, setShowShiftModal] = useState(false)

  // Form states
  const [newLeaveApplication, setNewLeaveApplication] = useState({
    leaveType: "Casual Leave (CL)",
    startDate: "",
    endDate: "",
    reason: "",
    status: "Pending",
    halfDay: false,
  })

  const [newHoliday, setNewHoliday] = useState({
    date: "",
    name: "",
    type: "Global",
  })

  const [newShift, setNewShift] = useState({
    name: "",
    startTime: "",
    endTime: "",
    type: "Fixed",
  })

  // Filter states
  const [holidayFilter, setHolidayFilter] = useState("all")

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

  // Format date for display
  const formatDate = (dateString) => {
    const options = { weekday: "short", year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Handle check in/out
  const handleCheckInOut = () => {
    const now = new Date()
    const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    const dateString = now.toISOString().split("T")[0]

    if (!isCheckedIn) {
      // Check in
      const newAttendance = {
        id: Date.now(),
        date: dateString,
        checkIn: timeString,
        checkOut: "-",
        status: now.getHours() >= 9 && now.getMinutes() > 0 ? "Late" : "Present",
        location: currentLocation,
      }
      setAttendanceData([newAttendance, ...attendanceData])
    } else {
      // Check out - update the latest record
      const updatedAttendance = attendanceData.map((record, index) => {
        if (index === 0) {
          return { ...record, checkOut: timeString }
        }
        return record
      })
      setAttendanceData(updatedAttendance)
    }

    setIsCheckedIn(!isCheckedIn)
  }

  // Handle leave application submission
  const handleLeaveSubmit = (e) => {
    e.preventDefault()

    // Calculate days between start and end date
    const start = new Date(newLeaveApplication.startDate)
    const end = new Date(newLeaveApplication.endDate)
    const diffTime = Math.abs(end - start)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
    const daysRequested = newLeaveApplication.halfDay ? diffDays / 2 : diffDays

    // Create new leave application
    const newApplication = {
      id: Date.now(),
      ...newLeaveApplication,
      daysRequested,
      appliedOn: new Date().toISOString().split("T")[0],
    }

    setLeaveApplications([newApplication, ...leaveApplications])

    // Update leave balance
    if (newLeaveApplication.leaveType !== "Leave Without Pay (LWP)") {
      const updatedBalance = leaveBalance.map((leave) => {
        if (leave.type === newLeaveApplication.leaveType) {
          return {
            ...leave,
            used: leave.used + daysRequested,
            balance: leave.balance - daysRequested,
          }
        }
        return leave
      })
      setLeaveBalance(updatedBalance)
    }

    // Reset form
    setNewLeaveApplication({
      leaveType: "Casual Leave (CL)",
      startDate: "",
      endDate: "",
      reason: "",
      status: "Pending",
      halfDay: false,
    })

    setShowLeaveModal(false)
  }

  // Handle holiday CRUD
  const handleHolidaySubmit = (e) => {
    e.preventDefault()

    if (editingHoliday) {
      // Update existing holiday
      const updatedHolidays = holidays.map((holiday) =>
        holiday.id === editingHoliday.id ? { ...newHoliday, id: holiday.id } : holiday,
      )
      setHolidays(updatedHolidays)
    } else {
      // Add new holiday
      const holiday = { ...newHoliday, id: Date.now() }
      setHolidays([...holidays, holiday])
    }

    // Reset form
    setNewHoliday({ date: "", name: "", type: "Global" })
    setEditingHoliday(null)
    setShowHolidayModal(false)
  }

  const handleEditHoliday = (holiday) => {
    setEditingHoliday(holiday)
    setNewHoliday({
      date: holiday.date,
      name: holiday.name,
      type: holiday.type,
    })
    setShowHolidayModal(true)
  }

  const handleDeleteHoliday = (id) => {
    setHolidays(holidays.filter((holiday) => holiday.id !== id))
  }

  // Handle shift CRUD
  const handleShiftSubmit = (e) => {
    e.preventDefault()

    if (editingShift) {
      // Update existing shift
      const updatedShifts = shifts.map((shift) =>
        shift.id === editingShift.id ? { ...newShift, id: shift.id } : shift,
      )
      setShifts(updatedShifts)
    } else {
      // Add new shift
      const shift = { ...newShift, id: Date.now() }
      setShifts([...shifts, shift])
    }

    // Reset form
    setNewShift({ name: "", startTime: "", endTime: "", type: "Fixed" })
    setEditingShift(null)
    setShowShiftModal(false)
  }

  const handleEditShift = (shift) => {
    setEditingShift(shift)
    setNewShift({
      name: shift.name,
      startTime: shift.startTime,
      endTime: shift.endTime,
      type: shift.type,
    })
    setShowShiftModal(true)
  }

  const handleDeleteShift = (id) => {
    setShifts(shifts.filter((shift) => shift.id !== id))
  }

  // Handle leave application actions
  const handleApproveLeave = (id) => {
    const updatedApplications = leaveApplications.map((app) => (app.id === id ? { ...app, status: "Approved" } : app))
    setLeaveApplications(updatedApplications)
  }

  const handleRejectLeave = (id) => {
    const updatedApplications = leaveApplications.map((app) => (app.id === id ? { ...app, status: "Rejected" } : app))
    setLeaveApplications(updatedApplications)

    // Restore leave balance
    const application = leaveApplications.find((app) => app.id === id)
    if (application && application.leaveType !== "Leave Without Pay (LWP)") {
      const updatedBalance = leaveBalance.map((leave) => {
        if (leave.type === application.leaveType) {
          return {
            ...leave,
            used: leave.used - application.daysRequested,
            balance: leave.balance + application.daysRequested,
          }
        }
        return leave
      })
      setLeaveBalance(updatedBalance)
    }
  }

  // Filter holidays based on type
  const filteredHolidays =
    holidayFilter === "all" ? holidays : holidays.filter((holiday) => holiday.type.toLowerCase() === holidayFilter)

  return (
    <div className="p-4 max-w-7xl mx-auto bg-black/90 border-r border-purple-700/30 backdrop-blur-md rounded-lg shadow-md text-white">
      <h1 className="text-2xl font-bold mb-6 text-white">Attendance & Leave Management</h1>

      {/* Tabs */}
      <div className="flex mb-6 bg-black/60 border border-purple-700/30 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab("attendance")}
          className={`flex-1 py-2 rounded-md text-gray-400 flex items-center justify-center ${
            activeTab === "attendance" ? "bg-purple-900/40 text-white shadow-sm" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          Attendance
        </button>
        <button
          onClick={() => setActiveTab("leave")}
          className={`flex-1 py-2 rounded-md text-gray-400 flex items-center justify-center ${
            activeTab === "leave" ? "bg-purple-900/40 text-white shadow-sm" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          Leave
        </button>
        <button
          onClick={() => setActiveTab("shifts")}
          className={`flex-1 py-2 rounded-md text-gray-400 flex items-center justify-center ${
            activeTab === "shifts" ? "bg-purple-900/40 text-white shadow-sm" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
          Shifts
        </button>
        <button
          onClick={() => setActiveTab("holidays")}
          className={`flex-1 py-2 rounded-md text-gray-400 flex items-center justify-center ${
            activeTab === "holidays" ? "bg-purple-900/40 text-white shadow-sm" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
            <path d="M8 14h.01"></path>
            <path d="M12 14h.01"></path>
            <path d="M16 14h.01"></path>
            <path d="M8 18h.01"></path>
            <path d="M12 18h.01"></path>
            <path d="M16 18h.01"></path>
          </svg>
          Holidays
        </button>
      </div>

      {/* Attendance Tab */}
      {activeTab === "attendance" && (
        <div className="space-y-6">
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-400 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span className="text-gray-300">{currentLocation}</span>
              </div>

              <button
                onClick={handleCheckInOut}
                className={`px-6 py-2 rounded-md font-medium ${
                  isCheckedIn
                    ? "bg-black/90 border border-red-500/50 text-red-400"
                    : "bg-black/90 border border-green-500/50 text-green-400"
                }`}
              >
                {isCheckedIn ? "Check Out" : "Check In"}
              </button>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Attendance History</h3>
              <button
                onClick={() => {
                  // Export attendance data as CSV
                  const headers = ["Date", "Check In", "Check Out", "Status", "Location"]
                  const csvContent =
                    headers.join(",") +
                    "\n" +
                    attendanceData
                      .map((record) =>
                        [record.date, record.checkIn, record.checkOut, record.status, record.location].join(","),
                      )
                      .join("\n")

                  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
                  const link = document.createElement("a")
                  const url = URL.createObjectURL(blob)
                  link.setAttribute("href", url)
                  link.setAttribute("download", "attendance_history.csv")
                  link.style.visibility = "hidden"
                  document.body.appendChild(link)
                  link.click()
                  document.body.removeChild(link)
                }}
                className="px-3 py-1 bg-purple-800 hover:bg-purple-700 text-white rounded-md text-sm"
              >
                Export CSV
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-black/60 border border-purple-700/30">
                <thead>
                  <tr className="bg-purple-900/20">
                    <th className="py-2 px-4 border-b border-purple-700/30 text-left">Date</th>
                    <th className="py-2 px-4 border-b border-purple-700/30 text-left">Check In</th>
                    <th className="py-2 px-4 border-b border-purple-700/30 text-left">Check Out</th>
                    <th className="py-2 px-4 border-b border-purple-700/30 text-left">Status</th>
                    <th className="py-2 px-4 border-b border-purple-700/30 text-left">Location</th>
                    <th className="py-2 px-4 border-b border-purple-700/30 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceData.map((record, index) => (
                    <tr key={record.id} className={index % 2 === 0 ? "bg-purple-900/10" : "bg-black/60"}>
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
                      <td className="py-2 px-4 border-b border-purple-700/30">
                        <button
                          onClick={() => {
                            // Delete attendance record
                            setAttendanceData(attendanceData.filter((item) => item.id !== record.id))
                          }}
                          className="text-red-400 hover:text-red-300"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Leave Tab */}
      {activeTab === "leave" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Leave Management</h3>
            <button
              onClick={() => setShowLeaveModal(true)}
              className="px-4 py-2 bg-purple-800 hover:bg-purple-700 text-white rounded-md"
            >
              Apply for Leave
            </button>
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
                    {leaveBalance.map((leave) => (
                      <tr key={leave.id} className={leave.id % 2 === 0 ? "bg-purple-900/10" : "bg-black/60"}>
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
                        {application.halfDay && " (Half Day)"}
                      </div>
                      <div className="text-sm mt-2">{application.reason}</div>

                      {application.status === "Pending" && (
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => handleApproveLeave(application.id)}
                            className="px-2 py-1 bg-green-900/30 text-green-400 text-xs rounded"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleRejectLeave(application.id)}
                            className="px-2 py-1 bg-red-900/30 text-red-400 text-xs rounded"
                          >
                            Reject
                          </button>
                        </div>
                      )}
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
        </div>
      )}

      {/* Shifts Tab */}
      {activeTab === "shifts" && (
        <div className="space-y-6">
          <div className="bg-black/60 p-4 rounded-lg border border-purple-700/30 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium mb-2">Current Shift</h3>
                <p className="text-xl font-bold">Morning Shift</p>
                <p className="text-gray-400">08:00 AM - 04:00 PM</p>
              </div>
              <button className="px-4 py-2 bg-purple-800 hover:bg-purple-700 text-white rounded-md">
                Request Change
              </button>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Available Shifts</h3>
              <button
                onClick={() => {
                  setEditingShift(null)
                  setNewShift({ name: "", startTime: "", endTime: "", type: "Fixed" })
                  setShowShiftModal(true)
                }}
                className="px-4 py-2 bg-purple-800 hover:bg-purple-700 text-white rounded-md"
              >
                Add New Shift
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {shifts.map((shift) => (
                <div key={shift.id} className="border border-purple-700/30 rounded-lg p-4 bg-black/60">
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
                      <label htmlFor={`auto-assign-${shift.id}`} className="mr-2 text-gray-300">
                        Auto-assign
                      </label>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" id={`auto-assign-${shift.id}`} className="sr-only" />
                        <div className="w-10 h-5 bg-gray-700 rounded-full shadow-inner"></div>
                        <div className="absolute w-5 h-5 bg-white rounded-full shadow -left-1 -top-0 transition"></div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEditShift(shift)} className="text-purple-400 hover:text-purple-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                      <button onClick={() => handleDeleteShift(shift.id)} className="text-red-400 hover:text-red-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Holidays Tab */}
      {activeTab === "holidays" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Holiday Calendar</h3>
            <div className="flex gap-4">
              <select
                value={holidayFilter}
                onChange={(e) => setHolidayFilter(e.target.value)}
                className="w-[180px] border border-purple-700/30 p-2 rounded bg-black/60 text-white"
              >
                <option value="all">All Holidays</option>
                <option value="global">Global</option>
                <option value="national">National</option>
                <option value="regional">Regional</option>
              </select>
              <button
                onClick={() => {
                  setEditingHoliday(null)
                  setNewHoliday({ date: "", name: "", type: "Global" })
                  setShowHolidayModal(true)
                }}
                className="px-4 py-2 bg-purple-800 hover:bg-purple-700 text-white rounded-md"
              >
                Add Holiday
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-black/60 border border-purple-700/30">
              <thead>
                <tr className="bg-purple-900/20">
                  <th className="py-2 px-4 border-b border-purple-700/30 text-left">Date</th>
                  <th className="py-2 px-4 border-b border-purple-700/30 text-left">Holiday</th>
                  <th className="py-2 px-4 border-b border-purple-700/30 text-left">Type</th>
                  <th className="py-2 px-4 border-b border-purple-700/30 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredHolidays.map((holiday, index) => (
                  <tr key={holiday.id} className={index % 2 === 0 ? "bg-purple-900/10" : "bg-black/60"}>
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
                    <td className="py-2 px-4 border-b border-purple-700/30">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditHoliday(holiday)}
                          className="text-purple-400 hover:text-purple-300"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteHoliday(holiday.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-400">Showing {filteredHolidays.length} holidays</p>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-purple-700/30 text-white rounded-md">Previous</button>
              <button className="px-3 py-1 border border-purple-700/30 bg-purple-900/20 text-white rounded-md">
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Leave Application Modal */}
      {showLeaveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-black/90 border border-purple-700/30 backdrop-blur-md p-6 rounded-lg max-w-md mx-auto text-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Leave Application</h2>
              <button onClick={() => setShowLeaveModal(false)} className="text-gray-400 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleLeaveSubmit} className="space-y-4">
              <div>
                <label htmlFor="leaveType" className="block mb-2 text-white">
                  Leave Type
                </label>
                <select
                  id="leaveType"
                  value={newLeaveApplication.leaveType}
                  onChange={(e) => setNewLeaveApplication({ ...newLeaveApplication, leaveType: e.target.value })}
                  className="w-full border border-purple-700/50 p-2 rounded bg-black/60 text-white"
                  required
                >
                  <option value="Casual Leave (CL)">Casual Leave (CL)</option>
                  <option value="Sick Leave (SL)">Sick Leave (SL)</option>
                  <option value="Earned Leave (EL)">Earned Leave (EL)</option>
                  <option value="Leave Without Pay (LWP)">Leave Without Pay (LWP)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="block mb-2 text-white">
                    From Date
                  </label>
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
                  <label htmlFor="endDate" className="block mb-2 text-white">
                    To Date
                  </label>
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
                <label htmlFor="reason" className="block mb-2 text-white">
                  Reason
                </label>
                <textarea
                  id="reason"
                  value={newLeaveApplication.reason}
                  onChange={(e) => setNewLeaveApplication({ ...newLeaveApplication, reason: e.target.value })}
                  className="w-full border border-purple-700/50 p-2 rounded bg-black/60 text-white min-h-[100px]"
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="halfDay"
                  checked={newLeaveApplication.halfDay}
                  onChange={(e) => setNewLeaveApplication({ ...newLeaveApplication, halfDay: e.target.checked })}
                  className="mr-2 border-purple-700/50"
                />
                <label htmlFor="halfDay" className="text-white">
                  Half Day
                </label>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowLeaveModal(false)}
                  className="px-4 py-2 border border-purple-700/50 text-white rounded-md"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-md">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Holiday Modal */}
      {showHolidayModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-black/90 border border-purple-700/30 backdrop-blur-md p-6 rounded-lg max-w-md mx-auto text-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{editingHoliday ? "Edit Holiday" : "Add Holiday"}</h2>
              <button onClick={() => setShowHolidayModal(false)} className="text-gray-400 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleHolidaySubmit} className="space-y-4">
              <div>
                <label htmlFor="holidayDate" className="block mb-2 text-white">
                  Date
                </label>
                <input
                  type="date"
                  id="holidayDate"
                  value={newHoliday.date}
                  onChange={(e) => setNewHoliday({ ...newHoliday, date: e.target.value })}
                  className="w-full border border-purple-700/50 p-2 rounded bg-black/60 text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="holidayName" className="block mb-2 text-white">
                  Holiday Name
                </label>
                <input
                  type="text"
                  id="holidayName"
                  value={newHoliday.name}
                  onChange={(e) => setNewHoliday({ ...newHoliday, name: e.target.value })}
                  className="w-full border border-purple-700/50 p-2 rounded bg-black/60 text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="holidayType" className="block mb-2 text-white">
                  Type
                </label>
                <select
                  id="holidayType"
                  value={newHoliday.type}
                  onChange={(e) => setNewHoliday({ ...newHoliday, type: e.target.value })}
                  className="w-full border border-purple-700/50 p-2 rounded bg-black/60 text-white"
                  required
                >
                  <option value="Global">Global</option>
                  <option value="National">National</option>
                  <option value="Regional">Regional</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowHolidayModal(false)}
                  className="px-4 py-2 border border-purple-700/50 text-white rounded-md"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-md">
                  {editingHoliday ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Shift Modal */}
      {showShiftModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-black/90 border border-purple-700/30 backdrop-blur-md p-6 rounded-lg max-w-md mx-auto text-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{editingShift ? "Edit Shift" : "Add Shift"}</h2>
              <button onClick={() => setShowShiftModal(false)} className="text-gray-400 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleShiftSubmit} className="space-y-4">
              <div>
                <label htmlFor="shiftName" className="block mb-2 text-white">
                  Shift Name
                </label>
                <input
                  type="text"
                  id="shiftName"
                  value={newShift.name}
                  onChange={(e) => setNewShift({ ...newShift, name: e.target.value })}
                  className="w-full border border-purple-700/50 p-2 rounded bg-black/60 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startTime" className="block mb-2 text-white">
                    Start Time
                  </label>
                  <input
                    type="time"
                    id="startTime"
                    value={newShift.startTime}
                    onChange={(e) => setNewShift({ ...newShift, startTime: e.target.value })}
                    className="w-full border border-purple-700/50 p-2 rounded bg-black/60 text-white"
                    required={newShift.type !== "Flexible"}
                    disabled={newShift.type === "Flexible"}
                  />
                </div>
                <div>
                  <label htmlFor="endTime" className="block mb-2 text-white">
                    End Time
                  </label>
                  <input
                    type="time"
                    id="endTime"
                    value={newShift.endTime}
                    onChange={(e) => setNewShift({ ...newShift, endTime: e.target.value })}
                    className="w-full border border-purple-700/50 p-2 rounded bg-black/60 text-white"
                    required={newShift.type !== "Flexible"}
                    disabled={newShift.type === "Flexible"}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="shiftType" className="block mb-2 text-white">
                  Type
                </label>
                <select
                  id="shiftType"
                  value={newShift.type}
                  onChange={(e) => {
                    const type = e.target.value
                    setNewShift({
                      ...newShift,
                      type,
                      startTime: type === "Flexible" ? "Flexible" : newShift.startTime,
                      endTime: type === "Flexible" ? "Flexible" : newShift.endTime,
                    })
                  }}
                  className="w-full border border-purple-700/50 p-2 rounded bg-black/60 text-white"
                  required
                >
                  <option value="Fixed">Fixed</option>
                  <option value="Rotational">Rotational</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowShiftModal(false)}
                  className="px-4 py-2 border border-purple-700/50 text-white rounded-md"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-md">
                  {editingShift ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
