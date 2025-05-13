"use client"

import { useState, useEffect } from "react"
import {
  Users,
  DollarSign,
  Plus,
  Search,
  Filter,
  Calendar,
  Mail,
  Phone,
  ExternalLink,
  CreditCard,
  Truck,
  ShoppingCart,
  Download,
  Printer,
  Send,
  Edit,
  Trash,
  X,
  Check,
  Package,
  Clipboard,
  Receipt,
  Building,
  FileSearch,
  AlertTriangle,
  RefreshCw,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Initial data for the purchase management module
const initialPurchaseStats = [
  { title: "Total Purchases", value: "$98,750", icon: DollarSign, change: "+8.3%" },
  { title: "Active Vendors", value: "87", icon: Building, change: "+4.5%" },
  { title: "Pending Orders", value: "32", icon: Package, change: "+2.1%" },
  { title: "Avg. Delivery Time", value: "4.2 days", icon: Truck, change: "-0.8%" },
]

// Initial purchase workflow stages with data
const initialPurchaseStages = [
  {
    id: "quotations",
    name: "Quotations (PQ)",
    count: 42,
    value: "$127,500",
    icon: FileSearch,
    items: [
      {
        id: 1,
        name: "Office Supplies Co.",
        value: "$5,200",
        date: "May 7",
        status: "New",
        contact: "Robert Chen",
        email: "robert@officesupplies.com",
        phone: "+1 (555) 123-4567",
        category: "Office Supplies",
        notes: "Quotation for Q2 office supplies. Need to compare with other vendors.",
      },
      {
        id: 2,
        name: "Tech Hardware Inc",
        value: "$12,800",
        date: "May 6",
        status: "Under Review",
        contact: "Lisa Wong",
        email: "lisa@techhardware.com",
        phone: "+1 (555) 987-6543",
        category: "IT Equipment",
        notes: "Quotation for new developer workstations. Negotiating bulk discount.",
      },
      {
        id: 3,
        name: "Industrial Parts Ltd",
        value: "$8,750",
        date: "May 5",
        status: "Approved",
        contact: "Michael Davis",
        email: "michael@industrialparts.com",
        phone: "+1 (555) 456-7890",
        category: "Manufacturing",
        notes: "Approved by procurement team. Ready to create purchase order.",
      },
    ],
  },
  {
    id: "orders",
    name: "Purchase Orders",
    count: 35,
    value: "$104,200",
    icon: ShoppingCart,
    items: [
      {
        id: 4,
        name: "Global Logistics",
        value: "$14,500",
        date: "May 4",
        status: "Pending",
        contact: "Sarah Johnson",
        email: "sarah@globallogistics.com",
        phone: "+1 (555) 234-5678",
        category: "Shipping",
        notes: "Order placed for Q2 shipping services. Awaiting confirmation.",
      },
      {
        id: 5,
        name: "Quality Materials",
        value: "$9,800",
        date: "May 3",
        status: "Confirmed",
        contact: "James Wilson",
        email: "james@qualitymaterials.com",
        phone: "+1 (555) 876-5432",
        category: "Raw Materials",
        notes: "Order confirmed. Expected delivery in 7 days.",
      },
    ],
  },
  {
    id: "receipts",
    name: "Goods Receipt (GPN)",
    count: 28,
    value: "$87,600",
    icon: Clipboard,
    items: [
      {
        id: 6,
        name: "Furniture Depot",
        value: "$7,200",
        date: "May 2",
        status: "Partial",
        contact: "David Brown",
        email: "david@furnituredepot.com",
        phone: "+1 (555) 345-6789",
        category: "Office Furniture",
        notes: "Received 70% of order. Remaining items backordered.",
      },
      {
        id: 7,
        name: "Chemical Suppliers",
        value: "$11,500",
        date: "May 1",
        status: "Complete",
        contact: "Emma Taylor",
        email: "emma@chemicalsuppliers.com",
        phone: "+1 (555) 654-3210",
        category: "Chemicals",
        notes: "All items received and verified. Quality check passed.",
      },
    ],
  },
  {
    id: "invoices",
    name: "Purchase Invoices",
    count: 24,
    value: "$76,400",
    icon: Receipt,
    items: [
      {
        id: 8,
        name: "Packaging Solutions",
        value: "$6,800",
        date: "Apr 30",
        status: "Pending Approval",
        contact: "Thomas Clark",
        email: "thomas@packagingsolutions.com",
        phone: "+1 (555) 789-0123",
        category: "Packaging",
        notes: "Invoice received. Pending verification against goods receipt.",
      },
      {
        id: 9,
        name: "Energy Providers",
        value: "$15,200",
        date: "Apr 29",
        status: "Approved",
        contact: "Amanda White",
        email: "amanda@energyproviders.com",
        phone: "+1 (555) 321-0987",
        category: "Utilities",
        notes: "Invoice verified and approved for payment.",
      },
    ],
  },
  {
    id: "payments",
    name: "Vendor Payments",
    count: 20,
    value: "$68,500",
    icon: CreditCard,
    items: [
      {
        id: 10,
        name: "Maintenance Services",
        value: "$4,200",
        date: "Apr 28",
        status: "Scheduled",
        contact: "Kevin Martin",
        email: "kevin@maintenanceservices.com",
        phone: "+1 (555) 432-1098",
        category: "Maintenance",
        notes: "Payment scheduled for next week.",
      },
      {
        id: 11,
        name: "Software Solutions",
        value: "$18,700",
        date: "Apr 27",
        status: "Completed",
        contact: "Patricia Moore",
        email: "patricia@softwaresolutions.com",
        phone: "+1 (555) 210-9876",
        category: "Software",
        notes: "Payment processed. Receipt received from vendor.",
      },
    ],
  },
]

export default function PurchaseManagement() {
  const [activeTab, setActiveTab] = useState("quotations")
  const [isLoading, setIsLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState(null)
  const [showNewVendorForm, setShowNewVendorForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [purchaseStats, setPurchaseStats] = useState(initialPurchaseStats)
  const [purchaseStages, setPurchaseStages] = useState(initialPurchaseStages)
  const [nextId, setNextId] = useState(12) // Start IDs after the initial data
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    phone: "",
    value: "",
    category: "Office Supplies",
    notes: "",
    status: "New",
  })

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  // Get active stage data
  const activeStage = purchaseStages.find((stage) => stage.id === activeTab) || purchaseStages[0]

  // Filter items based on search term
  const filteredItems = activeStage.items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Get status color
  const getStatusColor = (status) => {
    if (["Approved", "Complete", "Completed", "Confirmed"].includes(status)) return "bg-green-500/20 text-green-400"
    if (["Pending", "New", "Scheduled", "Under Review"].includes(status)) return "bg-blue-500/20 text-blue-400"
    if (["Rejected", "Cancelled", "Overdue"].includes(status)) return "bg-red-500/20 text-red-400"
    return "bg-amber-500/20 text-amber-400"
  }

  // Format currency
  const formatCurrency = (value) => {
    if (!value) return "$0"
    // If value already has $ sign, return as is
    if (value.startsWith("$")) return value
    // Otherwise, add $ sign
    return `$${value}`
  }

  // Update stats after CRUD operations
  const updateStats = () => {
    // Calculate total purchases value
    const totalValue = purchaseStages.reduce((sum, stage) => {
      const stageValue = Number.parseInt(stage.value.replace(/[$,]/g, ""))
      return sum + stageValue
    }, 0)

    // Count active vendors (unique vendor names)
    const uniqueVendors = new Set()
    purchaseStages.forEach((stage) => {
      stage.items.forEach((item) => {
        uniqueVendors.add(item.name)
      })
    })

    // Count pending orders
    const pendingOrders = purchaseStages.find((stage) => stage.id === "orders")?.items.length || 0

    // Update stats
    setPurchaseStats((prev) => [
      { ...prev[0], value: `$${totalValue.toLocaleString()}` },
      { ...prev[1], value: uniqueVendors.size.toString() },
      { ...prev[2], value: pendingOrders.toString() },
      { ...prev[3] }, // Keep delivery time as is
    ])
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle form submission for new vendor
  const handleSubmit = (e) => {
    e.preventDefault()

    // Format the value to ensure it has $ sign
    const formattedValue = formatCurrency(formData.value)

    // Get current date
    const today = new Date()
    const formattedDate = `${today.toLocaleString("default", { month: "short" })} ${today.getDate()}`

    // Create new vendor object
    const newVendor = {
      id: nextId,
      name: formData.name,
      contact: formData.contact,
      email: formData.email,
      phone: formData.phone,
      value: formattedValue,
      date: formattedDate,
      category: formData.category,
      notes: formData.notes,
      status: "New",
    }

    // Add to quotations stage by default
    const updatedStages = purchaseStages.map((stage) => {
      if (stage.id === "quotations") {
        // Calculate new total value
        const currentValue = Number.parseInt(stage.value.replace(/[$,]/g, ""))
        const newItemValue = Number.parseInt(formattedValue.replace(/[$,]/g, ""))
        const newTotalValue = currentValue + newItemValue

        return {
          ...stage,
          items: [newVendor, ...stage.items],
          count: stage.count + 1,
          value: `$${newTotalValue.toLocaleString()}`,
        }
      }
      return stage
    })

    // Update state
    setPurchaseStages(updatedStages)
    setNextId(nextId + 1)

    // Reset form and close modal
    setFormData({
      name: "",
      contact: "",
      email: "",
      phone: "",
      value: "",
      category: "Office Supplies",
      notes: "",
      status: "New",
    })
    setShowNewVendorForm(false)

    // Update stats
    setTimeout(() => updateStats(), 100)
  }

  // Handle edit form submission
  const handleEditSubmit = (e) => {
    e.preventDefault()

    // Format the value to ensure it has $ sign
    const formattedValue = formatCurrency(formData.value)

    // Update the item
    const updatedStages = purchaseStages.map((stage) => {
      if (stage.id === activeTab) {
        const updatedItems = stage.items.map((item) => {
          if (item.id === selectedItem.id) {
            return {
              ...item,
              name: formData.name,
              contact: formData.contact,
              email: formData.email,
              phone: formData.phone,
              value: formattedValue,
              category: formData.category,
              notes: formData.notes,
            }
          }
          return item
        })

        // Recalculate stage value
        const newTotalValue = updatedItems.reduce((sum, item) => {
          return sum + Number.parseInt(item.value.replace(/[$,]/g, ""))
        }, 0)

        return {
          ...stage,
          items: updatedItems,
          value: `$${newTotalValue.toLocaleString()}`,
        }
      }
      return stage
    })

    // Update state
    setPurchaseStages(updatedStages)
    setSelectedItem(null)
    setShowEditForm(false)

    // Update stats
    setTimeout(() => updateStats(), 100)
  }

  // Handle edit button click
  const handleEditClick = () => {
    setFormData({
      name: selectedItem.name,
      contact: selectedItem.contact,
      email: selectedItem.email,
      phone: selectedItem.phone,
      value: selectedItem.value,
      category: selectedItem.category || "Office Supplies",
      notes: selectedItem.notes,
      status: selectedItem.status,
    })
    setShowEditForm(true)
  }

  // Handle delete confirmation
  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true)
  }

  // Handle delete
  const handleDelete = () => {
    // Remove the item from the stage
    const updatedStages = purchaseStages.map((stage) => {
      if (stage.id === activeTab) {
        // Filter out the deleted item
        const updatedItems = stage.items.filter((item) => item.id !== selectedItem.id)

        // Recalculate stage value
        const newTotalValue = updatedItems.reduce((sum, item) => {
          return sum + Number.parseInt(item.value.replace(/[$,]/g, ""))
        }, 0)

        return {
          ...stage,
          items: updatedItems,
          count: stage.count - 1,
          value: `$${newTotalValue.toLocaleString()}`,
        }
      }
      return stage
    })

    // Update state
    setPurchaseStages(updatedStages)
    setSelectedItem(null)
    setShowDeleteConfirmation(false)

    // Update stats
    setTimeout(() => updateStats(), 100)
  }

  // Handle stage transition actions
  const handleStageAction = (action, targetStage) => {
    if (!selectedItem) return

    // Create a copy of the current stages
    const updatedStages = [...purchaseStages]

    // Find source and target stage indexes
    const sourceStageIndex = updatedStages.findIndex((stage) => stage.id === activeTab)
    const targetStageIndex = updatedStages.findIndex((stage) => stage.id === targetStage)

    if (sourceStageIndex === -1 || targetStageIndex === -1) return

    // Remove item from source stage
    const sourceStage = updatedStages[sourceStageIndex]
    const itemIndex = sourceStage.items.findIndex((item) => item.id === selectedItem.id)

    if (itemIndex === -1) return

    // Get the item and remove it from source
    const item = { ...sourceStage.items[itemIndex] }
    const sourceItems = sourceStage.items.filter((_, index) => index !== itemIndex)

    // Update source stage
    const sourceValue =
      Number.parseInt(sourceStage.value.replace(/[$,]/g, "")) - Number.parseInt(item.value.replace(/[$,]/g, ""))
    updatedStages[sourceStageIndex] = {
      ...sourceStage,
      items: sourceItems,
      count: sourceStage.count - 1,
      value: `$${sourceValue.toLocaleString()}`,
    }

    // Update item status based on action
    switch (action) {
      case "approve":
        item.status = "Approved"
        break
      case "reject":
        item.status = "Rejected"
        break
      case "confirm":
        item.status = "Confirmed"
        break
      case "complete":
        item.status = "Complete"
        break
      case "process":
        item.status = "Processing"
        break
      default:
        // Keep existing status
        break
    }

    // Add to target stage
    const targetStageData = updatedStages[targetStageIndex]
    const targetValue =
      Number.parseInt(targetStageData.value.replace(/[$,]/g, "")) + Number.parseInt(item.value.replace(/[$,]/g, ""))

    updatedStages[targetStageIndex] = {
      ...targetStageData,
      items: [item, ...targetStageData.items],
      count: targetStageData.count + 1,
      value: `$${targetValue.toLocaleString()}`,
    }

    // Update state
    setPurchaseStages(updatedStages)
    setSelectedItem(null)

    // Update stats
    setTimeout(() => updateStats(), 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0817] to-black text-white p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Purchase Management</h1>
          <p className="text-gray-400">Manage your complete purchase lifecycle</p>
        </div>
        <button
          className="px-4 py-2 bg-black/90 border border-purple-700/30 rounded-lg text-purple-300 hover:bg-purple-900/20 transition-colors flex items-center gap-2"
          onClick={() => setShowNewVendorForm(true)}
        >
          <Plus className="h-4 w-4" /> New Vendor
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {purchaseStats.map((stat, index) => (
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

      {/* Purchase Workflow Summary Card */}
      <div className="bg-black/90 border border-purple-700/30 rounded-lg overflow-hidden mb-6">
        <div className="p-4 border-b border-purple-700/30 flex justify-between items-center">
          <h2 className="font-bold">Purchase Workflow Summary</h2>
          <button
            className="p-1 rounded-lg hover:bg-purple-900/30 text-gray-400 hover:text-white transition-colors"
            onClick={() => updateStats()}
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
        <div className="p-4 overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="text-left text-sm text-gray-400">
                <th className="pb-3 font-medium">Stage</th>
                <th className="pb-3 font-medium">Count</th>
                <th className="pb-3 font-medium">Value</th>
                <th className="pb-3 font-medium">Avg. Order</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-700/10">
              {purchaseStages.map((stage) => {
                const count = stage.count || 0
                const value = stage.value || "$0"
                const avgOrder = count > 0 ? Math.round(Number.parseInt(value.replace(/[$,]/g, "")) / count) : 0
                const formattedAvg = `$${avgOrder.toLocaleString()}`

                // Determine status based on count
                let status = "Low"
                let statusColor = "bg-red-500/20 text-red-400"

                if (count > 30) {
                  status = "High"
                  statusColor = "bg-green-500/20 text-green-400"
                } else if (count > 20) {
                  status = "Medium"
                  statusColor = "bg-amber-500/20 text-amber-400"
                }

                return (
                  <tr
                    key={stage.id}
                    className="hover:bg-purple-900/10 cursor-pointer"
                    onClick={() => setActiveTab(stage.id)}
                  >
                    <td className="py-3 font-medium">
                      <div className="flex items-center">
                        <stage.icon className="h-4 w-4 mr-2 text-purple-400" />
                        {stage.name}
                      </div>
                    </td>
                    <td className="py-3">{count}</td>
                    <td className="py-3">{value}</td>
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
        {purchaseStages.map((stage) => (
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
              <div className="col-span-5">Vendor</div>
              <div className="col-span-2">Value</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-3">Status</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-purple-700/10">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
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
                            e.stopPropagation()
                            window.location.href = `mailto:${item.email}`
                          }}
                        >
                          <Mail size={14} />
                        </button>
                        <button
                          className="p-1 rounded-lg hover:bg-purple-900/30 text-gray-400 hover:text-white transition-colors"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.location.href = `tel:${item.phone}`
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
                ))
              ) : (
                <div className="p-8 text-center text-gray-400 flex flex-col items-center">
                  <AlertTriangle className="h-8 w-8 mb-2 text-amber-400" />
                  <p>No items found matching your search criteria.</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center p-4 border-t border-purple-700/30">
              <div className="text-sm text-gray-400">
                Showing <span className="font-medium text-white">1-{filteredItems.length}</span> of{" "}
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
        {selectedItem && !showEditForm && (
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
                      <span className="text-gray-400">Category:</span>
                      <span>{selectedItem.category}</span>
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
                    {activeTab === "quotations" && (
                      <>
                        <button
                          className="px-3 py-2 bg-purple-600/20 border border-purple-700/50 rounded-lg text-purple-300 hover:bg-purple-900/40 transition-colors flex items-center justify-center gap-1"
                          onClick={() => handleStageAction("approve", "orders")}
                        >
                          <ShoppingCart className="h-4 w-4" /> Create Purchase Order
                        </button>
                        <button
                          className="px-3 py-2 bg-black/50 border border-purple-700/30 rounded-lg text-gray-300 hover:bg-purple-900/20 transition-colors flex items-center justify-center gap-1"
                          onClick={() => handleStageAction("reject", "quotations")}
                        >
                          <X className="h-4 w-4" /> Reject Quotation
                        </button>
                      </>
                    )}

                    {activeTab === "orders" && (
                      <>
                        <button
                          className="px-3 py-2 bg-purple-600/20 border border-purple-700/50 rounded-lg text-purple-300 hover:bg-purple-900/40 transition-colors flex items-center justify-center gap-1"
                          onClick={() => handleStageAction("confirm", "receipts")}
                        >
                          <Clipboard className="h-4 w-4" /> Record Goods Receipt
                        </button>
                        <button className="px-3 py-2 bg-black/50 border border-purple-700/30 rounded-lg text-gray-300 hover:bg-purple-900/20 transition-colors flex items-center justify-center gap-1">
                          <Send className="h-4 w-4" /> Send to Vendor
                        </button>
                      </>
                    )}

                    {activeTab === "receipts" && (
                      <>
                        <button
                          className="px-3 py-2 bg-purple-600/20 border border-purple-700/50 rounded-lg text-purple-300 hover:bg-purple-900/40 transition-colors flex items-center justify-center gap-1"
                          onClick={() => handleStageAction("complete", "invoices")}
                        >
                          <Receipt className="h-4 w-4" /> Create Invoice
                        </button>
                        <button className="px-3 py-2 bg-black/50 border border-purple-700/30 rounded-lg text-gray-300 hover:bg-purple-900/20 transition-colors flex items-center justify-center gap-1">
                          <Printer className="h-4 w-4" /> Print GPN
                        </button>
                      </>
                    )}

                    {activeTab === "invoices" && (
                      <>
                        <button
                          className="px-3 py-2 bg-purple-600/20 border border-purple-700/50 rounded-lg text-purple-300 hover:bg-purple-900/40 transition-colors flex items-center justify-center gap-1"
                          onClick={() => handleStageAction("process", "payments")}
                        >
                          <CreditCard className="h-4 w-4" /> Process Payment
                        </button>
                        <button className="px-3 py-2 bg-black/50 border border-purple-700/30 rounded-lg text-gray-300 hover:bg-purple-900/20 transition-colors flex items-center justify-center gap-1">
                          <Check className="h-4 w-4" /> Approve Invoice
                        </button>
                      </>
                    )}

                    {activeTab === "payments" && (
                      <>
                        <button className="px-3 py-2 bg-purple-600/20 border border-purple-700/50 rounded-lg text-purple-300 hover:bg-purple-900/40 transition-colors flex items-center justify-center gap-1">
                          <Download className="h-4 w-4" /> Download Receipt
                        </button>
                        <button className="px-3 py-2 bg-black/50 border border-purple-700/30 rounded-lg text-gray-300 hover:bg-purple-900/20 transition-colors flex items-center justify-center gap-1">
                          <Send className="h-4 w-4" /> Email Confirmation
                        </button>
                      </>
                    )}
                  </div>

                  <div className="flex justify-between mt-4">
                    <button
                      className="px-3 py-2 bg-black/50 border border-purple-700/30 rounded-lg text-gray-300 hover:bg-purple-900/20 transition-colors flex items-center gap-1"
                      onClick={handleEditClick}
                    >
                      <Edit className="h-4 w-4" /> Edit
                    </button>
                    <button
                      className="px-3 py-2 bg-red-900/20 border border-red-700/30 rounded-lg text-red-300 hover:bg-red-900/30 transition-colors flex items-center gap-1"
                      onClick={handleDeleteClick}
                    >
                      <Trash className="h-4 w-4" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* New Vendor Form Modal */}
      <AnimatePresence>
        {showNewVendorForm && (
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
                <h2 className="font-bold text-lg">Add New Vendor</h2>
                <button
                  className="p-1 rounded-lg hover:bg-purple-900/30 text-gray-400 hover:text-white transition-colors"
                  onClick={() => setShowNewVendorForm(false)}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Vendor Name*</label>
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
                      <label className="block text-sm text-gray-400 mb-1">Initial Order Value*</label>
                      <input
                        type="text"
                        name="value"
                        value={formData.value}
                        onChange={handleInputChange}
                        placeholder="$0.00"
                        className="w-full px-3 py-2 bg-black/30 border border-purple-700/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-black/30 border border-purple-700/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                      >
                        <option value="Office Supplies">Office Supplies</option>
                        <option value="IT Equipment">IT Equipment</option>
                        <option value="Raw Materials">Raw Materials</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Shipping">Shipping</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Software">Software</option>
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
                    onClick={() => setShowNewVendorForm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition-colors"
                  >
                    Add Vendor
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Form Modal */}
      <AnimatePresence>
        {showEditForm && (
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
                <h2 className="font-bold text-lg">Edit Vendor</h2>
                <button
                  className="p-1 rounded-lg hover:bg-purple-900/30 text-gray-400 hover:text-white transition-colors"
                  onClick={() => setShowEditForm(false)}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleEditSubmit} className="p-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Vendor Name*</label>
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
                      <label className="block text-sm text-gray-400 mb-1">Value*</label>
                      <input
                        type="text"
                        name="value"
                        value={formData.value}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-black/30 border border-purple-700/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-black/30 border border-purple-700/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                      >
                        <option value="Office Supplies">Office Supplies</option>
                        <option value="IT Equipment">IT Equipment</option>
                        <option value="Raw Materials">Raw Materials</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Shipping">Shipping</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Software">Software</option>
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
                    onClick={() => setShowEditForm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirmation && (
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
              className="bg-gray-900 border border-purple-700/30 rounded-lg w-full max-w-md p-6"
            >
              <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete <span className="text-white font-medium">{selectedItem?.name}</span>?
                This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 bg-black/50 border border-purple-700/30 rounded-lg text-gray-300 hover:bg-purple-900/20 transition-colors"
                  onClick={() => setShowDeleteConfirmation(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-600 rounded-lg text-white hover:bg-red-700 transition-colors"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
