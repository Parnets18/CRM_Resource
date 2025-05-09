"use client"

import { useState, useEffect } from "react"
import { Users, FileText, DollarSign, Plus, Search, Filter, ArrowUpRight, Calendar, Mail, Phone, ExternalLink, ChevronRight, BarChart, Clock, CheckCircle, AlertCircle, Briefcase, FileCheck, TrendingUp, CreditCard, Truck, ShoppingCart, MoreHorizontal, Download, Printer, Send, Edit, Trash, X, Check } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"

// Sample data for the sales management module
const salesStats = [
  { title: "Total Sales", value: "$124,592", icon: DollarSign, change: "+12.5%" },
  { title: "New Leads", value: "432", icon: Users, change: "+8.2%" },
  { title: "Quotations", value: "87", icon: FileText, change: "+5.7%" },
  { title: "Conversion", value: "24.8%", icon: ArrowUpRight, change: "+2.3%" },
]

// Pipeline stages with data
const pipelineStages = [
  {
    id: "leads",
    name: "Leads",
    count: 145,
    value: "$217,500",
    icon: Users,
    items: [
      { 
        id: 1,
        name: "Acme Corp", 
        value: "$12,000", 
        date: "May 7", 
        status: "New", 
        contact: "John Smith",
        email: "john@acmecorp.com",
        phone: "+1 (555) 123-4567",
        source: "Website",
        notes: "Interested in our premium package. Follow up next week."
      },
      { 
        id: 2,
        name: "TechGiant Inc", 
        value: "$8,500", 
        date: "May 6", 
        status: "Contacted", 
        contact: "Sarah Johnson",
        email: "sarah@techgiant.com",
        phone: "+1 (555) 987-6543",
        source: "Referral",
        notes: "Had initial call. Needs custom solution."
      },
      { 
        id: 3,
        name: "Global Services", 
        value: "$15,000", 
        date: "May 5", 
        status: "Qualified", 
        contact: "Michael Brown",
        email: "michael@globalservices.com",
        phone: "+1 (555) 456-7890",
        source: "Trade Show",
        notes: "Budget approved. Ready for product demo."
      },
    ],
  },
  {
    id: "opportunities",
    name: "Opportunities",
    count: 87,
    value: "$189,300",
    icon: TrendingUp,
    items: [
      { 
        id: 4,
        name: "Innovate Solutions", 
        value: "$22,000", 
        date: "May 4", 
        status: "Needs Analysis", 
        contact: "David Wilson",
        email: "david@innovate.com",
        phone: "+1 (555) 234-5678",
        source: "LinkedIn",
        notes: "Scheduled needs assessment call for next Tuesday."
      },
      { 
        id: 5,
        name: "Prime Industries", 
        value: "$18,500", 
        date: "May 3", 
        status: "Value Proposition", 
        contact: "Jennifer Lee",
        email: "jennifer@primeindustries.com",
        phone: "+1 (555) 876-5432",
        source: "Email Campaign",
        notes: "Proposal sent. Awaiting feedback."
      },
    ],
  },
  {
    id: "quotations",
    name: "Quotations",
    count: 54,
    value: "$142,750",
    icon: FileCheck,
    items: [
      { 
        id: 6,
        name: "Stellar Systems", 
        value: "$32,000", 
        date: "May 2", 
        status: "Sent", 
        contact: "Robert Taylor",
        email: "robert@stellar.com",
        phone: "+1 (555) 345-6789",
        source: "Google Ads",
        notes: "Quotation sent via email. Follow up in 3 days."
      },
      { 
        id: 7,
        name: "Apex Manufacturing", 
        value: "$27,500", 
        date: "May 1", 
        status: "Negotiating", 
        contact: "Lisa Anderson",
        email: "lisa@apexmfg.com",
        phone: "+1 (555) 654-3210",
        source: "Partner Referral",
        notes: "Client requested 10% discount. Discussing terms."
      },
    ],
  },
  {
    id: "orders",
    name: "Orders",
    count: 32,
    value: "$98,400",
    icon: ShoppingCart,
    items: [
      { 
        id: 8,
        name: "Quantum Enterprises", 
        value: "$42,000", 
        date: "Apr 30", 
        status: "Processing", 
        contact: "Thomas Clark",
        email: "thomas@quantum.com",
        phone: "+1 (555) 789-0123",
        source: "Returning Customer",
        notes: "Order confirmed. Processing payment."
      },
      { 
        id: 9,
        name: "Horizon Group", 
        value: "$35,500", 
        date: "Apr 29", 
        status: "Ready for Delivery", 
        contact: "Amanda White",
        email: "amanda@horizongroup.com",
        phone: "+1 (555) 321-0987",
        source: "Conference",
        notes: "Order ready for shipping. Delivery scheduled for next week."
      },
    ],
  },
  {
    id: "deliveries",
    name: "Deliveries",
    count: 28,
    value: "$87,200",
    icon: Truck,
    items: [
      { 
        id: 10,
        name: "Fusion Technologies", 
        value: "$29,000", 
        date: "Apr 28", 
        status: "Shipped", 
        contact: "Kevin Martin",
        email: "kevin@fusion.com",
        phone: "+1 (555) 432-1098",
        source: "Website",
        notes: "Package shipped via express delivery. Tracking sent to client."
      },
      { 
        id: 11,
        name: "Elite Corp", 
        value: "$18,700", 
        date: "Apr 27", 
        status: "Delivered", 
        contact: "Patricia Moore",
        email: "patricia@elitecorp.com",
        phone: "+1 (555) 210-9876",
        source: "Trade Show",
        notes: "Delivery confirmed. Client satisfied with product."
      },
    ],
  },
  {
    id: "invoices",
    name: "Invoices",
    count: 25,
    value: "$76,800",
    icon: FileText,
    items: [
      { 
        id: 12,
        name: "Pinnacle Systems", 
        value: "$24,500", 
        date: "Apr 26", 
        status: "Pending", 
        contact: "Richard Johnson",
        email: "richard@pinnacle.com",
        phone: "+1 (555) 678-9012",
        source: "LinkedIn",
        notes: "Invoice sent. Payment due in 30 days."
      },
      { 
        id: 13,
        name: "Omega Industries", 
        value: "$31,200", 
        date: "Apr 25", 
        status: "Paid", 
        contact: "Susan Miller",
        email: "susan@omega.com",
        phone: "+1 (555) 890-1234",
        source: "Referral",
        notes: "Payment received. Receipt sent to client."
      },
    ],
  },
  {
    id: "payments",
    name: "Payments",
    count: 22,
    value: "$68,400",
    icon: CreditCard,
    items: [
      { 
        id: 14,
        name: "Vertex Solutions", 
        value: "$19,800", 
        date: "Apr 24", 
        status: "Partial", 
        contact: "Daniel Brown",
        email: "daniel@vertex.com",
        phone: "+1 (555) 123-7890",
        source: "Google Ads",
        notes: "50% advance payment received. Remainder due upon delivery."
      },
      { 
        id: 15,
        name: "Nexus Group", 
        value: "$27,600", 
        date: "Apr 23", 
        status: "Complete", 
        contact: "Michelle Davis",
        email: "michelle@nexusgroup.com",
        phone: "+1 (555) 456-0987",
        source: "Website",
        notes: "Full payment received. Transaction complete."
      },
    ],
  },
]

export default function SalesManagement() {
  const [activeTab, setActiveTab] = useState("leads")
  const [isLoading, setIsLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState(null)
  const [showNewLeadForm, setShowNewLeadForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    phone: "",
    value: "",
    source: "Website",
    notes: ""
  })

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  // Get active stage data
  const activeStage = pipelineStages.find((stage) => stage.id === activeTab) || pipelineStages[0]

  // Get status color
  const getStatusColor = (status) => {
    if (["New", "Qualified", "Paid", "Complete", "Delivered"].includes(status)) 
      return "bg-green-500/20 text-green-400"
    if (["Contacted", "Processing", "Sent", "Shipped"].includes(status)) 
      return "bg-blue-500/20 text-blue-400"
    if (["Overdue", "Disqualified", "Lost"].includes(status)) 
      return "bg-red-500/20 text-red-400"
    return "bg-amber-500/20 text-amber-400"
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would save this data to your backend
    console.log("New lead data:", formData)
    setShowNewLeadForm(false)
    setFormData({
      name: "",
      contact: "",
      email: "",
      phone: "",
      value: "",
      source: "Website",
      notes: ""
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0817] to-black text-white p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Sales Management</h1>
          <p className="text-gray-400">Manage your complete sales pipeline</p>
        </div>
        <button 
          className="px-4 py-2 bg-black/90 border border-purple-700/30 rounded-lg text-purple-300 hover:bg-purple-900/20 transition-colors flex items-center gap-2"
          onClick={() => setShowNewLeadForm(true)}
        >
          <Plus className="h-4 w-4" /> New Lead
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {salesStats.map((stat, index) => (
          <div key={index} className="bg-black/90 border border-purple-700/30 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm text-gray-400">{stat.title}</h3>
              <stat.icon className="h-4 w-4 text-purple-400" />
            </div>
            <div className="text-xl font-bold">{stat.value}</div>
            <div className="text-xs text-green-400 mt-1">{stat.change} from last month</div>
          </div>
        ))}
      </div>

      {/* Pipeline Summary Card */}
      <div className="bg-black/90 border border-purple-700/30 rounded-lg overflow-hidden mb-6">
        <div className="p-4 border-b border-purple-700/30">
          <h2 className="font-bold">Pipeline Summary</h2>
        </div>
        <div className="p-4 overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="text-left text-sm text-gray-400">
                <th className="pb-3 font-medium">Stage</th>
                <th className="pb-3 font-medium">Count</th>
                <th className="pb-3 font-medium">Value</th>
                <th className="pb-3 font-medium">Avg. Deal</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-700/10">
              {pipelineStages.map((stage) => {
                const avgDeal = Number.parseInt(stage.value.replace("$", "").replace(",", "")) / stage.count
                const formattedAvg = `$${Math.round(avgDeal).toLocaleString()}`

                // Determine status based on count
                let status = "Low"
                let statusColor = "bg-red-500/20 text-red-400"

                if (stage.count > 100) {
                  status = "High"
                  statusColor = "bg-green-500/20 text-green-400"
                } else if (stage.count > 50) {
                  status = "Medium"
                  statusColor = "bg-amber-500/20 text-amber-400"
                }

                return (
                  <tr key={stage.id} className="hover:bg-purple-900/10 cursor-pointer" onClick={() => setActiveTab(stage.id)}>
                    <td className="py-3 font-medium">
                      <div className="flex items-center">
                        <stage.icon className="h-4 w-4 mr-2 text-purple-400" />
                        {stage.name}
                      </div>
                    </td>
                    <td className="py-3">{stage.count}</td>
                    <td className="py-3">{stage.value}</td>
                    <td className="py-3">{formattedAvg}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${statusColor}`}>{status}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto mb-6 border-b border-purple-700/30">
        {pipelineStages.map((stage) => (
          <button
            key={stage.id}
            className={`px-4 py-2 whitespace-nowrap flex items-center ${
              activeTab === stage.id ? "text-purple-400 border-b-2 border-purple-500" : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab(stage.id)}
          >
            <stage.icon className="h-4 w-4 mr-2" />
            {stage.name} ({stage.count})
          </button>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder={`Search ${activeStage.name.toLowerCase()}...`}
            className="w-full pl-10 pr-4 py-2.5 bg-black/90 border border-purple-700/30 rounded-lg focus:outline-none text-white"
          />
        </div>
        <button className="px-4 py-2.5 bg-black/90 border border-purple-700/30 rounded-lg text-purple-300 hover:bg-purple-900/20 transition-colors flex items-center gap-2">
          <Filter className="h-4 w-4" /> Filter
        </button>
      </div>

      {/* Items List */}
      <div className="bg-black/90 border border-purple-700/30 rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="p-8 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-500 border-t-transparent"></div>
          </div>
        ) : (
          <>
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-purple-700/30 bg-black/40 text-xs font-medium text-gray-400 uppercase">
              <div className="col-span-5">Name</div>
              <div className="col-span-2">Value</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-3">Status</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-purple-700/10">
              {activeStage.items.map((item) => (
                <div 
                  key={item.id} 
                  className="grid grid-cols-12 gap-4 p-4 hover:bg-purple-900/10 transition-colors cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="col-span-5 font-medium">{item.name}</div>
                  <div className="col-span-2 text-gray-300">{item.value}</div>
                  <div className="col-span-2 text-gray-400 flex items-center">
                    <Calendar className="h-3 w-3 mr-1.5" />
                    {item.date}
                  </div>
                  <div className="col-span-3 flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                    <div className="flex space-x-1">
                      <button 
                        className="p-1 rounded-lg hover:bg-purple-900/30 text-gray-400 hover:text-white transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = `mailto:${item.email}`;
                        }}
                      >
                        <Mail size={14} />
                      </button>
                      <button 
                        className="p-1 rounded-lg hover:bg-purple-900/30 text-gray-400 hover:text-white transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = `tel:${item.phone}`;
                        }}
                      >
                        <Phone size={14} />
                      </button>
                      <button 
                        className="p-1 rounded-lg hover:bg-purple-900/30 text-gray-400 hover:text-white transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center p-4 border-t border-purple-700/30">
              <div className="text-sm text-gray-400">
                Showing <span className="font-medium text-white">1-{activeStage.items.length}</span> of{" "}
                <span className="font-medium text-white">{activeStage.count}</span> items
              </div>
              <div className="flex gap-1">
                <button
                  className="px-3 py-1.5 rounded-lg bg-black/90 border border-purple-700/30 text-gray-400 hover:text-white hover:bg-purple-900/20 transition-colors disabled:opacity-50"
                  disabled
                >
                  Previous
                </button>
                <button className="px-3 py-1.5 rounded-lg bg-black/90 border border-purple-700/30 text-gray-400 hover:text-white hover:bg-purple-900/20 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Detail Sidebar - Appears when an item is selected */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 w-full sm:w-96 h-full bg-gray-900 border-l border-purple-700/30 shadow-xl z-50 overflow-y-auto"
          >
            <div className="p-4 border-b border-purple-700/30 flex justify-between items-center">
              <h2 className="font-bold text-lg">{selectedItem.name}</h2>
              <button 
                className="p-1 rounded-lg hover:bg-purple-900/30 text-gray-400 hover:text-white transition-colors"
                onClick={() => setSelectedItem(null)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedItem.status)}`}>
                  {selectedItem.status}
                </span>
                <div className="text-xl font-bold">{selectedItem.value}</div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Contact Information</h3>
                  <div className="bg-black/30 rounded-lg p-3 space-y-2">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-purple-400 mr-2" />
                      <span>{selectedItem.contact}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-purple-400 mr-2" />
                      <a href={`mailto:${selectedItem.email}`} className="text-purple-300 hover:underline">
                        {selectedItem.email}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-purple-400 mr-2" />
                      <a href={`tel:${selectedItem.phone}`} className="text-purple-300 hover:underline">
                        {selectedItem.phone}
                      </a>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Details</h3>
                  <div className="bg-black/30 rounded-lg p-3 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Source:</span>
                      <span>{selectedItem.source}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Created:</span>
                      <span>{selectedItem.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Stage:</span>
                      <span>{activeStage.name}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Notes</h3>
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-sm">{selectedItem.notes}</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-purple-700/30">
                  <h3 className="text-sm text-gray-400 mb-3">Actions</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {activeTab === "leads" && (
                      <>
                        <button className="px-3 py-2 bg-purple-600/20 border border-purple-700/50 rounded-lg text-purple-300 hover:bg-purple-900/40 transition-colors flex items-center justify-center gap-1">
                          <TrendingUp className="h-4 w-4" /> Convert to Opportunity
                        </button>
                        <button className="px-3 py-2 bg-black/50 border border-purple-700/30 rounded-lg text-gray-300 hover:bg-purple-900/20 transition-colors flex items-center justify-center gap-1">
                          <X className="h-4 w-4" /> Disqualify
                        </button>
                      </>
                    )}
                    
                    {activeTab === "opportunities" && (
                      <>
                        <button className="px-3 py-2 bg-purple-600/20 border border-purple-700/50 rounded-lg text-purple-300 hover:bg-purple-900/40 transition-colors flex items-center justify-center gap-1">
                          <FileCheck className="h-4 w-4" /> Create Quotation
                        </button>
                        <button className="px-3 py-2 bg-black/50 border border-purple-700/30 rounded-lg text-gray-300 hover:bg-purple-900/20 transition-colors flex items-center justify-center gap-1">
                          <X className="h-4 w-4" /> Mark as Lost
                        </button>
                      </>
                    )}
                    
                    {activeTab === "quotations" && (
                      <>
                        <button className="px-3 py-2 bg-purple-600/20 border border-purple-700/50 rounded-lg text-purple-300 hover:bg-purple-900/40 transition-colors flex items-center justify-center gap-1">
                          <ShoppingCart className="h-4 w-4" /> Convert to Order
                        </button>
                        <button className="px-3 py-2 bg-black/50 border border-purple-700/30 rounded-lg text-gray-300 hover:bg-purple-900/20 transition-colors flex items-center justify-center gap-1">
                          <Send className="h-4 w-4" /> Send Quotation
                        </button>
                      </>
                    )}
                    
                    {activeTab === "orders" && (
                      <>
                        <button className="px-3 py-2 bg-purple-600/20 border border-purple-700/50 rounded-lg text-purple-300 hover:bg-purple-900/40 transition-colors flex items-center justify-center gap-1">
                          <Truck className="h-4 w-4" /> Create Delivery
                        </button>
                        <button className="px-3 py-2 bg-black/50 border border-purple-700/30 rounded-lg text-gray-300 hover:bg-purple-900/20 transition-colors flex items-center justify-center gap-1">
                          <FileText className="h-4 w-4" /> Generate Invoice
                        </button>
                      </>
                    )}
                    
                    {activeTab === "deliveries" && (
                      <>
                        <button className="px-3 py-2 bg-purple-600/20 border border-purple-700/50 rounded-lg text-purple-300 hover:bg-purple-900/40 transition-colors flex items-center justify-center gap-1">
                          <Check className="h-4 w-4" /> Mark as Delivered
                        </button>
                        <button className="px-3 py-2 bg-black/50 border border-purple-700/30 rounded-lg text-gray-300 hover:bg-purple-900/20 transition-colors flex items-center justify-center gap-1">
                          <Printer className="h-4 w-4" /> Print Delivery Note
                        </button>
                      </>
                    )}
                    
                    {activeTab === "invoices" && (
                      <>
                        <button className="px-3 py-2 bg-purple-600/20 border border-purple-700/50 rounded-lg text-purple-300 hover:bg-purple-900/40 transition-colors flex items-center justify-center gap-1">
                          <CreditCard className="h-4 w-4" /> Record Payment
                        </button>
                        <button className="px-3 py-2 bg-black/50 border border-purple-700/30 rounded-lg text-gray-300 hover:bg-purple-900/20 transition-colors flex items-center justify-center gap-1">
                          <Send className="h-4 w-4" /> Send Invoice
                        </button>
                      </>
                    )}
                    
                    {activeTab === "payments" && (
                      <>
                        <button className="px-3 py-2 bg-purple-600/20 border border-purple-700/50 rounded-lg text-purple-300 hover:bg-purple-900/40 transition-colors flex items-center justify-center gap-1">
                          <Download className="h-4 w-4" /> Download Receipt
                        </button>
                        <button className="px-3 py-2 bg-black/50 border border-purple-700/30 rounded-lg text-gray-300 hover:bg-purple-900/20 transition-colors flex items-center justify-center gap-1">
                          <Send className="h-4 w-4" /> Email Receipt
                        </button>
                      </>
                    )}
                  </div>
                  
                  <div className="flex justify-between mt-4">
                    <button className="px-3 py-2 bg-black/50 border border-purple-700/30 rounded-lg text-gray-300 hover:bg-purple-900/20 transition-colors flex items-center gap-1">
                      <Edit className="h-4 w-4" /> Edit
                    </button>
                    <button className="px-3 py-2 bg-red-900/20 border border-red-700/30 rounded-lg text-red-300 hover:bg-red-900/30 transition-colors flex items-center gap-1">
                      <Trash className="h-4 w-4" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* New Lead Form Modal */}
      <AnimatePresence>
        {showNewLeadForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 border border-purple-700/30 rounded-lg w-full max-w-md"
            >
              <div className="p-4 border-b border-purple-700/30 flex justify-between items-center">
                <h2 className="font-bold text-lg">Add New Lead</h2>
                <button 
                  className="p-1 rounded-lg hover:bg-purple-900/30 text-gray-400 hover:text-white transition-colors"
                  onClick={() => setShowNewLeadForm(false)}
                >
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Company/Organization Name*</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-black/30 border border-purple-700/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Contact Person*</label>
                    <input
                      type="text"
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-black/30 border border-purple-700/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Email*</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-black/30 border border-purple-700/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-black/30 border border-purple-700/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Potential Value</label>
                      <input
                        type="text"
                        name="value"
                        value={formData.value}
                        onChange={handleInputChange}
                        placeholder="$0.00"
                        className="w-full px-3 py-2 bg-black/30 border border-purple-700/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Source</label>
                      <select
                        name="source"
                        value={formData.source}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-black/30 border border-purple-700/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                      >
                        <option value="Website">Website</option>
                        <option value="Referral">Referral</option>
                        <option value="Google Ads">Google Ads</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Trade Show">Trade Show</option>
                        <option value="Email Campaign">Email Campaign</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Notes</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 bg-black/30 border border-purple-700/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                    ></textarea>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    className="px-4 py-2 bg-black/50 border border-purple-700/30 rounded-lg text-gray-300 hover:bg-purple-900/20 transition-colors"
                    onClick={() => setShowNewLeadForm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition-colors"
                  >
                    Add Lead
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
