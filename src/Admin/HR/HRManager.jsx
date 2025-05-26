import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Users, HardHat, Clock, DollarSign, FileText, CheckCircle, XCircle, Calendar, AlertTriangle, MapPin, Edit, Trash2, Download, Send, Building, Wrench, Shield } from 'lucide-react';
import Nav from '../Nav';
export default function ConstructionHRManager() {
  const [employees, setEmployees] = useState([
    { id: 1, firstName: 'John', lastName: 'Martinez', email: 'john@buildcorp.com', role: 'Site Supervisor', site: 'Downtown Complex', certifications: ['OSHA 30', 'First Aid'], hourlyRate: 35, joinDate: '2023-01-15', status: 'Active', phone: '555-0101' },
    { id: 2, firstName: 'Sarah', lastName: 'Johnson', email: 'sarah@buildcorp.com', role: 'Crane Operator', site: 'Riverside Mall', certifications: ['CCO Certified', 'OSHA 10'], hourlyRate: 42, joinDate: '2022-08-20', status: 'Active', phone: '555-0102' },
    { id: 3, firstName: 'Mike', lastName: 'Thompson', email: 'mike@buildcorp.com', role: 'Electrician', site: 'Office Tower', certifications: ['Master Electrician', 'OSHA 30'], hourlyRate: 38, joinDate: '2023-03-10', status: 'Active', phone: '555-0103' },
    { id: 4, firstName: 'Carlos', lastName: 'Rodriguez', email: 'carlos@buildcorp.com', role: 'Foreman', site: 'Downtown Complex', certifications: ['OSHA 30', 'Safety Manager'], hourlyRate: 40, joinDate: '2021-11-05', status: 'Active', phone: '555-0104' }
  ]);

  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, employeeId: 1, name: 'John Martinez', type: 'Vacation', startDate: '2024-06-01', endDate: '2024-06-05', days: 5, reason: 'Family vacation', status: 'pending', site: 'Downtown Complex' },
    { id: 2, employeeId: 2, name: 'Sarah Johnson', type: 'Sick', startDate: '2024-05-28', endDate: '2024-05-29', days: 2, reason: 'Back injury', status: 'approved', site: 'Riverside Mall' },
    { id: 3, employeeId: 3, name: 'Mike Thompson', type: 'Personal', startDate: '2024-06-10', endDate: '2024-06-12', days: 3, reason: 'Certification renewal', status: 'pending', site: 'Office Tower' }
  ]);

  const [attendance, setAttendance] = useState({
    present: 156, absent: 12, late: 8, onLeave: 6, totalEmployees: 182,
    sites: { 'Downtown Complex': 45, 'Riverside Mall': 38, 'Office Tower': 42, 'Bridge Project': 31 }
  });

  const [payrollData, setPayrollData] = useState([
    { id: 1, period: 'May 2024', processed: true, sent: true, totalAmount: 685000, totalHours: 17250, avgRate: 39.7 },
    { id: 2, period: 'June 2024', processed: false, sent: false, totalAmount: 0, totalHours: 18400, avgRate: 39.7 },
    { id: 3, period: 'July 2024', processed: false, sent: false, totalAmount: 0, totalHours: 0, avgRate: 0 }
  ]);

  const [safetyIncidents, setSafetyIncidents] = useState([
    { id: 1, date: '2024-05-20', site: 'Downtown Complex', type: 'Minor Injury', employee: 'Carlos Rodriguez', description: 'Cut on hand from metal sheet', status: 'Resolved' },
    { id: 2, date: '2024-05-18', site: 'Riverside Mall', type: 'Near Miss', employee: 'Sarah Johnson', description: 'Load swing incident', status: 'Under Review' },
    { id: 3, date: '2024-05-15', site: 'Office Tower', type: 'Equipment Damage', employee: 'Mike Thompson', description: 'Wire stripper malfunction', status: 'Resolved' }
  ]);

  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [isEditEmployeeOpen, setIsEditEmployeeOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [siteFilter, setSiteFilter] = useState('all');
  const [newEmployee, setNewEmployee] = useState({
    firstName: '', lastName: '', email: '', role: '', site: '', hourlyRate: '', joinDate: '', phone: '', certifications: []
  });

  const roles = ['Site Supervisor', 'Foreman', 'Crane Operator', 'Electrician', 'Plumber', 'Welder', 'Carpenter', 'Mason', 'Heavy Equipment Operator', 'Safety Officer'];
  const sites = ['Downtown Complex', 'Riverside Mall', 'Office Tower', 'Bridge Project', 'Industrial Park'];
  const certificationsList = ['OSHA 10', 'OSHA 30', 'First Aid', 'CPR', 'CCO Certified', 'Master Electrician', 'Welding Certified', 'Safety Manager', 'Forklift Operator'];

  const addEmployee = () => {
    if (newEmployee.firstName && newEmployee.lastName && newEmployee.email) {
      const employee = { id: employees.length + 1, ...newEmployee, hourlyRate: Number.parseFloat(newEmployee.hourlyRate), status: 'Active', certifications: newEmployee.certifications || [] };
      setEmployees([...employees, employee]);
      setNewEmployee({ firstName: '', lastName: '', email: '', role: '', site: '', hourlyRate: '', joinDate: '', phone: '', certifications: [] });
      setIsAddEmployeeOpen(false);
    }
  };

  const updateEmployee = () => {
    setEmployees(employees.map(emp => emp.id === editingEmployee.id ? editingEmployee : emp));
    setIsEditEmployeeOpen(false);
    setEditingEmployee(null);
  };

  const deleteEmployee = (id) => setEmployees(employees.filter(emp => emp.id !== id));
  const approveLeave = (id) => setLeaveRequests(leaveRequests.map(req => req.id === id ? { ...req, status: 'approved' } : req));
  const rejectLeave = (id) => setLeaveRequests(leaveRequests.map(req => req.id === id ? { ...req, status: 'rejected' } : req));

  const processPayroll = (id) => {
    const totalAmount = employees.reduce((sum, emp) => sum + (emp.hourlyRate * 160), 0);
    setPayrollData(payrollData.map(payroll => payroll.id === id ? { ...payroll, processed: true, totalAmount } : payroll));
  };

  const sendPayslips = (id) => setPayrollData(payrollData.map(payroll => payroll.id === id ? { ...payroll, sent: true } : payroll));

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || emp.lastName.toLowerCase().includes(searchTerm.toLowerCase()) || emp.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSite = siteFilter === 'all' || emp.site === siteFilter;
    return matchesSearch && matchesSite;
  });

  const stats = [
    { title: 'Total Workers', value: employees.length, icon: Users, color: 'blue' },
    { title: 'On Site Today', value: attendance.present, icon: HardHat, color: 'green' },
    { title: 'Safety Incidents', value: safetyIncidents.filter(i => i.status === 'Under Review').length, icon: AlertTriangle, color: 'red' },
    { title: 'Pending Leaves', value: leaveRequests.filter(req => req.status === 'pending').length, icon: Calendar, color: 'orange' }
  ];

  const EmployeeForm = ({ employee, onSave, isEdit = false }) => (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      <div className="grid grid-cols-2 gap-4">
        <div><Label>First Name</Label><Input value={employee.firstName} onChange={(e) => onSave({ ...employee, firstName: e.target.value })} /></div>
        <div><Label>Last Name</Label><Input value={employee.lastName} onChange={(e) => onSave({ ...employee, lastName: e.target.value })} /></div>
      </div>
      <div><Label>Email</Label><Input type="email" value={employee.email} onChange={(e) => onSave({ ...employee, email: e.target.value })} /></div>
      <div><Label>Phone</Label><Input value={employee.phone} onChange={(e) => onSave({ ...employee, phone: e.target.value })} /></div>
      <div className="grid grid-cols-2 gap-4">
        <div><Label>Role</Label><Select onValueChange={(value) => onSave({ ...employee, role: value })}><SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger><SelectContent>{roles.map(role => <SelectItem key={role} value={role}>{role}</SelectItem>)}</SelectContent></Select></div>
        <div><Label>Site</Label><Select onValueChange={(value) => onSave({ ...employee, site: value })}><SelectTrigger><SelectValue placeholder="Select site" /></SelectTrigger><SelectContent>{sites.map(site => <SelectItem key={site} value={site}>{site}</SelectItem>)}</SelectContent></Select></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div><Label>Hourly Rate ($)</Label><Input type="number" value={employee.hourlyRate} onChange={(e) => onSave({ ...employee, hourlyRate: isEdit ? Number.parseFloat(e.target.value) : e.target.value })} /></div>
        <div><Label>Join Date</Label><Input type="date" value={employee.joinDate} onChange={(e) => onSave({ ...employee, joinDate: e.target.value })} /></div>
      </div>
      <Button onClick={isEdit ? updateEmployee : addEmployee} className="w-full bg-orange-600 hover:bg-orange-700">{isEdit ? 'Update' : 'Add'} Worker</Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-6 ml-64">
      <Nav/>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-600 rounded-lg"><Building className="w-8 h-8 text-white" /></div>
            <div><h1 className="text-3xl font-bold text-gray-900">Construction HR Manager</h1><p className="text-gray-600">Workforce management for construction sites</p></div>
          </div>
          <Dialog open={isAddEmployeeOpen} onOpenChange={setIsAddEmployeeOpen}>
            <DialogTrigger asChild><Button className="bg-orange-600 hover:bg-orange-700"><UserPlus className="w-4 h-4 mr-2" />Add Worker</Button></DialogTrigger>
            <DialogContent className="max-w-md"><DialogHeader><DialogTitle>Add New Worker</DialogTitle></DialogHeader><EmployeeForm employee={newEmployee} onSave={setNewEmployee} /></DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <Card key={idx} className="bg-white shadow-sm border-l-4 border-l-orange-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div><p className="text-sm font-medium text-gray-600">{stat.title}</p><p className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</p></div>
                  <stat.icon className={`w-8 h-8 text-${stat.color}-600`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="workers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-orange-100">
            <TabsTrigger value="workers" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">Workers</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="leaves">Leave Requests</TabsTrigger>
            <TabsTrigger value="payroll">Payroll</TabsTrigger>
            <TabsTrigger value="safety">Safety</TabsTrigger>
          </TabsList>

          <TabsContent value="workers">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2"><HardHat className="w-5 h-5 text-orange-600" />Worker Management</CardTitle>
                  <div className="flex gap-3">
                    <Input placeholder="Search workers..." className="w-64" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <Select value={siteFilter} onValueChange={setSiteFilter}><SelectTrigger className="w-40"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All Sites</SelectItem>{sites.map(site => <SelectItem key={site} value={site}>{site}</SelectItem>)}</SelectContent></Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredEmployees.map(employee => (
                    <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-orange-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center"><HardHat className="w-6 h-6 text-orange-600" /></div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{employee.firstName} {employee.lastName}</h3>
                          <p className="text-sm text-gray-600 flex items-center gap-2"><Wrench className="w-4 h-4" />{employee.role}</p>
                          <p className="text-sm text-gray-500 flex items-center gap-2"><MapPin className="w-4 h-4" />{employee.site}</p>
                          <div className="flex gap-1 mt-1">{employee.certifications?.slice(0, 2).map(cert => <Badge key={cert} variant="outline" className="text-xs">{cert}</Badge>)}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right"><p className="font-semibold text-gray-900">${employee.hourlyRate}/hr</p><p className="text-sm text-gray-500">{employee.phone}</p></div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => { setEditingEmployee(employee); setIsEditEmployeeOpen(true); }}><Edit className="w-4 h-4" /></Button>
                          <Button variant="outline" size="sm" onClick={() => deleteEmployee(employee.id)} className="text-red-600"><Trash2 className="w-4 h-4" /></Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card><CardHeader><CardTitle className="flex items-center gap-2"><Clock className="w-5 h-5 text-blue-600" />Today's Attendance</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[{ label: 'Present', value: attendance.present, color: 'green', icon: CheckCircle }, { label: 'Absent', value: attendance.absent, color: 'red', icon: XCircle }, { label: 'Late', value: attendance.late, color: 'yellow', icon: Clock }, { label: 'On Leave', value: attendance.onLeave, color: 'blue', icon: Calendar }].map((item, idx) => (
                      <div key={idx} className={`flex items-center justify-between p-3 bg-${item.color}-50 rounded-lg`}>
                        <div className="flex items-center gap-3"><item.icon className={`w-5 h-5 text-${item.color}-600`} /><span className="font-medium">{item.label}</span></div>
                        <span className={`text-xl font-bold text-${item.color}-600`}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card><CardHeader><CardTitle>Site Attendance</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(attendance.sites).map(([site, count]) => (
                      <div key={site} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className="font-medium">{site}</span><Badge variant="secondary">{count} workers</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="leaves">
            <Card><CardHeader><CardTitle>Leave Request Management</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaveRequests.map(request => (
                    <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center"><Calendar className="w-5 h-5 text-purple-600" /></div>
                        <div><h3 className="font-semibold">{request.name}</h3><p className="text-sm text-gray-600">{request.type} Leave • {request.days} days • {request.site}</p><p className="text-sm text-gray-500">{request.startDate} to {request.endDate}</p></div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={request.status === 'pending' ? 'secondary' : request.status === 'approved' ? 'default' : 'destructive'}>{request.status}</Badge>
                        {request.status === 'pending' && (
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => approveLeave(request.id)} className="bg-green-600 hover:bg-green-700"><CheckCircle className="w-4 h-4 mr-1" />Approve</Button>
                            <Button size="sm" variant="destructive" onClick={() => rejectLeave(request.id)}><XCircle className="w-4 h-4 mr-1" />Reject</Button>
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
            <Card><CardHeader><CardTitle className="flex items-center gap-2"><DollarSign className="w-5 h-5 text-green-600" />Payroll Management</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {payrollData.map(payroll => (
                    <div key={payroll.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center"><DollarSign className="w-5 h-5 text-green-600" /></div>
                        <div><h3 className="font-semibold">{payroll.period}</h3><p className="text-sm text-gray-600">{payroll.processed ? `$${payroll.totalAmount.toLocaleString()} • ${payroll.totalHours} hours` : `${payroll.totalHours} hours scheduled`}</p></div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex gap-2">{payroll.processed && <Badge variant="default">Processed</Badge>}{payroll.sent && <Badge variant="secondary">Sent</Badge>}</div>
                        <div className="flex gap-2">
                          {!payroll.processed && <Button size="sm" onClick={() => processPayroll(payroll.id)} className="bg-blue-600"><Clock className="w-4 h-4 mr-1" />Process</Button>}
                          {payroll.processed && !payroll.sent && <Button size="sm" onClick={() => sendPayslips(payroll.id)} variant="outline"><Send className="w-4 h-4 mr-1" />Send</Button>}
                          {payroll.processed && <Button size="sm" variant="outline"><Download className="w-4 h-4 mr-1" />Export</Button>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="safety">
            <Card><CardHeader><CardTitle className="flex items-center gap-2"><Shield className="w-5 h-5 text-red-600" />Safety Incidents</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {safetyIncidents.map(incident => (
                    <div key={incident.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center"><AlertTriangle className="w-5 h-5 text-red-600" /></div>
                        <div><h3 className="font-semibold">{incident.type}</h3><p className="text-sm text-gray-600">{incident.employee} • {incident.site}</p><p className="text-sm text-gray-500">{incident.description}</p><p className="text-xs text-gray-400">{incident.date}</p></div>
                      </div>
                      <Badge variant={incident.status === 'Resolved' ? 'default' : 'destructive'}>{incident.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={isEditEmployeeOpen} onOpenChange={setIsEditEmployeeOpen}>
          <DialogContent className="max-w-md"><DialogHeader><DialogTitle>Edit Worker</DialogTitle></DialogHeader>{editingEmployee && <EmployeeForm employee={editingEmployee} onSave={setEditingEmployee} isEdit={true} />}</DialogContent>
        </Dialog>
      </div>
    </div>
  );
}