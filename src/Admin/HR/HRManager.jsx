import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import Nav from "../Nav";
import {
  Bell,
  UserPlus,
  BadgeCheck,
  Users,
  Edit,
  Trash2,
  Search,
  Download,
  Send,
  CheckCircle,
  XCircle,
  Eye,
  Calendar,
  DollarSign,
  Clock,
} from "lucide-react";

export default function HRManager() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john@company.com",
      department: "Engineering",
      position: "Developer",
      salary: 75000,
      joinDate: "2023-01-15",
      status: "Active",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@company.com",
      department: "Marketing",
      position: "Manager",
      salary: 85000,
      joinDate: "2022-08-20",
      status: "Active",
    },
    {
      id: 3,
      firstName: "Mike",
      lastName: "Johnson",
      email: "mike@company.com",
      department: "Sales",
      position: "Executive",
      salary: 65000,
      joinDate: "2023-03-10",
      status: "Active",
    },
  ]);

  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      employeeId: 1,
      name: "John Doe",
      type: "Vacation",
      startDate: "2024-02-01",
      endDate: "2024-02-05",
      days: 5,
      reason: "Family vacation",
      status: "pending",
    },
    {
      id: 2,
      employeeId: 2,
      name: "Jane Smith",
      type: "Sick",
      startDate: "2024-01-28",
      endDate: "2024-01-29",
      days: 2,
      reason: "Flu symptoms",
      status: "pending",
    },
    {
      id: 3,
      employeeId: 3,
      name: "Mike Johnson",
      type: "Personal",
      startDate: "2024-02-10",
      endDate: "2024-02-12",
      days: 3,
      reason: "Personal matters",
      status: "approved",
    },
  ]);

  const [attendance] = useState({
    present: 132,
    absent: 10,
    late: 5,
    totalEmployees: 147,
  });

  const [payrollData, setPayrollData] = useState([
    {
      id: 1,
      month: "January 2024",
      processed: true,
      sent: true,
      totalAmount: 450000,
    },
    {
      id: 2,
      month: "February 2024",
      processed: true,
      sent: false,
      totalAmount: 465000,
    },
    {
      id: 3,
      month: "March 2024",
      processed: false,
      sent: false,
      totalAmount: 0,
    },
  ]);

  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [isEditEmployeeOpen, setIsEditEmployeeOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [newEmployee, setNewEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    position: "",
    salary: "",
    joinDate: "",
  });

  const addEmployee = () => {
    if (newEmployee.firstName && newEmployee.lastName && newEmployee.email) {
      const employee = {
        id: employees.length + 1,
        ...newEmployee,
        salary: Number.parseInt(newEmployee.salary),
        status: "Active",
      };
      setEmployees([...employees, employee]);
      setNewEmployee({
        firstName: "",
        lastName: "",
        email: "",
        department: "",
        position: "",
        salary: "",
        joinDate: "",
      });
      setIsAddEmployeeOpen(false);
    }
  };

  const updateEmployee = () => {
    setEmployees(
      employees.map((emp) =>
        emp.id === editingEmployee.id ? editingEmployee : emp
      )
    );
    setIsEditEmployeeOpen(false);
    setEditingEmployee(null);
  };

  const deleteEmployee = (id) =>
    setEmployees(employees.filter((emp) => emp.id !== id));
  const approveLeave = (id) =>
    setLeaveRequests(
      leaveRequests.map((req) =>
        req.id === id ? { ...req, status: "approved" } : req
      )
    );
  const rejectLeave = (id) =>
    setLeaveRequests(
      leaveRequests.map((req) =>
        req.id === id ? { ...req, status: "rejected" } : req
      )
    );

  const processPayroll = (id) => {
    setPayrollData(
      payrollData.map((payroll) =>
        payroll.id === id
          ? {
              ...payroll,
              processed: true,
              totalAmount: employees.reduce((sum, emp) => sum + emp.salary, 0),
            }
          : payroll
      )
    );
  };

  const sendPayslips = (id) =>
    setPayrollData(
      payrollData.map((payroll) =>
        payroll.id === id ? { ...payroll, sent: true } : payroll
      )
    );

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      departmentFilter === "all" || emp.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const departments = [...new Set(employees.map((emp) => emp.department))];
  const stats = [
    {
      title: "Total Employees",
      value: employees.length,
      icon: Users,
      color: "blue",
    },
    {
      title: "Present Today",
      value: attendance.present,
      icon: BadgeCheck,
      color: "green",
    },
    {
      title: "Absent Today",
      value: attendance.absent,
      icon: XCircle,
      color: "red",
    },
    {
      title: "Pending Leaves",
      value: leaveRequests.filter((req) => req.status === "pending").length,
      icon: Calendar,
      color: "orange",
    },
  ];

  const EmployeeForm = ({ employee, onSave, isEdit = false }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>First Name</Label>
          <Input
            value={employee.firstName}
            onChange={(e) => onSave({ ...employee, firstName: e.target.value })}
          />
        </div>
        <div>
          <Label>Last Name</Label>
          <Input
            value={employee.lastName}
            onChange={(e) => onSave({ ...employee, lastName: e.target.value })}
          />
        </div>
      </div>
      <div>
        <Label>Email</Label>
        <Input
          type="email"
          value={employee.email}
          onChange={(e) => onSave({ ...employee, email: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Department</Label>
          <Select
            onValueChange={(value) =>
              onSave({ ...employee, department: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {["Engineering", "Marketing", "Sales", "HR", "Finance"].map(
                (dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Position</Label>
          <Input
            value={employee.position}
            onChange={(e) => onSave({ ...employee, position: e.target.value })}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Salary</Label>
          <Input
            type="number"
            value={employee.salary}
            onChange={(e) =>
              onSave({
                ...employee,
                salary: isEdit
                  ? Number.parseInt(e.target.value)
                  : e.target.value,
              })
            }
          />
        </div>
        <div>
          <Label>Join Date</Label>
          <Input
            type="date"
            value={employee.joinDate}
            onChange={(e) => onSave({ ...employee, joinDate: e.target.value })}
          />
        </div>
      </div>
      <Button
        onClick={isEdit ? updateEmployee : addEmployee}
        className="w-full"
      >
        {isEdit ? "Update" : "Add"} Employee
      </Button>
    </div>
  );

  return (
    <div className="ml-64">
      <Nav />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                HR Management Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Manage employees, attendance, and payroll
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Dialog
                open={isAddEmployeeOpen}
                onOpenChange={setIsAddEmployeeOpen}
              >
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Employee
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Employee</DialogTitle>
                  </DialogHeader>
                  <EmployeeForm
                    employee={newEmployee}
                    onSave={setNewEmployee}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => (
              <Card key={idx} className="bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </p>
                      <p
                        className={`text-2xl font-bold text-${stat.color}-600`}
                      >
                        {stat.value}
                      </p>
                    </div>
                    <stat.icon className={`w-8 h-8 text-${stat.color}-600`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="employees" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="employees">Employees</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="leaves">Leave Requests</TabsTrigger>
              <TabsTrigger value="payroll">Payroll</TabsTrigger>
            </TabsList>

            <TabsContent value="employees">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Employee Management</CardTitle>
                    <div className="flex gap-3">
                      <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                        <Input
                          placeholder="Search employees..."
                          className="pl-10 w-64"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <Select
                        value={departmentFilter}
                        onValueChange={setDepartmentFilter}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Departments</SelectItem>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredEmployees.map((employee) => (
                      <motion.div
                        key={employee.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-semibold">
                                {employee.firstName[0]}
                                {employee.lastName[0]}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {employee.firstName} {employee.lastName}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {employee.position} • {employee.department}
                              </p>
                              <p className="text-sm text-gray-500">
                                {employee.email}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              ${employee.salary.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-500">
                              Joined {employee.joinDate}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setEditingEmployee(employee);
                                setIsEditEmployeeOpen(true);
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteEmployee(employee.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="leaves">
              <Card>
                <CardHeader>
                  <CardTitle>Leave Requests Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {leaveRequests.map((request) => (
                      <motion.div
                        key={request.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                              <Calendar className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {request.name}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {request.type} Leave • {request.days} days
                              </p>
                              <p className="text-sm text-gray-500">
                                {request.startDate} to {request.endDate}
                              </p>
                              <p className="text-sm text-gray-500">
                                Reason: {request.reason}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              request.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : request.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {request.status.charAt(0).toUpperCase() +
                              request.status.slice(1)}
                          </span>
                          {request.status === "pending" && (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => approveLeave(request.id)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => rejectLeave(request.id)}
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payroll">
              <Card>
                <CardHeader>
                  <CardTitle>Payroll Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {payrollData.map((payroll) => (
                      <motion.div
                        key={payroll.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {payroll.month}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {payroll.processed
                                ? `Total: $${payroll.totalAmount.toLocaleString()}`
                                : "Not processed"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex gap-2">
                            {payroll.processed && (
                              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                Processed
                              </span>
                            )}
                            {payroll.sent && (
                              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                Sent
                              </span>
                            )}
                          </div>
                          <div className="flex gap-2">
                            {!payroll.processed && (
                              <Button
                                size="sm"
                                onClick={() => processPayroll(payroll.id)}
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                <Clock className="w-4 h-4 mr-1" />
                                Process
                              </Button>
                            )}
                            {payroll.processed && !payroll.sent && (
                              <Button
                                size="sm"
                                onClick={() => sendPayslips(payroll.id)}
                                variant="outline"
                              >
                                <Send className="w-4 h-4 mr-1" />
                                Send Payslips
                              </Button>
                            )}
                            {payroll.processed && (
                              <Button size="sm" variant="outline">
                                <Download className="w-4 h-4 mr-1" />
                                Download
                              </Button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attendance">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Today's Attendance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          label: "Present",
                          value: attendance.present,
                          color: "green",
                          icon: CheckCircle,
                        },
                        {
                          label: "Absent",
                          value: attendance.absent,
                          color: "red",
                          icon: XCircle,
                        },
                        {
                          label: "Late",
                          value: attendance.late,
                          color: "yellow",
                          icon: Clock,
                        },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className={`flex items-center justify-between p-4 bg-${item.color}-50 rounded-lg`}
                        >
                          <div className="flex items-center gap-3">
                            <item.icon
                              className={`w-6 h-6 text-${item.color}-600`}
                            />
                            <span className="font-medium">{item.label}</span>
                          </div>
                          <span
                            className={`text-2xl font-bold text-${item.color}-600`}
                          >
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Attendance Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { label: "Export Attendance Report", icon: Download },
                      { label: "View Detailed Report", icon: Eye },
                      { label: "Monthly Summary", icon: Calendar },
                    ].map((action, idx) => (
                      <Button key={idx} className="w-full" variant="outline">
                        <action.icon className="w-4 h-4 mr-2" />
                        {action.label}
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <Dialog
            open={isEditEmployeeOpen}
            onOpenChange={setIsEditEmployeeOpen}
          >
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Edit Employee</DialogTitle>
              </DialogHeader>
              {editingEmployee && (
                <EmployeeForm
                  employee={editingEmployee}
                  onSave={setEditingEmployee}
                  isEdit={true}
                />
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
