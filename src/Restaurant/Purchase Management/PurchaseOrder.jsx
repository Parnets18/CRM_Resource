

import { useState } from "react"
import { Search, Check, Plus, FileText, Building2, Filter, MoreHorizontal, Edit, Trash2, Eye, X } from "lucide-react"
import RestoNav from "../RestoNav"

export default function PurchaseOrders() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedBranch, setSelectedBranch] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isGRNDialogOpen, setIsGRNDialogOpen] = useState(false)
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)
  const [selectedPO, setSelectedPO] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [openDropdown, setOpenDropdown] = useState(null)
  const [newPO, setNewPO] = useState({
    supplier: "",
    branch: "",
    orderDate: "",
    deliveryDate: "",
    status: "Pending",
    items: [],
    notes: "",
    paymentTerms: "30",
  })

  // Sample branches data
  const branches = [
    { id: 1, name: "Main Branch", location: "Downtown", manager: "John Doe" },
    { id: 2, name: "North Branch", location: "North City", manager: "Jane Smith" },
    { id: 3, name: "South Branch", location: "South City", manager: "Mike Johnson" },
    { id: 4, name: "East Branch", location: "East Side", manager: "Sarah Williams" },
  ]

  // Sample suppliers data
  const suppliers = [
    { id: 1, name: "Fresh Farms", gstin: "29ABCDE1234F1Z5", contact: "+91 98765 43210", creditPeriod: 30 },
    { id: 2, name: "Dairy Direct", gstin: "29FGHIJ5678K2Z6", contact: "+91 87654 32109", creditPeriod: 15 },
    { id: 3, name: "Grain Co", gstin: "29KLMNO9012L3Z7", contact: "+91 76543 21098", creditPeriod: 45 },
    { id: 4, name: "Spice World", gstin: "29PQRST3456M4Z8", contact: "+91 65432 10987", creditPeriod: 30 },
  ]

  // Sample purchase orders data with enhanced fields
  const [purchaseOrders, setPurchaseOrders] = useState([
    {
      id: "PO-2025-001",
      supplier: "Fresh Farms",
      branch: "Main Branch",
      supplierInfo: suppliers[0],
      orderDate: "2025-05-01",
      deliveryDate: "2025-05-05",
      status: "Pending",
      paymentStatus: "Pending",
      items: [
        { id: 1, name: "Tomatoes", quantity: 50, unit: "kg", rate: 40, amount: 2000 },
        { id: 2, name: "Onions", quantity: 30, unit: "kg", rate: 25, amount: 750 },
      ],
      subtotal: 2750,
      tax: 137.5,
      total: 2887.5,
      notes: "Fresh vegetables for weekend rush",
      grnGenerated: false,
      grnDate: null,
    },
    {
      id: "PO-2025-002",
      supplier: "Dairy Direct",
      branch: "North Branch",
      supplierInfo: suppliers[1],
      orderDate: "2025-05-02",
      deliveryDate: "2025-05-06",
      status: "Delivered",
      paymentStatus: "Paid",
      items: [
        { id: 1, name: "Milk", quantity: 100, unit: "liter", rate: 45, amount: 4500 },
        { id: 2, name: "Cheese", quantity: 5, unit: "kg", rate: 400, amount: 2000 },
      ],
      subtotal: 6500,
      tax: 325,
      total: 6825,
      notes: "Weekly dairy supply",
      grnGenerated: true,
      grnDate: "2025-05-06",
    },
    {
      id: "PO-2025-003",
      supplier: "Grain Co",
      branch: "South Branch",
      supplierInfo: suppliers[2],
      orderDate: "2025-05-03",
      deliveryDate: "2025-05-07",
      status: "In Transit",
      paymentStatus: "Pending",
      items: [
        { id: 1, name: "Rice", quantity: 100, unit: "kg", rate: 60, amount: 6000 },
        { id: 2, name: "Wheat Flour", quantity: 50, unit: "kg", rate: 35, amount: 1750 },
      ],
      subtotal: 7750,
      tax: 387.5,
      total: 8137.5,
      notes: "Monthly grain stock",
      grnGenerated: false,
      grnDate: null,
    },
    {
      id: "PO-2025-004",
      supplier: "Spice World",
      branch: "East Branch",
      supplierInfo: suppliers[3],
      orderDate: "2025-05-04",
      deliveryDate: "2025-05-08",
      status: "Pending",
      paymentStatus: "Pending",
      items: [
        { id: 1, name: "Turmeric", quantity: 10, unit: "kg", rate: 120, amount: 1200 },
        { id: 2, name: "Cumin", quantity: 5, unit: "kg", rate: 180, amount: 900 },
      ],
      subtotal: 2100,
      tax: 105,
      total: 2205,
      notes: "Monthly spice restock",
      grnGenerated: false,
      grnDate: null,
    },
    {
      id: "PO-2025-005",
      supplier: "Fresh Farms",
      branch: "Main Branch",
      supplierInfo: suppliers[0],
      orderDate: "2025-05-05",
      deliveryDate: "2025-05-09",
      status: "Pending",
      paymentStatus: "Pending",
      items: [
        { id: 1, name: "Potatoes", quantity: 100, unit: "kg", rate: 30, amount: 3000 },
        { id: 2, name: "Carrots", quantity: 50, unit: "kg", rate: 40, amount: 2000 },
      ],
      subtotal: 5000,
      tax: 250,
      total: 5250,
      notes: "Root vegetables for next week",
      grnGenerated: false,
      grnDate: null,
    },
  ])

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium"
      case "In Transit":
        return "bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium"
      case "Delivered":
        return "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium"
      case "Cancelled":
        return "bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium"
      default:
        return "bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium"
    }
  }

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium"
      case "Overdue":
        return "bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium"
      default:
        return "bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium"
    }
  }

  const filteredPOs = purchaseOrders.filter((po) => {
    const matchesSearch =
      po.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      po.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || po.status === statusFilter
    const matchesBranch = selectedBranch === "all" || po.branch === selectedBranch
    return matchesSearch && matchesStatus && matchesBranch
  })

  const handleAddPO = () => {
    const newPOData = {
      id: `PO-2025-${String(purchaseOrders.length + 1).padStart(3, "0")}`,
      ...newPO,
      supplierInfo: suppliers.find((s) => s.name === newPO.supplier),
      subtotal: 0,
      tax: 0,
      total: 0,
      items: [],
      paymentStatus: "Pending",
      grnGenerated: false,
      grnDate: null,
    }

    setPurchaseOrders([...purchaseOrders, newPOData])
    setIsAddDialogOpen(false)
    setIsSuccessDialogOpen(true)
    setNewPO({
      supplier: "",
      branch: "",
      orderDate: "",
      deliveryDate: "",
      status: "Pending",
      items: [],
      notes: "",
      paymentTerms: "30",
    })
    setTimeout(() => setIsSuccessDialogOpen(false), 2000)
  }

  const handleEditPO = () => {
    const updatedPOs = purchaseOrders.map((po) => (po.id === selectedPO.id ? { ...po, ...newPO } : po))
    setPurchaseOrders(updatedPOs)
    setIsEditDialogOpen(false)
    setIsSuccessDialogOpen(true)
    setTimeout(() => {
      setIsSuccessDialogOpen(false)
    }, 2000)
  }

  const handleDeletePO = () => {
    const updatedPOs = purchaseOrders.filter((po) => po.id !== selectedPO.id)
    setPurchaseOrders(updatedPOs)
    setIsDeleteDialogOpen(false)
    setIsSuccessDialogOpen(true)
    setSelectedPO(null)
    setTimeout(() => {
      setIsSuccessDialogOpen(false)
    }, 2000)
  }

  const handleGenerateGRN = () => {
    const updatedPOs = purchaseOrders.map((po) =>
      po.id === selectedPO.id
        ? { ...po, grnGenerated: true, grnDate: new Date().toISOString().split("T")[0], status: "Delivered" }
        : po,
    )
    setPurchaseOrders(updatedPOs)
    setSelectedPO({
      ...selectedPO,
      grnGenerated: true,
      grnDate: new Date().toISOString().split("T")[0],
      status: "Delivered",
    })
    setIsGRNDialogOpen(false)
    setIsSuccessDialogOpen(true)
    setTimeout(() => setIsSuccessDialogOpen(false), 2000)
  }

  const Modal = ({ isOpen, onClose, title, children, footer }) => {
    if (!isOpen) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-6">{children}</div>
          {footer && <div className="px-6 py-4 border-t bg-gray-50 flex justify-end gap-3">{footer}</div>}
        </div>
      </div>
    )
  }

  const Dropdown = ({ trigger, children, isOpen, onToggle }) => (
    <div className="relative">
      <button onClick={onToggle} className="p-2 hover:bg-gray-100 rounded-md transition-colors">
        {trigger}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
          <div className="py-1">{children}</div>
        </div>
      )}
    </div>
  )

  const DropdownItem = ({ onClick, children, className = "" }) => (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors ${className}`}
    >
      {children}
    </button>
  )

  return (
    <div className="min-h-screen bg-white">
      <RestoNav />
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-radial from-purple-900/10 via-gray-100 to-white"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-600/10 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-6 py-6 lg:ml-64 mt-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-black">Purchase Orders</h2>
            <p className="text-gray-700">Manage your restaurant's purchase orders</p>
          </div>
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors w-full sm:w-auto"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="w-4 h-4" /> Create PO
          </button>
        </div>

        {/* Branch Selection and Filters */}
        <div className="mb-6 bg-white rounded-lg shadow-sm border border-purple-500/20 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Building2 className="w-4 h-4 mr-2 text-purple-500" />
                Restaurant Branch
              </label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-black focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Branches</option>
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.name}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Filter className="w-4 h-4 mr-2 text-purple-500" />
                Status Filter
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-black focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="In Transit">In Transit</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Search className="w-4 h-4 mr-2 text-purple-500" />
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search by ID or supplier..."
                  className="w-full p-2 pl-8 border border-gray-300 rounded-md bg-gray-100 text-black focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Purchase Orders Table */}
        <div className="bg-white rounded-lg shadow-sm border border-purple-500/20">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-black">Purchase Orders</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    PO ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Supplier
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Branch
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Order Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Delivery Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPOs.length > 0 ? (
                  filteredPOs.map((po) => (
                    <tr key={po.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{po.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{po.supplier}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">
                        {po.branch}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">
                        {po.orderDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">
                        {po.deliveryDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={getStatusColor(po.status)}>{po.status}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        ₹{po.total.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <Dropdown
                          trigger={<MoreHorizontal className="h-4 w-4" />}
                          isOpen={openDropdown === po.id}
                          onToggle={() => setOpenDropdown(openDropdown === po.id ? null : po.id)}
                        >
                          <DropdownItem
                            onClick={() => {
                              setSelectedPO(po)
                              setIsDetailsOpen(true)
                              setOpenDropdown(null)
                            }}
                          >
                            <Eye className="w-4 h-4 inline mr-2" />
                            View Details
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => {
                              setSelectedPO(po)
                              setNewPO(po)
                              setIsEditDialogOpen(true)
                              setOpenDropdown(null)
                            }}
                          >
                            <Edit className="w-4 h-4 inline mr-2" />
                            Edit
                          </DropdownItem>
                          {(po.status === "Pending" || po.status === "In Transit") && !po.grnGenerated && (
                            <DropdownItem
                              onClick={() => {
                                setSelectedPO(po)
                                setIsGRNDialogOpen(true)
                                setOpenDropdown(null)
                              }}
                            >
                              <FileText className="w-4 h-4 inline mr-2" />
                              Generate GRN
                            </DropdownItem>
                          )}
                          <hr className="my-1" />
                          <DropdownItem
                            className="text-red-600 hover:bg-red-50"
                            onClick={() => {
                              setSelectedPO(po)
                              setIsDeleteDialogOpen(true)
                              setOpenDropdown(null)
                            }}
                          >
                            <Trash2 className="w-4 h-4 inline mr-2" />
                            Delete
                          </DropdownItem>
                        </Dropdown>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                      No purchase orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* PO Details Modal */}
      <Modal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        title="Purchase Order Details"
        footer={
          <>
            <button
              onClick={() => setIsDetailsOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            {selectedPO &&
              (selectedPO.status === "Pending" || selectedPO.status === "In Transit") &&
              !selectedPO.grnGenerated && (
                <button
                  onClick={() => {
                    setIsDetailsOpen(false)
                    setIsGRNDialogOpen(true)
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Generate GRN
                </button>
              )}
          </>
        }
      >
        {selectedPO && (
          <div>
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex space-x-8">
                {["overview", "items", "supplier"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                      activeTab === tab
                        ? "border-purple-500 text-purple-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-medium text-black">{selectedPO.id}</h3>
                    <p className="text-gray-600">{selectedPO.supplier}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className={getStatusColor(selectedPO.status)}>{selectedPO.status}</span>
                    <span className={getPaymentStatusColor(selectedPO.paymentStatus)}>{selectedPO.paymentStatus}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Branch</label>
                    <p className="text-gray-900">{selectedPO.branch}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Order Date</label>
                    <p className="text-gray-900">{selectedPO.orderDate}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Delivery Date</label>
                    <p className="text-gray-900">{selectedPO.deliveryDate}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Total Amount</label>
                    <p className="text-xl font-semibold text-green-600">₹{selectedPO.total.toLocaleString()}</p>
                  </div>
                </div>

                {selectedPO.notes && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Notes</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedPO.notes}</p>
                  </div>
                )}

                {selectedPO.grnGenerated && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-green-600 mr-2" />
                      <span className="font-medium text-green-800">GRN Generated</span>
                    </div>
                    <p className="text-green-700 text-sm mt-1">Generated on: {selectedPO.grnDate}</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "items" && (
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rate</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedPO.items.map((item) => (
                        <tr key={item.id}>
                          <td className="px-4 py-3 text-sm text-gray-900">{item.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {item.quantity} {item.unit}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            ₹{item.rate}/{item.unit}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-right">
                            ₹{item.amount.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-gray-50">
                        <td colSpan={3} className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                          Subtotal:
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">
                          ₹{selectedPO.subtotal.toLocaleString()}
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td colSpan={3} className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                          Tax (5%):
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">
                          ₹{selectedPO.tax.toLocaleString()}
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td colSpan={3} className="px-4 py-3 text-sm font-bold text-gray-900 text-right">
                          Total:
                        </td>
                        <td className="px-4 py-3 text-sm font-bold text-gray-900 text-right">
                          ₹{selectedPO.total.toLocaleString()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "supplier" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Supplier Name</label>
                      <p className="font-medium text-gray-900">{selectedPO.supplierInfo.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">GSTIN</label>
                      <p className="text-gray-900">{selectedPO.supplierInfo.gstin}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Contact</label>
                      <p className="text-gray-900">{selectedPO.supplierInfo.contact}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Credit Period</label>
                      <p className="text-gray-900">{selectedPO.supplierInfo.creditPeriod} days</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Add PO Modal */}
      <Modal
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        title="Create New Purchase Order"
        footer={
          <>
            <button
              onClick={() => setIsAddDialogOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddPO}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              Create PO
            </button>
          </>
        }
      >
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Branch *</label>
              <select
                value={newPO.branch}
                onChange={(e) => setNewPO({ ...newPO, branch: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-black focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select branch</option>
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.name}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Supplier *</label>
              <select
                value={newPO.supplier}
                onChange={(e) => setNewPO({ ...newPO, supplier: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-black focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select supplier</option>
                {suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.name}>
                    {supplier.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Order Date *</label>
              <input
                type="date"
                value={newPO.orderDate}
                onChange={(e) => setNewPO({ ...newPO, orderDate: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-black focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Delivery Date *</label>
              <input
                type="date"
                value={newPO.deliveryDate}
                onChange={(e) => setNewPO({ ...newPO, deliveryDate: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-black focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Status</label>
              <select
                value={newPO.status}
                onChange={(e) => setNewPO({ ...newPO, status: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-black focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="Pending">Pending</option>
                <option value="In Transit">In Transit</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Payment Terms (Days)</label>
              <select
                value={newPO.paymentTerms}
                onChange={(e) => setNewPO({ ...newPO, paymentTerms: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-black focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="15">15 Days</option>
                <option value="30">30 Days</option>
                <option value="45">45 Days</option>
                <option value="60">60 Days</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Notes</label>
            <textarea
              value={newPO.notes}
              onChange={(e) => setNewPO({ ...newPO, notes: e.target.value })}
              placeholder="Add any special instructions or notes..."
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-black focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
      </Modal>

      {/* Edit PO Modal */}
      <Modal
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        title="Edit Purchase Order"
        footer={
          <>
            <button
              onClick={() => setIsEditDialogOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleEditPO}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </>
        }
      >
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Branch *</label>
              <select
                value={newPO.branch}
                onChange={(e) => setNewPO({ ...newPO, branch: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-black focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select branch</option>
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.name}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Supplier *</label>
              <select
                value={newPO.supplier}
                onChange={(e) => setNewPO({ ...newPO, supplier: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-black focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select supplier</option>
                {suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.name}>
                    {supplier.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Order Date *</label>
              <input
                type="date"
                value={newPO.orderDate}
                onChange={(e) => setNewPO({ ...newPO, orderDate: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-black focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Delivery Date *</label>
              <input
                type="date"
                value={newPO.deliveryDate}
                onChange={(e) => setNewPO({ ...newPO, deliveryDate: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-black focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Status</label>
              <select
                value={newPO.status}
                onChange={(e) => setNewPO({ ...newPO, status: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-black focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="Pending">Pending</option>
                <option value="In Transit">In Transit</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Payment Status</label>
              <select
                value={newPO.paymentStatus}
                onChange={(e) => setNewPO({ ...newPO, paymentStatus: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-black focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Notes</label>
            <textarea
              value={newPO.notes}
              onChange={(e) => setNewPO({ ...newPO, notes: e.target.value })}
              placeholder="Add any special instructions or notes..."
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-black focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
      </Modal>

      {/* GRN Modal */}
      <Modal
        isOpen={isGRNDialogOpen}
        onClose={() => setIsGRNDialogOpen(false)}
        title="Generate Goods Receipt Note (GRN)"
        footer={
          <>
            <button
              onClick={() => setIsGRNDialogOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleGenerateGRN}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Generate GRN
            </button>
          </>
        }
      >
        <div className="py-4">
          <p className="text-gray-700 mb-4">
            Generate GRN for Purchase Order: <span className="font-medium text-black">{selectedPO?.id}</span>
          </p>
          <p className="text-gray-600 text-sm">
            This will mark all items as received and update the inventory. The PO status will be changed to "Delivered".
          </p>
        </div>
      </Modal>

      {/* Delete PO Modal */}
      <Modal
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        title="Confirm Delete Purchase Order"
        footer={
          <>
            <button
              onClick={() => setIsDeleteDialogOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDeletePO}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Delete PO
            </button>
          </>
        }
      >
        <div className="py-4">
          <p className="text-gray-700">
            Are you sure you want to delete the PO for{" "}
            <span className="font-medium text-black">{selectedPO?.supplier}</span>?
          </p>
          <p className="text-gray-500 text-sm mt-2">This action cannot be undone.</p>
        </div>
      </Modal>

      {/* Success Modal */}
      <Modal
        isOpen={isSuccessDialogOpen}
        onClose={() => setIsSuccessDialogOpen(false)}
        title={
          <div className="flex items-center">
            <Check className="w-5 h-5 text-green-500 mr-2" />
            Operation Successful
          </div>
        }
      >
        <div className="py-4">
          <p className="text-gray-700">Purchase order operation completed successfully.</p>
        </div>
      </Modal>

      {/* Click outside to close dropdown */}
      {openDropdown && <div className="fixed inset-0 z-10" onClick={() => setOpenDropdown(null)} />}
    </div>
  )   
}
