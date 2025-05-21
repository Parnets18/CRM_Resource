"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Bell, UserPlus, CalendarCheck, BadgeCheck, Mail } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Nav from "../Nav"

export default function HRManager() {
  const { toast } = useToast()

  // Employee form state
  const [employeeForm, setEmployeeForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  })

  // Leave requests state with initial data
  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, name: "John Doe", type: "Vacation", days: 5, status: "pending" },
    { id: 2, name: "Jane Smith", type: "Sick", days: 2, status: "pending" },
  ])

  // Payslips state with initial data
  const [payslips, setPayslips] = useState([
    { id: 1, month: "March 2024", sent: true },
    { id: 2, month: "February 2024", sent: false },
  ])

  // Attendance data
  const [attendance, setAttendance] = useState({
    present: 132,
    absent: 10,
  })

  // Handle employee form input changes
  const handleEmployeeInputChange = (e) => {
    const { name, value } = e.target
    setEmployeeForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle add employee
  const handleAddEmployee = (e) => {
    e.preventDefault()

    // Basic validation
    if (!employeeForm.firstName || !employeeForm.lastName || !employeeForm.email) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      })
      return
    }

    // Success notification
    toast({
      title: "Success",
      description: `Employee ${employeeForm.firstName} ${employeeForm.lastName} added successfully`,
    })

    // Reset form
    setEmployeeForm({
      firstName: "",
      lastName: "",
      email: "",
    })
  }

  // Handle leave request approval/rejection
  const handleLeaveRequest = (id, action) => {
    setLeaveRequests(leaveRequests.map((request) => (request.id === id ? { ...request, status: action } : request)))

    toast({
      title: action === "approved" ? "Leave Approved" : "Leave Rejected",
      description: `Leave request has been ${action}`,
    })
  }

  // Handle send payslip
  const handleSendPayslip = (id) => {
    setPayslips(payslips.map((payslip) => (payslip.id === id ? { ...payslip, sent: true } : payslip)))

    toast({
      title: "Payslip Sent",
      description: "Payslip has been sent successfully",
    })
  }

  // Handle process payroll
  const handleProcessPayroll = () => {
    toast({
      title: "Processing Payroll",
      description: "Monthly payroll is being processed",
    })

    // Add new payslip for current month
    const currentDate = new Date()
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]

    const newPayslip = {
      id: payslips.length + 1,
      month: `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`,
      sent: false,
    }

    setPayslips([newPayslip, ...payslips])
  }

  return (
    <div className="min-h-screen bg-black lg:ml-64">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-gray-900 to-black"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-600/10 to-transparent"></div>
      </div>

      <div className="relative z-10 flex">
        <Nav />

        <div className="flex-1 p-8 mt-16 md:mt-0">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">HR Management Dashboard</h2>
              <p className="text-gray-400">Employee management portal</p>
            </div>
            <Button variant="ghost" size="icon" className="text-gray-300 hover:bg-gray-900/50">
              <Bell className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Employee Management</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleAddEmployee}>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={employeeForm.firstName}
                      onChange={handleEmployeeInputChange}
                      className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={employeeForm.lastName}
                      onChange={handleEmployeeInputChange}
                      className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white"
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={employeeForm.email}
                    onChange={handleEmployeeInputChange}
                    className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white"
                  />
                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                    <UserPlus className="w-4 h-4 mr-2" /> Add Employee
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Attendance Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50">
                    <div>
                      <p className="text-sm font-medium text-gray-300">Today's Present</p>
                      <p className="text-2xl font-bold text-white">{attendance.present}</p>
                    </div>
                    <BadgeCheck className="text-green-400 w-8 h-8" />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50">
                    <div>
                      <p className="text-sm font-medium text-gray-300">Absent Today</p>
                      <p className="text-2xl font-bold text-white">{attendance.absent}</p>
                    </div>
                    <CalendarCheck className="text-red-400 w-8 h-8" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Leave Requests</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {leaveRequests.map((request) => (
                  <motion.div
                    key={request.id}
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-300">{request.name}</p>
                      <p className="text-xs text-gray-500">
                        {request.type} - {request.days} days
                      </p>
                    </div>
                    {request.status === "pending" ? (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleLeaveRequest(request.id, "approved")}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleLeaveRequest(request.id, "rejected")}
                        >
                          Reject
                        </Button>
                      </div>
                    ) : (
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded ${
                          request.status === "approved"
                            ? "bg-green-900/50 text-green-400"
                            : "bg-red-900/50 text-red-400"
                        }`}
                      >
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    )}
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Payroll Processing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={handleProcessPayroll}>
                  Process Monthly Payroll
                </Button>
                <div className="space-y-2">
                  {payslips.map((payslip) => (
                    <div key={payslip.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50">
                      <span className="text-gray-300">{payslip.month}</span>
                      <div className="flex items-center gap-2">
                        {payslip.sent ? (
                          <Mail className="w-4 h-4 text-green-400" />
                        ) : (
                          <Button size="sm" onClick={() => handleSendPayslip(payslip.id)}>
                            Send Payslip
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
