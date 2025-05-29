"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  HardHat,
  Plus,
  Edit,
  Trash2,
  X,
  MapPin,
  Calendar,
  Shield,
  Wrench,
} from "lucide-react";
import Nav from "@/Admin/Nav";

export default function ConstructionEmployeeProfile() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Rajesh Kumar Singh",
      position: "Site Supervisor",
      email: "rajesh.kumar@buildtech.com",
      phone: "+91-9876543210",
      department: "Site Operations",
      joinDate: "2022-01-15",
      leaveBalance: "12 days",
      employeeId: "BTC-2022-001",
      aadhaar: "1234-5678-9012",
      experience: "8 years",
      currentSite: "Cyber City Phase 2",
      safetyTraining: "Completed",
      emergencyContact: "+91-9876543211",
    },
    {
      id: 2,
      name: "Priya Sharma",
      position: "Project Manager",
      email: "priya.sharma@buildtech.com",
      phone: "+91-9876543220",
      department: "Project Management",
      joinDate: "2021-03-10",
      leaveBalance: "8 days",
      employeeId: "BTC-2021-005",
      aadhaar: "2345-6789-0123",
      experience: "12 years",
      currentSite: "Metro Station Complex",
      safetyTraining: "Completed",
      emergencyContact: "+91-9876543221",
    },
    {
      id: 3,
      name: "Mohammed Ali",
      position: "Construction Worker",
      email: "mohammed.ali@buildtech.com",
      phone: "+91-9876543230",
      department: "Site Operations",
      joinDate: "2023-06-20",
      leaveBalance: "15 days",
      employeeId: "BTC-2023-012",
      aadhaar: "3456-7890-1234",
      experience: "5 years",
      currentSite: "Cyber City Phase 2",
      safetyTraining: "Pending",
      emergencyContact: "+91-9876543231",
    },
    {
      id: 4,
      name: "Sunita Devi",
      position: "Procurement Officer",
      email: "sunita.devi@buildtech.com",
      phone: "+91-9876543240",
      department: "Procurement",
      joinDate: "2022-08-12",
      leaveBalance: "10 days",
      employeeId: "BTC-2022-008",
      aadhaar: "4567-8901-2345",
      experience: "6 years",
      currentSite: "Head Office",
      safetyTraining: "Completed",
      emergencyContact: "+91-9876543241",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    email: "",
    phone: "",
    department: "",
    joinDate: "",
    leaveBalance: "",
    employeeId: "",
    aadhaar: "",
    experience: "",
    currentSite: "",
    safetyTraining: "",
    emergencyContact: "",
  });

  const constructionDepartments = [
    "Site Operations",
    "Project Management",
    "Procurement",
    "Quality Control",
    "Safety & Compliance",
    "Equipment Management",
    "HR & Administration",
    "Accounts & Finance",
  ];

  const constructionPositions = [
    "Site Supervisor",
    "Project Manager",
    "Construction Worker",
    "Heavy Equipment Operator",
    "Procurement Officer",
    "Quality Inspector",
    "Safety Officer",
    "Site Engineer",
    "Foreman",
    "Electrician",
    "Plumber",
    "Mason",
    "Carpenter",
    "Welder",
    "HR Manager",
    "Accountant",
  ];

  const siteLocations = [
    "Cyber City Phase 2",
    "Metro Station Complex",
    "Industrial Park Project",
    "Residential Tower A",
    "Commercial Complex B",
    "Head Office",
  ];

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setFormData({
      name: "",
      position: "",
      email: "",
      phone: "",
      department: "",
      joinDate: "",
      leaveBalance: "",
      employeeId: "",
      aadhaar: "",
      experience: "",
      currentSite: "",
      safetyTraining: "",
      emergencyContact: "",
    });
    setShowForm(true);
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee.id);
    setFormData({
      name: employee.name,
      position: employee.position,
      email: employee.email,
      phone: employee.phone,
      department: employee.department,
      joinDate: employee.joinDate,
      leaveBalance: employee.leaveBalance,
      employeeId: employee.employeeId,
      aadhaar: employee.aadhaar,
      experience: employee.experience,
      currentSite: employee.currentSite,
      safetyTraining: employee.safetyTraining,
      emergencyContact: employee.emergencyContact,
    });
    setShowForm(true);
  };

  const handleDeleteEmployee = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter((emp) => emp.id !== id));
    }
  };

  const handleSubmit = () => {
    if (editingEmployee) {
      // Update existing employee
      setEmployees(
        employees.map((emp) =>
          emp.id === editingEmployee ? { ...emp, ...formData } : emp
        )
      );
    } else {
      // Add new employee
      const newEmployee = {
        id: Math.max(...employees.map((emp) => emp.id)) + 1,
        ...formData,
      };
      setEmployees([...employees, newEmployee]);
    }

    setShowForm(false);
    setEditingEmployee(null);
    setFormData({
      name: "",
      position: "",
      email: "",
      phone: "",
      department: "",
      joinDate: "",
      leaveBalance: "",
      employeeId: "",
      aadhaar: "",
      experience: "",
      currentSite: "",
      safetyTraining: "",
      emergencyContact: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingEmployee(null);
    setFormData({
      name: "",
      position: "",
      email: "",
      phone: "",
      department: "",
      joinDate: "",
      leaveBalance: "",
      employeeId: "",
      aadhaar: "",
      experience: "",
      currentSite: "",
      safetyTraining: "",
      emergencyContact: "",
    });
  };

  const getSafetyBadgeColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-red-100 text-red-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="ml-64">
      <Nav />
      <div className="min-h-screen bg-white p-8">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-200/30 via-gray-100 to-white"></div>
          <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-blue-300/10 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-black flex items-center gap-3">
                <HardHat className="w-8 h-8 text-blue-600" />
                Construction Employee Management
              </h2>
              <p className="text-gray-600">
                Manage construction worker profiles and site assignments
              </p>
            </div>
            <Button
              onClick={handleAddEmployee}
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Employee
            </Button>
          </div>

          {/* Employee Table */}
          <Card className="border border-blue-500/20 bg-white/80 backdrop-blur-sm mb-6">
            <CardHeader>
              <CardTitle className="text-black flex items-center gap-2">
                <HardHat className="w-5 h-5" /> Employee Directory
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-blue-200">
                      <th className="text-left p-4 font-semibold text-gray-700">
                        Employee
                      </th>
                      <th className="text-left p-4 font-semibold text-gray-700">
                        Position
                      </th>
                      <th className="text-left p-4 font-semibold text-gray-700">
                        Department
                      </th>
                      <th className="text-left p-4 font-semibold text-gray-700">
                        Current Site
                      </th>
                      <th className="text-left p-4 font-semibold text-gray-700">
                        Experience
                      </th>
                      <th className="text-left p-4 font-semibold text-gray-700">
                        Safety Training
                      </th>
                      <th className="text-left p-4 font-semibold text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee) => (
                      <tr
                        key={employee.id}
                        className="border-b border-gray-100 hover:bg-blue-50/50"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center">
                              <HardHat className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <span className="font-medium text-black block">
                                {employee.name}
                              </span>
                              <span className="text-sm text-gray-500">
                                {employee.employeeId}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-gray-700">
                          {employee.position}
                        </td>
                        <td className="p-4 text-gray-700">
                          {employee.department}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700">
                              {employee.currentSite}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-gray-700">
                          {employee.experience}
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getSafetyBadgeColor(
                              employee.safetyTraining
                            )}`}
                          >
                            {employee.safetyTraining}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleEditEmployee(employee)}
                              size="sm"
                              variant="outline"
                              className="border-blue-300 text-blue-600 hover:bg-blue-50"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              onClick={() => handleDeleteEmployee(employee.id)}
                              size="sm"
                              variant="outline"
                              className="border-red-300 text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Add/Edit Employee Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center  z-50">
              <Card className="w-full max-w-4xl  max-h-[90vh] overflow-y-auto">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-black flex items-center gap-2">
                    <HardHat className="w-5 h-5" />
                    {editingEmployee ? "Edit Employee" : "Add New Employee"}
                  </CardTitle>
                  <Button
                    onClick={handleCloseForm}
                    variant="outline"
                    size="sm"
                    className="border-gray-300"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <HardHat className="w-5 h-5" />
                        Personal Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter full name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Employee ID *
                          </label>
                          <input
                            type="text"
                            name="employeeId"
                            value={formData.employeeId}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="e.g., BTC-2024-001"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter email address"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="+91-9876543210"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Aadhaar Number *
                          </label>
                          <input
                            type="text"
                            name="aadhaar"
                            value={formData.aadhaar}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="1234-5678-9012"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Emergency Contact *
                          </label>
                          <input
                            type="tel"
                            name="emergencyContact"
                            value={formData.emergencyContact}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="+91-9876543211"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Work Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Wrench className="w-5 h-5" />
                        Work Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Position *
                          </label>
                          <select
                            name="position"
                            value={formData.position}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select Position</option>
                            {constructionPositions.map((position) => (
                              <option key={position} value={position}>
                                {position}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Department *
                          </label>
                          <select
                            name="department"
                            value={formData.department}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select Department</option>
                            {constructionDepartments.map((dept) => (
                              <option key={dept} value={dept}>
                                {dept}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Current Site *
                          </label>
                          <select
                            name="currentSite"
                            value={formData.currentSite}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select Site</option>
                            {siteLocations.map((site) => (
                              <option key={site} value={site}>
                                {site}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Experience
                          </label>
                          <input
                            type="text"
                            name="experience"
                            value={formData.experience}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="e.g., 5 years"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Join Date *
                          </label>
                          <input
                            type="date"
                            name="joinDate"
                            value={formData.joinDate}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Safety Training Status *
                          </label>
                          <select
                            name="safetyTraining"
                            value={formData.safetyTraining}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select Status</option>
                            <option value="Completed">Completed</option>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Additional Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Leave Balance
                          </label>
                          <input
                            type="text"
                            name="leaveBalance"
                            value={formData.leaveBalance}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="e.g., 12 days"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4 border-t">
                      <Button
                        onClick={handleSubmit}
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                      >
                        {editingEmployee ? "Update Employee" : "Add Employee"}
                      </Button>
                      <Button
                        onClick={handleCloseForm}
                        variant="outline"
                        className="flex-1 border-gray-300"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
