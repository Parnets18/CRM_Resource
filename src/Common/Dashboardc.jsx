// "use client"

// import { useState, useEffect } from "react"
// import {
//   Users,
//   DollarSign,
//   Plus,
//   Search,
//   Filter,
//   Calendar,
//   Mail,
//   Phone,
//   CreditCard,
//   Truck,
//   ShoppingCart,
//   Download,
//   Printer,
//   Send,
//   Edit,
//   Trash,
//   X,
//   Check,
//   Package,
//   Clipboard,
//   Receipt,
//   Building,
//   FileSearch,
//   AlertTriangle,
//   RefreshCw,
//   MoreHorizontal,
//   Eye,
//   ChevronDown,
//   ArrowUpDown,
//   CheckCircle2,
//   XCircle,
//   Clock,
// } from "lucide-react"
// import { motion, AnimatePresence } from "framer-motion"

// // Initial data for the purchase management module
// const initialPurchaseStats = [
//   { title: "Total Purchases", value: "$98,750", icon: DollarSign, change: "+8.3%" },
//   { title: "Active Vendors", value: "87", icon: Building, change: "+4.5%" },
//   { title: "Pending Orders", value: "32", icon: Package, change: "+2.1%" },
//   { title: "Avg. Delivery Time", value: "4.2 days", icon: Truck, change: "-0.8%" },
// ]

// // Initial purchase workflow stages with data
// const initialPurchaseStages = [
//   {
//     id: "quotations",
//     name: "Quotations (PQ)",
//     count: 42,
//     value: "$127,500",
//     icon: FileSearch,
//     items: [
//       {
//         id: 1,
//         name: "Office Supplies Co.",
//         value: "$5,200",
//         date: "May 7",
//         status: "New",
//         contact: "Robert Chen",
//         email: "robert@officesupplies.com",
//         phone: "+1 (555) 123-4567",
//         category: "Office Supplies",
//         notes: "Quotation for Q2 office supplies. Need to compare with other vendors.",
//       },
//       {
//         id: 2,
//         name: "Tech Hardware Inc",
//         value: "$12,800",
//         date: "May 6",
//         status: "Under Review",
//         contact: "Lisa Wong",
//         email: "lisa@techhardware.com",
//         phone: "+1 (555) 987-6543",
//         category: "IT Equipment",
//         notes: "Quotation for new developer workstations. Negotiating bulk discount.",
//       },
//       {
//         id: 3,
//         name: "Industrial Parts Ltd",
//         value: "$8,750",
//         date: "May 5",
//         status: "Approved",
//         contact: "Michael Davis",
//         email: "michael@industrialparts.com",
//         phone: "+1 (555) 456-7890",
//         category: "Manufacturing",
//         notes: "Approved by procurement team. Ready to create purchase order.",
//       },
//     ],
//   },
//   {
//     id: "orders",
//     name: "Purchase Orders",
//     count: 35,
//     value: "$104,200",
//     icon: ShoppingCart,
//     items: [
//       {
//         id: 4,
//         name: "Global Logistics",
//         value: "$14,500",
//         date: "May 4",
//         status: "Pending",
//         contact: "Sarah Johnson",
//         email: "sarah@globallogistics.com",
//         phone: "+1 (555) 234-5678",
//         category: "Shipping",
//         notes: "Order placed for Q2 shipping services. Awaiting confirmation.",
//       },
//       {
//         id: 5,
//         name: "Quality Materials",
//         value: "$9,800",
//         date: "May 3",
//         status: "Confirmed",
//         contact: "James Wilson",
//         email: "james@qualitymaterials.com",
//         phone: "+1 (555) 876-5432",
//         category: "Raw Materials",
//         notes: "Order confirmed. Expected delivery in 7 days.",
//       },
//     ],
//   },
//   {
//     id: "receipts",
//     name: "Goods Receipt (GPN)",
//     count: 28,
//     value: "$87,600",
//     icon: Clipboard,
//     items: [
//       {
//         id: 6,
//         name: "Furniture Depot",
//         value: "$7,200",
//         date: "May 2",
//         status: "Partial",
//         contact: "David Brown",
//         email: "david@furnituredepot.com",
//         phone: "+1 (555) 345-6789",
//         category: "Office Furniture",
//         notes: "Received 70% of order. Remaining items backordered.",
//       },
//       {
//         id: 7,
//         name: "Chemical Suppliers",
//         value: "$11,500",
//         date: "May 1",
//         status: "Complete",
//         contact: "Emma Taylor",
//         email: "emma@chemicalsuppliers.com",
//         phone: "+1 (555) 654-3210",
//         category: "Chemicals",
//         notes: "All items received and verified. Quality check passed.",
//       },
//     ],
//   },
//   {
//     id: "invoices",
//     name: "Purchase Invoices",
//     count: 24,
//     value: "$76,400",
//     icon: Receipt,
//     items: [
//       {
//         id: 8,
//         name: "Packaging Solutions",
//         value: "$6,800",
//         date: "Apr 30",
//         status: "Pending Approval",
//         contact: "Thomas Clark",
//         email: "thomas@packagingsolutions.com",
//         phone: "+1 (555) 789-0123",
//         category: "Packaging",
//         notes: "Invoice received. Pending verification against goods receipt.",
//       },
//       {
//         id: 9,
//         name: "Energy Providers",
//         value: "$15,200",
//         date: "Apr 29",
//         status: "Approved",
//         contact: "Amanda White",
//         email: "amanda@energyproviders.com",
//         phone: "+1 (555) 321-0987",
//         category: "Utilities",
//         notes: "Invoice verified and approved for payment.",
//       },
//     ],
//   },
//   {
//     id: "payments",
//     name: "Vendor Payments",
//     count: 20,
//     value: "$68,500",
//     icon: CreditCard,
//     items: [
//       {
//         id: 10,
//         name: "Maintenance Services",
//         value: "$4,200",
//         date: "Apr 28",
//         status: "Scheduled",
//         contact: "Kevin Martin",
//         email: "kevin@maintenanceservices.com",
//         phone: "+1 (555) 432-1098",
//         category: "Maintenance",
//         notes: "Payment scheduled for next week.",
//       },
//       {
//         id: 11,
//         name: "Software Solutions",
//         value: "$18,700",
//         date: "Apr 27",
//         status: "Completed",
//         contact: "Patricia Moore",
//         email: "patricia@softwaresolutions.com",
//         phone: "+1 (555) 210-9876",
//         category: "Software",
//         notes: "Payment processed. Receipt received from vendor.",
//       },
//     ],
//   },
// ]

// export default function PurchaseManagement() {
//   const [activeTab, setActiveTab] = useState("quotations")
//   const [isLoading, setIsLoading] = useState(true)
//   const [selectedItem, setSelectedItem] = useState(null)
//   const [showNewVendorForm, setShowNewVendorForm] = useState(false)
//   const [showEditForm, setShowEditForm] = useState(false)
//   const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [purchaseStats, setPurchaseStats] = useState(initialPurchaseStats)
//   const [purchaseStages, setPurchaseStages] = useState(initialPurchaseStages)
//   const [nextId, setNextId] = useState(12) // Start IDs after the initial data
//   const [formData, setFormData] = useState({
//     name: "",
//     contact: "",
//     email: "",
//     phone: "",
//     value: "",
//     category: "Office Supplies",
//     notes: "",
//     status: "New",
//   })
//   const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" })
//   const [actionMenuOpen, setActionMenuOpen] = useState(null)
//   const [successMessage, setSuccessMessage] = useState(null)
//   const [filterOptions, setFilterOptions] = useState({
//     status: "all",
//     category: "all",
//     dateRange: "all",
//   })
//   const [showFilterModal, setShowFilterModal] = useState(false)

//   // Simulate loading
//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoading(false), 1000)
//     return () => clearTimeout(timer)
//   }, [])

//   // Get active stage data
//   const activeStage = purchaseStages.find((stage) => stage.id === activeTab) || purchaseStages[0]

//   // Sort and filter items
//   const getSortedAndFilteredItems = () => {
//     // First apply filters
//     const filtered = activeStage.items.filter((item) => {
//       // Apply search filter
//       const matchesSearch =
//         item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         item.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         item.category.toLowerCase().includes(searchTerm.toLowerCase())

//       // Apply status filter
//       const matchesStatus = filterOptions.status === "all" || item.status === filterOptions.status

//       // Apply category filter
//       const matchesCategory = filterOptions.category === "all" || item.category === filterOptions.category

//       // Apply date range filter (simplified for demo)
//       const matchesDateRange = filterOptions.dateRange === "all"

//       return matchesSearch && matchesStatus && matchesCategory && matchesDateRange
//     })

//     // Then sort
//     if (sortConfig.key) {
//       filtered.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) {
//           return sortConfig.direction === "asc" ? -1 : 1
//         }
//         if (a[sortConfig.key] > b[sortConfig.key]) {
//           return sortConfig.direction === "asc" ? 1 : -1
//         }
//         return 0
//       })
//     }

//     return filtered
//   }

//   const filteredItems = getSortedAndFilteredItems()

//   // Handle sort
//   const requestSort = (key) => {
//     let direction = "asc"
//     if (sortConfig.key === key && sortConfig.direction === "asc") {
//       direction = "desc"
//     }
//     setSortConfig({ key, direction })
//   }

//   // Get sort direction icon
//   const getSortDirectionIcon = (key) => {
//     if (sortConfig.key !== key) {
//       return <ArrowUpDown size={14} className="opacity-50" />
//     }
//     return sortConfig.direction === "asc" ? (
//       <ChevronDown size={14} className="text-purple-400" />
//     ) : (
//       <ChevronDown size={14} className="text-purple-400 rotate-180" />
//     )
//   }

//   // Get status color
//   const getStatusColor = (status) => {
//     if (["Approved", "Complete", "Completed", "Confirmed"].includes(status)) return "bg-green-500/20 text-green-400"
//     if (["Pending", "New", "Scheduled", "Under Review"].includes(status)) return "bg-blue-500/20 text-blue-400"
//     if (["Rejected", "Cancelled", "Overdue"].includes(status)) return "bg-red-500/20 text-red-400"
//     return "bg-amber-500/20 text-amber-400"
//   }

//   // Get status icon
//   const getStatusIcon = (status) => {
//     if (["Approved", "Complete", "Completed", "Confirmed"].includes(status)) return <CheckCircle2 size={14} />
//     if (["Pending", "New", "Scheduled", "Under Review"].includes(status)) return <Clock size={14} />
//     if (["Rejected", "Cancelled", "Overdue"].includes(status)) return <XCircle size={14} />
//     return <AlertTriangle size={14} />
//   }

//   // Format currency
//   const formatCurrency = (value) => {
//     if (!value) return "$0"
//     // If value already has $ sign, return as is
//     if (value.startsWith("$")) return value
//     // Otherwise, add $ sign
//     return `$${value}`
//   }

//   // Show success message
//   const showSuccess = (message) => {
//     setSuccessMessage(message)
//     setTimeout(() => {
//       setSuccessMessage(null)
//     }, 3000)
//   }

//   // Update stats after CRUD operations
//   const updateStats = () => {
//     // Calculate total purchases value
//     const totalValue = purchaseStages.reduce((sum, stage) => {
//       const stageValue = Number.parseInt(stage.value.replace(/[$,]/g, ""))
//       return sum + stageValue
//     }, 0)

//     // Count active vendors (unique vendor names)
//     const uniqueVendors = new Set()
//     purchaseStages.forEach((stage) => {
//       stage.items.forEach((item) => {
//         uniqueVendors.add(item.name)
//       })
//     })

//     // Count pending orders
//     const pendingOrders = purchaseStages.find((stage) => stage.id === "orders")?.items.length || 0

//     // Update stats
//     setPurchaseStats((prev) => [
//       { ...prev[0], value: `$${totalValue.toLocaleString()}` },
//       { ...prev[1], value: uniqueVendors.size.toString() },
//       { ...prev[2], value: pendingOrders.toString() },
//       { ...prev[3] }, // Keep delivery time as is
//     ])
//   }

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setFormData({
//       ...formData,
//       [name]: value,
//     })
//   }

//   // Handle form submission for new vendor
//   const handleSubmit = (e) => {
//     e.preventDefault()

//     // Format the value to ensure it has $ sign
//     const formattedValue = formatCurrency(formData.value)

//     // Get current date
//     const today = new Date()
//     const formattedDate = `${today.toLocaleString("default", { month: "short" })} ${today.getDate()}`

//     // Create new vendor object
//     const newVendor = {
//       id: nextId,
//       name: formData.name,
//       contact: formData.contact,
//       email: formData.email,
//       phone: formData.phone,
//       value: formattedValue,
//       date: formattedDate,
//       category: formData.category,
//       notes: formData.notes,
//       status: "New",
//     }

//     // Add to quotations stage by default
//     const updatedStages = purchaseStages.map((stage) => {
//       if (stage.id === "quotations") {
//         // Calculate new total value
//         const currentValue = Number.parseInt(stage.value.replace(/[$,]/g, ""))
//         const newItemValue = Number.parseInt(formattedValue.replace(/[$,]/g, ""))
//         const newTotalValue = currentValue + newItemValue

//         return {
//           ...stage,
//           items: [newVendor, ...stage.items],
//           count: stage.count + 1,
//           value: `$${newTotalValue.toLocaleString()}`,
//         }
//       }
//       return stage
//     })

//     // Update state
//     setPurchaseStages(updatedStages)
//     setNextId(nextId + 1)

//     // Reset form and close modal
//     setFormData({
//       name: "",
//       contact: "",
//       email: "",
//       phone: "",
//       value: "",
//       category: "Office Supplies",
//       notes: "",
//       status: "New",
//     })
//     setShowNewVendorForm(false)

//     // Show success message
//     showSuccess(`New vendor "${newVendor.name}" added successfully`)

//     // Update stats
//     setTimeout(() => updateStats(), 100)
//   }

//   // Handle edit form submission
//   const handleEditSubmit = (e) => {
//     e.preventDefault()

//     // Format the value to ensure it has $ sign
//     const formattedValue = formatCurrency(formData.value)

//     // Update the item
//     const updatedStages = purchaseStages.map((stage) => {
//       if (stage.id === activeTab) {
//         const updatedItems = stage.items.map((item) => {
//           if (item.id === selectedItem.id) {
//             return {
//               ...item,
//               name: formData.name,
//               contact: formData.contact,
//               email: formData.email,
//               phone: formData.phone,
//               value: formattedValue,
//               category: formData.category,
//               notes: formData.notes,
//               status: formData.status,
//             }
//           }
//           return item
//         })

//         // Recalculate stage value
//         const newTotalValue = updatedItems.reduce((sum, item) => {
//           return sum + Number.parseInt(item.value.replace(/[$,]/g, ""))
//         }, 0)

//         return {
//           ...stage,
//           items: updatedItems,
//           value: `$${newTotalValue.toLocaleString()}`,
//         }
//       }
//       return stage
//     })

//     // Update state
//     setPurchaseStages(updatedStages)
//     setSelectedItem(null)
//     setShowEditForm(false)

//     // Show success message
//     showSuccess(`Vendor "${formData.name}" updated successfully`)

//     // Update stats
//     setTimeout(() => updateStats(), 100)
//   }

//   // Handle edit button click
//   const handleEditClick = (item = null) => {
//     const itemToEdit = item || selectedItem
//     setFormData({
//       name: itemToEdit.name,
//       contact: itemToEdit.contact,
//       email: itemToEdit.email,
//       phone: itemToEdit.phone,
//       value: itemToEdit.value,
//       category: itemToEdit.category || "Office Supplies",
//       notes: itemToEdit.notes,
//       status: itemToEdit.status,
//     })
//     setSelectedItem(itemToEdit)
//     setShowEditForm(true)
//     setActionMenuOpen(null)
//   }

//   // Handle delete confirmation
//   const handleDeleteClick = (item = null) => {
//     setSelectedItem(item || selectedItem)
//     setShowDeleteConfirmation(true)
//     setActionMenuOpen(null)
//   }

//   // Handle delete
//   const handleDelete = () => {
//     // Remove the item from the stage
//     const updatedStages = purchaseStages.map((stage) => {
//       if (stage.id === activeTab) {
//         // Filter out the deleted item
//         const updatedItems = stage.items.filter((item) => item.id !== selectedItem.id)

//         // Recalculate stage value
//         const newTotalValue = updatedItems.reduce((sum, item) => {
//           return sum + Number.parseInt(item.value.replace(/[$,]/g, ""))
//         }, 0)

//         return {
//           ...stage,
//           items: updatedItems,
//           count: stage.count - 1,
//           value: `$${newTotalValue.toLocaleString()}`,
//         }
//       }
//       return stage
//     })

//     // Store the name for success message
//     const deletedName = selectedItem.name

//     // Update state
//     setPurchaseStages(updatedStages)
//     setSelectedItem(null)
//     setShowDeleteConfirmation(false)

//     // Show success message
//     showSuccess(`Vendor "${deletedName}" deleted successfully`)

//     // Update stats
//     setTimeout(() => updateStats(), 100)
//   }

//   // Handle stage transition actions
//   const handleStageAction = (action, targetStage) => {
//     if (!selectedItem) return

//     // Create a copy of the current stages
//     const updatedStages = [...purchaseStages]

//     // Find source and target stage indexes
//     const sourceStageIndex = updatedStages.findIndex((stage) => stage.id === activeTab)
//     const targetStageIndex = updatedStages.findIndex((stage) => stage.id === targetStage)

//     if (sourceStageIndex === -1 || targetStageIndex === -1) return

//     // Remove item from source stage
//     const sourceStage = updatedStages[sourceStageIndex]
//     const itemIndex = sourceStage.items.findIndex((item) => item.id === selectedItem.id)

//     if (itemIndex === -1) return

//     // Get the item and remove it from source
//     const item = { ...sourceStage.items[itemIndex] }
//     const sourceItems = sourceStage.items.filter((_, index) => index !== itemIndex)

//     // Update source stage
//     const sourceValue =
//       Number.parseInt(sourceStage.value.replace(/[$,]/g, "")) - Number.parseInt(item.value.replace(/[$,]/g, ""))
//     updatedStages[sourceStageIndex] = {
//       ...sourceStage,
//       items: sourceItems,
//       count: sourceStage.count - 1,
//       value: `$${sourceValue.toLocaleString()}`,
//     }

//     // Update item status based on action
//     switch (action) {
//       case "approve":
//         item.status = "Approved"
//         break
//       case "reject":
//         item.status = "Rejected"
//         break
//       case "confirm":
//         item.status = "Confirmed"
//         break
//       case "complete":
//         item.status = "Complete"
//         break
//       case "process":
//         item.status = "Processing"
//         break
//       default:
//         // Keep existing status
//         break
//     }

//     // Add to target stage
//     const targetStageData = updatedStages[targetStageIndex]
//     const targetValue =
//       Number.parseInt(targetStageData.value.replace(/[$,]/g, "")) + Number.parseInt(item.value.replace(/[$,]/g, ""))

//     updatedStages[targetStageIndex] = {
//       ...targetStageData,
//       items: [item, ...targetStageData.items],
//       count: targetStageData.count + 1,
//       value: `$${targetValue.toLocaleString()}`,
//     }

//     // Store name for success message
//     const itemName = item.name

//     // Update state
//     setPurchaseStages(updatedStages)
//     setSelectedItem(null)

//     // Show success message
//     showSuccess(`"${itemName}" moved to ${targetStageData.name} successfully`)

//     // Update stats
//     setTimeout(() => updateStats(), 100)
//   }

//   // Toggle action menu
//   const toggleActionMenu = (id) => {
//     setActionMenuOpen(actionMenuOpen === id ? null : id)
//   }

//   // Handle view details
//   const handleViewDetails = (item) => {
//     setSelectedItem(item)
//     setActionMenuOpen(null)
//   }

//   // Reset filters
//   const resetFilters = () => {
//     setFilterOptions({
//       status: "all",
//       category: "all",
//       dateRange: "all",
//     })
//     setShowFilterModal(false)
//   }

//   // Apply filters
//   const applyFilters = () => {
//     setShowFilterModal(false)
//   }

//   // Get unique categories for filter
//   const getUniqueCategories = () => {
//     const categories = new Set()
//     purchaseStages.forEach((stage) => {
//       stage.items.forEach((item) => {
//         if (item.category) categories.add(item.category)
//       })
//     })
//     return Array.from(categories)
//   }

//   // Get unique statuses for filter
//   const getUniqueStatuses = () => {
//     const statuses = new Set()
//     purchaseStages.forEach((stage) => {
//       stage.items.forEach((item) => {
//         if (item.status) statuses.add(item.status)
//       })
//     })
//     return Array.from(statuses)
//   }

//   return (
//     <div className="min-h-screen bg-white text-black p-4 md:p-6">
//       {/* Success Message Toast */}
//       <AnimatePresence>
//         {successMessage && (
//           <motion.div
//             initial={{ opacity: 0, y: -50 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -50 }}
//             className="fixed top-4 right-4 z-50 bg-green-500/90 text-white px-4 py-3 rounded-lg shadow-lg flex items-center"
//           >
//             <CheckCircle2 className="h-5 w-5 mr-2" />
//             <span>{successMessage}</span>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Header */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//         <div>
//           <h1 className="text-2xl font-bold">Purchase Management</h1>
//           <p className="text-white-400">Manage your complete purchase lifecycle</p>
//         </div>
//         <button
//           className="px-4 py-2 bg-purple-600 hover:bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg text-white transition-colors flex items-center gap-2 shadow-lg"
//           onClick={() => setShowNewVendorForm(true)}
//         >
//           <Plus className="h-4 w-4" /> New Vendor
//         </button>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//         {purchaseStats.map((stat, index) => (
//           <div
//             key={index}
//             className="bg-white/90 border border-purple-700/30 rounded-lg p-4 shadow-md hover:shadow-purple-900/10 transition-all hover:translate-y-[-2px]"
//           >
//             <div className="flex justify-between items-center mb-2">
//               <h3 className="text-black">{stat.title}</h3>
//               <div className="p-2 bg-purple-900/20 rounded-full">
//                 <stat.icon className="h-4 w-4 text-purple-400" />
//               </div>
//             </div>
//             <div className="text-xl font-bold">{stat.value}</div>
//             <div className="text-xs text-green-400 mt-1">{stat.change} from last month</div>
//           </div>
//         ))}
//       </div>

//       {/* Purchase Workflow Summary Card */}
//       <div className="bg-white/90 border border-purple-700/30 rounded-lg overflow-hidden mb-6 shadow-md">
//         <div className="p-4 border-b border-purple-700/30 flex justify-between items-center">
//           <h2 className="font-bold">Purchase Workflow Summary</h2>
//           <button
//             className="p-1 rounded-lg hover:bg-purple-900/30 text-white-400 hover:text-white transition-colors"
//             onClick={() => updateStats()}
//           >
//             <RefreshCw className="h-4 w-4" />
//           </button>
//         </div>
//         <div className="p-4 overflow-x-auto">
//           <table className="w-full min-w-[640px]">
//             <thead>
//               <tr className="text-left text-black">
//                 <th className="pb-3 font-medium">Stage</th>
//                 <th className="pb-3 font-medium">Count</th>
//                 <th className="pb-3 font-medium">Value</th>
//                 <th className="pb-3 font-medium">Avg. Order</th>
//                 <th className="pb-3 font-medium">Status</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-purple-700/10">
//               {purchaseStages.map((stage) => {
//                 const count = stage.count || 0
//                 const value = stage.value || "$0"
//                 const avgOrder = count > 0 ? Math.round(Number.parseInt(value.replace(/[$,]/g, "")) / count) : 0
//                 const formattedAvg = `$${avgOrder.toLocaleString()}`

//                 // Determine status based on count
//                 let status = "Low"
//                 let statusColor = "bg-red-500/20 text-red-400"

//                 if (count > 30) {
//                   status = "High"
//                   statusColor = "bg-green-500/20 text-green-400"
//                 } else if (count > 20) {
//                   status = "Medium"
//                   statusColor = "bg-amber-500/20 text-amber-400"
//                 }

//                 return (
//                   <tr
//                     key={stage.id}
//                     className="hover:bg-purple-900/10 cursor-pointer transition-colors"
//                     onClick={() => setActiveTab(stage.id)}
//                   >
//                     <td className="py-3 font-medium">
//                       <div className="flex items-center">
//                         <div className="p-1.5 bg-purple-900/20 rounded-full mr-2">
//                           <stage.icon className="h-4 w-4 text-purple-400" />
//                         </div>
//                         {stage.name}
//                       </div>
//                     </td>
//                     <td className="py-3">{count}</td>
//                     <td className="py-3">{value}</td>
//                     <td className="py-3">{formattedAvg}</td>
//                     <td className="py-3">
//                       <span className={`px-2 py-1 rounded-full text-xs ${statusColor}`}>{status}</span>
//                     </td>
//                   </tr>
//                 )
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex overflow-x-auto mb-6 border-b border-purple-700/30">
//         {purchaseStages.map((stage) => (
//           <button
//             key={stage.id}
//             className={`px-4 py-2 whitespace-nowrap flex items-center ${
//               activeTab === stage.id
//                 ? "text-purple-400 border-b-2 border-purple-500"
//                 : "text-white-400 hover:text-white hover:bg-purple-900/10"
//             } transition-colors`}
//             onClick={() => setActiveTab(stage.id)}
//           >
//             <stage.icon className="h-4 w-4 mr-2" />
//             {stage.name} ({stage.count})
//           </button>
//         ))}
//       </div>

//       {/* Search and Filter */}
//       <div className="flex flex-col sm:flex-row gap-4 mb-6">
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white-400" />
//           <input
//             type="text"
//             placeholder={`Search ${activeStage.name.toLowerCase()}...`}
//             className="w-full pl-10 pr-4 py-2.5 bg-white/90 border border-purple-700/30 rounded-lg focus:outline-none focus:border-purple-500 text-white shadow-sm"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <button
//           className="px-4 py-2.5 bg-white/90 border border-purple-700/30 rounded-lg text-purple-300 hover:bg-purple-900/20 transition-colors flex items-center gap-2 shadow-sm"
//           onClick={() => setShowFilterModal(true)}
//         >
//           <Filter className="h-4 w-4" /> Filter
//         </button>
//       </div>

//       {/* Items List */}
//       <div className="bg-white/90 border border-purple-700/30 rounded-lg overflow-hidden shadow-md">
//         {isLoading ? (
//           <div className="p-8 flex justify-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-500 border-t-transparent"></div>
//           </div>
//         ) : (
//           <>
//             {/* Table Header */}
//             <div className="grid grid-cols-12 gap-4 p-4 border-b border-purple-700/30 bg-white/40 text-xs font-medium text-white-400 uppercase">
//               <div
//                 className="col-span-4 flex items-center cursor-pointer hover:text-white transition-colors"
//                 onClick={() => requestSort("name")}
//               >
//                 Vendor {getSortDirectionIcon("name")}
//               </div>
//               <div
//                 className="col-span-2 flex items-center cursor-pointer hover:text-white transition-colors"
//                 onClick={() => requestSort("value")}
//               >
//                 Value {getSortDirectionIcon("value")}
//               </div>
//               <div
//                 className="col-span-2 flex items-center cursor-pointer hover:text-black transition-colors"
//                 onClick={() => requestSort("date")}
//               >
//                 Date {getSortDirectionIcon("date")}
//               </div>
//               <div
//                 className="col-span-2 flex items-center cursor-pointer hover:text-white transition-colors"
//                 onClick={() => requestSort("status")}
//               >
//                 Status {getSortDirectionIcon("status")}
//               </div>
//               <div className="col-span-2 text-right">Actions</div>
//             </div>

//             {/* Table Body */}
//             <div className="divide-y divide-purple-700/10">
//               {filteredItems.length > 0 ? (
//                 filteredItems.map((item) => (
//                   <div key={item.id} className="grid grid-cols-12 gap-4 p-4 hover:bg-purple-900/10 transition-colors">
//                     <div className="col-span-4 font-medium flex items-center">
//                       <div
//                         className="cursor-pointer hover:text-purple-300 transition-colors"
//                         onClick={() => handleViewDetails(item)}
//                       >
//                         {item.name}
//                       </div>
//                     </div>
//                     <div className="col-span-2 text-black">{item.value}</div>
//                     <div className="col-span-2 text-white-400 flex items-center">
//                       <Calendar className="h-3 w-3 mr-1.5" />
//                       {item.date}
//                     </div>
//                     <div className="col-span-2">
//                       <span
//                         className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
//                           item.status,
//                         )} flex items-center w-fit gap-1`}
//                       >
//                         {getStatusIcon(item.status)}
//                         {item.status}
//                       </span>
//                     </div>
//                     <div className="col-span-2 flex items-center justify-end space-x-2">
//                       <button
//                         className="p-1.5 rounded-lg hover:bg-purple-900/30 text-white-400 hover:text-white transition-colors"
//                         onClick={() => handleViewDetails(item)}
//                         title="View Details"
//                       >
//                         <Eye size={16} />
//                       </button>
//                       <button
//                         className="p-1.5 rounded-lg hover:bg-purple-900/30 text-white-400 hover:text-white transition-colors"
//                         onClick={() => handleEditClick(item)}
//                         title="Edit"
//                       >
//                         <Edit size={16} />
//                       </button>
//                       <button
//                         className="p-1.5 rounded-lg hover:bg-red-900/30 text-white-400 hover:text-red-400 transition-colors"
//                         onClick={() => handleDeleteClick(item)}
//                         title="Delete"
//                       >
//                         <Trash size={16} />
//                       </button>
//                       <div className="relative">
//                         <button
//                           className="p-1.5 rounded-lg hover:bg-purple-900/30 text-white-400 hover:text-white transition-colors"
//                           onClick={() => toggleActionMenu(item.id)}
//                           title="More Actions"
//                         >
//                           <MoreHorizontal size={16} />
//                         </button>
//                         {actionMenuOpen === item.id && (
//                           <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-purple-700/30 rounded-lg shadow-lg z-10 py-1">
//                             <button
//                               className="w-full text-left px-4 py-2 text-sm text-black hover:bg-purple-900/20 hover:text-white transition-colors flex items-center"
//                               onClick={() => {
//                                 setSelectedItem(item)
//                                 setActionMenuOpen(null)
//                                 if (activeTab === "quotations") {
//                                   handleStageAction("approve", "orders")
//                                 } else if (activeTab === "orders") {
//                                   handleStageAction("confirm", "receipts")
//                                 } else if (activeTab === "receipts") {
//                                   handleStageAction("complete", "invoices")
//                                 } else if (activeTab === "invoices") {
//                                   handleStageAction("process", "payments")
//                                 }
//                               }}
//                             >
//                               <ArrowUpDown size={14} className="mr-2" />
//                               Move to Next Stage
//                             </button>
//                             <button
//                               className="w-full text-left px-4 py-2 text-sm text-black hover:bg-purple-900/20 hover:text-white transition-colors flex items-center"
//                               onClick={() => {
//                                 window.location.href = `mailto:${item.email}`
//                                 setActionMenuOpen(null)
//                               }}
//                             >
//                               <Mail size={14} className="mr-2" />
//                               Send Email
//                             </button>
//                             <button
//                               className="w-full text-left px-4 py-2 text-sm text-black hover:bg-purple-900/20 hover:text-white transition-colors flex items-center"
//                               onClick={() => {
//                                 window.location.href = `tel:${item.phone}`
//                                 setActionMenuOpen(null)
//                               }}
//                             >
//                               <Phone size={14} className="mr-2" />
//                               Call Vendor
//                             </button>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="p-8 text-center text-white-400 flex flex-col items-center">
//                   <AlertTriangle className="h-8 w-8 mb-2 text-amber-400" />
//                   <p>No items found matching your search criteria.</p>
//                   <button
//                     className="mt-4 px-4 py-2 bg-purple-900/20 border border-purple-700/30 rounded-lg text-purple-300 hover:bg-purple-900/40 transition-colors"
//                     onClick={() => {
//                       setSearchTerm("")
//                       resetFilters()
//                     }}
//                   >
//                     Clear Filters
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Pagination */}
//             <div className="flex justify-between items-center p-4 border-t border-purple-700/30">
//               <div className="text-black">
//                 Showing <span className="font-medium text-white">1-{filteredItems.length}</span> of{" "}
//                 <span className="font-medium text-white">{activeStage.count}</span> items
//               </div>
//               <div className="flex gap-1">
//                 <button
//                   className="px-3 py-1.5 rounded-lg bg-white/90 border border-purple-700/30 text-white-400 hover:text-white hover:bg-purple-900/20 transition-colors disabled:opacity-50"
//                   disabled
//                 >
//                   Previous
//                 </button>
//                 <button className="px-3 py-1.5 rounded-lg bg-white/90 border border-purple-700/30 text-white-400 hover:text-white hover:bg-purple-900/20 transition-colors">
//                   Next
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
//       </div>

//       {/* Detail Sidebar - Appears when an item is selected */}
//       <AnimatePresence>
//         {selectedItem && !showEditForm && (
//           <motion.div
//             initial={{ opacity: 0, x: 300 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: 300 }}
//             transition={{ duration: 0.3 }}
//             className="fixed top-0 right-0 w-full sm:w-96 h-full bg-gray-900 border-l border-purple-700/30 shadow-xl z-50 overflow-y-auto"
//           >
//             <div className="p-4 border-b border-purple-700/30 flex justify-between items-center sticky top-0 bg-gray-900 z-10">
//               <h2 className="font-bold text-lg">{selectedItem.name}</h2>
//               <button
//                 className="p-1 rounded-lg hover:bg-purple-900/30 text-white-400 hover:text-white transition-colors"
//                 onClick={() => setSelectedItem(null)}
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             <div className="p-4">
//               <div className="flex justify-between items-center mb-4">
//                 <span
//                   className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
//                     selectedItem.status,
//                   )} flex items-center gap-1`}
//                 >
//                   {getStatusIcon(selectedItem.status)}
//                   {selectedItem.status}
//                 </span>
//                 <div className="text-xl font-bold">{selectedItem.value}</div>
//               </div>

//               <div className="space-y-4">
//                 <div>
//                   <h3 className="text-black mb-1">Contact Information</h3>
//                   <div className="bg-white/30 rounded-lg p-3 space-y-2">
//                     <div className="flex items-center">
//                       <Users className="h-4 w-4 text-purple-400 mr-2" />
//                       <span>{selectedItem.contact}</span>
//                     </div>
//                     <div className="flex items-center">
//                       <Mail className="h-4 w-4 text-purple-400 mr-2" />
//                       <a href={`mailto:${selectedItem.email}`} className="text-purple-300 hover:underline">
//                         {selectedItem.email}
//                       </a>
//                     </div>
//                     <div className="flex items-center">
//                       <Phone className="h-4 w-4 text-purple-400 mr-2" />
//                       <a href={`tel:${selectedItem.phone}`} className="text-purple-300 hover:underline">
//                         {selectedItem.phone}
//                       </a>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-black mb-1">Details</h3>
//                   <div className="bg-white/30 rounded-lg p-3 space-y-2">
//                     <div className="flex justify-between">
//                       <span className="text-white-400">Category:</span>
//                       <span>{selectedItem.category}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-white-400">Created:</span>
//                       <span>{selectedItem.date}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-white-400">Stage:</span>
//                       <span>{activeStage.name}</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-black mb-1">Notes</h3>
//                   <div className="bg-white/30 rounded-lg p-3">
//                     <p className="text-sm">{selectedItem.notes}</p>
//                   </div>
//                 </div>

//                 <div className="pt-4 border-t border-purple-700/30">
//                   <h3 className="text-black mb-3">Actions</h3>
//                   <div className="grid grid-cols-2 gap-2">
//                     {activeTab === "quotations" && (
//                       <>
//                         <button
//                           className="px-3 py-2 bg-purple-600/20 border border-purple-700/50 rounded-lg text-purple-300 hover:bg-purple-900/40 transition-colors flex items-center justify-center gap-1"
//                           onClick={() => handleStageAction("approve", "orders")}
//                         >
//                           <ShoppingCart className="h-4 w-4" /> Create Purchase Order
//                         </button>
//                         <button
//                           className="px-3 py-2 bg-white/50 border border-purple-700/30 rounded-lg text-black hover:bg-purple-900/20 transition-colors flex items-center justify-center gap-1"
//                           onClick={() => handleStageAction("reject", "quotations")}
//                         >
//                           <X className="h-4 w-4" /> Reject Quotation
//                         </button>
//                       </>
//                     )}

//                     {activeTab === "orders" && (
//                       <>
//                         <button
//                           className="px-3 py-2 bg-purple-600/20 border border-purple-700/50 rounded-lg text-purple-300 hover:bg-purple-900/40 transition-colors flex items-center justify-center gap-1"
//                           onClick={() => handleStageAction("confirm", "receipts")}
//                         >
//                           <Clipboard className="h-4 w-4" /> Record Goods Receipt
//                         </button>
//                         <button className="px-3 py-2 bg-white/50 border border-purple-700/30 rounded-lg text-black hover:bg-purple-900/20 transition-colors flex items-center justify-center gap-1">
//                           <Send className="h-4 w-4" /> Send to Vendor
//                         </button>
//                       </>
//                     )}

//                     {activeTab === "receipts" && (
//                       <>
//                         <button
//                           className="px-3 py-2 bg-purple-600/20 border border-purple-700/50 rounded-lg text-purple-300 hover:bg-purple-900/40 transition-colors flex items-center justify-center gap-1"
//                           onClick={() => handleStageAction("complete", "invoices")}
//                         >
//                           <Receipt className="h-4 w-4" /> Create Invoice
//                         </button>
//                         <button className="px-3 py-2 bg-white/50 border border-purple-700/30 rounded-lg text-black hover:bg-purple-900/20 transition-colors flex items-center justify-center gap-1">
//                           <Printer className="h-4 w-4" /> Print GPN
//                         </button>
//                       </>
//                     )}

//                     {activeTab === "invoices" && (
//                       <>
//                         <button
//                           className="px-3 py-2 bg-purple-600/20 border border-purple-700/50 rounded-lg text-purple-300 hover:bg-purple-900/40 transition-colors flex items-center justify-center gap-1"
//                           onClick={() => handleStageAction("process", "payments")}
//                         >
//                           <CreditCard className="h-4 w-4" /> Process Payment
//                         </button>
//                         <button className="px-3 py-2 bg-white/50 border border-purple-700/30 rounded-lg text-black hover:bg-purple-900/20 transition-colors flex items-center justify-center gap-1">
//                           <Check className="h-4 w-4" /> Approve Invoice
//                         </button>
//                       </>
//                     )}

//                     {activeTab === "payments" && (
//                       <>
//                         <button className="px-3 py-2 bg-purple-600/20 border border-purple-700/50 rounded-lg text-purple-300 hover:bg-purple-900/40 transition-colors flex items-center justify-center gap-1">
//                           <Download className="h-4 w-4" /> Download Receipt
//                         </button>
//                         <button className="px-3 py-2 bg-white/50 border border-purple-700/30 rounded-lg text-black hover:bg-purple-900/20 transition-colors flex items-center justify-center gap-1">
//                           <Send className="h-4 w-4" /> Email Confirmation
//                         </button>
//                       </>
//                     )}
//                   </div>

//                   <div className="flex justify-between mt-4">
//                     <button
//                       className="px-3 py-2 bg-white/50 border border-purple-700/30 rounded-lg text-black hover:bg-purple-900/20 transition-colors flex items-center gap-1"
//                       onClick={handleEditClick}
//                     >
//                       <Edit className="h-4 w-4" /> Edit
//                     </button>
//                     <button
//                       className="px-3 py-2 bg-red-900/20 border border-red-700/30 rounded-lg text-red-300 hover:bg-red-900/30 transition-colors flex items-center gap-1"
//                       onClick={handleDeleteClick}
//                     >
//                       <Trash className="h-4 w-4" /> Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* New Vendor Form Modal */}
//       <AnimatePresence>
//         {showNewVendorForm && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
//             onClick={() => setShowNewVendorForm(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="bg-white border border-purple-700/30 rounded-lg w-full max-w-md shadow-xl"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="p-4 border-b border-purple-700/30 flex justify-between items-center bg-white">
//                 <h2 className="font-bold text-lg text-black">Add New Vendor</h2>
//                 <button
//                   className="p-1 rounded-lg hover:bg-purple-100 text-gray-600 hover:text-gray-800 transition-colors"
//                   onClick={() => setShowNewVendorForm(false)}
//                 >
//                   <X size={20} />
//                 </button>
//               </div>

//               <form onSubmit={handleSubmit} className="p-4 bg-white">
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-black mb-1">Vendor Name*</label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-black"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-black mb-1">Contact Person*</label>
//                     <input
//                       type="text"
//                       name="contact"
//                       value={formData.contact}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-black"
//                       required
//                     />
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-black mb-1">Email*</label>
//                       <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-black"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-black mb-1">Phone</label>
//                       <input
//                         type="tel"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleInputChange}
//                         className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-black"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-black mb-1">Initial Order Value*</label>
//                       <input
//                         type="text"
//                         name="value"
//                         value={formData.value}
//                         onChange={handleInputChange}
//                         placeholder="$0.00"
//                         className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-black"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-black mb-1">Category</label>
//                       <select
//                         name="category"
//                         value={formData.category}
//                         onChange={handleInputChange}
//                         className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-black"
//                       >
//                         <option value="Office Supplies">Office Supplies</option>
//                         <option value="IT Equipment">IT Equipment</option>
//                         <option value="Raw Materials">Raw Materials</option>
//                         <option value="Manufacturing">Manufacturing</option>
//                         <option value="Shipping">Shipping</option>
//                         <option value="Utilities">Utilities</option>
//                         <option value="Software">Software</option>
//                         <option value="Other">Other</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-black mb-1">Notes</label>
//                     <textarea
//                       name="notes"
//                       value={formData.notes}
//                       onChange={handleInputChange}
//                       rows={3}
//                       className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-black"
//                     ></textarea>
//                   </div>
//                 </div>

//                 <div className="flex justify-end gap-3 mt-6">
//                   <button
//                     type="button"
//                     className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-black hover:bg-gray-200 transition-colors"
//                     onClick={() => setShowNewVendorForm(false)}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-4 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition-colors shadow-md"
//                   >
//                     Add Vendor
//                   </button>
//                 </div>
//               </form>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Edit Form Modal */}
//       <AnimatePresence>
//         {showEditForm && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-white/70 flex items-center justify-center p-4 z-50"
//             onClick={() => setShowEditForm(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="bg-gray-900 border border-purple-700/30 rounded-lg w-full max-w-md shadow-xl"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="p-4 border-b border-purple-700/30 flex justify-between items-center bg-white/30">
//                 <h2 className="font-bold text-lg">Edit Vendor</h2>
//                 <button
//                   className="p-1 rounded-lg hover:bg-purple-900/30 text-white-400 hover:text-white transition-colors"
//                   onClick={() => setShowEditForm(false)}
//                 >
//                   <X size={20} />
//                 </button>
//               </div>

//               <form onSubmit={handleEditSubmit} className="p-4">
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-black mb-1">Vendor Name*</label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 bg-white/30 border border-purple-700/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-black mb-1">Contact Person*</label>
//                     <input
//                       type="text"
//                       name="contact"
//                       value={formData.contact}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 bg-white/30 border border-purple-700/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
//                       required
//                     />
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-black mb-1">Email*</label>
//                       <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         className="w-full px-3 py-2 bg-white/30 border border-purple-700/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-black mb-1">Phone</label>
//                       <input
//                         type="tel"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleInputChange}
//                         className="w-full px-3 py-2 bg-white/30 border border-purple-700/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-black mb-1">Value*</label>
//                       <input
//                         type="text"
//                         name="value"
//                         value={formData.value}
//                         onChange={handleInputChange}
//                         className="w-full px-3 py-2 bg-white/30 border border-purple-700/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-black mb-1">Category</label>
//                       <select
//                         name="category"
//                         value={formData.category}
//                         onChange={handleInputChange}
//                         className="w-full px-3 py-2 bg-white/30 border border-purple-700/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
//                       >
//                         <option value="Office Supplies">Office Supplies</option>
//                         <option value="IT Equipment">IT Equipment</option>
//                         <option value="Raw Materials">Raw Materials</option>
//                         <option value="Manufacturing">Manufacturing</option>
//                         <option value="Shipping">Shipping</option>
//                         <option value="Utilities">Utilities</option>
//                         <option value="Software">Software</option>
//                         <option value="Other">Other</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-black mb-1">Status</label>
//                     <select
//                       name="status"
//                       value={formData.status}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 bg-white/30 border border-purple-700/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
//                     >
//                       <option value="New">New</option>
//                       <option value="Under Review">Under Review</option>
//                       <option value="Approved">Approved</option>
//                       <option value="Rejected">Rejected</option>
//                       <option value="Pending">Pending</option>
//                       <option value="Confirmed">Confirmed</option>
//                       <option value="Complete">Complete</option>
//                       <option value="Partial">Partial</option>
//                       <option value="Scheduled">Scheduled</option>
//                       <option value="Completed">Completed</option>
//                       <option value="Processing">Processing</option>
//                       <option value="Pending Approval">Pending Approval</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-black mb-1">Notes</label>
//                     <textarea
//                       name="notes"
//                       value={formData.notes}
//                       onChange={handleInputChange}
//                       rows={3}
//                       className="w-full px-3 py-2 bg-white/30 border border-purple-700/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
//                     ></textarea>
//                   </div>
//                 </div>

//                 <div className="flex justify-end gap-3 mt-6">
//                   <button
//                     type="button"
//                     className="px-4 py-2 bg-white/50 border border-purple-700/30 rounded-lg text-black hover:bg-purple-900/20 transition-colors"
//                     onClick={() => setShowEditForm(false)}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-4 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition-colors shadow-md"
//                   >
//                     Save Changes
//                   </button>
//                 </div>
//               </form>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Delete Confirmation Modal */}
//       <AnimatePresence>
//         {showDeleteConfirmation && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-white/70 flex items-center justify-center p-4 z-50"
//             onClick={() => setShowDeleteConfirmation(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="bg-gray-900 border border-purple-700/30 rounded-lg w-full max-w-md p-6 shadow-xl"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="flex items-center mb-4 text-red-400">
//                 <AlertTriangle className="h-6 w-6 mr-2" />
//                 <h3 className="text-lg font-bold">Confirm Deletion</h3>
//               </div>
//               <p className="text-black mb-6">
//                 Are you sure you want to delete <span className="text-white font-medium">{selectedItem?.name}</span>?
//                 This action cannot be undone.
//               </p>
//               <div className="flex justify-end gap-3">
//                 <button
//                   className="px-4 py-2 bg-white/50 border border-purple-700/30 rounded-lg text-black hover:bg-purple-900/20 transition-colors"
//                   onClick={() => setShowDeleteConfirmation(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className="px-4 py-2 bg-red-600 rounded-lg text-white hover:bg-red-700 transition-colors shadow-md"
//                   onClick={handleDelete}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Filter Modal */}
//       <AnimatePresence>
//         {showFilterModal && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-white/70 flex items-center justify-center p-4 z-50"
//             onClick={() => setShowFilterModal(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="bg-gray-900 border border-purple-700/30 rounded-lg w-full max-w-md shadow-xl"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="p-4 border-b border-purple-700/30 flex justify-between items-center bg-white/30">
//                 <h2 className="font-bold text-lg">Filter Options</h2>
//                 <button
//                   className="p-1 rounded-lg hover:bg-purple-900/30 text-white-400 hover:text-white transition-colors"
//                   onClick={() => setShowFilterModal(false)}
//                 >
//                   <X size={20} />
//                 </button>
//               </div>

//               <div className="p-4 space-y-4">
//                 <div>
//                   <label className="block text-black mb-1">Status</label>
//                   <select
//                     value={filterOptions.status}
//                     onChange={(e) => setFilterOptions({ ...filterOptions, status: e.target.value })}
//                     className="w-full px-3 py-2 bg-white/30 border border-purple-700/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
//                   >
//                     <option value="all">All Statuses</option>
//                     {getUniqueStatuses().map((status) => (
//                       <option key={status} value={status}>
//                         {status}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-black mb-1">Category</label>
//                   <select
//                     value={filterOptions.category}
//                     onChange={(e) => setFilterOptions({ ...filterOptions, category: e.target.value })}
//                     className="w-full px-3 py-2 bg-white/30 border border-purple-700/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
//                   >
//                     <option value="all">All Categories</option>
//                     {getUniqueCategories().map((category) => (
//                       <option key={category} value={category}>
//                         {category}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-black mb-1">Date Range</label>
//                   <select
//                     value={filterOptions.dateRange}
//                     onChange={(e) => setFilterOptions({ ...filterOptions, dateRange: e.target.value })}
//                     className="w-full px-3 py-2 bg-white/30 border border-purple-700/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
//                   >
//                     <option value="all">All Dates</option>
//                     <option value="today">Today</option>
//                     <option value="week">This Week</option>
//                     <option value="month">This Month</option>
//                     <option value="quarter">This Quarter</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="p-4 border-t border-purple-700/30 flex justify-end gap-3">
//                 <button
//                   className="px-4 py-2 bg-white/50 border border-purple-700/30 rounded-lg text-black hover:bg-purple-900/20 transition-colors"
//                   onClick={resetFilters}
//                 >
//                   Reset
//                 </button>
//                 <button
//                   className="px-4 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition-colors shadow-md"
//                   onClick={applyFilters}
//                 >
//                   Apply Filters
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }
  
 
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, DollarSign, Package, ShoppingCart, BarChart, Clock, Building2, Wallet, FileText, Bell, AlertTriangle, CheckCircle2, XCircle, ChevronRight, Calendar, TrendingUp, TrendingDown, ArrowRight, Eye, Filter, RefreshCw, X, Search, Megaphone, Truck, Clipboard, Receipt, FileSearch, CreditCard } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data for the dashboard
const kpiData = {
  common: [
    { title: "Total Sales", value: "$124,500", icon: DollarSign, change: "+8.3%", trend: "up" },
    { title: "Active Customers", value: "1,234", icon: Users, change: "+4.5%", trend: "up" },
    { title: "Pending Orders", value: "32", icon: Package, change: "+2.1%", trend: "up" },
    { title: "Avg. Delivery Time", value: "4.2 days", icon: Truck, change: "-0.8%", trend: "down" },
  ],
  construction: [
    { title: "Project Revenue", value: "$287,650", icon: DollarSign, change: "+12.3%", trend: "up" },
    { title: "Active Projects", value: "18", icon: Building2, change: "+2", trend: "up" },
    { title: "Material Costs", value: "$78,450", icon: Package, change: "+5.7%", trend: "up" },
    { title: "Labor Hours", value: "2,450", icon: Clock, change: "-3.2%", trend: "down" },
  ],
  hotel: [
    { title: "Room Revenue", value: "$156,780", icon: DollarSign, change: "+6.8%", trend: "up" },
    { title: "Occupancy Rate", value: "78%", icon: Users, change: "+5.2%", trend: "up" },
    { title: "Avg. Daily Rate", value: "$185", icon: Wallet, change: "+3.1%", trend: "up" },
    { title: "RevPAR", value: "$144.30", icon: TrendingUp, change: "+9.4%", trend: "up" },
  ],
}

const inventoryAlerts = {
  common: [
    {
      id: 1,
      item: "Printer Paper A4",
      status: "Low Stock",
      level: "15 reams",
      threshold: "20 reams",
      severity: "warning",
    },
    {
      id: 2,
      item: "Toner Cartridges",
      status: "Low Stock",
      level: "3 units",
      threshold: "5 units",
      severity: "critical",
    },
    {
      id: 3,
      item: "Office Chairs",
      status: "Overstocked",
      level: "45 units",
      threshold: "30 units",
      severity: "info",
    },
    {
      id: 4,
      item: "Sanitizer Bottles",
      status: "Expiring Soon",
      level: "50 units",
      expiryDate: "June 15, 2025",
      severity: "warning",
    },
  ],
  construction: [
    {
      id: 1,
      item: "Cement Bags",
      status: "Low Stock",
      level: "25 bags",
      threshold: "50 bags",
      severity: "critical",
    },
    {
      id: 2,
      item: "Steel Rods (12mm)",
      status: "Low Stock",
      level: "120 units",
      threshold: "200 units",
      severity: "warning",
    },
    {
      id: 3,
      item: "Safety Helmets",
      status: "Overstocked",
      level: "85 units",
      threshold: "50 units",
      severity: "info",
    },
    {
      id: 4,
      item: "Waterproofing Material",
      status: "Expiring Soon",
      level: "15 buckets",
      expiryDate: "July 10, 2025",
      severity: "warning",
    },
  ],
  hotel: [
    {
      id: 1,
      item: "Bath Towels",
      status: "Low Stock",
      level: "45 units",
      threshold: "100 units",
      severity: "warning",
    },
    {
      id: 2,
      item: "Toiletry Kits",
      status: "Low Stock",
      level: "30 kits",
      threshold: "50 kits",
      severity: "critical",
    },
    {
      id: 3,
      item: "Bed Sheets",
      status: "Overstocked",
      level: "250 units",
      threshold: "150 units",
      severity: "info",
    },
    {
      id: 4,
      item: "Breakfast Items",
      status: "Expiring Soon",
      level: "Various",
      expiryDate: "May 30, 2025",
      severity: "critical",
    },
  ],
}

const haihqNotices = {
  common: [
    {
      id: 1,
      title: "System Maintenance",
      message: "Scheduled downtime on May 30, 2025 from 2:00 AM to 4:00 AM for system upgrades.",
      date: "May 25, 2025",
      severity: "info",
      isRead: false,
    },
    {
      id: 2,
      title: "Year-End Financial Closing",
      message: "All departments must submit final expense reports by June 25, 2025.",
      date: "May 20, 2025",
      severity: "warning",
      isRead: false,
    },
    {
      id: 3,
      title: "Security Alert",
      message: "Increased phishing attempts detected. Please verify all external email requests for financial transactions.",
      date: "May 18, 2025",
      severity: "critical",
      isRead: false,
    },
  ],
  construction: [
    {
      id: 1,
      title: "Safety Inspection",
      message: "Mandatory safety inspection scheduled for all active construction sites on June 5, 2025.",
      date: "May 25, 2025",
      severity: "warning",
      isRead: false,
    },
    {
      id: 2,
      title: "Permit Renewal",
      message: "Construction permits for Project Skyline expire on June 10. Renewal process must begin immediately.",
      date: "May 22, 2025",
      severity: "critical",
      isRead: false,
    },
    {
      id: 3,
      title: "New Building Code Regulations",
      message: "Updated building codes effective July 1, 2025. Training session scheduled for June 15.",
      date: "May 20, 2025",
      severity: "info",
      isRead: false,
    },
  ],
  hotel: [
    {
      id: 1,
      title: "Health Inspection",
      message: "Annual health inspection scheduled for all kitchen facilities on June 8, 2025.",
      date: "May 25, 2025",
      severity: "warning",
      isRead: false,
    },
    {
      id: 2,
      title: "Peak Season Staffing",
      message: "All departments must submit summer staffing requirements by June 1, 2025.",
      date: "May 22, 2025",
      severity: "info",
      isRead: false,
    },
    {
      id: 3,
      title: "Fire Safety Drill",
      message: "Mandatory fire evacuation drill scheduled for May 31, 2025 at 10:00 AM.",
      date: "May 20, 2025",
      severity: "critical",
      isRead: false,
    },
  ],
}

const quickLinks = {
  common: [
    { name: "New Sales Order", icon: DollarSign, path: "/common/sales/new" },
    { name: "Purchase Request", icon: ShoppingCart, path: "/common/purchase/new" },
    { name: "Customer Directory", icon: Users, path: "/common/customers" },
    { name: "Inventory Status", icon: Package, path: "/common/inventory" },
    { name: "Financial Reports", icon: FileText, path: "/common/finance/reports" },
    { name: "Employee Attendance", icon: Clock, path: "/common/attendance" },
  ],
  construction: [
    { name: "New Project", icon: Building2, path: "/construction/projects/new" },
    { name: "Material Request", icon: Package, path: "/construction/materials/request" },
    { name: "Site Inspection", icon: Eye, path: "/construction/inspections" },
    { name: "Labor Allocation", icon: Users, path: "/construction/labor" },
    { name: "Equipment Tracking", icon: Truck, path: "/construction/equipment" },
    { name: "Project Timeline", icon: Calendar, path: "/construction/timeline" },
  ],
  hotel: [
    { name: "Room Bookings", icon: Calendar, path: "/hotel/bookings" },
    { name: "Guest Check-in", icon: Users, path: "/hotel/check-in" },
    { name: "Housekeeping", icon: Building2, path: "/hotel/housekeeping" },
    { name: "Restaurant Orders", icon: ShoppingCart, path: "/hotel/restaurant" },
    { name: "Event Management", icon: Calendar, path: "/hotel/events" },
    { name: "Guest Services", icon: Bell, path: "/hotel/services" },
  ],
}

const recentActivities = {
  common: [
    {
      id: 1,
      action: "New Customer Added",
      description: "Acme Corporation was added as a new customer",
      user: "John Smith",
      time: "10 minutes ago",
    },
    {
      id: 2,
      action: "Sales Order Approved",
      description: "Order #12345 for $8,750 was approved",
      user: "Sarah Johnson",
      time: "45 minutes ago",
    },
    {
      id: 3,
      action: "Payment Received",
      description: "Invoice #INV-2023-056 payment of $12,500 received",
      user: "System",
      time: "2 hours ago",
    },
    {
      id: 4,
      action: "Inventory Updated",
      description: "25 units of Product X added to inventory",
      user: "Michael Brown",
      time: "3 hours ago",
    },
    {
      id: 5,
      action: "Purchase Order Created",
      description: "PO #7890 for $5,200 was created for Office Supplies Co.",
      user: "Lisa Wong",
      time: "5 hours ago",
    },
  ],
  construction: [
    {
      id: 1,
      action: "Project Milestone Completed",
      description: "Foundation work completed for Project Skyline",
      user: "Robert Chen",
      time: "30 minutes ago",
    },
    {
      id: 2,
      action: "Material Delivery",
      description: "Steel shipment received at North Site",
      user: "David Brown",
      time: "1 hour ago",
    },
    {
      id: 3,
      action: "Inspection Passed",
      description: "Electrical inspection passed for Project Horizon",
      user: "Emma Taylor",
      time: "3 hours ago",
    },
    {
      id: 4,
      action: "Subcontractor Assigned",
      description: "ABC Plumbing assigned to Project Gateway",
      user: "James Wilson",
      time: "4 hours ago",
    },
    {
      id: 5,
      action: "Budget Adjustment",
      description: "Project Skyline budget increased by $25,000",
      user: "Sarah Johnson",
      time: "6 hours ago",
    },
  ],
  hotel: [
    {
      id: 1,
      action: "Group Booking Confirmed",
      description: "Corporate retreat for 25 rooms, June 15-18",
      user: "Lisa Wong",
      time: "15 minutes ago",
    },
    {
      id: 2,
      action: "Maintenance Request",
      description: "Room 302 reported AC issues",
      user: "Michael Brown",
      time: "1 hour ago",
    },
    {
      id: 3,
      action: "VIP Guest Check-in",
      description: "Mr. Johnson checked into Presidential Suite",
      user: "Emma Taylor",
      time: "2 hours ago",
    },
    {
      id: 4,
      action: "Restaurant Reservation",
      description: "Table for 8 confirmed for 8:00 PM tonight",
      user: "David Brown",
      time: "3 hours ago",
    },
    {
      id: 5,
      action: "Event Setup Completed",
      description: "Grand Ballroom prepared for tomorrow's conference",
      user: "Robert Chen",
      time: "5 hours ago",
    },
  ],
}

const purchaseStages = [
  {
    id: "quotations",
    name: "Quotations (PQ)",
    count: 42,
    value: "$127,500",
    icon: FileSearch,
  },
  {
    id: "orders",
    name: "Purchase Orders",
    count: 35,
    value: "$104,200",
    icon: ShoppingCart,
  },
  {
    id: "receipts",
    name: "Goods Receipt",
    count: 28,
    value: "$87,600",
    icon: Clipboard,
  },
  {
    id: "invoices",
    name: "Purchase Invoices",
    count: 24,
    value: "$76,400",
    icon: Receipt,
  },
  {
    id: "payments",
    name: "Vendor Payments",
    count: 20,
    value: "$68,500",
    icon: CreditCard,
  },
]

const salesData = {
  common: {
    monthly: [
      { month: "Jan", value: 65000 },
      { month: "Feb", value: 72000 },
      { month: "Mar", value: 68000 },
      { month: "Apr", value: 85000 },
      { month: "May", value: 98750 },
    ],
    target: 100000,
    lastMonth: 85000,
  },
  construction: {
    monthly: [
      { month: "Jan", value: 125000 },
      { month: "Feb", value: 145000 },
      { month: "Mar", value: 160000 },
      { month: "Apr", value: 210000 },
      { month: "May", value: 287650 },
    ],
    target: 300000,
    lastMonth: 210000,
  },
  hotel: {
    monthly: [
      { month: "Jan", value: 95000 },
      { month: "Feb", value: 105000 },
      { month: "Mar", value: 120000 },
      { month: "Apr", value: 135000 },
      { month: "May", value: 156780 },
    ],
    target: 175000,
    lastMonth: 135000,
  },
}

export default function Dashboard({ type = "common" }) {
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [timeframe, setTimeframe] = useState("today")
  const [showAllAlerts, setShowAllAlerts] = useState(false)
  const [showAllNotices, setShowAllNotices] = useState(false)
  const [unreadCount, setUnreadCount] = useState(3)
  const [currentKPIs, setCurrentKPIs] = useState(kpiData[type])
  const [currentInventoryAlerts, setCurrentInventoryAlerts] = useState(inventoryAlerts[type])
  const [currentHAIHQNotices, setCurrentHAIHQNotices] = useState(haihqNotices[type])
  const [currentQuickLinks, setCurrentQuickLinks] = useState(quickLinks[type])
  const [currentRecentActivities, setCurrentRecentActivities] = useState(recentActivities[type])
  const [currentSalesData, setCurrentSalesData] = useState(salesData[type])

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  // Update data when type changes
  useEffect(() => {
    setCurrentKPIs(kpiData[type])
    setCurrentInventoryAlerts(inventoryAlerts[type])
    setCurrentHAIHQNotices(haihqNotices[type])
    setCurrentQuickLinks(quickLinks[type])
    setCurrentRecentActivities(recentActivities[type])
    setCurrentSalesData(salesData[type])
  }, [type])

  // Handle refresh
  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 1500)
  }

  // Mark notice as read
  const markAsRead = (id) => {
    setCurrentHAIHQNotices(
      currentHAIHQNotices.map((notice) => {
        if (notice.id === id && !notice.isRead) {
          setUnreadCount((prev) => prev - 1)
          return { ...notice, isRead: true }
        }
        return notice
      })
    )
  }

  // Get severity color
  const getSeverityColor = (severity) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "warning":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "info":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  // Get severity icon
  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "critical":
        return <XCircle className="h-4 w-4" />
      case "warning":
        return <AlertTriangle className="h-4 w-4" />
      case "info":
        return <Bell className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  // Calculate sales progress
  const calculateSalesProgress = () => {
    const currentValue = currentSalesData.monthly[currentSalesData.monthly.length - 1].value
    return Math.round((currentValue / currentSalesData.target) * 100)
  }

  // Calculate sales growth
  const calculateSalesGrowth = () => {
    const currentValue = currentSalesData.monthly[currentSalesData.monthly.length - 1].value
    const growth = ((currentValue - currentSalesData.lastMonth) / currentSalesData.lastMonth) * 100
    return growth.toFixed(1)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Success Message Toast */}
      <AnimatePresence>
        {refreshing && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 z-50 bg-blue-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center"
          >
            <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
            <span>Refreshing dashboard data...</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome to your {type.charAt(0).toUpperCase() + type.slice(1)} CRM dashboard</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px] bg-white border border-gray-200">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            disabled={refreshing}
            className="bg-white border border-gray-200"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 h-[200px]">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-lg p-6 animate-pulse flex flex-col justify-between"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
              </div>
              <div className="h-8 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {currentKPIs.map((kpi, index) => (
              <Card key={index} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-sm font-medium text-gray-500">{kpi.title}</CardTitle>
                    <div className="p-2 bg-blue-50 rounded-full">
                      <kpi.icon className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
                  <div
                    className={`text-xs flex items-center mt-1 ${
                      kpi.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {kpi.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {kpi.change} from last month
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Left Column - Sales Performance */}
            <Card className="border border-gray-200 shadow-sm lg:col-span-2">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">Sales Performance</CardTitle>
                    <CardDescription>Monthly revenue overview</CardDescription>
                  </div>
                  <Select defaultValue="revenue">
                    <SelectTrigger className="w-[140px] h-8 text-xs bg-white border border-gray-200">
                      <SelectValue placeholder="Select metric" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="revenue">Revenue</SelectItem>
                      <SelectItem value="orders">Orders</SelectItem>
                      <SelectItem value="customers">Customers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[240px] flex items-end justify-between gap-2 mb-6">
                  {currentSalesData.monthly.map((item, index) => {
                    const percentage = Math.round((item.value / currentSalesData.target) * 100)
                    return (
                      <TooltipProvider key={index}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex flex-col items-center gap-2 w-full">
                              <div className="relative w-full">
                                <div
                                  className="w-full bg-blue-600 rounded-t"
                                  style={{ height: `${Math.max(percentage, 5)}px` }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-500">{item.month}</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="font-medium">{item.month}: ${item.value.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">{percentage}% of target</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )
                  })}
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Progress to monthly target</span>
                    <span className="font-medium">{calculateSalesProgress()}%</span>
                  </div>
                  <Progress value={calculateSalesProgress()} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-600 mr-2"></div>
                      <span className="text-gray-600">Current: ${currentSalesData.monthly[4].value.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-gray-300 mr-2"></div>
                      <span className="text-gray-600">Target: ${currentSalesData.target.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>{calculateSalesGrowth()}% growth from last month</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right Column - HAIHQ Notices */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <CardTitle className="text-lg font-semibold text-gray-900">HAIHQ Notices</CardTitle>
                    {unreadCount > 0 && (
                      <Badge variant="destructive" className="ml-2">
                        {unreadCount} New
                      </Badge>
                    )}
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-gray-500">
                    <Bell className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>High Alert & Important HQ Notices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentHAIHQNotices
                    .slice(0, showAllNotices ? undefined : 3)
                    .map((notice) => (
                      <div
                        key={notice.id}
                        className={`p-3 border rounded-lg ${
                          notice.isRead ? "bg-white" : "bg-blue-50"
                        } transition-colors`}
                        onClick={() => markAsRead(notice.id)}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <div className="flex items-center">
                            <span
                              className={`p-1 rounded-full mr-2 ${
                                notice.severity === "critical"
                                  ? "bg-red-100"
                                  : notice.severity === "warning"
                                  ? "bg-amber-100"
                                  : "bg-blue-100"
                              }`}
                            >
                              {notice.severity === "critical" ? (
                                <AlertTriangle className="h-3 w-3 text-red-600" />
                              ) : notice.severity === "warning" ? (
                                <AlertTriangle className="h-3 w-3 text-amber-600" />
                              ) : (
                                <Megaphone className="h-3 w-3 text-blue-600" />
                              )}
                            </span>
                            <h4 className="font-medium text-gray-900">{notice.title}</h4>
                          </div>
                          {!notice.isRead && <div className="w-2 h-2 rounded-full bg-blue-600"></div>}
                        </div>
                        <p className="text-sm text-gray-600 ml-6">{notice.message}</p>
                        <div className="flex justify-between items-center mt-2 ml-6">
                          <span className="text-xs text-gray-500">{notice.date}</span>
                          {!notice.isRead && (
                            <Button variant="ghost" size="sm" className="h-6 text-xs text-blue-600 hover:text-blue-800">
                              Mark as read
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  {currentHAIHQNotices.length > 3 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-blue-600 hover:text-blue-800"
                      onClick={() => setShowAllNotices(!showAllNotices)}
                    >
                      {showAllNotices ? "Show less" : `Show all (${currentHAIHQNotices.length})`}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Left Column - Inventory Alerts */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-semibold text-gray-900">Inventory Alerts</CardTitle>
                  <Button variant="outline" size="sm" className="h-8 bg-white" onClick={handleRefresh}>
                    <RefreshCw className="h-3 w-3 mr-1" /> Refresh
                  </Button>
                </div>
                <CardDescription>Stock levels requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentInventoryAlerts.slice(0, showAllAlerts ? undefined : 3).map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-3 border ${getSeverityColor(alert.severity)} rounded-lg flex justify-between items-center`}
                    >
                      <div>
                        <div className="flex items-center mb-1">
                          {getSeverityIcon(alert.severity)}
                          <h4 className="font-medium ml-2">{alert.item}</h4>
                        </div>
                        <div className="flex items-center text-xs ml-6">
                          <span className="font-medium">{alert.status}:</span>
                          <span className="ml-1">{alert.level}</span>
                          {alert.threshold && <span className="ml-1">(Threshold: {alert.threshold})</span>}
                          {alert.expiryDate && <span className="ml-1">(Expires: {alert.expiryDate})</span>}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        View
                      </Button>
                    </div>
                  ))}
                  {currentInventoryAlerts.length > 3 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-blue-600 hover:text-blue-800"
                      onClick={() => setShowAllAlerts(!showAllAlerts)}
                    >
                      {showAllAlerts ? "Show less" : `Show all (${currentInventoryAlerts.length})`}
                    </Button>
                  )}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                <span className="text-sm text-gray-600">
                  {currentInventoryAlerts.filter((a) => a.severity === "critical").length} critical alerts
                </span>
                <Button variant="link" size="sm" className="text-blue-600 hover:text-blue-800 p-0">
                  Go to Inventory <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </CardFooter>
            </Card>

            {/* Middle Column - Purchase Workflow */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Purchase Workflow</CardTitle>
                <CardDescription>Current purchase pipeline status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {purchaseStages.map((stage) => (
                    <div key={stage.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="p-1.5 bg-blue-50 rounded-full mr-3">
                          <stage.icon className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{stage.name}</div>
                          <div className="text-xs text-gray-500">{stage.count} items</div>
                        </div>
                      </div>
                      <div className="font-medium text-gray-900">{stage.value}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                <span className="text-sm text-gray-600">Total: $464,200</span>
                <Button variant="link" size="sm" className="text-blue-600 hover:text-blue-800 p-0">
                  Go to Purchases <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </CardFooter>
            </Card>

            {/* Right Column - Quick Links */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Quick Links</CardTitle>
                <CardDescription>Frequently used modules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {currentQuickLinks.map((link, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto py-3 px-4 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 justify-start"
                    >
                      <div className="flex items-center">
                        <div className="p-1.5 bg-blue-50 rounded-full mr-2">
                          <link.icon className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{link.name}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <Card className="border border-gray-200 shadow-sm mb-6">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold text-gray-900">Recent Activities</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search activities..."
                      className="pl-9 pr-4 py-2 h-9 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <Button variant="outline" size="sm" className="h-9 bg-white">
                    <Filter className="h-4 w-4 mr-1" /> Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <th className="px-4 py-3">Action</th>
                      <th className="px-4 py-3">Description</th>
                      <th className="px-4 py-3">User</th>
                      <th className="px-4 py-3">Time</th>
                      <th className="px-4 py-3 text-right">View</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentRecentActivities.map((activity) => (
                      <tr key={activity.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{activity.action}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{activity.description}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{activity.user}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{activity.time}</td>
                        <td className="px-4 py-3 text-right">
                          <Button variant="ghost" size="sm" className="h-8 text-blue-600 hover:text-blue-800">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <span className="text-sm text-gray-600">Showing 5 of 24 activities</span>
              <Button variant="link" size="sm" className="text-blue-600 hover:text-blue-800 p-0">
                View All Activities <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  )
}
