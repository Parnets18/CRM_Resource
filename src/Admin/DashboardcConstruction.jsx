

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  Building,
  Calendar,
  Clock,
  DollarSign,
  FileText,
  HardHat,
  Package,
  ShoppingCart,
  Truck,
  Users,
  Wallet,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Nav from "./Nav";

// Sample data for demonstration
const siteData = [
  {
    id: 1,
    name: "Commercial Tower - Phase 1",
    location: "Mumbai",
    progress: 65,
    status: "In Progress",
    manager: "Kiran Kumar",
  },
  {
    id: 2,
    name: "Residential Complex",
    location: "Delhi",
    progress: 40,
    status: "In Progress",
    manager: "Shreya Kumari",
  },
  {
    id: 3,
    name: "Highway Project",
    location: "Bangalore",
    progress: 90,
    status: "Near Completion",
    manager: "Chandra sekhar",
  },
  {
    id: 4,
    name: "Shopping Mall",
    location: "Chennai",
    progress: 20,
    status: "Just Started",
    manager: "Neha Gupta",
  },
];

const taskData = [
  {
    id: 1,
    title: "Foundation Work",
    site: "Commercial Tower",
    assignedTo: "Team A",
    status: "Completed",
    dueDate: "2025-05-15",
  },
  {
    id: 2,
    title: "Electrical Wiring",
    site: "Residential Complex",
    assignedTo: "Team B",
    status: "In Progress",
    dueDate: "2025-06-10",
  },
  {
    id: 3,
    title: "Plumbing Installation",
    site: "Commercial Tower",
    assignedTo: "Team C",
    status: "Delayed",
    dueDate: "2025-05-20",
  },
  {
    id: 4,
    title: "Concrete Pouring",
    site: "Highway Project",
    assignedTo: "Team D",
    status: "In Progress",
    dueDate: "2025-05-25",
  },
  {
    id: 5,
    title: "Interior Design",
    site: "Shopping Mall",
    assignedTo: "Team E",
    status: "Not Started",
    dueDate: "2025-07-05",
  },
];

const indentData = [
  {
    id: 1,
    item: "Cement Bags",
    quantity: 500,
    site: "Commercial Tower",
    status: "Approved",
    urgency: "High",
  },
  {
    id: 2,
    item: "Steel Rods",
    quantity: 200,
    site: "Residential Complex",
    status: "Pending",
    urgency: "Medium",
  },
  {
    id: 3,
    item: "Bricks",
    quantity: 5000,
    site: "Highway Project",
    status: "Issued",
    urgency: "Low",
  },
  {
    id: 4,
    item: "Sand",
    quantity: 20,
    site: "Shopping Mall",
    status: "Rejected",
    urgency: "Medium",
  },
];

const employeeData = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Site Supervisor",
    site: "Commercial Tower",
    attendance: "Present",
  },
  {
    id: 2,
    name: "Sunil Verma",
    role: "Worker",
    site: "Residential Complex",
    attendance: "Absent",
  },
  {
    id: 3,
    name: "Meena Gupta",
    role: "Engineer",
    site: "Highway Project",
    attendance: "Present",
  },
  {
    id: 4,
    name: "Anil Sharma",
    role: "Worker",
    site: "Shopping Mall",
    attendance: "Present",
  },
];

const expenseData = [
  {
    id: 1,
    description: "Diesel Purchase",
    amount: 12000,
    site: "Commercial Tower",
    status: "Approved",
  },
  {
    id: 2,
    description: "Local Transport",
    amount: 5000,
    site: "Residential Complex",
    status: "Pending",
  },
  {
    id: 3,
    description: "Equipment Rental",
    amount: 25000,
    site: "Highway Project",
    status: "Approved",
  },
  {
    id: 4,
    description: "Office Supplies",
    amount: 3000,
    site: "Shopping Mall",
    status: "Rejected",
  },
];

const purchaseData = [
  {
    id: 1,
    poNumber: "PO-2025-001",
    vendor: "ABC Suppliers",
    amount: 250000,
    status: "Delivered",
  },
  {
    id: 2,
    poNumber: "PO-2025-002",
    vendor: "XYZ Materials",
    amount: 180000,
    status: "In Transit",
  },
  {
    id: 3,
    poNumber: "PO-2025-003",
    vendor: "PQR Traders",
    amount: 320000,
    status: "Pending Approval",
  },
  {
    id: 4,
    poNumber: "PO-2025-004",
    vendor: "LMN Enterprises",
    amount: 95000,
    status: "Ordered",
  },
];

const salesData = [
  {
    id: 1,
    invoiceNumber: "INV-2025-001",
    client: "ABC Constructions",
    amount: 1500000,
    status: "Paid",
  },
  {
    id: 2,
    invoiceNumber: "INV-2025-002",
    client: "XYZ Developers",
    amount: 2200000,
    status: "Partial",
  },
  {
    id: 3,
    invoiceNumber: "INV-2025-003",
    client: "PQR Builders",
    amount: 1800000,
    status: "Unpaid",
  },
  {
    id: 4,
    invoiceNumber: "INV-2025-004",
    client: "LMN Properties",
    amount: 3500000,
    status: "Paid",
  },
];

const alertData = [
  {
    id: 1,
    message: "Cement stock below reorder level",
    type: "Inventory",
    severity: "High",
  },
  {
    id: 2,
    message: "Task 'Electrical Wiring' is delayed",
    type: "Task",
    severity: "Medium",
  },
  {
    id: 3,
    message: "Worker attendance below 80% at Residential Complex",
    type: "HR",
    severity: "Medium",
  },
  {
    id: 4,
    message: "Invoice INV-2025-003 payment overdue",
    type: "Finance",
    severity: "High",
  },
];

export default function ConstructionDashboard() {
  const [selectedSite, setSelectedSite] = useState("all");

  // Filter data based on selected site
  const filteredTasks =
    selectedSite === "all"
      ? taskData
      : taskData.filter((task) =>
          task.site.toLowerCase().includes(selectedSite.toLowerCase())
        );

  const filteredIndents =
    selectedSite === "all"
      ? indentData
      : indentData.filter((indent) =>
          indent.site.toLowerCase().includes(selectedSite.toLowerCase())
        );

  // Calculate statistics
  const totalSites = siteData.length;
  const completedTasks = taskData.filter(
    (task) => task.status === "Completed"
  ).length;
  const pendingTasks = taskData.filter(
    (task) => task.status !== "Completed"
  ).length;
  const totalEmployees = employeeData.length;
  const presentEmployees = employeeData.filter(
    (emp) => emp.attendance === "Present"
  ).length;
  const totalExpenses = expenseData.reduce((sum, exp) => sum + exp.amount, 0);
  const totalSales = salesData.reduce((sum, sale) => sum + sale.amount, 0);
  const profit = totalSales - totalExpenses;

  return (
    <div className="ml-64">
      <Nav />
      <div className="container mx-auto p-4">
        <header className="flex justify-between items-center mb-6 ">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <Building className="mr-2" /> Construction Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage all your construction projects in one place
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-8 w-64" />
            </div>
            <Select value={selectedSite} onValueChange={setSelectedSite}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Site" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sites</SelectItem>
                {siteData.map((site) => (
                  <SelectItem key={site.id} value={site.name}>
                    {site.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button>
              <FileText className="mr-2 h-4 w-4" /> Generate Report
            </Button>
          </div>
        </header>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Active Sites
                  </p>
                  <h3 className="text-2xl font-bold mt-1">{totalSites}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-green-500 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" /> 12% from last
                      month
                    </span>
                  </p>
                </div>
                <div className="bg-blue-100 p-2 rounded-full">
                  <Building className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Tasks
                  </p>
                  <h3 className="text-2xl font-bold mt-1">
                    {completedTasks}/{taskData.length}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-green-500 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" /> 8% completion
                      rate
                    </span>
                  </p>
                </div>
                <div className="bg-green-100 p-2 rounded-full">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Attendance
                  </p>
                  <h3 className="text-2xl font-bold mt-1">
                    {presentEmployees}/{totalEmployees}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-green-500 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" /> 95% present
                      today
                    </span>
                  </p>
                </div>
                <div className="bg-purple-100 p-2 rounded-full">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Profit
                  </p>
                  <h3 className="text-2xl font-bold mt-1">
                    ₹{(profit / 100000).toFixed(2)}L
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-red-500 flex items-center">
                      <ArrowDownRight className="h-3 w-3 mr-1" /> 3% from last
                      month
                    </span>
                  </p>
                </div>
                <div className="bg-yellow-100 p-2 rounded-full">
                  <DollarSign className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" /> Alerts &
              Notifications
            </CardTitle>
            <CardDescription>
              Important alerts that need your attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {alertData.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg flex justify-between items-center ${
                    alert.severity === "High"
                      ? "bg-red-50 border-l-4 border-red-500"
                      : alert.severity === "Medium"
                      ? "bg-amber-50 border-l-4 border-amber-500"
                      : "bg-blue-50 border-l-4 border-blue-500"
                  }`}
                >
                  <div className="flex items-center">
                    {alert.type === "Inventory" && (
                      <Package className="h-5 w-5 mr-2 text-gray-700" />
                    )}
                    {alert.type === "Task" && (
                      <Clock className="h-5 w-5 mr-2 text-gray-700" />
                    )}
                    {alert.type === "HR" && (
                      <Users className="h-5 w-5 mr-2 text-gray-700" />
                    )}
                    {alert.type === "Finance" && (
                      <DollarSign className="h-5 w-5 mr-2 text-gray-700" />
                    )}
                    <div>
                      <p className="font-medium">{alert.message}</p>
                      <p className="text-sm text-muted-foreground">
                        {alert.type} • {alert.severity} Priority
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Resolve
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="sites" className="w-full">
          <TabsList className="grid grid-cols-7 mb-6">
            <TabsTrigger value="sites" className="flex items-center">
              <Building className="mr-2 h-4 w-4" /> Sites
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center">
              <Clock className="mr-2 h-4 w-4" /> Tasks
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center">
              <Package className="mr-2 h-4 w-4" /> Inventory
            </TabsTrigger>
            <TabsTrigger value="hr" className="flex items-center">
              <Users className="mr-2 h-4 w-4" /> HR
            </TabsTrigger>
            <TabsTrigger value="expenses" className="flex items-center">
              <Wallet className="mr-2 h-4 w-4" /> Expenses
            </TabsTrigger>
            <TabsTrigger value="purchase" className="flex items-center">
              <ShoppingCart className="mr-2 h-4 w-4" /> Purchase
            </TabsTrigger>
            <TabsTrigger value="sales" className="flex items-center">
              <BarChart3 className="mr-2 h-4 w-4" /> Sales
            </TabsTrigger>
          </TabsList>

          {/* Sites Tab */}
          <TabsContent value="sites">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Construction Sites</CardTitle>
                  <Button>
                    <Building className="mr-2 h-4 w-4" /> Add New Site
                  </Button>
                </div>
                <CardDescription>
                  Manage all your active construction sites
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {siteData.map((site) => (
                    <Card key={site.id} className="overflow-hidden">
                      <div className="h-2 bg-blue-500"></div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold">{site.name}</h3>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <HardHat className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{site.manager}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{site.location}</span>
                          </div>
                          <div className="mt-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span className="font-medium">
                                {site.progress}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  site.progress > 75
                                    ? "bg-green-500"
                                    : site.progress > 40
                                    ? "bg-blue-500"
                                    : "bg-amber-500"
                                }`}
                                style={{ width: `${site.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                site.status === "In Progress"
                                  ? "bg-blue-100 text-blue-800"
                                  : site.status === "Near Completion"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {site.status}
                            </span>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Task Management</CardTitle>
                  <Button>
                    <Clock className="mr-2 h-4 w-4" /> Add New Task
                  </Button>
                </div>
                <CardDescription>
                  Track and manage all construction tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Task</th>
                      <th className="text-left py-3 px-4 font-medium">Site</th>
                      <th className="text-left py-3 px-4 font-medium">
                        Assigned To
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        Due Date
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTasks.map((task) => (
                      <tr key={task.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{task.title}</td>
                        <td className="py-3 px-4">{task.site}</td>
                        <td className="py-3 px-4">{task.assignedTo}</td>
                        <td className="py-3 px-4">
                          {new Date(task.dueDate).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              task.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : task.status === "In Progress"
                                ? "bg-blue-100 text-blue-800"
                                : task.status === "Delayed"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {task.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inventory Tab */}
          <TabsContent value="inventory">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Inventory & Indent Management</CardTitle>
                  <Button>
                    <Package className="mr-2 h-4 w-4" /> Raise New Indent
                  </Button>
                </div>
                <CardDescription>
                  Track material requests and inventory status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Low Stock Items
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Cement Bags</span>
                          <span className="text-xs font-medium bg-red-100 text-red-800 px-2 py-1 rounded-full">
                            Critical
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Steel Rods</span>
                          <span className="text-xs font-medium bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                            Low
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Paint</span>
                          <span className="text-xs font-medium bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                            Low
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Pending Indents
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Steel Rods</span>
                          <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            Medium
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Electrical Wires</span>
                          <span className="text-xs font-medium bg-red-100 text-red-800 px-2 py-1 rounded-full">
                            High
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Plumbing Fixtures</span>
                          <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            Medium
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Recent Deliveries
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Bricks (5000 pcs)</span>
                          <span className="text-xs text-muted-foreground">
                            Yesterday
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Cement (200 bags)</span>
                          <span className="text-xs text-muted-foreground">
                            3 days ago
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Sand (15 tons)</span>
                          <span className="text-xs text-muted-foreground">
                            5 days ago
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Item</th>
                      <th className="text-left py-3 px-4 font-medium">
                        Quantity
                      </th>
                      <th className="text-left py-3 px-4 font-medium">Site</th>
                      <th className="text-left py-3 px-4 font-medium">
                        Urgency
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredIndents.map((indent) => (
                      <tr key={indent.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{indent.item}</td>
                        <td className="py-3 px-4">{indent.quantity}</td>
                        <td className="py-3 px-4">{indent.site}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              indent.urgency === "High"
                                ? "bg-red-100 text-red-800"
                                : indent.urgency === "Medium"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {indent.urgency}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              indent.status === "Approved"
                                ? "bg-blue-100 text-blue-800"
                                : indent.status === "Issued"
                                ? "bg-green-100 text-green-800"
                                : indent.status === "Rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {indent.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Approve
                            </Button>
                            <Button variant="outline" size="sm">
                              Reject
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* HR Tab */}
          <TabsContent value="hr">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>HR & Payroll Management</CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline">
                      <Calendar className="mr-2 h-4 w-4" /> Attendance
                    </Button>
                    <Button>
                      <Users className="mr-2 h-4 w-4" /> Add Employee
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  Manage employees, attendance, and payroll
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Today's Attendance
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="flex items-center justify-center">
                        <div className="relative w-24 h-24">
                          <svg className="w-24 h-24" viewBox="0 0 100 100">
                            <circle
                              className="text-gray-200"
                              strokeWidth="10"
                              stroke="currentColor"
                              fill="transparent"
                              r="40"
                              cx="50"
                              cy="50"
                            />
                            <circle
                              className="text-green-500"
                              strokeWidth="10"
                              stroke="currentColor"
                              fill="transparent"
                              r="40"
                              cx="50"
                              cy="50"
                              strokeDasharray="251.2"
                              strokeDashoffset="50.24"
                            />
                          </svg>
                          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                            <span className="text-xl font-bold">80%</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between mt-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Present</p>
                          <p className="font-medium">32</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Absent</p>
                          <p className="font-medium">8</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Leave</p>
                          <p className="font-medium">4</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Leave Requests
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium">Rajesh Kumar</p>
                            <p className="text-xs text-muted-foreground">
                              May 25-27, 2025
                            </p>
                          </div>
                          <div className="flex space-x-1">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 px-2"
                            >
                              <CheckCircle className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 px-2"
                            >
                              <AlertTriangle className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium">Meena Gupta</p>
                            <p className="text-xs text-muted-foreground">
                              June 1-5, 2025
                            </p>
                          </div>
                          <div className="flex space-x-1">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 px-2"
                            >
                              <CheckCircle className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 px-2"
                            >
                              <AlertTriangle className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Payroll Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <p className="text-sm">May 2025</p>
                          <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Processed
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm">April 2025</p>
                          <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Processed
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm">March 2025</p>
                          <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Processed
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full mt-4">
                        <DollarSign className="mr-2 h-4 w-4" /> Process Payroll
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">
                        Employee
                      </th>
                      <th className="text-left py-3 px-4 font-medium">Role</th>
                      <th className="text-left py-3 px-4 font-medium">Site</th>
                      <th className="text-left py-3 px-4 font-medium">
                        Today's Status
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeData.map((employee) => (
                      <tr
                        key={employee.id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="py-3 px-4">{employee.name}</td>
                        <td className="py-3 px-4">{employee.role}</td>
                        <td className="py-3 px-4">{employee.site}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              employee.attendance === "Present"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {employee.attendance}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Profile
                            </Button>
                            <Button variant="outline" size="sm">
                              Payslip
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Expenses Tab */}
          <TabsContent value="expenses">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Expense Management</CardTitle>
                  <Button>
                    <Wallet className="mr-2 h-4 w-4" /> Add Expense
                  </Button>
                </div>
                <CardDescription>
                  Track and manage all project expenses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Monthly Expenses
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="text-2xl font-bold">₹4,50,000</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        <span className="text-red-500 flex items-center">
                          <ArrowUpRight className="h-3 w-3 mr-1" /> 12% from
                          last month
                        </span>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Materials</span>
                          <span>₹2,80,000</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Labor</span>
                          <span>₹1,20,000</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Miscellaneous</span>
                          <span>₹50,000</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Pending Approvals
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="text-2xl font-bold">₹85,000</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        5 expenses awaiting approval
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>High Priority</span>
                          <span>₹45,000</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Medium Priority</span>
                          <span>₹30,000</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Low Priority</span>
                          <span>₹10,000</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Budget Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="flex items-center justify-center">
                        <div className="relative w-24 h-24">
                          <svg className="w-24 h-24" viewBox="0 0 100 100">
                            <circle
                              className="text-gray-200"
                              strokeWidth="10"
                              stroke="currentColor"
                              fill="transparent"
                              r="40"
                              cx="50"
                              cy="50"
                            />
                            <circle
                              className="text-amber-500"
                              strokeWidth="10"
                              stroke="currentColor"
                              fill="transparent"
                              r="40"
                              cx="50"
                              cy="50"
                              strokeDasharray="251.2"
                              strokeDashoffset="125.6"
                            />
                          </svg>
                          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                            <span className="text-xl font-bold">50%</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between mt-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Total Budget</p>
                          <p className="font-medium">₹9,00,000</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Spent</p>
                          <p className="font-medium">₹4,50,000</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">
                        Description
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        Amount
                      </th>
                      <th className="text-left py-3 px-4 font-medium">Site</th>
                      <th className="text-left py-3 px-4 font-medium">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenseData.map((expense) => (
                      <tr
                        key={expense.id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="py-3 px-4">{expense.description}</td>
                        <td className="py-3 px-4">
                          ₹{expense.amount.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">{expense.site}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              expense.status === "Approved"
                                ? "bg-green-100 text-green-800"
                                : expense.status === "Rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {expense.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              Approve
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Purchase Tab */}
          <TabsContent value="purchase">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Purchase Management</CardTitle>
                  <Button>
                    <ShoppingCart className="mr-2 h-4 w-4" /> Create PO
                  </Button>
                </div>
                <CardDescription>
                  Manage purchase orders and vendor transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Purchase Orders
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Total POs</span>
                          <span className="font-medium">24</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Pending Approval</span>
                          <span className="font-medium">3</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">In Transit</span>
                          <span className="font-medium">5</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Delivered</span>
                          <span className="font-medium">16</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Vendor Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>ABC Suppliers</span>
                            <span className="font-medium">92%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: "92%" }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>XYZ Materials</span>
                            <span className="font-medium">85%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: "85%" }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>PQR Traders</span>
                            <span className="font-medium">78%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-amber-500 h-2 rounded-full"
                              style={{ width: "78%" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Upcoming Deliveries
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium">
                              Cement (300 bags)
                            </p>
                            <p className="text-xs text-muted-foreground">
                              ABC Suppliers
                            </p>
                          </div>
                          <p className="text-xs">May 25, 2025</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium">
                              Steel (5 tons)
                            </p>
                            <p className="text-xs text-muted-foreground">
                              XYZ Materials
                            </p>
                          </div>
                          <p className="text-xs">May 27, 2025</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium">
                              Bricks (10,000 pcs)
                            </p>
                            <p className="text-xs text-muted-foreground">
                              PQR Traders
                            </p>
                          </div>
                          <p className="text-xs">June 2, 2025</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">
                        PO Number
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        Vendor
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        Amount
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchaseData.map((po) => (
                      <tr key={po.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{po.poNumber}</td>
                        <td className="py-3 px-4">{po.vendor}</td>
                        <td className="py-3 px-4">
                          ₹{po.amount.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              po.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : po.status === "In Transit"
                                ? "bg-blue-100 text-blue-800"
                                : po.status === "Pending Approval"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {po.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Truck className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sales Tab */}
          <TabsContent value="sales">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Sales Management</CardTitle>
                  <Button>
                    <FileText className="mr-2 h-4 w-4" /> Create Invoice
                  </Button>
                </div>
                <CardDescription>
                  Track sales, invoices, and client payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Sales Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="text-2xl font-bold">₹90,00,000</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        <span className="text-green-500 flex items-center">
                          <ArrowUpRight className="h-3 w-3 mr-1" /> 15% from
                          last month
                        </span>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Total Invoiced</span>
                          <span>₹90,00,000</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Received</span>
                          <span>₹65,00,000</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Outstanding</span>
                          <span>₹25,00,000</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Payment Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="flex items-center justify-center">
                        <div className="relative w-24 h-24">
                          <svg className="w-24 h-24" viewBox="0 0 100 100">
                            <circle
                              className="text-gray-200"
                              strokeWidth="10"
                              stroke="currentColor"
                              fill="transparent"
                              r="40"
                              cx="50"
                              cy="50"
                            />
                            <circle
                              className="text-green-500"
                              strokeWidth="10"
                              stroke="currentColor"
                              fill="transparent"
                              r="40"
                              cx="50"
                              cy="50"
                              strokeDasharray="251.2"
                              strokeDashoffset="75.36"
                            />
                          </svg>
                          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                            <span className="text-xl font-bold">70%</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between mt-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Paid</p>
                          <p className="font-medium">₹65,00,000</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Pending</p>
                          <p className="font-medium">₹25,00,000</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Top Clients
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>ABC Constructions</span>
                            <span className="font-medium">₹35,00,000</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: "38%" }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>XYZ Developers</span>
                            <span className="font-medium">₹22,00,000</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: "24%" }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>PQR Builders</span>
                            <span className="font-medium">₹18,00,000</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: "20%" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">
                        Invoice Number
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        Client
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        Amount
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesData.map((invoice) => (
                      <tr
                        key={invoice.id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="py-3 px-4">{invoice.invoiceNumber}</td>
                        <td className="py-3 px-4">{invoice.client}</td>
                        <td className="py-3 px-4">
                          ₹{invoice.amount.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              invoice.status === "Paid"
                                ? "bg-green-100 text-green-800"
                                : invoice.status === "Partial"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {invoice.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <DollarSign className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
