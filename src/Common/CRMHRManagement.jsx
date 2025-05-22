"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { UserPlus, Users, Building, Calendar, FileText } from "lucide-react"

// Initial mock data for HR
const initialData = {
  employees: [
    {
      id: 1,
      name: "Rahul Sharma",
      position: "Software Developer",
      department: "Engineering",
      email: "rahul@example.com",
      phone: "+91 9876543210",
      joinDate: "2022-05-15",
      status: "Active",
    },
    {
      id: 2,
      name: "Priya Patel",
      position: "HR Manager",
      department: "Human Resources",
      email: "priya@example.com",
      phone: "+91 9876543211",
      joinDate: "2021-08-10",
      status: "Active",
    },
    {
      id: 3,
      name: "Amit Kumar",
      position: "Sales Executive",
      department: "Sales",
      email: "amit@example.com",
      phone: "+91 9876543212",
      joinDate: "2023-01-20",
      status: "Active",
    },
  ],
  departments: [
    {
      id: 1,
      name: "Engineering",
      head: "Vikram Desai",
      employeeCount: 12,
      budget: 1500000,
    },
    {
      id: 2,
      name: "Human Resources",
      head: "Priya Patel",
      employeeCount: 5,
      budget: 800000,
    },
    {
      id: 3,
      name: "Sales",
      head: "Rajesh Khanna",
      employeeCount: 8,
      budget: 1200000,
    },
  ],
}

// HR stats
const hrStats = [
  {
    title: "Total Employees",
    value: "45",
    period: "Current",
    icon: Users,
  },
  {
    title: "Departments",
    value: "8",
    period: "Active",
    icon: Building,
  },
  {
    title: "New Hires",
    value: "5",
    period: "This month",
    icon: UserPlus,
  },
  {
    title: "Upcoming Reviews",
    value: "12",
    period: "Next 30 days",
    icon: FileText,
  },
]

const CRMHRManagement = () => {
  // State for active tab and search
  const [activeTab, setActiveTab] = useState("employees")
  const [searchTerm, setSearchTerm] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // State for data
  const [data, setData] = useState(initialData)

  // State for modals
  const [modalState, setModalState] = useState({
    type: null, // 'add', 'edit', 'delete'
    entity: null, // 'employee', 'department', etc.
    isOpen: false,
    currentItem: null,
  })

  // Current form data
  const [formData, setFormData] = useState({})

  // Navigation tabs
  const tabs = [
    { id: "employees", label: "Employees" },
    { id: "departments", label: "Departments" },
    { id: "attendance", label: "Attendance" },
    { id: "leave", label: "Leave Management" },
    { id: "performance", label: "Performance" },
  ]

  // Filter data based on search term
  const filteredData = {
    employees: data.employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
    departments: data.departments.filter(
      (department) =>
        department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        department.head.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  }

  // Open modal
  const openModal = (type, entity, item = null) => {
    let initialFormData = {}

    if (type === "add") {
      // Set default values for new items
      switch (entity) {
        case "employee":
          initialFormData = {
            name: "",
            position: "",
            department: "",
            email: "",
            phone: "",
            joinDate: new Date().toISOString().split("T")[0],
            status: "Active",
          }
          break
        case "department":
          initialFormData = {
            name: "",
            head: "",
            employeeCount: 0,
            budget: 0,
          }
          break
      }
    } else if (type === "edit" && item) {
      // Use existing item data for edit
      initialFormData = { ...item }
    }

    setFormData(initialFormData)
    setModalState({ type, entity, isOpen: true, currentItem: item })
  }

  // Close modal
  const closeModal = () => {
    setModalState({ type: null, entity: null, isOpen: false, currentItem: null })
    setFormData({})
  }

  // Handle form input changes
  const handleFormChange = (e) => {
    const { id, value } = e.target
    setFormData({
      ...formData,
      [id]: id === "budget" || id === "employeeCount" ? Number.parseInt(value) : value,
    })
  }

  // Handle form submission
  const handleSubmit = () => {
    const { type, entity } = modalState
    const entityPlural = `${entity}s`

    if (type === "add") {
      // Create new item
      const newId = data[entityPlural].length > 0 ? Math.max(...data[entityPlural].map((item) => item.id)) + 1 : 1

      // Add new item
      const newItem = { ...formData, id: newId }

      // Update data
      setData({
        ...data,
        [entityPlural]: [...data[entityPlural], newItem],
      })
    } else if (type === "edit") {
      // Update existing item
      setData({
        ...data,
        [entityPlural]: data[entityPlural].map((item) => (item.id === formData.id ? formData : item)),
      })
    }

    closeModal()
  }

  // Handle delete
  const handleDelete = () => {
    const { entity, currentItem } = modalState
    const entityPlural = `${entity}s`

    if (currentItem) {
      setData({
        ...data,
        [entityPlural]: data[entityPlural].filter((item) => item.id !== currentItem.id),
      })
    }

    closeModal()
  }

  return (
    <div className="bg-white min-h-screen p-6 text-black">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">HR Management</h1>
        <p className="text-gray-600">Manage employees, departments, and HR operations</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {hrStats.map((stat, index) => (
          <div key={index} className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
            <div className="flex items-center mb-2">
              <div className="p-2 bg-gray-100 rounded-full mr-3">
                <stat.icon className="h-5 w-5 text-gray-600" />
              </div>
              <span className="text-black font-medium">{stat.title}</span>
            </div>
            <div className="text-2xl font-bold text-black">{stat.value}</div>
            <div className="text-sm text-gray-600 mt-1">{stat.period}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-300 rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-300 flex justify-between items-center">
              <h2 className="font-bold text-black">Employee Directory</h2>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-black rounded-md text-sm">
                  View All
                </button>
                <button 
                  className="px-3 py-1 bg-black hover:bg-gray-800 text-white rounded-md text-sm"
                  onClick={() => openModal("add", "employee")}
                >
                  Add Employee
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Position
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredData.employees.slice(0, 5).map((employee) => (
                      <tr key={employee.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm font-medium text-black">{employee.name}</div>
                          <div className="text-xs text-gray-500">{employee.email}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-black">
                          {employee.position}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-black">
                          {employee.department}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${employee.status === "Active" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-red-100 text-red-800"}`}
                          >
                            {employee.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          <button 
                            className="text-gray-600 hover:text-black mr-2"
                            onClick={() => openModal("edit", "employee", employee)}
                          >
                            Edit
                          </button>
                          <button 
                            className="text-gray-600 hover:text-black"
                            onClick={() => openModal("delete", "employee", employee)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-300 rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-300">
            <h2 className="font-bold text-black">Department Overview</h2>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {filteredData.departments.map((department) => (
                <div key={department.id} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-black">{department.name}</h3>
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                      {department.employeeCount} employees
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-1">Head: {department.head}</div>
                  <div className="text-sm text-gray-600">Budget: ₹{department.budget.toLocaleString()}</div>
                </div>
              ))}
              <button 
                className="w-full mt-4 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-black rounded-md text-sm"
                onClick={() => openModal("add", "department")}
              >
                Add Department
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalState.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-black mb-4">
              {modalState.type === "add"
                ? `Add New ${modalState.entity === "employee" ? "Employee" : "Department"}`
                : modalState.type === "edit"
                ? `Edit ${modalState.entity === "employee" ? "Employee" : "Department"}`
                : `Delete ${modalState.entity === "employee" ? "Employee" : "Department"}`}
            </h3>

            {modalState.type === "delete" ? (
              <div>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this {modalState.entity}? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-2">
                  <button
                    className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-black"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="space-y-4">
                  {/* Employee form fields */}
                  {modalState.entity === "employee" && (
                    <>
                      <div>
                        <label htmlFor="name" className="text-sm text-gray-600 block mb-1">
                          Full Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          className="w-full px-3 py-2 rounded-md bg-white border border-gray-300 text-black focus:outline-none focus:ring-1 focus:ring-gray-400"
                          value={formData.name || ""}
                          onChange={handleFormChange}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="position" className="text-sm text-gray-600 block mb-1">
                            Position
                          </label>
                          <input
                            id="position"
                            type="text"
                            className="w-full px-3 py-2 rounded-md bg-white border border-gray-300 text-black focus:outline-none focus:ring-1 focus:ring-gray-400"
                            value={formData.position || ""}
                            onChange={handleFormChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="department" className="text-sm text-gray-600 block mb-1">
                            Department
                          </label>
                          <select
                            id="department"
                            className="w-full px-3 py-2 rounded-md bg-white border border-gray-300 text-black focus:outline-none focus:ring-1 focus:ring-gray-400"
                            value={formData.department || ""}
                            onChange={handleFormChange}
                          >
                            <option value="">Select department</option>
                            {data.departments.map((dept) => (
                              <option key={dept.id} value={dept.name}>
                                {dept.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="email" className="text-sm text-gray-600 block mb-1">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="w-full px-3 py-2 rounded-md bg-white border border-gray-300 text-black focus:outline-none focus:ring-1 focus:ring-gray-400"
                          value={formData.email || ""}
                          onChange={handleFormChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="text-sm text-gray-600 block mb-1">
                          Phone
                        </label>
                        <input
                          id="phone"
                          type="text"
                          className="w-full px-3 py-2 rounded-md bg-white border border-gray-300 text-black focus:outline-none focus:ring-1 focus:ring-gray-400"
                          value={formData.phone || ""}
                          onChange={handleFormChange}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="joinDate" className="text-sm text-gray-600 block mb-1">
                            Join Date
                          </label>
                          <input
                            id="joinDate"
                            type="date"
                            className="w-full px-3 py-2 rounded-md bg-white border border-gray-300 text-black focus:outline-none focus:ring-1 focus:ring-gray-400"
                            value={formData.joinDate || ""}
                            onChange={handleFormChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="status" className="text-sm text-gray-600 block mb-1">
                            Status
                          </label>
                          <select
                            id="status"
                            className="w-full px-3 py-2 rounded-md bg-white border border-gray-300 text-black focus:outline-none focus:ring-1 focus:ring-gray-400"
                            value={formData.status || "Active"}
                            onChange={handleFormChange}
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Department form fields */}
                  {modalState.entity === "department" && (
                    <>
                      <div>
                        <label htmlFor="name" className="text-sm text-gray-600 block mb-1">
                          Department Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          className="w-full px-3 py-2 rounded-md bg-white border border-gray-300 text-black focus:outline-none focus:ring-1 focus:ring-gray-400"
                          value={formData.name || ""}
                          onChange={handleFormChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="head" className="text-sm text-gray-600 block mb-1">
                          Head of Department
                        </label>
                        <input
                          id="head"
                          type="text"
                          className="w-full px-3 py-2 rounded-md bg-white border border-gray-300 text-black focus:outline-none focus:ring-1 focus:ring-gray-400"
                          value={formData.head || ""}
                          onChange={handleFormChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="employeeCount" className="text-sm text-gray-600 block mb-1">
                          Number of Employees
                        </label>
                        <input
                          id="employeeCount"
                          type="number"
                          className="w-full px-3 py-2 rounded-md bg-white border border-gray-300 text-black focus:outline-none focus:ring-1 focus:ring-gray-400"
                          value={formData.employeeCount || 0}
                          onChange={handleFormChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="budget" className="text-sm text-gray-600 block mb-1">
                          Department Budget (₹)
                        </label>
                        <input
                          id="budget"
                          type="number"
                          className="w-full px-3 py-2 rounded-md bg-white border border-gray-300 text-black focus:outline-none focus:ring-1 focus:ring-gray-400"
                          value={formData.budget || 0}
                          onChange={handleFormChange}
                        />
                      </div>
                    </>
                  )}
                </div>

                <div className="flex justify-end space-x-2 mt-6">
                  <button
                    className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 rounded-md bg-purple-700 hover:bg-purple-600 text-white"
                    onClick={handleSubmit}
                  >
                    {modalState.type === "add" ? "Add" : "Update"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CRMHRManagement
