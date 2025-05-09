"use client"

import { useState } from "react"
import { Search, Plus, Edit, Trash2, FileText, Upload, Award, Clock, UserCheck } from "lucide-react"
import { motion } from "framer-motion"

const CRMHRManagement = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState("employees")

  // State for search query
  const [searchQuery, setSearchQuery] = useState("")

  // Sample employee data
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "John Doe",
      position: "Software Developer",
      department: "Engineering",
      status: "Active",
      joiningDate: "15 Jan 2023",
      email: "john.doe@example.com",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "HR Manager",
      department: "Human Resources",
      status: "Active",
      joiningDate: "05 Mar 2022",
      email: "jane.smith@example.com",
    },
    {
      id: 3,
      name: "Robert Johnson",
      position: "Project Manager",
      department: "Project Management",
      status: "On Probation",
      joiningDate: "10 Nov 2023",
      email: "robert.j@example.com",
    },
    {
      id: 4,
      name: "Emily Davis",
      position: "UX Designer",
      department: "Design",
      status: "Active",
      joiningDate: "22 Jun 2023",
      email: "emily.d@example.com",
    },
    {
      id: 5,
      name: "Michael Wilson",
      position: "Sales Executive",
      department: "Sales",
      status: "Active",
      joiningDate: "18 Apr 2022",
      email: "michael.w@example.com",
    },
  ])

  // Sample departments data
  const departments = [
    { id: 1, name: "Engineering", headCount: 12, manager: "Alex Turner" },
    { id: 2, name: "Human Resources", headCount: 5, manager: "Jane Smith" },
    { id: 3, name: "Sales", headCount: 8, manager: "David Miller" },
    { id: 4, name: "Design", headCount: 6, manager: "Sarah Johnson" },
    { id: 5, name: "Project Management", headCount: 4, manager: "Mark Williams" },
  ]

  // Sample documents data
  const documents = [
    { id: 1, employeeName: "John Doe", documentType: "ID Proof", uploadDate: "20 Jan 2023", status: "Verified" },
    { id: 2, employeeName: "Jane Smith", documentType: "Certificate", uploadDate: "15 Mar 2022", status: "Verified" },
    { id: 3, employeeName: "Robert Johnson", documentType: "Resume", uploadDate: "12 Nov 2023", status: "Pending" },
    { id: 4, employeeName: "Emily Davis", documentType: "ID Proof", uploadDate: "25 Jun 2023", status: "Verified" },
    {
      id: 5,
      employeeName: "Michael Wilson",
      documentType: "Certificate",
      uploadDate: "22 Apr 2022",
      status: "Verified",
    },
  ]

  // Sample onboarding/offboarding data
  const processes = [
    {
      id: 1,
      employeeName: "Alice Cooper",
      type: "Onboarding",
      stage: "Offer Letter",
      startDate: "05 May 2024",
      status: "In Progress",
    },
    {
      id: 2,
      employeeName: "Tom Harris",
      type: "Offboarding",
      stage: "Exit Interview",
      startDate: "10 Apr 2024",
      status: "Completed",
    },
    {
      id: 3,
      employeeName: "Sarah Johnson",
      type: "Onboarding",
      stage: "Documentation",
      startDate: "15 May 2024",
      status: "In Progress",
    },
    {
      id: 4,
      employeeName: "James Wilson",
      type: "Onboarding",
      stage: "Training",
      startDate: "01 Apr 2024",
      status: "In Progress",
    },
    {
      id: 5,
      employeeName: "Linda Brown",
      type: "Offboarding",
      stage: "FNF Process",
      startDate: "20 Mar 2024",
      status: "In Progress",
    },
  ]

  // Sample career progression data
  const careerProgressions = [
    {
      id: 1,
      employeeName: "John Doe",
      fromPosition: "Junior Developer",
      toPosition: "Software Developer",
      type: "Promotion",
      date: "10 Jan 2024",
    },
    {
      id: 2,
      employeeName: "Jane Smith",
      fromPosition: "HR Executive",
      toPosition: "HR Manager",
      type: "Promotion",
      date: "15 Feb 2023",
    },
    {
      id: 3,
      employeeName: "Michael Wilson",
      fromDepartment: "Marketing",
      toDepartment: "Sales",
      type: "Transfer",
      date: "05 Mar 2024",
    },
    {
      id: 4,
      employeeName: "Emily Davis",
      fromPosition: "UI Designer",
      toPosition: "UX Designer",
      type: "Promotion",
      date: "20 Dec 2023",
    },
    {
      id: 5,
      employeeName: "Robert Johnson",
      fromDepartment: "Engineering",
      toDepartment: "Project Management",
      type: "Transfer",
      date: "12 Oct 2023",
    },
  ]

  // Sample probation data
  const probations = [
    {
      id: 1,
      employeeName: "Robert Johnson",
      startDate: "10 Nov 2023",
      endDate: "10 May 2024",
      status: "In Progress",
      reviewDate: "10 May 2024",
    },
    {
      id: 2,
      employeeName: "Sarah Connor",
      startDate: "05 Jan 2024",
      endDate: "05 Jul 2024",
      status: "In Progress",
      reviewDate: "05 Jul 2024",
    },
    {
      id: 3,
      employeeName: "James Wilson",
      startDate: "01 Feb 2024",
      endDate: "01 Aug 2024",
      status: "In Progress",
      reviewDate: "01 Aug 2024",
    },
    {
      id: 4,
      employeeName: "Tom Harris",
      startDate: "15 Oct 2023",
      endDate: "15 Apr 2024",
      status: "Completed",
      reviewDate: "15 Apr 2024",
    },
    {
      id: 5,
      employeeName: "Alice Cooper",
      startDate: "20 Mar 2024",
      endDate: "20 Sep 2024",
      status: "In Progress",
      reviewDate: "20 Sep 2024",
    },
  ]

  // Filter employees based on search query
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "employees":
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-black/50 rounded-lg overflow-hidden">
              <thead className="bg-purple-900/30">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-100 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-100 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-100 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-100 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-100 uppercase tracking-wider">
                    Joining Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-100 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-800/30">
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-purple-900/10">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{employee.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{employee.position}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{employee.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          employee.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : employee.status === "On Probation"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{employee.joiningDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-indigo-400 hover:text-indigo-300 mr-3">
                        <Edit size={16} />
                      </button>
                      <button className="text-red-400 hover:text-red-300">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      case "departments":
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-black/50 rounded-lg overflow-hidden">
              <thead className="bg-purple-900/30">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-100 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-100 uppercase tracking-wider">
                    Head Count
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-100 uppercase tracking-wider">
                    Manager
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-100 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-800/30">
                {departments.map((department) => (
                  <tr key={department.id} className="hover:bg-purple-900/10">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{department.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{department.headCount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{department.manager}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-indigo-400 hover:text-indigo-300 mr-3">
                        <Edit size={16} />
                      </button>
                      <button className="text-red-400 hover:text-red-300">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      case "documents":
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-black/50 rounded-lg overflow-hidden">
              <thead className="bg-purple-900/30">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-100 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-100 uppercase tracking-wider">
                    Document Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-100 uppercase tracking-wider">
                    Upload Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-100 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-100 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-800/30">
                {documents.map((document) => (
                  <tr key={document.id} className="hover:bg-purple-900/10">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      {document.employeeName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{document.documentType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{document.uploadDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          document.status === "Verified"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {document.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-indigo-400 hover:text-indigo-300 mr-3">
                        <FileText size={16} />
                      </button>
                      <button className="text-red-400 hover:text-red-300">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      case "onboarding":
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-black/50 rounded-lg overflow-hidden">
              <thead className="bg-purple-900/30">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-100 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-100 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-100 uppercase tracking-wider">
                    Stage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-100 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-100 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-100 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-800/30">
                {processes.map((process) => (
                  <tr key={process.id} className="hover:bg-purple-900/10">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      {process.employeeName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{process.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{process.stage}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{process.startDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          process.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {process.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-indigo-400 hover:text-indigo-300 mr-3">
                        <Edit size={16} />
                      </button>
                      <button className="text-red-400 hover:text-red-300">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      case "career":
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-black/50 rounded-lg overflow-hidden">
              <thead className="bg-purple-900/30">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-100 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-100 uppercase tracking-wider">
                    From
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-100 uppercase tracking-wider">
                    To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-100 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-100 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-100 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-800/30">
                {careerProgressions.map((progression) => (
                  <tr key={progression.id} className="hover:bg-purple-900/10">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      {progression.employeeName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {progression.fromPosition || progression.fromDepartment}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {progression.toPosition || progression.toDepartment}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          progression.type === "Promotion" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {progression.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{progression.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-indigo-400 hover:text-indigo-300 mr-3">
                        <Edit size={16} />
                      </button>
                      <button className="text-red-400 hover:text-red-300">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      case "probation":
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-black/50 rounded-lg overflow-hidden">
              <thead className="bg-purple-900/30">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-100 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-100 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-100 uppercase tracking-wider">
                    End Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-100 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-100 uppercase tracking-wider">
                    Review Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-100 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-800/30">
                {probations.map((probation) => (
                  <tr key={probation.id} className="hover:bg-purple-900/10">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      {probation.employeeName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{probation.startDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{probation.endDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          probation.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {probation.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{probation.reviewDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-indigo-400 hover:text-indigo-300 mr-3">
                        <Edit size={16} />
                      </button>
                      <button className="text-red-400 hover:text-red-300">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      case "self-service":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-black/50 rounded-lg p-6 border border-purple-700/30">
              <h3 className="text-lg font-medium text-white mb-4">View Payslips</h3>
              <p className="text-gray-300 mb-4">Access your monthly salary statements and payment history.</p>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                View Payslips
              </button>
            </div>
            <div className="bg-black/50 rounded-lg p-6 border border-purple-700/30">
              <h3 className="text-lg font-medium text-white mb-4">Apply for Leave</h3>
              <p className="text-gray-300 mb-4">Submit leave requests and check your leave balance.</p>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                Apply Now
              </button>
            </div>
            <div className="bg-black/50 rounded-lg p-6 border border-purple-700/30">
              <h3 className="text-lg font-medium text-white mb-4">Raise Query</h3>
              <p className="text-gray-300 mb-4">Submit questions or concerns to the HR department.</p>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                New Query
              </button>
            </div>
            <div className="bg-black/50 rounded-lg p-6 border border-purple-700/30">
              <h3 className="text-lg font-medium text-white mb-4">Update Profile</h3>
              <p className="text-gray-300 mb-4">Keep your personal information up to date.</p>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                Edit Profile
              </button>
            </div>
            <div className="bg-black/50 rounded-lg p-6 border border-purple-700/30">
              <h3 className="text-lg font-medium text-white mb-4">Document Upload</h3>
              <p className="text-gray-300 mb-4">Submit required documents and certificates.</p>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                Upload Documents
              </button>
            </div>
            <div className="bg-black/50 rounded-lg p-6 border border-purple-700/30">
              <h3 className="text-lg font-medium text-white mb-4">View Attendance</h3>
              <p className="text-gray-300 mb-4">Check your attendance records and time logs.</p>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                View Records
              </button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  // Animation variants for the tab content
  const tabContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  return (
    <div className="min-h-screen bg-black/90 border-r border-purple-700/30 backdrop-blur-md text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">HR Management</h1>
            <p className="text-gray-400 mt-1">Manage your organization's human resources efficiently</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-black/50 border border-purple-700/30 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            <button className="flex items-center px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-700 transition-colors">
              <Plus className="h-4 w-4 mr-2" />
              Add Employee
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-purple-700/30">
          <nav className="flex space-x-4 overflow-x-auto pb-2">
            <button
              className={`px-3 py-2 font-medium text-sm rounded-t-md ${activeTab === "employees" ? "bg-purple-700/20 text-purple-300 border-b-2 border-purple-500" : "text-gray-400 hover:text-gray-300"}`}
              onClick={() => setActiveTab("employees")}
            >
              <div className="flex items-center">
                <UserCheck className="h-4 w-4 mr-2" />
                Employee Directory
              </div>
            </button>
            <button
              className={`px-3 py-2 font-medium text-sm rounded-t-md ${activeTab === "departments" ? "bg-purple-700/20 text-purple-300 border-b-2 border-purple-500" : "text-gray-400 hover:text-gray-300"}`}
              onClick={() => setActiveTab("departments")}
            >
              <div className="flex items-center">
                <UserCheck className="h-4 w-4 mr-2" />
                Organizational Structure
              </div>
            </button>
            <button
              className={`px-3 py-2 font-medium text-sm rounded-t-md ${activeTab === "documents" ? "bg-purple-700/20 text-purple-300 border-b-2 border-purple-500" : "text-gray-400 hover:text-gray-300"}`}
              onClick={() => setActiveTab("documents")}
            >
              <div className="flex items-center">
                <Upload className="h-4 w-4 mr-2" />
                Document Management
              </div>
            </button>
            <button
              className={`px-3 py-2 font-medium text-sm rounded-t-md ${activeTab === "onboarding" ? "bg-purple-700/20 text-purple-300 border-b-2 border-purple-500" : "text-gray-400 hover:text-gray-300"}`}
              onClick={() => setActiveTab("onboarding")}
            >
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Onboarding/Offboarding
              </div>
            </button>
            <button
              className={`px-3 py-2 font-medium text-sm rounded-t-md ${activeTab === "career" ? "bg-purple-700/20 text-purple-300 border-b-2 border-purple-500" : "text-gray-400 hover:text-gray-300"}`}
              onClick={() => setActiveTab("career")}
            >
              <div className="flex items-center">
                <Award className="h-4 w-4 mr-2" />
                Career Progression
              </div>
            </button>
            <button
              className={`px-3 py-2 font-medium text-sm rounded-t-md ${activeTab === "probation" ? "bg-purple-700/20 text-purple-300 border-b-2 border-purple-500" : "text-gray-400 hover:text-gray-300"}`}
              onClick={() => setActiveTab("probation")}
            >
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Probation Tracking
              </div>
            </button>
            <button
              className={`px-3 py-2 font-medium text-sm rounded-t-md ${activeTab === "self-service" ? "bg-purple-700/20 text-purple-300 border-b-2 border-purple-500" : "text-gray-400 hover:text-gray-300"}`}
              onClick={() => setActiveTab("self-service")}
            >
              <div className="flex items-center">
                <UserCheck className="h-4 w-4 mr-2" />
                Employee Self-Service
              </div>
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial="hidden"
          animate="visible"
          variants={tabContentVariants}
          className="bg-black/50 rounded-lg p-6 border border-purple-700/30"
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </div>
  )
}

export default CRMHRManagement
