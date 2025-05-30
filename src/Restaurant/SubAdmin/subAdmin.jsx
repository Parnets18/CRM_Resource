import React, { useState, useEffect } from 'react';
import { Calendar, Clock, DollarSign, Users, FileText, Calculator, Download, Eye, Edit, Trash2, Plus, Search, Filter } from 'lucide-react';
import RestoNav from '../RestoNav';

const SubAdminSalaryAttendance = () => {
  const [activeTab, setActiveTab] = useState('attendance');
  const [selectedMonth, setSelectedMonth] = useState('2025-05');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showSalaryModal, setShowSalaryModal] = useState(false);

  // Sample employee data
  const [employees] = useState([
    {
      id: 1,
      name: 'Rajesh Kumar',
      empId: 'EMP001',
      designation: 'Head Chef',
      department: 'Kitchen',
      baseSalary: 45000,
      joiningDate: '2023-01-15',
      phone: '+91 9876543210',
      email: 'rajesh@restaurant.com',
      bankAccount: 'XXXX-XXXX-1234',
      panCard: 'ABCDE1234F',
      pfNumber: 'PF123456789'
    },
    {
      id: 2,
      name: 'Priya Singh',
      empId: 'EMP002',
      designation: 'Senior Waiter',
      department: 'Service',
      baseSalary: 25000,
      joiningDate: '2023-03-10',
      phone: '+91 9876543211',
      email: 'priya@restaurant.com',
      bankAccount: 'XXXX-XXXX-5678',
      panCard: 'FGHIJ5678K',
      pfNumber: 'PF987654321'
    },
    {
      id: 3,
      name: 'Mohammed Ali',
      empId: 'EMP003',
      designation: 'Kitchen Assistant',
      department: 'Kitchen',
      baseSalary: 18000,
      joiningDate: '2023-06-01',
      phone: '+91 9876543212',
      email: 'mohammed@restaurant.com',
      bankAccount: 'XXXX-XXXX-9012',
      panCard: 'KLMNO9012P',
      pfNumber: 'PF456789123'
    }
  ]);

  // Sample attendance data
  const [attendanceData] = useState([
    {
      empId: 'EMP001',
      name: 'Rajesh Kumar',
      totalDays: 31,
      presentDays: 28,
      absentDays: 2,
      halfDays: 1,
      overtime: 15,
      lateMarks: 3
    },
    {
      empId: 'EMP002',
      name: 'Priya Singh',
      totalDays: 31,
      presentDays: 30,
      absentDays: 1,
      halfDays: 0,
      overtime: 8,
      lateMarks: 1
    },
    {
      empId: 'EMP003',
      name: 'Mohammed Ali',
      totalDays: 31,
      presentDays: 29,
      absentDays: 2,
      halfDays: 0,
      overtime: 12,
      lateMarks: 2
    }
  ]);

  // Salary calculation function
  const calculateSalary = (employee, attendance) => {
    const baseSalary = employee.baseSalary;
    const perDaySalary = baseSalary / 30;
    
    // Basic calculations
    const earnedBasic = (attendance.presentDays + (attendance.halfDays * 0.5)) * perDaySalary;
    const overtimePay = attendance.overtime * (perDaySalary / 8) * 1.5; // 1.5x for overtime
    
    // Allowances
    const hra = earnedBasic * 0.4; // 40% of basic
    const conveyanceAllowance = 2000;
    const medicalAllowance = 1500;
    const foodAllowance = 1000;
    
    const grossSalary = earnedBasic + hra + conveyanceAllowance + medicalAllowance + foodAllowance + overtimePay;
    
    // Deductions
    const providentFund = earnedBasic * 0.12; // 12% of basic
    const esi = grossSalary <= 25000 ? grossSalary * 0.0075 : 0; // 0.75% if salary <= 25k
    const professionalTax = grossSalary > 15000 ? 200 : 0;
    const tds = grossSalary > 40000 ? grossSalary * 0.1 : 0; // 10% TDS if > 40k
    const loanDeduction = 0; // Can be dynamic
    const advanceSalary = 0; // Can be dynamic
    const lateMarkDeduction = attendance.lateMarks * 100; // ₹100 per late mark
    const canteenDeduction = 500; // Fixed canteen charges
    
    const totalDeductions = providentFund + esi + professionalTax + tds + loanDeduction + advanceSalary + lateMarkDeduction + canteenDeduction;
    
    const netSalary = grossSalary - totalDeductions;
    
    return {
      basic: earnedBasic,
      hra,
      conveyanceAllowance,
      medicalAllowance,
      foodAllowance,
      overtimePay,
      grossSalary,
      providentFund,
      esi,
      professionalTax,
      tds,
      loanDeduction,
      advanceSalary,
      lateMarkDeduction,
      canteenDeduction,
      totalDeductions,
      netSalary,
      attendanceDays: attendance.presentDays + (attendance.halfDays * 0.5)
    };
  };

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.empId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const SalaryModal = ({ employee, onClose }) => {
    const attendance = attendanceData.find(att => att.empId === employee.empId);
    const salaryDetails = calculateSalary(employee, attendance);
    
    return (
      <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Salary Slip - {selectedMonth}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <span className="text-2xl">&times;</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Employee Details */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-3 text-gray-800">Employee Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">{employee.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Employee ID:</span>
                  <span className="font-medium">{employee.empId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Designation:</span>
                  <span className="font-medium">{employee.designation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Department:</span>
                  <span className="font-medium">{employee.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">PAN:</span>
                  <span className="font-medium">{employee.panCard}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">PF Number:</span>
                  <span className="font-medium">{employee.pfNumber}</span>
                </div>
              </div>
            </div>

            {/* Attendance Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-3 text-gray-800">Attendance Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Days:</span>
                  <span className="font-medium">{attendance.totalDays}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Present Days:</span>
                  <span className="font-medium text-green-600">{attendance.presentDays}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Absent Days:</span>
                  <span className="font-medium text-red-600">{attendance.absentDays}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Half Days:</span>
                  <span className="font-medium text-yellow-600">{attendance.halfDays}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Overtime Hours:</span>
                  <span className="font-medium text-blue-600">{attendance.overtime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Late Marks:</span>
                  <span className="font-medium text-orange-600">{attendance.lateMarks}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Salary Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Earnings */}
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-3 text-green-800">Earnings</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Basic Salary:</span>
                  <span className="font-medium">₹{salaryDetails.basic.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>HRA (40%):</span>
                  <span className="font-medium">₹{salaryDetails.hra.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Conveyance Allowance:</span>
                  <span className="font-medium">₹{salaryDetails.conveyanceAllowance.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Medical Allowance:</span>
                  <span className="font-medium">₹{salaryDetails.medicalAllowance.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Food Allowance:</span>
                  <span className="font-medium">₹{salaryDetails.foodAllowance.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Overtime Pay:</span>
                  <span className="font-medium">₹{salaryDetails.overtimePay.toFixed(2)}</span>
                </div>
                <hr className="border-green-300" />
                <div className="flex justify-between font-semibold text-green-800">
                  <span>Gross Salary:</span>
                  <span>₹{salaryDetails.grossSalary.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Deductions */}
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-3 text-red-800">Deductions</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Provident Fund (12%):</span>
                  <span className="font-medium">₹{salaryDetails.providentFund.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>ESI (0.75%):</span>
                  <span className="font-medium">₹{salaryDetails.esi.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Professional Tax:</span>
                  <span className="font-medium">₹{salaryDetails.professionalTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>TDS (10%):</span>
                  <span className="font-medium">₹{salaryDetails.tds.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Loan Deduction:</span>
                  <span className="font-medium">₹{salaryDetails.loanDeduction.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Advance Salary:</span>
                  <span className="font-medium">₹{salaryDetails.advanceSalary.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Late Mark Penalty:</span>
                  <span className="font-medium">₹{salaryDetails.lateMarkDeduction.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Canteen Charges:</span>
                  <span className="font-medium">₹{salaryDetails.canteenDeduction.toFixed(2)}</span>
                </div>
                <hr className="border-red-300" />
                <div className="flex justify-between font-semibold text-red-800">
                  <span>Total Deductions:</span>
                  <span>₹{salaryDetails.totalDeductions.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Net Salary */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mt-6">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-blue-800">Net Salary:</span>
              <span className="text-2xl font-bold text-blue-800">₹{salaryDetails.netSalary.toFixed(2)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Send Email
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 ml-64">
        <RestoNav/>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">HR Management</h1>
              <p className="text-gray-600 mt-2">Manage employee attendance and salary processing</p>
            </div>
            <div className="flex space-x-4">
              <select 
                value={selectedMonth} 
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="2025-05">May 2025</option>
                <option value="2025-04">April 2025</option>
                <option value="2025-03">March 2025</option>
              </select>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('attendance')}
              className={`px-6 py-4 font-medium ${
                activeTab === 'attendance' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Attendance</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('salary')}
              className={`px-6 py-4 font-medium ${
                activeTab === 'salary' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5" />
                <span>Salary Management</span>
              </div>
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full md:w-80"
              />
            </div>
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'attendance' && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Attendance Summary - {selectedMonth}</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Days</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Present</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Absent</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Half Days</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overtime</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Late Marks</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance %</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {attendanceData.filter(att => 
                      filteredEmployees.some(emp => emp.empId === att.empId)
                    ).map((attendance, index) => {
                      const attendancePercentage = ((attendance.presentDays + (attendance.halfDays * 0.5)) / attendance.totalDays * 100).toFixed(1);
                      return (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{attendance.name}</div>
                              <div className="text-sm text-gray-500">{attendance.empId}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{attendance.totalDays}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {attendance.presentDays}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              {attendance.absentDays}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              {attendance.halfDays}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {attendance.overtime}h
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                              {attendance.lateMarks}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    attendancePercentage >= 90 ? 'bg-green-500' : 
                                    attendancePercentage >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${attendancePercentage}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-900">{attendancePercentage}%</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'salary' && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Salary Management - {selectedMonth}</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base Salary</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gross Salary</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deductions</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Salary</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredEmployees.map((employee, index) => {
                      const attendance = attendanceData.find(att => att.empId === employee.empId);
                      const salaryDetails = calculateSalary(employee, attendance);
                      return (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                              <div className="text-sm text-gray-500">{employee.empId} • {employee.designation}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{employee.baseSalary.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{salaryDetails.grossSalary.toFixed(0)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">₹{salaryDetails.totalDeductions.toFixed(0)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">₹{salaryDetails.netSalary.toFixed(0)}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Pending
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => {
                                  setSelectedEmployee(employee);
                                  setShowSalaryModal(true);
                                }}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              {/* <button className="text-green-600 hover:text-green-900">
                                <FileText className="w-4 h-4" />
                              </button> */}
                              <button className="text-gray-600 hover:text-gray-900">
                                <Download className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Salary Modal */}
        {showSalaryModal && selectedEmployee && (
          <SalaryModal 
            employee={selectedEmployee} 
            onClose={() => {
              setShowSalaryModal(false);
              setSelectedEmployee(null);
            }} 
          />
        )}
      </div>
    </div>
  );
};

export default SubAdminSalaryAttendance;