

import { useState } from "react"
import { motion } from "framer-motion"

// Mock data for demonstration
const mockCustomers = [
  {
    id: 1,
    name: "Acme Corporation",
    contactPerson: "John Smith",
    email: "john@acmecorp.com",
    phone: "+91 9876543210",
    address: "123 Business Park, Mumbai, 400001",
    billingAddress: "123 Business Park, Mumbai, 400001",
    shippingAddress: "123 Business Park, Mumbai, 400001",
    status: "Active",
    category: "Enterprise",
    createdAt: "2023-01-15",
  },
  {
    id: 2,
    name: "TechSolutions Inc",
    contactPerson: "Priya Sharma",
    email: "priya@techsolutions.com",
    phone: "+91 9876543211",
    address: "456 Tech Hub, Bangalore, 560001",
    billingAddress: "456 Tech Hub, Bangalore, 560001",
    shippingAddress: "789 Warehouse District, Bangalore, 560002",
    status: "Active",
    category: "SMB",
    createdAt: "2023-02-20",
  },
  {
    id: 3,
    name: "Global Traders",
    contactPerson: "Rajesh Kumar",
    email: "rajesh@globaltraders.com",
    phone: "+91 9876543212",
    address: "789 Trade Center, Delhi, 110001",
    billingAddress: "789 Trade Center, Delhi, 110001",
    shippingAddress: "789 Trade Center, Delhi, 110001",
    status: "Inactive",
    category: "Enterprise",
    createdAt: "2023-03-10",
  },
  {
    id: 4,
    name: "Sunrise Retailers",
    contactPerson: "Ananya Patel",
    email: "ananya@sunriseretail.com",
    phone: "+91 9876543213",
    address: "101 Market Street, Chennai, 600001",
    billingAddress: "101 Market Street, Chennai, 600001",
    shippingAddress: "202 Distribution Zone, Chennai, 600002",
    status: "Active",
    category: "Retail",
    createdAt: "2023-04-05",
  },
  {
    id: 5,
    name: "Innovate Systems",
    contactPerson: "Vikram Singh",
    email: "vikram@innovatesys.com",
    phone: "+91 9876543214",
    address: "234 Innovation Park, Pune, 411001",
    billingAddress: "234 Innovation Park, Pune, 411001",
    shippingAddress: "234 Innovation Park, Pune, 411001",
    status: "Active",
    category: "SMB",
    createdAt: "2023-05-12",
  },
]

const mockFollowUps = [
  {
    id: 1,
    customerId: 1,
    customerName: "Acme Corporation",
    type: "Meeting",
    subject: "Quarterly Review",
    date: "2023-06-15",
    time: "10:00 AM",
    notes: "Discuss Q2 performance and upcoming requirements",
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
    notes: "Demonstrate new inventory features",
    status: "Completed",
    assignedTo: "Neha Gupta",
  },
  {
    id: 3,
    customerId: 3,
    customerName: "Global Traders",
    type: "Email",
    subject: "Renewal Reminder",
    date: "2023-06-20",
    time: "09:00 AM",
    notes: "Send contract renewal reminder",
    status: "Pending",
    assignedTo: "Rahul Verma",
  },
  {
    id: 4,
    customerId: 4,
    customerName: "Sunrise Retailers",
    type: "Visit",
    subject: "Site Inspection",
    date: "2023-06-25",
    time: "11:00 AM",
    notes: "Check warehouse setup for system integration",
    status: "Scheduled",
    assignedTo: "Amit Shah",
  },
  {
    id: 5,
    customerId: 5,
    customerName: "Innovate Systems",
    type: "Call",
    subject: "Support Issue",
    date: "2023-06-12",
    time: "04:00 PM",
    notes: "Follow up on ticket #4532",
    status: "Scheduled",
    assignedTo: "Neha Gupta",
  },
]

const mockCommunications = [
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
    content: "Reminder: Payment due for invoice #INV-2023-002",
    status: "Sent",
    sentBy: "Neha Gupta",
  },
  {
    id: 3,
    customerId: 3,
    customerName: "Global Traders",
    type: "WhatsApp",
    subject: "Meeting Confirmation",
    date: "2023-05-28",
    content: "Confirming our meeting on June 5th at 11 AM",
    status: "Delivered",
    sentBy: "Rahul Verma",
  },
  {
    id: 4,
    customerId: 4,
    customerName: "Sunrise Retailers",
    type: "Email",
    subject: "New Feature Announcement",
    date: "2023-06-01",
    content: "Announcing new inventory tracking features",
    status: "Opened",
    sentBy: "Marketing",
  },
  {
    id: 5,
    customerId: 5,
    customerName: "Innovate Systems",
    type: "SMS",
    subject: "Support Ticket Update",
    date: "2023-06-05",
    content: "Your ticket #4532 has been resolved",
    status: "Delivered",
    sentBy: "Support",
  },
]

const mockTickets = [
  {
    id: 1,
    customerId: 1,
    customerName: "Acme Corporation",
    subject: "Login Issue",
    description: "Unable to login to the dashboard",
    priority: "High",
    status: "Open",
    createdAt: "2023-06-01",
    assignedTo: "Amit Shah",
    lastUpdated: "2023-06-02",
  },
  {
    id: 2,
    customerId: 2,
    customerName: "TechSolutions Inc",
    subject: "Report Generation Error",
    description: "Error when generating monthly inventory report",
    priority: "Medium",
    status: "In Progress",
    createdAt: "2023-06-03",
    assignedTo: "Neha Gupta",
    lastUpdated: "2023-06-04",
  },
  {
    id: 3,
    customerId: 3,
    customerName: "Global Traders",
    subject: "Data Import Failure",
    description: "Unable to import product data from CSV",
    priority: "Medium",
    status: "Resolved",
    createdAt: "2023-05-28",
    assignedTo: "Rahul Verma",
    lastUpdated: "2023-05-30",
  },
  {
    id: 4,
    customerId: 4,
    customerName: "Sunrise Retailers",
    subject: "Mobile App Crash",
    description: "App crashes when scanning barcodes",
    priority: "High",
    status: "Open",
    createdAt: "2023-06-05",
    assignedTo: "Amit Shah",
    lastUpdated: "2023-06-05",
  },
  {
    id: 5,
    customerId: 5,
    customerName: "Innovate Systems",
    subject: "Integration Issue",
    description: "API integration with accounting software failing",
    priority: "Critical",
    status: "In Progress",
    createdAt: "2023-06-04",
    assignedTo: "Neha Gupta",
    lastUpdated: "2023-06-06",
  },
]

const mockContracts = [
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
  {
    id: 3,
    customerId: 3,
    customerName: "Global Traders",
    type: "AMC",
    startDate: "2022-10-01",
    endDate: "2023-09-30",
    value: 90000,
    status: "Active",
    renewalDate: "2023-09-01",
    paymentTerms: "Semi-Annual",
  },
  {
    id: 4,
    customerId: 4,
    customerName: "Sunrise Retailers",
    type: "Support",
    startDate: "2023-04-01",
    endDate: "2024-03-31",
    value: 60000,
    status: "Active",
    renewalDate: "2024-03-01",
    paymentTerms: "Quarterly",
  },
  {
    id: 5,
    customerId: 5,
    customerName: "Innovate Systems",
    type: "License",
    startDate: "2023-05-15",
    endDate: "2024-05-14",
    value: 150000,
    status: "Active",
    renewalDate: "2024-04-15",
    paymentTerms: "Annual",
  },
]

const CRMManagement = () => {
  const [activeTab, setActiveTab] = useState("customers")
  const [searchTerm, setSearchTerm] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false)
  const [isAddFollowUpModalOpen, setIsAddFollowUpModalOpen] = useState(false)
  const [isAddTicketModalOpen, setIsAddTicketModalOpen] = useState(false)
  const [isAddContractModalOpen, setIsAddContractModalOpen] = useState(false)
  const [isAddCommunicationModalOpen, setIsAddCommunicationModalOpen] = useState(false)

  // Filter customers based on search term
  const filteredCustomers = mockCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Navigation tabs
  const tabs = [
    { id: "customers", label: "Customer Master" },
    { id: "followups", label: "Follow-ups & Activities" },
    { id: "communications", label: "Communication Log" },
    { id: "tickets", label: "Support Tickets" },
    { id: "contracts", label: "Contracts & Renewals" },
  ]

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-white">
      {/* Header with horizontal navigation */}
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

            {/* User controls - can be expanded */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
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
                    xmlns="http://www.w3.org/2000/svg"
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
                <p className="text-gray-400 mt-1">Manage customer information, billing, and shipping details</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <div className="relative flex-grow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
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
                    placeholder="Search customers..."
                    className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button
                  className="flex items-center justify-center px-4 py-2 rounded-md bg-purple-700 hover:bg-purple-600 text-white"
                  onClick={() => setIsAddCustomerModalOpen(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Customer
                </button>
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
                    {filteredCustomers.map((customer) => (
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
                          <div className="text-xs text-gray-400">
                            Billing:{" "}
                            {customer.billingAddress === customer.address ? "Same as above" : customer.billingAddress}
                          </div>
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
                            <button className="text-blue-400 hover:text-blue-300">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            </button>
                            <button className="text-yellow-400 hover:text-yellow-300">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                              </svg>
                            </button>
                            <button className="text-red-400 hover:text-red-300">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
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

            {/* Add Customer Modal - This would be a dialog in a real implementation */}
            {isAddCustomerModalOpen && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="bg-gray-900 border border-purple-700/30 rounded-lg p-6 w-full max-w-md max-h-[85vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-purple-300">Add New Customer</h3>
                    <button className="text-gray-400 hover:text-white" onClick={() => setIsAddCustomerModalOpen(false)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="text-sm text-gray-300 block mb-1">
                        Company Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
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
                      ></textarea>
                    </div>

                    <div>
                      <label htmlFor="billingAddress" className="text-sm text-gray-300 block mb-1">
                        Billing Address
                      </label>
                      <textarea
                        id="billingAddress"
                        rows="2"
                        className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                      ></textarea>
                    </div>

                    <div>
                      <label htmlFor="shippingAddress" className="text-sm text-gray-300 block mb-1">
                        Shipping Address
                      </label>
                      <textarea
                        id="shippingAddress"
                        rows="2"
                        className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
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
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 mt-6">
                    <button
                      className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white"
                      onClick={() => setIsAddCustomerModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 rounded-md bg-purple-700 hover:bg-purple-600 text-white"
                      onClick={() => setIsAddCustomerModalOpen(false)}
                    >
                      Add Customer
                    </button>
                  </div>
                </div>
              </div>
            )}
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
                onClick={() => setIsAddFollowUpModalOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Follow-up
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-4 shadow-lg">
                <h3 className="text-md font-semibold text-white mb-2">Today's Activities</h3>
                <div className="text-3xl font-bold text-purple-400">2</div>
                <p className="text-sm text-gray-400 mt-1">Scheduled for today</p>
              </div>

              <div className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-4 shadow-lg">
                <h3 className="text-md font-semibold text-white mb-2">Upcoming</h3>
                <div className="text-3xl font-bold text-blue-400">5</div>
                <p className="text-sm text-gray-400 mt-1">Next 7 days</p>
              </div>

              <div className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-4 shadow-lg">
                <h3 className="text-md font-semibold text-white mb-2">Completed</h3>
                <div className="text-3xl font-bold text-green-400">12</div>
                <p className="text-sm text-gray-400 mt-1">Last 30 days</p>
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
                    {mockFollowUps.map((followUp) => (
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
                            <button className="text-green-400 hover:text-green-300">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </button>
                            <button className="text-yellow-400 hover:text-yellow-300">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                              </svg>
                            </button>
                            <button className="text-red-400 hover:text-red-300">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
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

            {/* Add Follow-up Modal - This would be a dialog in a real implementation */}
            {isAddFollowUpModalOpen && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="bg-gray-900 border border-purple-700/30 rounded-lg p-6 w-full max-w-md">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-purple-300">Add New Follow-up</h3>
                    <button className="text-gray-400 hover:text-white" onClick={() => setIsAddFollowUpModalOpen(false)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="customer" className="text-sm text-gray-300 block mb-1">
                        Customer
                      </label>
                      <select
                        id="customer"
                        className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                      >
                        <option value="">Select a customer</option>
                        {mockCustomers.map((customer) => (
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
                      ></textarea>
                    </div>

                    <div>
                      <label htmlFor="assignedTo" className="text-sm text-gray-300 block mb-1">
                        Assigned To
                      </label>
                      <select
                        id="assignedTo"
                        className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                      >
                        <option value="Rahul Verma">Rahul Verma</option>
                        <option value="Neha Gupta">Neha Gupta</option>
                        <option value="Amit Shah">Amit Shah</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 mt-6">
                    <button
                      className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white"
                      onClick={() => setIsAddFollowUpModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 rounded-md bg-purple-700 hover:bg-purple-600 text-white"
                      onClick={() => setIsAddFollowUpModalOpen(false)}
                    >
                      Schedule
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Communication Log */}
        {activeTab === "communications" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-white">Communication Log</h2>
                <p className="text-gray-400 mt-1">Track email, SMS, and WhatsApp communications with customers</p>
              </div>
              <button
                className="flex items-center justify-center px-4 py-2 rounded-md bg-purple-700 hover:bg-purple-600 text-white"
                onClick={() => setIsAddCommunicationModalOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Communication
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-4 shadow-lg">
                <h3 className="text-md font-semibold text-white mb-2">Email</h3>
                <div className="text-3xl font-bold text-blue-400">24</div>
                <p className="text-sm text-gray-400 mt-1">Last 30 days</p>
              </div>

              <div className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-4 shadow-lg">
                <h3 className="text-md font-semibold text-white mb-2">SMS</h3>
                <div className="text-3xl font-bold text-green-400">18</div>
                <p className="text-sm text-gray-400 mt-1">Last 30 days</p>
              </div>

              <div className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-4 shadow-lg">
                <h3 className="text-md font-semibold text-white mb-2">WhatsApp</h3>
                <div className="text-3xl font-bold text-purple-400">32</div>
                <p className="text-sm text-gray-400 mt-1">Last 30 days</p>
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
                    {mockCommunications.map((communication) => (
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
                            <button className="text-blue-400 hover:text-blue-300">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            </button>
                            <button className="text-green-400 hover:text-green-300">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
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

            {/* Add Communication Modal - This would be a dialog in a real implementation */}
            {isAddCommunicationModalOpen && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="bg-gray-900 border border-purple-700/30 rounded-lg p-6 w-full max-w-md">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-purple-300">New Communication</h3>
                    <button
                      className="text-gray-400 hover:text-white"
                      onClick={() => setIsAddCommunicationModalOpen(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="commCustomer" className="text-sm text-gray-300 block mb-1">
                        Customer
                      </label>
                      <select
                        id="commCustomer"
                        className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                      >
                        <option value="">Select a customer</option>
                        {mockCustomers.map((customer) => (
                          <option key={customer.id} value={customer.id}>
                            {customer.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="commType" className="text-sm text-gray-300 block mb-1">
                        Communication Type
                      </label>
                      <select
                        id="commType"
                        className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                      >
                        <option value="Email">Email</option>
                        <option value="SMS">SMS</option>
                        <option value="WhatsApp">WhatsApp</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="commSubject" className="text-sm text-gray-300 block mb-1">
                        Subject
                      </label>
                      <input
                        id="commSubject"
                        type="text"
                        className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="commContent" className="text-sm text-gray-300 block mb-1">
                        Content
                      </label>
                      <textarea
                        id="commContent"
                        rows="4"
                        className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                      ></textarea>
                    </div>

                    <div>
                      <label htmlFor="commSentBy" className="text-sm text-gray-300 block mb-1">
                        Sent By
                      </label>
                      <select
                        id="commSentBy"
                        className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                      >
                        <option value="System">System</option>
                        <option value="Rahul Verma">Rahul Verma</option>
                        <option value="Neha Gupta">Neha Gupta</option>
                        <option value="Amit Shah">Amit Shah</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Support">Support</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 mt-6">
                    <button
                      className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white"
                      onClick={() => setIsAddCommunicationModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 rounded-md bg-purple-700 hover:bg-purple-600 text-white"
                      onClick={() => setIsAddCommunicationModalOpen(false)}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            )}
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
                onClick={() => setIsAddTicketModalOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Ticket
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-4 shadow-lg">
                <h3 className="text-md font-semibold text-white mb-2">Open</h3>
                <div className="text-3xl font-bold text-red-400">2</div>
                <p className="text-sm text-gray-400 mt-1">Awaiting resolution</p>
              </div>

              <div className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-4 shadow-lg">
                <h3 className="text-md font-semibold text-white mb-2">In Progress</h3>
                <div className="text-3xl font-bold text-yellow-400">2</div>
                <p className="text-sm text-gray-400 mt-1">Being worked on</p>
              </div>

              <div className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-4 shadow-lg">
                <h3 className="text-md font-semibold text-white mb-2">Resolved</h3>
                <div className="text-3xl font-bold text-green-400">1</div>
                <p className="text-sm text-gray-400 mt-1">Last 7 days</p>
              </div>

              <div className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-4 shadow-lg">
                <h3 className="text-md font-semibold text-white mb-2">Average Resolution</h3>
                <div className="text-3xl font-bold text-blue-400">1.5d</div>
                <p className="text-sm text-gray-400 mt-1">Response time</p>
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
                        Assigned To
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-700/20">
                    {mockTickets.map((ticket) => (
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
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-white">{ticket.assignedTo}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                          <div className="flex space-x-2">
                            <button className="text-blue-400 hover:text-blue-300">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            </button>
                            <button className="text-yellow-400 hover:text-yellow-300">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                              </svg>
                            </button>
                            <button className="text-green-400 hover:text-green-300">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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

            {/* Add Ticket Modal - This would be a dialog in a real implementation */}
            {isAddTicketModalOpen && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="bg-gray-900 border border-purple-700/30 rounded-lg p-6 w-full max-w-md">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-purple-300">Create Support Ticket</h3>
                    <button className="text-gray-400 hover:text-white" onClick={() => setIsAddTicketModalOpen(false)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="ticketCustomer" className="text-sm text-gray-300 block mb-1">
                        Customer
                      </label>
                      <select
                        id="ticketCustomer"
                        className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                      >
                        <option value="">Select a customer</option>
                        {mockCustomers.map((customer) => (
                          <option key={customer.id} value={customer.id}>
                            {customer.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="ticketSubject" className="text-sm text-gray-300 block mb-1">
                        Subject
                      </label>
                      <input
                        id="ticketSubject"
                        type="text"
                        className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="ticketDescription" className="text-sm text-gray-300 block mb-1">
                        Description
                      </label>
                      <textarea
                        id="ticketDescription"
                        rows="4"
                        className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="ticketPriority" className="text-sm text-gray-300 block mb-1">
                          Priority
                        </label>
                        <select
                          id="ticketPriority"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                          <option value="Critical">Critical</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="ticketAssignedTo" className="text-sm text-gray-300 block mb-1">
                          Assign To
                        </label>
                        <select
                          id="ticketAssignedTo"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                        >
                          <option value="Rahul Verma">Rahul Verma</option>
                          <option value="Neha Gupta">Neha Gupta</option>
                          <option value="Amit Shah">Amit Shah</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 mt-6">
                    <button
                      className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white"
                      onClick={() => setIsAddTicketModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 rounded-md bg-purple-700 hover:bg-purple-600 text-white"
                      onClick={() => setIsAddTicketModalOpen(false)}
                    >
                      Create Ticket
                    </button>
                  </div>
                </div>
              </div>
            )}
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
                onClick={() => setIsAddContractModalOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Contract
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-4 shadow-lg">
                <h3 className="text-md font-semibold text-white mb-2">Active Contracts</h3>
                <div className="text-3xl font-bold text-green-400">5</div>
                <p className="text-sm text-gray-400 mt-1">Currently active</p>
              </div>

              <div className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-4 shadow-lg">
                <h3 className="text-md font-semibold text-white mb-2">Upcoming Renewals</h3>
                <div className="text-3xl font-bold text-yellow-400">2</div>
                <p className="text-sm text-gray-400 mt-1">Next 30 days</p>
              </div>

              <div className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-4 shadow-lg">
                <h3 className="text-md font-semibold text-white mb-2">Total Contract Value</h3>
                <div className="text-3xl font-bold text-purple-400">₹ 495,000</div>
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
                    {mockContracts.map((contract) => (
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
                            <button className="text-blue-400 hover:text-blue-300">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            </button>
                            <button className="text-yellow-400 hover:text-yellow-300">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                              </svg>
                            </button>
                            <button className="text-green-400 hover:text-green-300">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
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

            {/* Add Contract Modal - This would be a dialog in a real implementation */}
            {isAddContractModalOpen && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="bg-gray-900 border border-purple-700/30 rounded-lg p-6 w-full max-w-md">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-purple-300">Add New Contract</h3>
                    <button className="text-gray-400 hover:text-white" onClick={() => setIsAddContractModalOpen(false)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="contractCustomer" className="text-sm text-gray-300 block mb-1">
                        Customer
                      </label>
                      <select
                        id="contractCustomer"
                        className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                      >
                        <option value="">Select a customer</option>
                        {mockCustomers.map((customer) => (
                          <option key={customer.id} value={customer.id}>
                            {customer.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contractType" className="text-sm text-gray-300 block mb-1">
                        Contract Type
                      </label>
                      <select
                        id="contractType"
                        className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                      >
                        <option value="AMC">AMC</option>
                        <option value="Warranty">Warranty</option>
                        <option value="Support">Support</option>
                        <option value="License">License</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contractStartDate" className="text-sm text-gray-300 block mb-1">
                          Start Date
                        </label>
                        <input
                          id="contractStartDate"
                          type="date"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="contractEndDate" className="text-sm text-gray-300 block mb-1">
                          End Date
                        </label>
                        <input
                          id="contractEndDate"
                          type="date"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contractValue" className="text-sm text-gray-300 block mb-1">
                        Contract Value (₹)
                      </label>
                      <input
                        id="contractValue"
                        type="number"
                        className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="contractPaymentTerms" className="text-sm text-gray-300 block mb-1">
                        Payment Terms
                      </label>
                      <select
                        id="contractPaymentTerms"
                        className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                      >
                        <option value="Annual">Annual</option>
                        <option value="Semi-Annual">Semi-Annual</option>
                        <option value="Quarterly">Quarterly</option>
                        <option value="Monthly">Monthly</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contractRenewalDate" className="text-sm text-gray-300 block mb-1">
                        Renewal Reminder Date
                      </label>
                      <input
                        id="contractRenewalDate"
                        type="date"
                        className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 mt-6">
                    <button
                      className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white"
                      onClick={() => setIsAddContractModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 rounded-md bg-purple-700 hover:bg-purple-600 text-white"
                      onClick={() => setIsAddContractModalOpen(false)}
                    >
                      Add Contract
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>

  
    </div>
  )
}

export default CRMManagement
