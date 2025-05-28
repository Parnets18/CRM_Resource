import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Users, HardHat, Clock, DollarSign, FileText, CheckCircle, XCircle, Calendar, AlertTriangle, MapPin, Edit, Trash2, Download, Send, Building, Wrench, Shield, Bell, Search, Filter, MoreVertical, Eye, Phone, Mail, Award } from 'lucide-react';
import Nav from '../Nav';
export default function ConstructionHRManager() {
  const [employees, setEmployees] = useState([
    { id: 1, firstName: 'John', lastName: 'Martinez', email: 'john@buildcorp.com', role: 'Site Supervisor', site: 'Downtown Complex', certifications: ['OSHA 30', 'First Aid'], hourlyRate: 35, joinDate: '2023-01-15', status: 'Active', phone: '555-0101', avatar: 'JM' },
    { id: 2, firstName: 'Sarah', lastName: 'Johnson', email: 'sarah@buildcorp.com', role: 'Crane Operator', site: 'Riverside Mall', certifications: ['CCO Certified', 'OSHA 10'], hourlyRate: 42, joinDate: '2022-08-20', status: 'Active', phone: '555-0102', avatar: 'SJ' },
    { id: 3, firstName: 'Mike', lastName: 'Thompson', email: 'mike@buildcorp.com', role: 'Electrician', site: 'Office Tower', certifications: ['Master Electrician', 'OSHA 30'], hourlyRate: 38, joinDate: '2023-03-10', status: 'Active', phone: '555-0103', avatar: 'MT' },
    { id: 4, firstName: 'Carlos', lastName: 'Rodriguez', email: 'carlos@buildcorp.com', role: 'Foreman', site: 'Downtown Complex', certifications: ['OSHA 30', 'Safety Manager'], hourlyRate: 40, joinDate: '2021-11-05', status: 'Active', phone: '555-0104', avatar: 'CR' }
  ]);

  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, employeeId: 1, name: 'John Martinez', type: 'Vacation', startDate: '2024-06-01', endDate: '2024-06-05', days: 5, reason: 'Family vacation', status: 'pending', site: 'Downtown Complex', avatar: 'JM' },
    { id: 2, employeeId: 2, name: 'Sarah Johnson', type: 'Sick', startDate: '2024-05-28', endDate: '2024-05-29', days: 2, reason: 'Back injury', status: 'approved', site: 'Riverside Mall', avatar: 'SJ' },
    { id: 3, employeeId: 3, name: 'Mike Thompson', type: 'Personal', startDate: '2024-06-10', endDate: '2024-06-12', days: 3, reason: 'Certification renewal', status: 'pending', site: 'Office Tower', avatar: 'MT' }
  ]);

  const [attendance, setAttendance] = useState({
    present: 156, absent: 12, late: 8, onLeave: 6, totalEmployees: 182,
    sites: { 'Downtown Complex': { present: 45, total: 50 }, 'Riverside Mall': { present: 38, total: 42 }, 'Office Tower': { present: 42, total: 48 }, 'Bridge Project': { present: 31, total: 35 } }
  });

  const [payrollData, setPayrollData] = useState([
    { id: 1, period: 'May 2024', processed: true, sent: true, totalAmount: 685000, totalHours: 17250, avgRate: 39.7, employees: 182 },
    { id: 2, period: 'June 2024', processed: false, sent: false, totalAmount: 0, totalHours: 18400, avgRate: 39.7, employees: 182 },
    { id: 3, period: 'July 2024', processed: false, sent: false, totalAmount: 0, totalHours: 0, avgRate: 0, employees: 182 }
  ]);

  const [safetyIncidents, setSafetyIncidents] = useState([
    { id: 1, date: '2024-05-20', site: 'Downtown Complex', type: 'Minor Injury', employee: 'Carlos Rodriguez', description: 'Cut on hand from metal sheet', status: 'Resolved', severity: 'Low', avatar: 'CR' },
    { id: 2, date: '2024-05-18', site: 'Riverside Mall', type: 'Near Miss', employee: 'Sarah Johnson', description: 'Load swing incident', status: 'Under Review', severity: 'Medium', avatar: 'SJ' },
    { id: 3, date: '2024-05-15', site: 'Office Tower', type: 'Equipment Damage', employee: 'Mike Thompson', description: 'Wire stripper malfunction', status: 'Resolved', severity: 'Low', avatar: 'MT' }
  ]);

  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [isEditEmployeeOpen, setIsEditEmployeeOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [siteFilter, setSiteFilter] = useState("all");
  const [newEmployee, setNewEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    site: "",
    hourlyRate: "",
    joinDate: "",
    phone: "",
    certifications: [],
  });

  const roles = [
    "Site Supervisor",
    "Foreman",
    "Crane Operator",
    "Electrician",
    "Plumber",
    "Welder",
    "Carpenter",
    "Mason",
    "Heavy Equipment Operator",
    "Safety Officer",
  ];
  const sites = [
    "Downtown Complex",
    "Riverside Mall",
    "Office Tower",
    "Bridge Project",
    "Industrial Park",
  ];
  const certificationsList = [
    "OSHA 10",
    "OSHA 30",
    "First Aid",
    "CPR",
    "CCO Certified",
    "Master Electrician",
    "Welding Certified",
    "Safety Manager",
    "Forklift Operator",
  ];

  const addEmployee = () => {
    if (newEmployee.firstName && newEmployee.lastName && newEmployee.email) {
      const initials = `${newEmployee.firstName[0]}${newEmployee.lastName[0]}`.toUpperCase();
      const employee = { 
        id: employees.length + 1, 
        ...newEmployee, 
        hourlyRate: Number.parseFloat(newEmployee.hourlyRate), 
        status: 'Active', 
        certifications: newEmployee.certifications || [],
        avatar: initials
      };
      setEmployees([...employees, employee]);
      setNewEmployee({
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        site: "",
        hourlyRate: "",
        joinDate: "",
        phone: "",
        certifications: [],
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
    const totalAmount = employees.reduce(
      (sum, emp) => sum + emp.hourlyRate * 160,
      0
    );
    setPayrollData(
      payrollData.map((payroll) =>
        payroll.id === id
          ? { ...payroll, processed: true, totalAmount }
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

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         emp.lastName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         emp.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSite = siteFilter === 'all' || emp.site === siteFilter;
    return matchesSearch && matchesSite;
  });

  // --- COLOR CHANGES: orange/amber -> purple ---
  const stats = [
    { title: 'Total Workers', value: employees.length, change: '+12 this month', icon: Users, color: 'bg-blue-500', bgColor: 'bg-blue-50' },
    { title: 'On Site Today', value: attendance.present, change: '96% attendance', icon: HardHat, color: 'bg-green-500', bgColor: 'bg-green-50' },
    { title: 'Active Incidents', value: safetyIncidents.filter(i => i.status === 'Under Review').length, change: '-2 from last week', icon: AlertTriangle, color: 'bg-orange-500', bgColor: 'bg-orange-50' },
    { title: 'Pending Requests', value: leaveRequests.filter(req => req.status === 'pending').length, change: 'Requires attention', icon: Calendar, color: 'bg-purple-500', bgColor: 'bg-purple-50' }
  ];

  const EmployeeForm = ({ employee, onSave, isEdit = false }) => (
    <div className="space-y-6 max-h-96 overflow-y-auto">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</Label>
          <Input 
            id="firstName"
            value={employee.firstName} 
            onChange={(e) => onSave({ ...employee, firstName: e.target.value })}
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</Label>
          <Input 
            id="lastName"
            value={employee.lastName} 
            onChange={(e) => onSave({ ...employee, lastName: e.target.value })}
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
        <Input 
          id="email"
          type="email" 
          value={employee.email} 
          onChange={(e) => onSave({ ...employee, email: e.target.value })}
          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</Label>
        <Input 
          id="phone"
          value={employee.phone} 
          onChange={(e) => onSave({ ...employee, phone: e.target.value })}
          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Role</Label>
          <Select onValueChange={(value) => onSave({ ...employee, role: value })}>
            <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map(role => (
                <SelectItem key={role} value={role}>{role}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Assigned Site</Label>
          <Select onValueChange={(value) => onSave({ ...employee, site: value })}>
            <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
              <SelectValue placeholder="Select site" />
            </SelectTrigger>
            <SelectContent>
              {sites.map(site => (
                <SelectItem key={site} value={site}>{site}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="hourlyRate" className="text-sm font-medium text-gray-700">Hourly Rate ($)</Label>
          <Input 
            id="hourlyRate"
            type="number" 
            value={employee.hourlyRate} 
            onChange={(e) => onSave({ ...employee, hourlyRate: isEdit ? Number.parseFloat(e.target.value) : e.target.value })}
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="joinDate" className="text-sm font-medium text-gray-700">Join Date</Label>
          <Input 
            id="joinDate"
            type="date" 
            value={employee.joinDate} 
            onChange={(e) => onSave({ ...employee, joinDate: e.target.value })}
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <Button 
        onClick={isEdit ? updateEmployee : addEmployee} 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5"
      >
        {isEdit ? 'Update Worker' : 'Add Worker'}
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 ml-64">
      <Nav/>
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">BuildCorp HR</h1>
                <p className="text-sm text-gray-500">Construction Workforce Management</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="text-gray-600 border-gray-300">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
            <Dialog open={isAddEmployeeOpen} onOpenChange={setIsAddEmployeeOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Worker
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold">Add New Worker</DialogTitle>
                </DialogHeader>
                <EmployeeForm employee={newEmployee} onSave={setNewEmployee} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <Card key={idx} className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 text-white ${stat.color.replace('bg-', 'text-')}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="workers" className="space-y-6">
          <TabsList className="bg-white border border-gray-200 p-1 rounded-lg">
            <TabsTrigger value="workers" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-6 py-2 rounded-md font-medium">
              <HardHat className="w-4 h-4 mr-2" />
              Workers
            </TabsTrigger>
            <TabsTrigger value="attendance" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-6 py-2 rounded-md font-medium">
              <Clock className="w-4 h-4 mr-2" />
              Attendance
            </TabsTrigger>
            <TabsTrigger value="leaves" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-6 py-2 rounded-md font-medium">
              <Calendar className="w-4 h-4 mr-2" />
              Leave Requests
            </TabsTrigger>
            <TabsTrigger value="payroll" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-6 py-2 rounded-md font-medium">
              <DollarSign className="w-4 h-4 mr-2" />
              Payroll
            </TabsTrigger>
            <TabsTrigger value="safety" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-6 py-2 rounded-md font-medium">
              <Shield className="w-4 h-4 mr-2" />
              Safety
            </TabsTrigger>
          </TabsList>

          <TabsContent value="workers">
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader className="border-b border-gray-200 pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <CardTitle className="text-xl font-semibold text-gray-900">Worker Management</CardTitle>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input 
                        placeholder="Search workers..." 
                        className="pl-10 w-full sm:w-64 border-gray-300" 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                      />
                    </div>
                    <Select value={siteFilter} onValueChange={setSiteFilter}>
                      <SelectTrigger className="w-full sm:w-40 border-gray-300">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Sites</SelectItem>
                        {sites.map(site => (
                          <SelectItem key={site} value={site}>{site}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  {filteredEmployees.map(employee => (
                    <div key={employee.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center font-semibold text-blue-700">
                          {employee.avatar}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-lg">{employee.firstName} {employee.lastName}</h3>
                          <div className="flex items-center space-x-4 mt-1">
                            <div className="flex items-center text-gray-600">
                              <Wrench className="w-4 h-4 mr-1" />
                              <span className="text-sm">{employee.role}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span className="text-sm">{employee.site}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 mt-2">
                            {employee.certifications?.slice(0, 2).map(cert => (
                              <Badge key={cert} variant="secondary" className="text-xs bg-green-100 text-green-700">
                                <Award className="w-3 h-3 mr-1" />
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-bold text-gray-900 text-lg">${employee.hourlyRate}/hr</p>
                          <div className="flex items-center text-sm text-gray-500 mt-1 space-x-3">
                            <div className="flex items-center">
                              <Phone className="w-3 h-3 mr-1" />
                              {employee.phone}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => { setEditingEmployee(employee); setIsEditEmployeeOpen(true); }}
                            className="text-blue-600 border-blue-200 hover:bg-blue-50"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => deleteEmployee(employee.id)} 
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader className="border-b border-gray-200">
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span>Today's Attendance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {[
                      { label: 'Present', value: attendance.present, color: 'green', icon: CheckCircle },
                      { label: 'Absent', value: attendance.absent, color: 'red', icon: XCircle },
                      { label: 'Late', value: attendance.late, color: 'yellow', icon: Clock },
                      { label: 'On Leave', value: attendance.onLeave, color: 'blue', icon: Calendar }
                    ].map((item, idx) => (
                      <div key={idx} className={`flex items-center justify-between p-4 bg-${item.color}-50 rounded-lg border border-${item.color}-200`}>
                        <div className="flex items-center space-x-3">
                          <item.icon className={`w-5 h-5 text-${item.color}-600`} />
                          <span className="font-medium text-gray-900">{item.label}</span>
                        </div>
                        <span className={`text-2xl font-bold text-${item.color}-600`}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader className="border-b border-gray-200">
                  <CardTitle>Site Attendance Overview</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {Object.entries(attendance.sites).map(([site, data]) => (
                      <div key={site} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-gray-900">{site}</span>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                            {data.present}/{data.total} workers
                          </Badge>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${(data.present / data.total) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {Math.round((data.present / data.total) * 100)}% attendance rate
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="leaves">
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader className="border-b border-gray-200">
                <CardTitle className="text-xl font-semibold">Leave Request Management</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {leaveRequests.map(request => (
                    <div key={request.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center font-semibold text-purple-700">
                          {request.avatar}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{request.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">{request.type} Leave</span>
                            <span>{request.days} days</span>
                            <span>• {request.site}</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{request.startDate} to {request.endDate}</p>
                          <p className="text-sm text-gray-600 mt-1">{request.reason}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Badge 
                          variant={request.status === 'pending' ? 'secondary' : request.status === 'approved' ? 'default' : 'destructive'}
                          className={request.status === 'approved' ? 'bg-green-100 text-green-700' : ''}
                        >
                          {request.status}
                        </Badge>
                        
                        {request.status === 'pending' && (
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              onClick={() => approveLeave(request.id)} 
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive" 
                              onClick={() => rejectLeave(request.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payroll">
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader className="border-b border-gray-200">
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <span>Payroll Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {payrollData.map(payroll => (
                    <div key={payroll.id} className="flex items-center justify-between p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <DollarSign className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg">{payroll.period}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            {payroll.processed ? (
                              <>
                                <span className="font-medium text-green-600">
                                  ${payroll.totalAmount.toLocaleString()}
                                </span>
                                <span>• {payroll.totalHours.toLocaleString()} hours</span>
                                <span>• {payroll.employees} employees</span>
                              </>
                            ) : (
                              <>
                                <span>{payroll.totalHours.toLocaleString()} hours scheduled</span>
                                <span>• {payroll.employees} employees</span>
                              </>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Average rate: ${payroll.avgRate}/hour
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="flex space-x-2">
                          {payroll.processed && (
                            <Badge className="bg-green-100 text-green-700">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Processed
                            </Badge>
                          )}
                          {payroll.sent && (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                              <Send className="w-3 h-3 mr-1" />
                              Sent
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex space-x-2">
                          {!payroll.processed && (
                            <Button 
                              size="sm" 
                              onClick={() => processPayroll(payroll.id)} 
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              <Clock className="w-4 h-4 mr-1" />
                              Process Payroll
                            </Button>
                          )}
                          
                          {payroll.processed && !payroll.sent && (
                            <Button 
                              size="sm" 
                              onClick={() => sendPayslips(payroll.id)} 
                              variant="outline"
                              className="border-blue-200 text-blue-600 hover:bg-blue-50"
                            >
                              <Send className="w-4 h-4 mr-1" />
                              Send Payslips
                            </Button>
                          )}
                          
                          {payroll.processed && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-gray-300 text-gray-600 hover:bg-gray-50"
                            >
                              <Download className="w-4 h-4 mr-1" />
                              Export
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="safety">
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader className="border-b border-gray-200">
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-red-600" />
                  <span>Safety Incident Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {safetyIncidents.map(incident => (
                    <div key={incident.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center font-semibold text-red-700">
                          {incident.avatar}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{incident.type}</h3>
                            <Badge 
                              variant="outline" 
                              className={
                                incident.severity === 'High' ? 'border-red-300 text-red-700' :
                                incident.severity === 'Medium' ? 'border-orange-300 text-orange-700' :
                                'border-yellow-300 text-yellow-700'
                              }
                            >
                              {incident.severity} Severity
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div className="flex items-center space-x-4">
                              <span className="font-medium">{incident.employee}</span>
                              <span>• {incident.site}</span>
                              <span>• {incident.date}</span>
                            </div>
                            <p className="text-gray-700 mt-1">{incident.description}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Badge 
                          variant={incident.status === 'Resolved' ? 'default' : 'destructive'}
                          className={incident.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}
                        >
                          {incident.status}
                        </Badge>
                        
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-gray-300 text-gray-600 hover:bg-gray-50"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Employee Dialog */}
        <Dialog open={isEditEmployeeOpen} onOpenChange={setIsEditEmployeeOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">Edit Worker Details</DialogTitle>
            </DialogHeader>
            {editingEmployee && (
              <EmployeeForm employee={editingEmployee} onSave={setEditingEmployee} isEdit={true} />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}