"use client"

import RestoNav from "../RestoNav"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UserPlus, Calendar, DollarSign, Clock, UserCheck, FileText, Printer, Search, Edit, Trash2 } from "lucide-react"

// Sample data for demonstration
const initialStaffData = [
  { id: "EMP001", name: "Rahul Sharma", role: "Chef", salary: 35000, shift: "Morning", joiningDate: "2023-01-15" },
  { id: "EMP002", name: "Priya Singh", role: "Waiter", salary: 22000, shift: "Evening", joiningDate: "2023-03-10" },
  { id: "EMP003", name: "Amit Kumar", role: "Cashier", salary: 25000, shift: "Morning", joiningDate: "2023-02-05" },
]

const initialAttendanceData = [
  { id: "ATT001", employeeId: "EMP001", date: "2025-05-21", inTime: "09:00", outTime: "18:00", status: "Present" },
  { id: "ATT002", employeeId: "EMP002", date: "2025-05-21", inTime: "16:00", outTime: "23:00", status: "Present" },
  { id: "ATT003", employeeId: "EMP003", date: "2025-05-21", inTime: "09:30", outTime: "18:30", status: "Present" },
  { id: "ATT004", employeeId: "EMP001", date: "2025-05-20", inTime: "09:15", outTime: "18:15", status: "Present" },
  { id: "ATT005", employeeId: "EMP002", date: "2025-05-20", inTime: "", outTime: "", status: "Absent" },
]

const initialPayrollData = [
  {
    id: "PAY001",
    employeeId: "EMP001",
    month: "April 2025",
    presentDays: 26,
    overtime: 5,
    deductions: 1500,
    netSalary: 35000 + (35000 / 26) * 5 - 1500,
  },
  {
    id: "PAY002",
    employeeId: "EMP002",
    month: "April 2025",
    presentDays: 24,
    overtime: 2,
    deductions: 800,
    netSalary: 22000 + (22000 / 26) * 2 - 800,
  },
  {
    id: "PAY003",
    employeeId: "EMP003",
    month: "April 2025",
    presentDays: 25,
    overtime: 0,
    deductions: 0,
    netSalary: 25000,
  },
]

export default function HRAndPayroll() {
  const [staff, setStaff] = useState(initialStaffData)
  const [attendance, setAttendance] = useState(initialAttendanceData)
  const [payroll, setPayroll] = useState(initialPayrollData)
  const [newStaff, setNewStaff] = useState({ id: "", name: "", role: "", salary: "", shift: "", joiningDate: "" })
  const [newAttendance, setNewAttendance] = useState({
    employeeId: "",
    date: "",
    inTime: "",
    outTime: "",
    status: "Present",
  })
  const [newPayroll, setNewPayroll] = useState({
    employeeId: "",
    month: "",
    presentDays: "",
    overtime: "",
    deductions: "",
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddingStaff, setIsAddingStaff] = useState(false)
  const [isAddingAttendance, setIsAddingAttendance] = useState(false)
  const [isAddingPayroll, setIsAddingPayroll] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [currentMonth, setCurrentMonth] = useState("May 2025")

  // Edit staff states
  const [isEditingStaff, setIsEditingStaff] = useState(false)
  const [editingStaff, setEditingStaff] = useState(null)

  // Edit attendance states
  const [isEditingAttendance, setIsEditingAttendance] = useState(false)
  const [editingAttendance, setEditingAttendance] = useState(null)

  // Edit payroll states
  const [isEditingPayroll, setIsEditingPayroll] = useState(false)
  const [editingPayroll, setEditingPayroll] = useState(null)

  // Handle staff form submission
  const handleStaffSubmit = (e) => {
    e.preventDefault()
    const newId = `EMP${String(staff.length + 1).padStart(3, "0")}`
    const staffMember = { ...newStaff, id: newId }
    setStaff([...staff, staffMember])
    setNewStaff({ id: "", name: "", role: "", salary: "", shift: "", joiningDate: "" })
    setIsAddingStaff(false)
  }

  // Handle edit staff form submission
  const handleEditStaffSubmit = (e) => {
    e.preventDefault()
    const updatedStaff = staff.map((s) => (s.id === editingStaff.id ? editingStaff : s))
    setStaff(updatedStaff)
    setIsEditingStaff(false)
    setEditingStaff(null)
  }

  // Start editing staff
  const startEditStaff = (staffMember) => {
    setEditingStaff({ ...staffMember })
    setIsEditingStaff(true)
  }

  // Handle attendance form submission
  const handleAttendanceSubmit = (e) => {
    e.preventDefault()
    const newId = `ATT${String(attendance.length + 1).padStart(3, "0")}`
    const attendanceRecord = { ...newAttendance, id: newId }
    setAttendance([...attendance, attendanceRecord])
    setNewAttendance({ employeeId: "", date: "", inTime: "", outTime: "", status: "Present" })
    setIsAddingAttendance(false)
  }

  // Handle edit attendance form submission
  const handleEditAttendanceSubmit = (e) => {
    e.preventDefault()
    const updatedAttendance = attendance.map((a) => (a.id === editingAttendance.id ? editingAttendance : a))
    setAttendance(updatedAttendance)
    setIsEditingAttendance(false)
    setEditingAttendance(null)
  }

  // Start editing attendance
  const startEditAttendance = (attendanceRecord) => {
    setEditingAttendance({ ...attendanceRecord })
    setIsEditingAttendance(true)
  }

  // Delete attendance record
  const deleteAttendance = (id) => {
    setAttendance(attendance.filter((a) => a.id !== id))
  }

  // Handle payroll form submission
  const handlePayrollSubmit = (e) => {
    e.preventDefault()
    const employeeData = staff.find((s) => s.id === newPayroll.employeeId)
    const salary = Number.parseInt(employeeData.salary)
    const presentDays = Number.parseInt(newPayroll.presentDays)
    const overtime = Number.parseInt(newPayroll.overtime)
    const deductions = Number.parseInt(newPayroll.deductions)

    // Calculate net salary: base + overtime - deductions
    const overtimeRate = (salary / 26 / 8) * 1.5 // Assuming 26 working days and 8 hours per day with 1.5x overtime rate
    const overtimePay = overtimeRate * overtime
    const netSalary = salary + overtimePay - deductions

    const newId = `PAY${String(payroll.length + 1).padStart(3, "0")}`
    const payrollRecord = {
      ...newPayroll,
      id: newId,
      netSalary: Math.round(netSalary),
    }

    setPayroll([...payroll, payrollRecord])
    setNewPayroll({ employeeId: "", month: "", presentDays: "", overtime: "", deductions: "" })
    setIsAddingPayroll(false)
  }

  // Handle edit payroll form submission
  const handleEditPayrollSubmit = (e) => {
    e.preventDefault()

    const employeeData = staff.find((s) => s.id === editingPayroll.employeeId)
    const salary = Number.parseInt(employeeData.salary)
    const presentDays = Number.parseInt(editingPayroll.presentDays)
    const overtime = Number.parseInt(editingPayroll.overtime)
    const deductions = Number.parseInt(editingPayroll.deductions)

    // Calculate net salary: base + overtime - deductions
    const overtimeRate = (salary / 26 / 8) * 1.5
    const overtimePay = overtimeRate * overtime
    const netSalary = salary + overtimePay - deductions

    const updatedPayroll = {
      ...editingPayroll,
      netSalary: Math.round(netSalary),
    }

    const updatedPayrollList = payroll.map((p) => (p.id === updatedPayroll.id ? updatedPayroll : p))
    setPayroll(updatedPayrollList)
    setIsEditingPayroll(false)
    setEditingPayroll(null)
  }

  // Start editing payroll
  const startEditPayroll = (payrollRecord) => {
    setEditingPayroll({ ...payrollRecord })
    setIsEditingPayroll(true)
  }

  // Delete payroll record
  const deletePayroll = (id) => {
    setPayroll(payroll.filter((p) => p.id !== id))
  }

  // Filter staff based on search term
  const filteredStaff = staff.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Get employee name by ID
  const getEmployeeName = (id) => {
    const employee = staff.find((s) => s.id === id)
    return employee ? employee.name : "Unknown"
  }

  // Delete staff member
  const deleteStaff = (id) => {
    setStaff(staff.filter((s) => s.id !== id))
    // Also delete related attendance and payroll records
    setAttendance(attendance.filter((a) => a.employeeId !== id))
    setPayroll(payroll.filter((p) => p.employeeId !== id))
  }

  return (
    <div className="flex  min-h-screen w-screen">
      <div className="w-[300px]">
        <RestoNav />
      </div>
      <div className=" p-4 flex-1 w-[calc(100vw-300px)]">
        <h1 className="text-2xl font-bold mb-6 flex items-center mt-4">
          <UserCheck className="mr-2" /> HR & Payroll Management
        </h1>

        <Tabs defaultValue="staff" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="staff" className="flex items-center">
              <UserPlus className="mr-2 h-4 w-4" /> Staff
            </TabsTrigger>
            <TabsTrigger value="attendance" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" /> Attendance
            </TabsTrigger>
            <TabsTrigger value="payroll" className="flex items-center">
              <DollarSign className="mr-2 h-4 w-4" /> Payroll
            </TabsTrigger>
          </TabsList>

          {/* Staff Management Tab */}
          <TabsContent value="staff">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Staff Management</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search staff..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Dialog open={isAddingStaff} onOpenChange={setIsAddingStaff}>
                      <DialogTrigger asChild>
                        <Button>
                          <UserPlus className="mr-2 h-4 w-4" /> Add Staff
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Staff Member</DialogTitle>
                          <DialogDescription>Enter the details of the new staff member.</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleStaffSubmit}>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right">
                                Name
                              </Label>
                              <Input
                                id="name"
                                value={newStaff.name}
                                onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                                className="col-span-3"
                                required
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="role" className="text-right">
                                Role
                              </Label>
                              <Select onValueChange={(value) => setNewStaff({ ...newStaff, role: value })} required>
                                <SelectTrigger className="col-span-3">
                                  <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Chef">Chef</SelectItem>
                                  <SelectItem value="Waiter">Waiter</SelectItem>
                                  <SelectItem value="Cashier">Cashier</SelectItem>
                                  <SelectItem value="Manager">Manager</SelectItem>
                                  <SelectItem value="Cleaner">Cleaner</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="salary" className="text-right">
                                Salary (₹)
                              </Label>
                              <Input
                                id="salary"
                                type="number"
                                value={newStaff.salary}
                                onChange={(e) => setNewStaff({ ...newStaff, salary: e.target.value })}
                                className="col-span-3"
                                required
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="shift" className="text-right">
                                Shift
                              </Label>
                              <Select onValueChange={(value) => setNewStaff({ ...newStaff, shift: value })} required>
                                <SelectTrigger className="col-span-3">
                                  <SelectValue placeholder="Select shift" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Morning">Morning (9AM-6PM)</SelectItem>
                                  <SelectItem value="Evening">Evening (4PM-12AM)</SelectItem>
                                  <SelectItem value="Night">Night (11PM-7AM)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="joiningDate" className="text-right">
                                Joining Date
                              </Label>
                              <Input
                                id="joiningDate"
                                type="date"
                                value={newStaff.joiningDate}
                                onChange={(e) => setNewStaff({ ...newStaff, joiningDate: e.target.value })}
                                className="col-span-3"
                                required
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit">Add Staff</Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <CardDescription>Manage your restaurant staff information, roles, and details.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Salary (₹)</TableHead>
                      <TableHead>Shift</TableHead>
                      <TableHead>Joining Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStaff.map((staffMember) => (
                      <TableRow key={staffMember.id}>
                        <TableCell>{staffMember.id}</TableCell>
                        <TableCell>{staffMember.name}</TableCell>
                        <TableCell>{staffMember.role}</TableCell>
                        <TableCell>{Number.parseInt(staffMember.salary).toLocaleString("en-IN")}</TableCell>
                        <TableCell>{staffMember.shift}</TableCell>
                        <TableCell>{new Date(staffMember.joiningDate).toLocaleDateString("en-IN")}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="icon" onClick={() => startEditStaff(staffMember)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => deleteStaff(staffMember.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Edit Staff Dialog */}
            <Dialog open={isEditingStaff} onOpenChange={setIsEditingStaff}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Staff Member</DialogTitle>
                  <DialogDescription>Update the details of the staff member.</DialogDescription>
                </DialogHeader>
                {editingStaff && (
                  <form onSubmit={handleEditStaffSubmit}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="edit-name"
                          value={editingStaff.name}
                          onChange={(e) => setEditingStaff({ ...editingStaff, name: e.target.value })}
                          className="col-span-3"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-role" className="text-right">
                          Role
                        </Label>
                        <Select
                          value={editingStaff.role}
                          onValueChange={(value) => setEditingStaff({ ...editingStaff, role: value })}
                          required
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Chef">Chef</SelectItem>
                            <SelectItem value="Waiter">Waiter</SelectItem>
                            <SelectItem value="Cashier">Cashier</SelectItem>
                            <SelectItem value="Manager">Manager</SelectItem>
                            <SelectItem value="Cleaner">Cleaner</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-salary" className="text-right">
                          Salary (₹)
                        </Label>
                        <Input
                          id="edit-salary"
                          type="number"
                          value={editingStaff.salary}
                          onChange={(e) => setEditingStaff({ ...editingStaff, salary: e.target.value })}
                          className="col-span-3"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-shift" className="text-right">
                          Shift
                        </Label>
                        <Select
                          value={editingStaff.shift}
                          onValueChange={(value) => setEditingStaff({ ...editingStaff, shift: value })}
                          required
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select shift" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Morning">Morning (9AM-6PM)</SelectItem>
                            <SelectItem value="Evening">Evening (4PM-12AM)</SelectItem>
                            <SelectItem value="Night">Night (11PM-7AM)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-joiningDate" className="text-right">
                          Joining Date
                        </Label>
                        <Input
                          id="edit-joiningDate"
                          type="date"
                          value={editingStaff.joiningDate}
                          onChange={(e) => setEditingStaff({ ...editingStaff, joiningDate: e.target.value })}
                          className="col-span-3"
                          required
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Update Staff</Button>
                    </DialogFooter>
                  </form>
                )}
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Attendance Tab */}
          <TabsContent value="attendance">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Attendance Management</CardTitle>
                  <Dialog open={isAddingAttendance} onOpenChange={setIsAddingAttendance}>
                    <DialogTrigger asChild>
                      <Button>
                        <Clock className="mr-2 h-4 w-4" /> Mark Attendance
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Mark Attendance</DialogTitle>
                        <DialogDescription>Record staff attendance for the day.</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleAttendanceSubmit}>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="employeeId" className="text-right">
                              Employee
                            </Label>
                            <Select
                              onValueChange={(value) => setNewAttendance({ ...newAttendance, employeeId: value })}
                              required
                            >
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select employee" />
                              </SelectTrigger>
                              <SelectContent>
                                {staff.map((s) => (
                                  <SelectItem key={s.id} value={s.id}>
                                    {s.name} ({s.id})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="date" className="text-right">
                              Date
                            </Label>
                            <Input
                              id="date"
                              type="date"
                              value={newAttendance.date}
                              onChange={(e) => setNewAttendance({ ...newAttendance, date: e.target.value })}
                              className="col-span-3"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                              Status
                            </Label>
                            <Select
                              defaultValue="Present"
                              onValueChange={(value) => setNewAttendance({ ...newAttendance, status: value })}
                            >
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Present">Present</SelectItem>
                                <SelectItem value="Absent">Absent</SelectItem>
                                <SelectItem value="Half Day">Half Day</SelectItem>
                                <SelectItem value="Leave">Leave</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          {newAttendance.status !== "Absent" && (
                            <>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="inTime" className="text-right">
                                  In Time
                                </Label>
                                <Input
                                  id="inTime"
                                  type="time"
                                  value={newAttendance.inTime}
                                  onChange={(e) => setNewAttendance({ ...newAttendance, inTime: e.target.value })}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="outTime" className="text-right">
                                  Out Time
                                </Label>
                                <Input
                                  id="outTime"
                                  type="time"
                                  value={newAttendance.outTime}
                                  onChange={(e) => setNewAttendance({ ...newAttendance, outTime: e.target.value })}
                                  className="col-span-3"
                                />
                              </div>
                            </>
                          )}
                        </div>
                        <DialogFooter>
                          <Button type="submit">Save Attendance</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                <CardDescription>Track daily attendance, in/out times, and attendance status.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Employee</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>In Time</TableHead>
                      <TableHead>Out Time</TableHead>
                      <TableHead>Hours</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendance.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>{new Date(record.date).toLocaleDateString("en-IN")}</TableCell>
                        <TableCell>{getEmployeeName(record.employeeId)}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              record.status === "Present"
                                ? "bg-green-100 text-green-800"
                                : record.status === "Absent"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {record.status}
                          </span>
                        </TableCell>
                        <TableCell>{record.inTime || "-"}</TableCell>
                        <TableCell>{record.outTime || "-"}</TableCell>
                        <TableCell>
                          {record.inTime && record.outTime
                            ? (() => {
                                const [inHours, inMinutes] = record.inTime.split(":").map(Number)
                                const [outHours, outMinutes] = record.outTime.split(":").map(Number)
                                const totalMinutes = outHours * 60 + outMinutes - (inHours * 60 + inMinutes)
                                const hours = Math.floor(totalMinutes / 60)
                                const minutes = totalMinutes % 60
                                return `${hours}h ${minutes}m`
                              })()
                            : "-"}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="icon" onClick={() => startEditAttendance(record)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => deleteAttendance(record.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Edit Attendance Dialog */}
            <Dialog open={isEditingAttendance} onOpenChange={setIsEditingAttendance}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Attendance Record</DialogTitle>
                  <DialogDescription>Update the attendance details.</DialogDescription>
                </DialogHeader>
                {editingAttendance && (
                  <form onSubmit={handleEditAttendanceSubmit}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-employee" className="text-right">
                          Employee
                        </Label>
                        <Select
                          value={editingAttendance.employeeId}
                          onValueChange={(value) => setEditingAttendance({ ...editingAttendance, employeeId: value })}
                          required
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select employee" />
                          </SelectTrigger>
                          <SelectContent>
                            {staff.map((s) => (
                              <SelectItem key={s.id} value={s.id}>
                                {s.name} ({s.id})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-date" className="text-right">
                          Date
                        </Label>
                        <Input
                          id="edit-date"
                          type="date"
                          value={editingAttendance.date}
                          onChange={(e) => setEditingAttendance({ ...editingAttendance, date: e.target.value })}
                          className="col-span-3"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-status" className="text-right">
                          Status
                        </Label>
                        <Select
                          value={editingAttendance.status}
                          onValueChange={(value) => setEditingAttendance({ ...editingAttendance, status: value })}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Present">Present</SelectItem>
                            <SelectItem value="Absent">Absent</SelectItem>
                            <SelectItem value="Half Day">Half Day</SelectItem>
                            <SelectItem value="Leave">Leave</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {editingAttendance.status !== "Absent" && (
                        <>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-inTime" className="text-right">
                              In Time
                            </Label>
                            <Input
                              id="edit-inTime"
                              type="time"
                              value={editingAttendance.inTime}
                              onChange={(e) => setEditingAttendance({ ...editingAttendance, inTime: e.target.value })}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-outTime" className="text-right">
                              Out Time
                            </Label>
                            <Input
                              id="edit-outTime"
                              type="time"
                              value={editingAttendance.outTime}
                              onChange={(e) => setEditingAttendance({ ...editingAttendance, outTime: e.target.value })}
                              className="col-span-3"
                            />
                          </div>
                        </>
                      )}
                    </div>
                    <DialogFooter>
                      <Button type="submit">Update Attendance</Button>
                    </DialogFooter>
                  </form>
                )}
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Payroll Tab */}
          <TabsContent value="payroll">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Payroll Management</CardTitle>
                  <div className="flex gap-2">
                    <Select value={currentMonth} onValueChange={setCurrentMonth}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select month" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="May 2025">May 2025</SelectItem>
                        <SelectItem value="April 2025">April 2025</SelectItem>
                        <SelectItem value="March 2025">March 2025</SelectItem>
                      </SelectContent>
                    </Select>
                    <Dialog open={isAddingPayroll} onOpenChange={setIsAddingPayroll}>
                      <DialogTrigger asChild>
                        <Button>
                          <DollarSign className="mr-2 h-4 w-4" /> Process Payroll
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Process Payroll</DialogTitle>
                          <DialogDescription>Calculate and process employee salary.</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handlePayrollSubmit}>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="employeeId" className="text-right">
                                Employee
                              </Label>
                              <Select
                                onValueChange={(value) => setNewPayroll({ ...newPayroll, employeeId: value })}
                                required
                              >
                                <SelectTrigger className="col-span-3">
                                  <SelectValue placeholder="Select employee" />
                                </SelectTrigger>
                                <SelectContent>
                                  {staff.map((s) => (
                                    <SelectItem key={s.id} value={s.id}>
                                      {s.name} ({s.id})
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="month" className="text-right">
                                Month
                              </Label>
                              <Select
                                onValueChange={(value) => setNewPayroll({ ...newPayroll, month: value })}
                                required
                              >
                                <SelectTrigger className="col-span-3">
                                  <SelectValue placeholder="Select month" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="May 2025">May 2025</SelectItem>
                                  <SelectItem value="April 2025">April 2025</SelectItem>
                                  <SelectItem value="March 2025">March 2025</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="presentDays" className="text-right">
                                Present Days
                              </Label>
                              <Input
                                id="presentDays"
                                type="number"
                                min="0"
                                max="31"
                                value={newPayroll.presentDays}
                                onChange={(e) => setNewPayroll({ ...newPayroll, presentDays: e.target.value })}
                                className="col-span-3"
                                required
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="overtime" className="text-right">
                                Overtime (hrs)
                              </Label>
                              <Input
                                id="overtime"
                                type="number"
                                min="0"
                                value={newPayroll.overtime}
                                onChange={(e) => setNewPayroll({ ...newPayroll, overtime: e.target.value })}
                                className="col-span-3"
                                required
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="deductions" className="text-right">
                                Deductions (₹)
                              </Label>
                              <Input
                                id="deductions"
                                type="number"
                                min="0"
                                value={newPayroll.deductions}
                                onChange={(e) => setNewPayroll({ ...newPayroll, deductions: e.target.value })}
                                className="col-span-3"
                                required
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit">Process Payroll</Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <CardDescription>Process monthly payroll, calculate salaries, and generate pay slips.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Month</TableHead>
                      <TableHead>Present Days</TableHead>
                      <TableHead>Overtime (hrs)</TableHead>
                      <TableHead>Deductions (₹)</TableHead>
                      <TableHead>Net Salary (₹)</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payroll
                      .filter((p) => p.month === currentMonth)
                      .map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>{getEmployeeName(record.employeeId)}</TableCell>
                          <TableCell>{record.month}</TableCell>
                          <TableCell>{record.presentDays}</TableCell>
                          <TableCell>{record.overtime}</TableCell>
                          <TableCell>{Number.parseInt(record.deductions).toLocaleString("en-IN")}</TableCell>
                          <TableCell className="font-medium">
                            {Number.parseInt(record.netSalary).toLocaleString("en-IN")}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="icon" onClick={() => startEditPayroll(record)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="icon" onClick={() => deletePayroll(record.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="icon">
                                <FileText className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="icon">
                                <Printer className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Edit Payroll Dialog */}
            <Dialog open={isEditingPayroll} onOpenChange={setIsEditingPayroll}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Payroll Record</DialogTitle>
                  <DialogDescription>Update the payroll details.</DialogDescription>
                </DialogHeader>
                {editingPayroll && (
                  <form onSubmit={handleEditPayrollSubmit}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-payroll-employee" className="text-right">
                          Employee
                        </Label>
                        <Select
                          value={editingPayroll.employeeId}
                          onValueChange={(value) => setEditingPayroll({ ...editingPayroll, employeeId: value })}
                          required
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select employee" />
                          </SelectTrigger>
                          <SelectContent>
                            {staff.map((s) => (
                              <SelectItem key={s.id} value={s.id}>
                                {s.name} ({s.id})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-payroll-month" className="text-right">
                          Month
                        </Label>
                        <Select
                          value={editingPayroll.month}
                          onValueChange={(value) => setEditingPayroll({ ...editingPayroll, month: value })}
                          required
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select month" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="May 2025">May 2025</SelectItem>
                            <SelectItem value="April 2025">April 2025</SelectItem>
                            <SelectItem value="March 2025">March 2025</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-payroll-presentDays" className="text-right">
                          Present Days
                        </Label>
                        <Input
                          id="edit-payroll-presentDays"
                          type="number"
                          min="0"
                          max="31"
                          value={editingPayroll.presentDays}
                          onChange={(e) => setEditingPayroll({ ...editingPayroll, presentDays: e.target.value })}
                          className="col-span-3"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-payroll-overtime" className="text-right">
                          Overtime (hrs)
                        </Label>
                        <Input
                          id="edit-payroll-overtime"
                          type="number"
                          min="0"
                          value={editingPayroll.overtime}
                          onChange={(e) => setEditingPayroll({ ...editingPayroll, overtime: e.target.value })}
                          className="col-span-3"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-payroll-deductions" className="text-right">
                          Deductions (₹)
                        </Label>
                        <Input
                          id="edit-payroll-deductions"
                          type="number"
                          min="0"
                          value={editingPayroll.deductions}
                          onChange={(e) => setEditingPayroll({ ...editingPayroll, deductions: e.target.value })}
                          className="col-span-3"
                          required
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Update Payroll</Button>
                    </DialogFooter>
                  </form>
                )}
              </DialogContent>
            </Dialog>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
