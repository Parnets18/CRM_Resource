"use client"

import { useState } from "react"
import { motion } from "framer-motion"

// Initial mock data
const initialData = {
  customers: [
    {
      id: 1,
      name: "Acme Corporation",
      contactPerson: "John Smith",
      email: "john@acmecorp.com",
      phone: "+91 9876543210",
      address: "123 Business Park, Mumbai, 400001",
      status: "Active",
      category: "Enterprise",
    },
    {
      id: 2,
      name: "TechSolutions Inc",
      contactPerson: "Priya Sharma",
      email: "priya@techsolutions.com",
      phone: "+91 9876543211",
      address: "456 Tech Hub, Bangalore, 560001",
      status: "Active",
      category: "SMB",
    },
    {
      id: 3,
      name: "Global Traders",
      contactPerson: "Rajesh Kumar",
      email: "rajesh@globaltraders.com",
      phone: "+91 9876543212",
      address: "789 Trade Center, Delhi, 110001",
      status: "Inactive",
      category: "Enterprise",
    },
  ],
  followUps: [
    {
      id: 1,
      customerId: 1,
      customerName: "Acme Corporation",
      type: "Meeting",
      subject: "Quarterly Review",
      date: "2023-06-15",
      time: "10:00 AM",
      notes: "Discuss Q2 performance",
      status: "Scheduled",
      assignedTo: "Rahul Verma",
    },
    {
      id: 2,
      customerId: 2,
      customerName: "TechSolutions Inc",
      type: "Call",
      subject: "Product Demo",
      date: "2023-06-10",
      time: "02:30 PM",
      notes: "Demonstrate new features",
      status: "Completed",
      assignedTo: "Neha Gupta",
    },
  ],
  communications: [
    {
      id: 1,
      customerId: 1,
      customerName: "Acme Corporation",
      type: "Email",
      subject: "Invoice #INV-2023-001",
      date: "2023-05-20",
      content: "Monthly invoice sent for May 2023",
      status: "Sent",
      sentBy: "System",
    },
    {
      id: 2,
      customerId: 2,
      customerName: "TechSolutions Inc",
      type: "SMS",
      subject: "Payment Reminder",
      date: "2023-05-25",
      content: "Reminder: Payment due for invoice",
      status: "Sent",
      sentBy: "Neha Gupta",
    },
  ],
  tickets: [
    {
      id: 1,
      customerId: 1,
      customerName: "Acme Corporation",
      subject: "Login Issue",
      description: "Unable to login to the dashboard",
      priority: "High",
      status: "Open",
      assignedTo: "Amit Shah",
    },
    {
      id: 2,
      customerId: 2,
      customerName: "TechSolutions Inc",
      subject: "Report Generation Error",
      description: "Error when generating monthly report",
      priority: "Medium",
      status: "In Progress",
      assignedTo: "Neha Gupta",
    },
  ],
  contracts: [
    {
      id: 1,
      customerId: 1,
      customerName: "Acme Corporation",
      type: "AMC",
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      value: 120000,
      status: "Active",
      renewalDate: "2023-12-01",
      paymentTerms: "Quarterly",
    },
    {
      id: 2,
      customerId: 2,
      customerName: "TechSolutions Inc",
      type: "Warranty",
      startDate: "2023-02-15",
      endDate: "2024-02-14",
      value: 75000,
      status: "Active",
      renewalDate: "2024-01-15",
      paymentTerms: "Annual",
    },
  ],
}

const CRMManagement = () => {
  // State for active tab and search
  const [activeTab, setActiveTab] = useState("customers")
  const [searchTerm, setSearchTerm] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // State for data
  const [data, setData] = useState(initialData)

  // State for modals
  const [modalState, setModalState] = useState({
    type: null, // 'add', 'edit', 'delete'
    entity: null, // 'customer', 'followUp', etc.
    isOpen: false,
    currentItem: null,
  })

  // Current form data
  const [formData, setFormData] = useState({})

  // Navigation tabs
  const tabs = [
    { id: "customers", label: "Customer Master" },
    { id: "followups", label: "Follow-ups & Activities" },
    { id: "communications", label: "Communication Log" },
    { id: "tickets", label: "Support Tickets" },
    { id: "contracts", label: "Contracts & Renewals" },
  ]

  // Filter data based on search term
  const filteredData = {
    customers: data.customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
    followUps: data.followUps.filter(
      (followUp) =>
        followUp.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        followUp.subject.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
    communications: data.communications.filter(
      (communication) =>
        communication.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        communication.subject.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
    tickets: data.tickets.filter(
      (ticket) =>
        ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
    contracts: data.contracts.filter(
      (contract) =>
        contract.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract.type.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  }

  // Open modal
  const openModal = (type, entity, item = null) => {
    let initialFormData = {}

    if (type === "add") {
      // Set default values for new items
      switch (entity) {
        case "customer":
          initialFormData = {
            name: "",
            contactPerson: "",
            email: "",
            phone: "",
            address: "",
            status: "Active",
            category: "Enterprise",
          }
          break
        case "followUp":
          initialFormData = {
            customerId: "",
            type: "Meeting",
            subject: "",
            date: "",
            time: "",
            notes: "",
            status: "Scheduled",
            assignedTo: "Rahul Verma",
          }
          break
        case "communication":
          initialFormData = {
            customerId: "",
            type: "Email",
            subject: "",
            content: "",
            status: "Sent",
            sentBy: "System",
          }
          break
        case "ticket":
          initialFormData = {
            customerId: "",
            subject: "",
            description: "",
            priority: "Medium",
            status: "Open",
            assignedTo: "Amit Shah",
          }
          break
        case "contract":
          initialFormData = {
            customerId: "",
            type: "AMC",
            startDate: "",
            endDate: "",
            value: 0,
            status: "Active",
            renewalDate: "",
            paymentTerms: "Annual",
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

    // Special handling for customer selection
    if (id === "customerId" && value) {
      const selectedCustomer = data.customers.find((c) => c.id === Number.parseInt(value))
      if (selectedCustomer) {
        setFormData({
          ...formData,
          customerId: Number.parseInt(value),
          customerName: selectedCustomer.name,
        })
      }
    } else {
      setFormData({
        ...formData,
        [id]: id === "value" ? Number.parseInt(value) : value,
      })
    }
  }

  // Handle form submission
  const handleSubmit = () => {
    const { type, entity } = modalState
    const entityPlural = entity === "followUp" ? "followUps" : `${entity}s`

    if (type === "add") {
      // Create new item
      const newId = data[entityPlural].length > 0 ? Math.max(...data[entityPlural].map((item) => item.id)) + 1 : 1

      // Add date fields for certain entities
      const newItem = { ...formData, id: newId }

      if (entity === "communication") {
        newItem.date = new Date().toISOString().split("T")[0]
      }

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
    const entityPlural = entity === "followUp" ? "followUps" : `${entity}s`

    if (currentItem) {
      setData({
        ...data,
        [entityPlural]: data[entityPlural].filter((item) => item.id !== currentItem.id),
      })
    }

    closeModal()
  }

  // Calculate statistics
  const stats = {
    followUps: {
      today: data.followUps.filter((f) => f.date === new Date().toISOString().split("T")[0]).length,
      upcoming: data.followUps.filter(
        (f) =>
          new Date(f.date) > new Date() && new Date(f.date) <= new Date(new Date().setDate(new Date().getDate() + 7)),
      ).length,
      completed: data.followUps.filter((f) => f.status === "Completed").length,
    },
    communications: {
      email: data.communications.filter((c) => c.type === "Email").length,
      sms: data.communications.filter((c) => c.type === "SMS").length,
      whatsapp: data.communications.filter((c) => c.type === "WhatsApp").length,
    },
    tickets: {
      open: data.tickets.filter((t) => t.status === "Open").length,
      inProgress: data.tickets.filter((t) => t.status === "In Progress").length,
      resolved: data.tickets.filter((t) => t.status === "Resolved").length,
    },
    contracts: {
      active: data.contracts.filter((c) => c.status === "Active").length,
      upcoming: data.contracts.filter(
        (c) => new Date(c.renewalDate) <= new Date(new Date().setDate(new Date().getDate() + 30)),
      ).length,
      value: data.contracts.reduce((sum, contract) => sum + contract.value, 0),
    },
  }

  // Mark item as completed/resolved
  const markAsCompleted = (entity, id) => {
    const entityPlural = entity === "followUp" ? "followUps" : `${entity}s`

    setData({
      ...data,
      [entityPlural]: data[entityPlural].map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: entity === "followUp" ? "Completed" : "Resolved",
            lastUpdated: new Date().toISOString().split("T")[0],
          }
        }
        return item
      }),
    })
  }

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-white">
      {/* Header with navigation */}
      <header className="bg-gray-900 border-b border-purple-700/30">
        <div className="container mx-auto px-4">
          {/* Top header with logo and user controls */}
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-purple-400">Customer Relationship Management</h1>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

            {/* Search and user icon */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <svg
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-8 pr-4 py-1 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="h-8 w-8 rounded-full bg-purple-700 flex items-center justify-center">
                <span className="font-semibold">A</span>
              </div>
            </div>
          </div>

          {/* Horizontal navigation */}
          <nav className="hidden md:flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`flex items-center px-4 py-3 transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? "border-purple-500 text-purple-300"
                    : "border-transparent hover:border-purple-700/50 text-gray-300 hover:text-white"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Mobile navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-2 border-t border-purple-700/30">
              <div className="grid grid-cols-2 gap-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                      activeTab === tab.id ? "bg-purple-700/30 text-purple-300" : "hover:bg-purple-700/10 text-gray-300"
                    }`}
                    onClick={() => {
                      setActiveTab(tab.id)
                      setMobileMenuOpen(false)
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="mt-2 pt-2 border-t border-purple-700/30">
                <div className="relative">
                  <svg
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-8 pr-4 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto container mx-auto px-4 py-6">
        {/* Customer Master */}
        {activeTab === "customers" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-white">Customer Master</h2>
                <p className="text-gray-400 mt-1">Manage customer information and details</p>
              </div>
              <button
                className="flex items-center justify-center px-4 py-2 rounded-md bg-purple-700 hover:bg-purple-600 text-white"
                onClick={() => openModal("add", "customer")}
              >
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Customer
              </button>
            </div>

            <div className="bg-gray-900/50 rounded-lg overflow-hidden shadow-xl border border-purple-700/20">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-purple-700/30">
                  <thead className="bg-gray-800/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Address
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-700/20">
                    {filteredData.customers.map((customer) => (
                      <tr key={customer.id} className="hover:bg-purple-900/10">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-2">
                              <div className="text-sm font-medium text-white">{customer.name}</div>
                              <div className="text-xs text-gray-400">{customer.category}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-white">{customer.contactPerson}</div>
                          <div className="text-xs text-gray-400">{customer.email}</div>
                          <div className="text-xs text-gray-400">{customer.phone}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm text-white">{customer.address}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              customer.status === "Active"
                                ? "bg-green-800/30 text-green-300"
                                : "bg-red-800/30 text-red-300"
                            }`}
                          >
                            {customer.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                          <div className="flex space-x-2">
                            <button
                              className="text-yellow-400 hover:text-yellow-300"
                              onClick={() => openModal("edit", "customer", customer)}
                            >
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                              </svg>
                            </button>
                            <button
                              className="text-red-400 hover:text-red-300"
                              onClick={() => openModal("delete", "customer", customer)}
                            >
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Follow-ups & Activities */}
        {activeTab === "followups" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-white">Follow-ups & Activities</h2>
                <p className="text-gray-400 mt-1">Set reminders for meetings and calls with customers</p>
              </div>
              <button
                className="flex items-center justify-center px-4 py-2 rounded-md bg-purple-700 hover:bg-purple-600 text-white"
                onClick={() => openModal("add", "followUp")}
              >
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Follow-up
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-4 shadow-lg">
                <h3 className="text-md font-semibold text-white mb-2">Today's Activities</h3>
                <div className="text-3xl font-bold text-purple-400">{stats.followUps.today}</div>
                <p className="text-sm text-gray-400 mt-1">Scheduled for today</p>
              </div>

              <div className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-4 shadow-lg">
                <h3 className="text-md font-semibold text-white mb-2">Upcoming</h3>
                <div className="text-3xl font-bold text-blue-400">{stats.followUps.upcoming}</div>
                <p className="text-sm text-gray-400 mt-1">Next 7 days</p>
              </div>

              <div className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-4 shadow-lg">
                <h3 className="text-md font-semibold text-white mb-2">Completed</h3>
                <div className="text-3xl font-bold text-green-400">{stats.followUps.completed}</div>
                <p className="text-sm text-gray-400 mt-1">Total completed</p>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg overflow-hidden shadow-xl border border-purple-700/20">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-purple-700/30">
                  <thead className="bg-gray-800/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Subject
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-700/20">
                    {filteredData.followUps.map((followUp) => (
                      <tr key={followUp.id} className="hover:bg-purple-900/10">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">{followUp.customerName}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-white">{followUp.type}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm text-white">{followUp.subject}</div>
                          <div className="text-xs text-gray-400">{followUp.notes}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-white">{followUp.date}</div>
                          <div className="text-xs text-gray-400">{followUp.time}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              followUp.status === "Completed"
                                ? "bg-green-800/30 text-green-300"
                                : followUp.status === "Scheduled"
                                  ? "bg-blue-800/30 text-blue-300"
                                  : "bg-yellow-800/30 text-yellow-300"
                            }`}
                          >
                            {followUp.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                          <div className="flex space-x-2">
                            <button
                              className="text-green-400 hover:text-green-300"
                              onClick={() => markAsCompleted("followUp", followUp.id)}
                            >
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </button>
                            <button
                              className="text-yellow-400 hover:text-yellow-300"
                              onClick={() => openModal("edit", "followUp", followUp)}
                            >
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                              </svg>
                            </button>
                            <button
                              className="text-red-400 hover:text-red-300"
                              onClick={() => openModal("delete", "followUp", followUp)}
                            >
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Communication Log */}
        {activeTab === "communications" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-white">Communication Log</h2>
                <p className="text-gray-400 mt-1">Track email, SMS, and WhatsApp communications</p>
              </div>
              <button
                className="flex items-center justify-center px-4 py-2 rounded-md bg-purple-700 hover:bg-purple-600 text-white"
                onClick={() => openModal("add", "communication")}
              >
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Communication
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-4 shadow-lg">
                <h3 className="text-md font-semibold text-white mb-2">Email</h3>
                <div className="text-3xl font-bold text-blue-400">{stats.communications.email}</div>
                <p className="text-sm text-gray-400 mt-1">Total emails</p>
              </div>

              <div className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-4 shadow-lg">
                <h3 className="text-md font-semibold text-white mb-2">SMS</h3>
                <div className="text-3xl font-bold text-green-400">{stats.communications.sms}</div>
                <p className="text-sm text-gray-400 mt-1">Total SMS</p>
              </div>

              <div className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-4 shadow-lg">
                <h3 className="text-md font-semibold text-white mb-2">WhatsApp</h3>
                <div className="text-3xl font-bold text-purple-400">{stats.communications.whatsapp}</div>
                <p className="text-sm text-gray-400 mt-1">Total WhatsApp</p>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg overflow-hidden shadow-xl border border-purple-700/20">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-purple-700/30">
                  <thead className="bg-gray-800/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Subject
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-700/20">
                    {filteredData.communications.map((communication) => (
                      <tr key={communication.id} className="hover:bg-purple-900/10">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-white">{communication.date}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">{communication.customerName}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              communication.type === "Email"
                                ? "bg-blue-800/30 text-blue-300"
                                : communication.type === "SMS"
                                  ? "bg-green-800/30 text-green-300"
                                  : "bg-purple-800/30 text-purple-300"
                            }`}
                          >
                            {communication.type}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm text-white">{communication.subject}</div>
                          <div className="text-xs text-gray-400">{communication.content}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-white">{communication.status}</div>
                          <div className="text-xs text-gray-400">By: {communication.sentBy}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                          <div className="flex space-x-2">
                            <button
                              className="text-yellow-400 hover:text-yellow-300"
                              onClick={() => openModal("edit", "communication", communication)}
                            >
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                              </svg>
                            </button>
                            <button
                              className="text-red-400 hover:text-red-300"
                              onClick={() => openModal("delete", "communication", communication)}
                            >
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Support Tickets */}
        {activeTab === "tickets" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-white">Support Tickets</h2>
                <p className="text-gray-400 mt-1">Track customer complaints and resolutions</p>
              </div>
              <button
                className="flex items-center justify-center px-4 py-2 rounded-md bg-purple-700 hover:bg-purple-600 text-white"
                onClick={() => openModal("add", "ticket")}
              >
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Ticket
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-4 shadow-lg">
                <h3 className="text-md font-semibold text-white mb-2">Open</h3>
                <div className="text-3xl font-bold text-red-400">{stats.tickets.open}</div>
                <p className="text-sm text-gray-400 mt-1">Awaiting resolution</p>
              </div>

              <div className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-4 shadow-lg">
                <h3 className="text-md font-semibold text-white mb-2">In Progress</h3>
                <div className="text-3xl font-bold text-yellow-400">{stats.tickets.inProgress}</div>
                <p className="text-sm text-gray-400 mt-1">Being worked on</p>
              </div>

              <div className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-4 shadow-lg">
                <h3 className="text-md font-semibold text-white mb-2">Resolved</h3>
                <div className="text-3xl font-bold text-green-400">{stats.tickets.resolved}</div>
                <p className="text-sm text-gray-400 mt-1">Completed tickets</p>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg overflow-hidden shadow-xl border border-purple-700/20">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-purple-700/30">
                  <thead className="bg-gray-800/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Subject
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Priority
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-700/20">
                    {filteredData.tickets.map((ticket) => (
                      <tr key={ticket.id} className="hover:bg-purple-900/10">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-white">#{ticket.id}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">{ticket.customerName}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm text-white">{ticket.subject}</div>
                          <div className="text-xs text-gray-400">{ticket.description}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              ticket.priority === "Critical"
                                ? "bg-red-800/30 text-red-300"
                                : ticket.priority === "High"
                                  ? "bg-orange-800/30 text-orange-300"
                                  : "bg-yellow-800/30 text-yellow-300"
                            }`}
                          >
                            {ticket.priority}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              ticket.status === "Open"
                                ? "bg-red-800/30 text-red-300"
                                : ticket.status === "In Progress"
                                  ? "bg-yellow-800/30 text-yellow-300"
                                  : "bg-green-800/30 text-green-300"
                            }`}
                          >
                            {ticket.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                          <div className="flex space-x-2">
                            <button
                              className="text-green-400 hover:text-green-300"
                              onClick={() => markAsCompleted("ticket", ticket.id)}
                            >
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </button>
                            <button
                              className="text-yellow-400 hover:text-yellow-300"
                              onClick={() => openModal("edit", "ticket", ticket)}
                            >
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                              </svg>
                            </button>
                            <button
                              className="text-red-400 hover:text-red-300"
                              onClick={() => openModal("delete", "ticket", ticket)}
                            >
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Contracts & Renewals */}
        {activeTab === "contracts" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-white">Contracts & Renewals</h2>
                <p className="text-gray-400 mt-1">Manage AMCs, warranties, and renewal schedules</p>
              </div>
              <button
                className="flex items-center justify-center px-4 py-2 rounded-md bg-purple-700 hover:bg-purple-600 text-white"
                onClick={() => openModal("add", "contract")}
              >
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Contract
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-4 shadow-lg">
                <h3 className="text-md font-semibold text-white mb-2">Active Contracts</h3>
                <div className="text-3xl font-bold text-green-400">{stats.contracts.active}</div>
                <p className="text-sm text-gray-400 mt-1">Currently active</p>
              </div>

              <div className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-4 shadow-lg">
                <h3 className="text-md font-semibold text-white mb-2">Upcoming Renewals</h3>
                <div className="text-3xl font-bold text-yellow-400">{stats.contracts.upcoming}</div>
                <p className="text-sm text-gray-400 mt-1">Next 30 days</p>
              </div>

              <div className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-4 shadow-lg">
                <h3 className="text-md font-semibold text-white mb-2">Total Contract Value</h3>
                <div className="text-3xl font-bold text-purple-400">₹ {stats.contracts.value.toLocaleString()}</div>
                <p className="text-sm text-gray-400 mt-1">Annual value</p>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg overflow-hidden shadow-xl border border-purple-700/20">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-purple-700/30">
                  <thead className="bg-gray-800/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Value
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Renewal
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-700/20">
                    {filteredData.contracts.map((contract) => (
                      <tr key={contract.id} className="hover:bg-purple-900/10">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">{contract.customerName}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              contract.type === "AMC"
                                ? "bg-blue-800/30 text-blue-300"
                                : contract.type === "Warranty"
                                  ? "bg-green-800/30 text-green-300"
                                  : contract.type === "Support"
                                    ? "bg-yellow-800/30 text-yellow-300"
                                    : "bg-purple-800/30 text-purple-300"
                            }`}
                          >
                            {contract.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-white">{contract.startDate}</div>
                          <div className="text-xs text-gray-400">to {contract.endDate}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-white">₹ {contract.value.toLocaleString()}</div>
                          <div className="text-xs text-gray-400">{contract.paymentTerms}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-white">{contract.renewalDate}</div>
                          <div className="text-xs text-gray-400">
                            {new Date(contract.renewalDate) <= new Date(new Date().setDate(new Date().getDate() + 30))
                              ? "Due soon"
                              : ""}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                          <div className="flex space-x-2">
                            <button
                              className="text-yellow-400 hover:text-yellow-300"
                              onClick={() => openModal("edit", "contract", contract)}
                            >
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                              </svg>
                            </button>
                            <button
                              className="text-red-400 hover:text-red-300"
                              onClick={() => openModal("delete", "contract", contract)}
                            >
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Generic Modal for all CRUD operations */}
      {modalState.isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 border border-purple-700/30 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-purple-300">
                {modalState.type === "add"
                  ? `Add New ${modalState.entity}`
                  : modalState.type === "edit"
                    ? `Edit ${modalState.entity}`
                    : `Delete ${modalState.entity}`}
              </h3>
              <button className="text-gray-400 hover:text-white" onClick={closeModal}>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {modalState.type === "delete" ? (
              <div>
                <p className="text-white mb-4">
                  Are you sure you want to delete this {modalState.entity}? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-2">
                  <button
                    className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 rounded-md bg-red-700 hover:bg-red-600 text-white"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="space-y-4">
                  {/* Customer form fields */}
                  {modalState.entity === "customer" && (
                    <>
                      <div>
                        <label htmlFor="name" className="text-sm text-gray-300 block mb-1">
                          Company Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={formData.name || ""}
                          onChange={handleFormChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="contactPerson" className="text-sm text-gray-300 block mb-1">
                          Contact Person
                        </label>
                        <input
                          id="contactPerson"
                          type="text"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={formData.contactPerson || ""}
                          onChange={handleFormChange}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="email" className="text-sm text-gray-300 block mb-1">
                            Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                            value={formData.email || ""}
                            onChange={handleFormChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="text-sm text-gray-300 block mb-1">
                            Phone
                          </label>
                          <input
                            id="phone"
                            type="text"
                            className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                            value={formData.phone || ""}
                            onChange={handleFormChange}
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="address" className="text-sm text-gray-300 block mb-1">
                          Address
                        </label>
                        <textarea
                          id="address"
                          rows="2"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={formData.address || ""}
                          onChange={handleFormChange}
                        ></textarea>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="category" className="text-sm text-gray-300 block mb-1">
                            Category
                          </label>
                          <select
                            id="category"
                            className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                            value={formData.category || "Enterprise"}
                            onChange={handleFormChange}
                          >
                            <option value="Enterprise">Enterprise</option>
                            <option value="SMB">SMB</option>
                            <option value="Retail">Retail</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="status" className="text-sm text-gray-300 block mb-1">
                            Status
                          </label>
                          <select
                            id="status"
                            className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
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

                  {/* Follow-up form fields */}
                  {modalState.entity === "followUp" && (
                    <>
                      <div>
                        <label htmlFor="customerId" className="text-sm text-gray-300 block mb-1">
                          Customer
                        </label>
                        <select
                          id="customerId"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={formData.customerId || ""}
                          onChange={handleFormChange}
                        >
                          <option value="">Select a customer</option>
                          {data.customers.map((customer) => (
                            <option key={customer.id} value={customer.id}>
                              {customer.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="type" className="text-sm text-gray-300 block mb-1">
                          Activity Type
                        </label>
                        <select
                          id="type"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={formData.type || "Meeting"}
                          onChange={handleFormChange}
                        >
                          <option value="Meeting">Meeting</option>
                          <option value="Call">Call</option>
                          <option value="Email">Email</option>
                          <option value="Visit">Visit</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="subject" className="text-sm text-gray-300 block mb-1">
                          Subject
                        </label>
                        <input
                          id="subject"
                          type="text"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={formData.subject || ""}
                          onChange={handleFormChange}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="date" className="text-sm text-gray-300 block mb-1">
                            Date
                          </label>
                          <input
                            id="date"
                            type="date"
                            className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                            value={formData.date || ""}
                            onChange={handleFormChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="time" className="text-sm text-gray-300 block mb-1">
                            Time
                          </label>
                          <input
                            id="time"
                            type="time"
                            className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                            value={formData.time || ""}
                            onChange={handleFormChange}
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="notes" className="text-sm text-gray-300 block mb-1">
                          Notes
                        </label>
                        <textarea
                          id="notes"
                          rows="3"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={formData.notes || ""}
                          onChange={handleFormChange}
                        ></textarea>
                      </div>
                    </>
                  )}

                  {/* Communication form fields */}
                  {modalState.entity === "communication" && (
                    <>
                      <div>
                        <label htmlFor="customerId" className="text-sm text-gray-300 block mb-1">
                          Customer
                        </label>
                        <select
                          id="customerId"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={formData.customerId || ""}
                          onChange={handleFormChange}
                        >
                          <option value="">Select a customer</option>
                          {data.customers.map((customer) => (
                            <option key={customer.id} value={customer.id}>
                              {customer.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="type" className="text-sm text-gray-300 block mb-1">
                          Communication Type
                        </label>
                        <select
                          id="type"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={formData.type || "Email"}
                          onChange={handleFormChange}
                        >
                          <option value="Email">Email</option>
                          <option value="SMS">SMS</option>
                          <option value="WhatsApp">WhatsApp</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="subject" className="text-sm text-gray-300 block mb-1">
                          Subject
                        </label>
                        <input
                          id="subject"
                          type="text"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={formData.subject || ""}
                          onChange={handleFormChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="content" className="text-sm text-gray-300 block mb-1">
                          Content
                        </label>
                        <textarea
                          id="content"
                          rows="3"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={formData.content || ""}
                          onChange={handleFormChange}
                        ></textarea>
                      </div>
                    </>
                  )}

                  {/* Ticket form fields */}
                  {modalState.entity === "ticket" && (
                    <>
                      <div>
                        <label htmlFor="customerId" className="text-sm text-gray-300 block mb-1">
                          Customer
                        </label>
                        <select
                          id="customerId"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={formData.customerId || ""}
                          onChange={handleFormChange}
                        >
                          <option value="">Select a customer</option>
                          {data.customers.map((customer) => (
                            <option key={customer.id} value={customer.id}>
                              {customer.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="subject" className="text-sm text-gray-300 block mb-1">
                          Subject
                        </label>
                        <input
                          id="subject"
                          type="text"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={formData.subject || ""}
                          onChange={handleFormChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="description" className="text-sm text-gray-300 block mb-1">
                          Description
                        </label>
                        <textarea
                          id="description"
                          rows="3"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={formData.description || ""}
                          onChange={handleFormChange}
                        ></textarea>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="priority" className="text-sm text-gray-300 block mb-1">
                            Priority
                          </label>
                          <select
                            id="priority"
                            className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                            value={formData.priority || "Medium"}
                            onChange={handleFormChange}
                          >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Critical">Critical</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="status" className="text-sm text-gray-300 block mb-1">
                            Status
                          </label>
                          <select
                            id="status"
                            className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                            value={formData.status || "Open"}
                            onChange={handleFormChange}
                          >
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Contract form fields */}
                  {modalState.entity === "contract" && (
                    <>
                      <div>
                        <label htmlFor="customerId" className="text-sm text-gray-300 block mb-1">
                          Customer
                        </label>
                        <select
                          id="customerId"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={formData.customerId || ""}
                          onChange={handleFormChange}
                        >
                          <option value="">Select a customer</option>
                          {data.customers.map((customer) => (
                            <option key={customer.id} value={customer.id}>
                              {customer.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="type" className="text-sm text-gray-300 block mb-1">
                          Contract Type
                        </label>
                        <select
                          id="type"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={formData.type || "AMC"}
                          onChange={handleFormChange}
                        >
                          <option value="AMC">AMC</option>
                          <option value="Warranty">Warranty</option>
                          <option value="Support">Support</option>
                          <option value="License">License</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="startDate" className="text-sm text-gray-300 block mb-1">
                            Start Date
                          </label>
                          <input
                            id="startDate"
                            type="date"
                            className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                            value={formData.startDate || ""}
                            onChange={handleFormChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="endDate" className="text-sm text-gray-300 block mb-1">
                            End Date
                          </label>
                          <input
                            id="endDate"
                            type="date"
                            className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                            value={formData.endDate || ""}
                            onChange={handleFormChange}
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="value" className="text-sm text-gray-300 block mb-1">
                          Contract Value (₹)
                        </label>
                        <input
                          id="value"
                          type="number"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={formData.value || 0}
                          onChange={handleFormChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="renewalDate" className="text-sm text-gray-300 block mb-1">
                          Renewal Date
                        </label>
                        <input
                          id="renewalDate"
                          type="date"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={formData.renewalDate || ""}
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

export default CRMManagement
