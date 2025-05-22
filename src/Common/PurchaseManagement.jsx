"use client"

import { useState } from "react"
import {
  ShoppingBag,
  DollarSign,
  Package,
  Plus,
  Search,
  Filter,
  Calendar,
  Clipboard,
  Eye,
  Download,
  FileText,
  RefreshCw,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  ChevronDown,
  Save,
  Building,
  Utensils,
} from "lucide-react"

export default function PurchaseManagement() {
  // Core state
  const [activeTab, setActiveTab] = useState("purchase-requests")
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState("")
  const [selectedItem, setSelectedItem] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [industryType, setIndustryType] = useState("all") // "construction", "restaurant", or "all"
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [deleteType, setDeleteType] = useState("")
  const [filterOptions, setFilterOptions] = useState({
    status: "all",
    department: "all",
    dateRange: "all",
    industry: "all",
  })
  const [showFilterMenu, setShowFilterMenu] = useState(false)

  // Form state for CRUD operations
  const [formData, setFormData] = useState({
    // Common fields
    requester: "",
    department: "",
    requestDate: "",
    priority: "normal",
    items: [{ name: "", quantity: 1, estimatedCost: "", justification: "" }],
    notes: "",
    industryType: "construction",
    constructionSite: "",
    restaurantLocation: "",

    // Vendor fields
    vendorName: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    taxNumber: "",
    vendorCategory: "",

    // PO fields
    poVendor: "",
    poDate: "",
    expectedDelivery: "",
    paymentTerms: "Net 30",
    poItems: [{ item: "", quantity: 1, unitPrice: "", taxPercentage: "9" }],
    shippingCost: "0",
    additionalNotes: "",
  })

  // Sample data - reduced for brevity
  const purchaseStats = [
    { title: "Total Purchases", value: "$87,342.50", change: "+8.3%", icon: ShoppingBag },
    { title: "Pending Orders", value: "24", change: "-3.7%", icon: Calendar },
    { title: "Received Items", value: "1,432", change: "+12.2%", icon: Package },
    { title: "Vendor Payments", value: "$45,230.75", change: "+5.1%", icon: DollarSign },
  ]

  // Sample departments
  const departments = ["Operations", "Marketing", "IT", "HR", "Finance", "Sales", "Production"]

  // Construction sites
  const constructionSites = [
    { id: "SITE-001", name: "Downtown Tower Project", location: "123 Main St" },
    { id: "SITE-002", name: "Riverside Apartments", location: "456 River Rd" },
    { id: "SITE-003", name: "Industrial Park Expansion", location: "789 Industry Way" },
  ]

  // Restaurant locations
  const restaurantLocations = [
    { id: "REST-001", name: "Downtown Bistro", location: "123 Main St" },
    { id: "REST-002", name: "Riverside Café", location: "456 River Rd" },
    { id: "REST-003", name: "Northside Grill", location: "789 North Ave" },
  ]

  // Sample purchase orders data
  const [purchaseOrders, setPurchaseOrders] = useState([
    {
      id: "PO-2001",
      vendor: "Global Supplies",
      date: "2025-05-07",
      amount: "$4,250.00",
      status: "Received",
      industryType: "construction",
      constructionSite: "Downtown Tower Project",
      items: [
        { id: 1, name: "Office Desk", quantity: 5, unitPrice: "$350.00", total: "$1,750.00" },
        { id: 2, name: "Office Chair", quantity: 10, unitPrice: "$250.00", total: "$2,500.00" },
      ],
      approvals: [
        { stage: "Department Head", approver: "John Smith", date: "2025-05-01", status: "Approved" },
        { stage: "Finance", approver: "David Wilson", date: "2025-05-02", status: "Approved" },
        { stage: "Procurement", approver: "Emily Davis", date: "2025-05-03", status: "Approved" },
      ],
    },
    {
      id: "PO-2003",
      vendor: "Office Solutions",
      date: "2025-05-05",
      amount: "$1,240.75",
      status: "Pending",
      industryType: "restaurant",
      restaurantLocation: "Downtown Bistro",
      items: [
        { id: 1, name: "Paper (Reams)", quantity: 50, unitPrice: "$4.50", total: "$225.00" },
        { id: 2, name: "Pens (Box)", quantity: 20, unitPrice: "$12.50", total: "$250.00" },
        { id: 3, name: "Notebooks", quantity: 100, unitPrice: "$7.65", total: "$765.75" },
      ],
      approvals: [
        { stage: "Department Head", approver: "Sarah Johnson", date: "2025-05-01", status: "Approved" },
        { stage: "Finance", approver: "David Wilson", date: "2025-05-02", status: "Approved" },
        { stage: "Procurement", approver: "Emily Davis", date: "2025-05-03", status: "Pending" },
      ],
    },
    {
      id: "PO-2006",
      vendor: "Food Suppliers Co",
      date: "2025-05-02",
      amount: "$3,450.00",
      status: "Received",
      industryType: "restaurant",
      restaurantLocation: "Northside Grill",
      items: [
        { id: 1, name: "Fresh Produce", quantity: 100, unitPrice: "$12.50", total: "$1,250.00" },
        { id: 2, name: "Meat Products", quantity: 50, unitPrice: "$35.00", total: "$1,750.00" },
        { id: 3, name: "Dairy Products", quantity: 30, unitPrice: "$15.00", total: "$450.00" },
      ],
      approvals: [
        { stage: "Department Head", approver: "Sarah Johnson", date: "2025-04-28", status: "Approved" },
        { stage: "Finance", approver: "David Wilson", date: "2025-04-29", status: "Approved" },
        { stage: "Procurement", approver: "Emily Davis", date: "2025-04-30", status: "Approved" },
      ],
    },
  ])

  // Sample vendor data
  const [vendors, setVendors] = useState([
    {
      id: "VEN-001",
      name: "Global Supplies",
      purchases: "$12,450.00",
      orders: 8,
      rating: "A",
      industryType: "both", // both, construction, restaurant
      contact: {
        name: "Robert Johnson",
        email: "robert@globalsupplies.com",
        phone: "555-123-4567",
        address: "123 Supply St, Business Park, NY 10001",
      },
    },
    {
      id: "VEN-002",
      name: "Tech Components",
      purchases: "$8,975.50",
      orders: 5,
      rating: "A",
      industryType: "construction",
      contact: {
        name: "Sarah Miller",
        email: "sarah@techcomponents.com",
        phone: "555-234-5678",
        address: "456 Tech Ave, Innovation Park, CA 90210",
      },
    },
    {
      id: "VEN-006",
      name: "Food Suppliers Co",
      purchases: "$15,450.00",
      orders: 12,
      rating: "A",
      industryType: "restaurant",
      contact: {
        name: "Maria Rodriguez",
        email: "maria@foodsuppliers.com",
        phone: "555-678-9012",
        address: "303 Food Ave, Restaurant District, CA 90001",
      },
    },
  ])

  // Sample purchase requests data
  const [purchaseRequests, setPurchaseRequests] = useState([
    {
      id: "PR-1001",
      requester: "John Smith",
      department: "Operations",
      date: "2025-05-07",
      status: "Approved",
      industryType: "construction",
      constructionSite: "Downtown Tower Project",
      items: [
        {
          id: 1,
          name: "Office Desk",
          quantity: 5,
          estimatedCost: "$1,750.00",
          justification: "Expansion of operations team",
        },
        {
          id: 2,
          name: "Office Chair",
          quantity: 10,
          estimatedCost: "$2,500.00",
          justification: "Expansion of operations team",
        },
      ],
      approvals: [
        { stage: "Department Head", approver: "Mark Johnson", date: "2025-05-05", status: "Approved" },
        { stage: "Finance", approver: "David Wilson", date: "2025-05-06", status: "Approved" },
        { stage: "Procurement", approver: "Emily Davis", date: "2025-05-07", status: "Approved" },
      ],
    },
    {
      id: "PR-1002",
      requester: "Sarah Johnson",
      department: "Marketing",
      date: "2025-05-06",
      status: "Pending",
      industryType: "restaurant",
      restaurantLocation: "Downtown Bistro",
      items: [
        {
          id: 1,
          name: "Digital Camera",
          quantity: 1,
          estimatedCost: "$1,200.00",
          justification: "Product photography",
        },
        { id: 2, name: "Tripod", quantity: 1, estimatedCost: "$150.00", justification: "Product photography" },
        { id: 3, name: "Lighting Kit", quantity: 1, estimatedCost: "$350.00", justification: "Product photography" },
      ],
      approvals: [
        { stage: "Department Head", approver: "Jessica Adams", date: "2025-05-06", status: "Approved" },
        { stage: "Finance", approver: "David Wilson", date: "", status: "Pending" },
        { stage: "Procurement", approver: "", date: "", status: "Not Started" },
      ],
    },
    {
      id: "PR-1006",
      requester: "Alex Martinez",
      department: "Kitchen",
      date: "2025-05-02",
      status: "Approved",
      industryType: "restaurant",
      restaurantLocation: "Northside Grill",
      items: [
        {
          id: 1,
          name: "Commercial Mixer",
          quantity: 1,
          estimatedCost: "$2,200.00",
          justification: "Replace broken equipment",
        },
        {
          id: 2,
          name: "Cooking Utensils",
          quantity: 1,
          estimatedCost: "$450.00",
          justification: "Kitchen supplies replenishment",
        },
      ],
      approvals: [
        { stage: "Department Head", approver: "Maria Rodriguez", date: "2025-05-02", status: "Approved" },
        { stage: "Finance", approver: "David Wilson", date: "2025-05-02", status: "Approved" },
        { stage: "Procurement", approver: "Emily Davis", date: "2025-05-02", status: "Approved" },
      ],
    },
  ])

  // Function to handle opening modals
  const openModal = (type, item = null) => {
    setModalType(type)
    setSelectedItem(item)
    setShowModal(true)

    // Reset form data based on modal type
    if (type === "new-request" || type === "edit-request") {
      setFormData({
        ...formData,
        requester: item ? item.requester : "",
        department: item ? item.department : "",
        requestDate: item ? item.date : new Date().toISOString().split("T")[0],
        priority: "normal",
        items: item
          ? item.items.map((i) => ({
              name: i.name,
              quantity: i.quantity,
              estimatedCost: i.estimatedCost?.replace("$", ""),
              justification: i.justification,
            }))
          : [{ name: "", quantity: 1, estimatedCost: "", justification: "" }],
        notes: "",
        industryType: item ? item.industryType : industryType === "all" ? "construction" : industryType,
        constructionSite: item ? item.constructionSite || "" : "",
        restaurantLocation: item ? item.restaurantLocation || "" : "",
      })
    } else if (type === "new-vendor" || type === "edit-vendor") {
      setFormData({
        ...formData,
        vendorName: item ? item.name : "",
        contactPerson: item ? item.contact.name : "",
        email: item ? item.contact.email : "",
        phone: item ? item.contact.phone : "",
        address: item ? item.contact.address : "",
        taxNumber: "",
        vendorCategory: "",
        industryType: item ? item.industryType : "both",
      })
    } else if (type === "new-po" || type === "edit-po") {
      setFormData({
        ...formData,
        poVendor: item ? item.vendor : "",
        poDate: item ? item.date : new Date().toISOString().split("T")[0],
        expectedDelivery: "",
        paymentTerms: "Net 30",
        poItems: item
          ? item.items.map((i) => ({
              item: i.name,
              quantity: i.quantity,
              unitPrice: i.unitPrice?.replace("$", ""),
              taxPercentage: "9",
            }))
          : [{ item: "", quantity: 1, unitPrice: "", taxPercentage: "9" }],
        shippingCost: "0",
        additionalNotes: "",
        industryType: item ? item.industryType : industryType === "all" ? "construction" : industryType,
        constructionSite: item ? item.constructionSite || "" : "",
        restaurantLocation: item ? item.restaurantLocation || "" : "",
      })
    }
  }

  // Function to handle closing modals
  const closeModal = () => {
    setShowModal(false)
    setModalType("")
    setSelectedItem(null)
  }

  // Function to handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  // Function to toggle filter menu
  const toggleFilterMenu = () => {
    setShowFilterMenu(!showFilterMenu)
  }

  // Function to handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilterOptions({
      ...filterOptions,
      [filterType]: value,
    })

    if (filterType === "industry") {
      setIndustryType(value)
    }
  }

  // Function to handle form input changes
  const handleInputChange = (e, index = null, field = null) => {
    const { name, value } = e.target

    if (index !== null && field !== null) {
      // Handle array fields like items
      const updatedItems = [...formData[field]]
      updatedItems[index] = {
        ...updatedItems[index],
        [name]: value,
      }

      setFormData({
        ...formData,
        [field]: updatedItems,
      })
    } else {
      // Handle regular fields
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  // Function to add item row in forms
  const addItemRow = (field) => {
    if (field === "items") {
      setFormData({
        ...formData,
        items: [...formData.items, { name: "", quantity: 1, estimatedCost: "", justification: "" }],
      })
    } else if (field === "poItems") {
      setFormData({
        ...formData,
        poItems: [...formData.poItems, { item: "", quantity: 1, unitPrice: "", taxPercentage: "9" }],
      })
    }
  }

  // Function to remove item row in forms
  const removeItemRow = (index, field) => {
    if (formData[field].length > 1) {
      const updatedItems = [...formData[field]]
      updatedItems.splice(index, 1)
      setFormData({
        ...formData,
        [field]: updatedItems,
      })
    }
  }

  // Function to handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault()

    if (modalType === "new-request" || modalType === "edit-request") {
      // Create or update purchase request
      const newRequest = {
        id: modalType === "new-request" ? `PR-${Math.floor(1000 + Math.random() * 9000)}` : selectedItem.id,
        requester: formData.requester,
        department: formData.department,
        date: formData.requestDate,
        status: modalType === "new-request" ? "Pending" : selectedItem.status,
        industryType: formData.industryType,
        constructionSite: formData.industryType === "construction" ? formData.constructionSite : "",
        restaurantLocation: formData.industryType === "restaurant" ? formData.restaurantLocation : "",
        items: formData.items.map((item, index) => ({
          id: index + 1,
          name: item.name,
          quantity: Number.parseInt(item.quantity),
          estimatedCost: `$${Number.parseFloat(item.estimatedCost).toFixed(2)}`,
          justification: item.justification,
        })),
        approvals:
          modalType === "new-request"
            ? [
                { stage: "Department Head", approver: "", date: "", status: "Pending" },
                { stage: "Finance", approver: "", date: "", status: "Not Started" },
                { stage: "Procurement", approver: "", date: "", status: "Not Started" },
              ]
            : selectedItem.approvals,
      }

      if (modalType === "new-request") {
        setPurchaseRequests([newRequest, ...purchaseRequests])
      } else {
        setPurchaseRequests(purchaseRequests.map((req) => (req.id === selectedItem.id ? newRequest : req)))
      }
    } else if (modalType === "new-vendor" || modalType === "edit-vendor") {
      // Create or update vendor
      const newVendor = {
        id: modalType === "new-vendor" ? `VEN-${Math.floor(1000 + Math.random() * 9000)}` : selectedItem.id,
        name: formData.vendorName,
        purchases: modalType === "new-vendor" ? "$0.00" : selectedItem.purchases,
        orders: modalType === "new-vendor" ? 0 : selectedItem.orders,
        rating: modalType === "new-vendor" ? "C" : selectedItem.rating,
        industryType: formData.industryType,
        contact: {
          name: formData.contactPerson,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        },
      }

      if (modalType === "new-vendor") {
        setVendors([newVendor, ...vendors])
      } else {
        setVendors(vendors.map((vendor) => (vendor.id === selectedItem.id ? newVendor : vendor)))
      }
    } else if (modalType === "new-po" || modalType === "edit-po") {
      // Create or update purchase order
      const totalAmount = formData.poItems.reduce((sum, item) => {
        const itemTotal = Number.parseFloat(item.quantity) * Number.parseFloat(item.unitPrice)
        const tax = itemTotal * (Number.parseFloat(item.taxPercentage) / 100)
        return sum + itemTotal + tax
      }, Number.parseFloat(formData.shippingCost))

      const newPO = {
        id: modalType === "new-po" ? `PO-${Math.floor(2000 + Math.random() * 9000)}` : selectedItem.id,
        vendor: formData.poVendor,
        date: formData.poDate,
        amount: `$${totalAmount.toFixed(2)}`,
        status: modalType === "new-po" ? "Pending" : selectedItem.status,
        industryType: formData.industryType,
        constructionSite: formData.industryType === "construction" ? formData.constructionSite : "",
        restaurantLocation: formData.industryType === "restaurant" ? formData.restaurantLocation : "",
        items: formData.poItems.map((item, index) => {
          const itemTotal = Number.parseFloat(item.quantity) * Number.parseFloat(item.unitPrice)
          return {
            id: index + 1,
            name: item.item,
            quantity: Number.parseInt(item.quantity),
            unitPrice: `$${Number.parseFloat(item.unitPrice).toFixed(2)}`,
            total: `$${itemTotal.toFixed(2)}`,
          }
        }),
        approvals:
          modalType === "new-po"
            ? [
                { stage: "Department Head", approver: "", date: "", status: "Pending" },
                { stage: "Finance", approver: "", date: "", status: "Not Started" },
                { stage: "Procurement", approver: "", date: "", status: "Not Started" },
              ]
            : selectedItem.approvals,
      }

      if (modalType === "new-po") {
        setPurchaseOrders([newPO, ...purchaseOrders])
      } else {
        setPurchaseOrders(purchaseOrders.map((po) => (po.id === selectedItem.id ? newPO : po)))
      }
    }

    closeModal()
  }

  // Function to handle delete confirmation
  const confirmDelete = (item, type) => {
    setItemToDelete(item)
    setDeleteType(type)
    setIsDeleteConfirmOpen(true)
  }

  // Function to handle actual deletion
  const handleDelete = () => {
    if (deleteType === "vendor") {
      setVendors(vendors.filter((vendor) => vendor.id !== itemToDelete.id))
    } else if (deleteType === "request") {
      setPurchaseRequests(purchaseRequests.filter((req) => req.id !== itemToDelete.id))
    } else if (deleteType === "po") {
      setPurchaseOrders(purchaseOrders.filter((po) => po.id !== itemToDelete.id))
    }

    setIsDeleteConfirmOpen(false)
    setItemToDelete(null)
    setDeleteType("")
  }

  // Filter data based on search term and filters
  const filterData = (data, type) => {
    return data.filter((item) => {
      // Filter by search term
      const searchFields =
        type === "vendor"
          ? [item.name, item.contact?.name, item.contact?.email]
          : type === "request"
            ? [item.id, item.requester, item.department]
            : [item.id, item.vendor]

      const matchesSearch =
        searchTerm === "" ||
        searchFields.some((field) => field && field.toLowerCase().includes(searchTerm.toLowerCase()))

      // Filter by status if applicable
      const matchesStatus =
        filterOptions.status === "all" ||
        (item.status && item.status.toLowerCase() === filterOptions.status.toLowerCase())

      // Filter by department if applicable
      const matchesDepartment =
        filterOptions.department === "all" ||
        (item.department && item.department.toLowerCase() === filterOptions.department.toLowerCase())

      // Filter by industry type
      const matchesIndustry =
        industryType === "all" || item.industryType === industryType || item.industryType === "both"

      return matchesSearch && matchesStatus && matchesDepartment && matchesIndustry
    })
  }

  // Filtered data
  const filteredVendors = filterData(vendors, "vendor")
  const filteredRequests = filterData(purchaseRequests, "request")
  const filteredPOs = filterData(purchaseOrders, "po")

  return (
    <div className="p-6 bg-white border-r border-gray-300 backdrop-blur-md text-black min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black">Purchase Management</h1>
          <p className="text-gray-600">Manage vendor orders and procurement</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center mr-4">
            <span className="mr-2">Industry:</span>
            <select
              className="bg-white border border-gray-300 rounded-md p-2 text-black"
              value={industryType}
              onChange={(e) => setIndustryType(e.target.value)}
            >
              <option value="all">All Industries</option>
              <option value="construction">Construction</option>
              <option value="restaurant">Restaurant</option>
            </select>
          </div>
          <button className="px-4 py-2 border border-gray-300 text-black hover:bg-gray-100 rounded-md flex items-center">
            <Download className="h-4 w-4 mr-2" /> Export
          </button>
          <button
            className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-md flex items-center"
            onClick={() => openModal("new-purchase")}
          >
            <Plus className="h-4 w-4 mr-2" /> New Purchase
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {purchaseStats.map((stat, index) => (
          <div key={index} className="bg-white border border-gray-300 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <div className="p-2 bg-gray-200 rounded-full mr-3">
                <stat.icon className="h-5 w-5 text-gray-600" />
              </div>
              <span className="text-black font-medium">{stat.title}</span>
            </div>
            <div className="text-2xl font-bold text-black">{stat.value}</div>
            <div className="flex items-center mt-1">
              <span className={`text-sm ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                {stat.change}
              </span>
              <span className="text-gray-600 text-xs ml-1">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Purchase Process Flow */}
      <div className="mb-8 overflow-x-auto">
        <div className="border border-gray-300 rounded-lg p-4">
          <h3 className="text-center text-black font-medium mb-4">Purchase Process Flow</h3>
          <div className="flex flex-nowrap justify-between">
            {[
              { icon: Clipboard, label: "Purchase Request" },
              { icon: CheckCircle, label: "Request Approval" },
              { icon: ShoppingBag, label: "Purchase Order" },
              { icon: Package, label: "Goods Receipt" },
              { icon: FileText, label: "Purchase Invoice" },
              { icon: DollarSign, label: "Vendor Payment" },
            ].map((step, index, arr) => (
              <>
                <div key={step.label} className="flex flex-col items-center px-2">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                    <step.icon className="h-6 w-6 text-gray-600" />
                  </div>
                  <span className="text-sm text-center">{step.label}</span>
                </div>
                {index < arr.length - 1 && (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="h-0.5 w-full bg-gray-300"></div>
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex overflow-x-auto bg-gray-100 border border-gray-300 rounded-lg p-1">
          {["purchase-requests", "purchase-orders", "goods-receipt", "vendor-invoices", "payments", "vendors"].map(
            (tab) => (
              <button
                key={tab}
                className={`px-4 py-2 whitespace-nowrap rounded-md ${
                  activeTab === tab
                    ? "bg-gray-200 text-black"
                    : "text-black hover:text-black hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
              </button>
            ),
          )}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 text-black"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="relative">
          <button
            className="px-4 py-2 border border-gray-300 text-black hover:bg-gray-100 rounded-md flex items-center"
            onClick={toggleFilterMenu}
          >
            <Filter className="h-4 w-4 mr-2" /> Filter <ChevronDown className="h-4 w-4 ml-2" />
          </button>

          {showFilterMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-md shadow-lg z-10">
              <div className="p-3">
                <h4 className="text-black font-medium mb-2">Filter Options</h4>
                {/* Filter options */}
                <div className="mb-3">
                  <label className="block text-sm text-black mb-1">Status</label>
                  <select
                    className="w-full bg-white border border-gray-300 rounded-md p-2 text-black"
                    value={filterOptions.status}
                    onChange={(e) => handleFilterChange("status", e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="block text-sm text-black mb-1">Department</label>
                  <select
                    className="w-full bg-white border border-gray-300 rounded-md p-2 text-black"
                    value={filterOptions.department}
                    onChange={(e) => handleFilterChange("department", e.target.value)}
                  >
                    <option value="all">All Departments</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept.toLowerCase()}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="block text-sm text-black mb-1">Industry</label>
                  <select
                    className="w-full bg-white border border-gray-300 rounded-md p-2 text-black"
                    value={filterOptions.industry}
                    onChange={(e) => handleFilterChange("industry", e.target.value)}
                  >
                    <option value="all">All Industries</option>
                    <option value="construction">Construction</option>
                    <option value="restaurant">Restaurant</option>
                  </select>
                </div>

                <div className="flex justify-end">
                  <button
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-black rounded-md text-sm"
                    onClick={() => {
                      setFilterOptions({
                        status: "all",
                        department: "all",
                        dateRange: "all",
                        industry: "all",
                      })
                      setShowFilterMenu(false)
                    }}
                  >
                    Reset
                  </button>
                  <button
                    className="px-3 py-1 bg-black hover:bg-gray-800 text-white rounded-md text-sm ml-2"
                    onClick={() => setShowFilterMenu(false)}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <button className="px-4 py-2 border border-gray-300 text-black hover:bg-gray-100 rounded-md flex items-center">
          <RefreshCw className="h-4 w-4 mr-2" /> Refresh
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "purchase-requests" && (
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <div className="bg-gray-100 p-4 border-b border-gray-300 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-black">Purchase Requests</h3>
              <p className="text-sm text-black">Manage and track purchase requisitions</p>
            </div>
            <button
              className="px-3 py-1 bg-black hover:bg-gray-800 text-white rounded-md text-sm flex items-center"
              onClick={() => openModal("new-request")}
            >
              <Plus className="h-4 w-4 mr-1" /> New Request
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left py-3 px-4 font-medium text-black">Request ID</th>
                  <th className="text-left py-3 px-4 font-medium text-black">Requester</th>
                  <th className="text-left py-3 px-4 font-medium text-black">Department</th>
                  <th className="text-left py-3 px-4 font-medium text-black">Industry</th>
                  <th className="text-left py-3 px-4 font-medium text-black">Location</th>
                  <th className="text-left py-3 px-4 font-medium text-black">Status</th>
                  <th className="text-right py-3 px-4 font-medium text-black">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request, index) => (
                  <tr
                    key={request.id}
                    className={`border-b border-gray-300 hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : ""}`}
                  >
                    <td className="py-3 px-4 font-medium">{request.id}</td>
                    <td className="py-3 px-4">{request.requester}</td>
                    <td className="py-3 px-4">{request.department}</td>
                    <td className="py-3 px-4">
                      {request.industryType === "construction" ? (
                        <span className="flex items-center">
                          <Building className="h-4 w-4 mr-1 text-blue-400" /> Construction
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Utensils className="h-4 w-4 mr-1 text-green-400" /> Restaurant
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {request.industryType === "construction" ? request.constructionSite : request.restaurantLocation}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          request.status === "Approved"
                            ? "bg-green-500/20 text-green-400"
                            : request.status === "Rejected"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-black rounded-md text-sm flex items-center"
                          onClick={() => openModal("view-request", request)}
                        >
                          <Eye className="h-4 w-4 mr-1" /> View
                        </button>
                        <button
                          className="px-3 py-1 bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 rounded-md text-sm flex items-center"
                          onClick={() => openModal("edit-request", request)}
                        >
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </button>
                        <button
                          className="px-3 py-1 bg-red-600/20 hover:bg-red-600/40 text-red-300 rounded-md text-sm flex items-center"
                          onClick={() => confirmDelete(request, "request")}
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredRequests.length === 0 && (
                  <tr>
                    <td colSpan="7" className="py-4 text-center text-gray-500">
                      No purchase requests found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "purchase-orders" && (
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <div className="bg-gray-100 p-4 border-b border-gray-300 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-black">Purchase Orders</h3>
              <p className="text-sm text-black">Manage and track vendor orders</p>
            </div>
            <button
              className="px-3 py-1 bg-black hover:bg-gray-800 text-white rounded-md text-sm flex items-center"
              onClick={() => openModal("new-po")}
            >
              <Plus className="h-4 w-4 mr-1" /> New PO
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left py-3 px-4 font-medium text-black">PO Number</th>
                  <th className="text-left py-3 px-4 font-medium text-black">Vendor</th>
                  <th className="text-left py-3 px-4 font-medium text-black">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-black">Industry</th>
                  <th className="text-left py-3 px-4 font-medium text-black">Location</th>
                  <th className="text-left py-3 px-4 font-medium text-black">Status</th>
                  <th className="text-right py-3 px-4 font-medium text-black">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPOs.map((order, index) => (
                  <tr
                    key={order.id}
                    className={`border-b border-gray-300 hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : ""}`}
                  >
                    <td className="py-3 px-4 font-medium">{order.id}</td>
                    <td className="py-3 px-4">{order.vendor}</td>
                    <td className="py-3 px-4 font-medium">{order.amount}</td>
                    <td className="py-3 px-4">
                      {order.industryType === "construction" ? (
                        <span className="flex items-center">
                          <Building className="h-4 w-4 mr-1 text-blue-400" /> Construction
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Utensils className="h-4 w-4 mr-1 text-green-400" /> Restaurant
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {order.industryType === "construction" ? order.constructionSite : order.restaurantLocation}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          order.status === "Received"
                            ? "bg-green-500/20 text-green-400"
                            : order.status === "In Transit"
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-black rounded-md text-sm flex items-center"
                          onClick={() => openModal("view-po", order)}
                        >
                          <Eye className="h-4 w-4 mr-1" /> View
                        </button>
                        <button
                          className="px-3 py-1 bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 rounded-md text-sm flex items-center"
                          onClick={() => openModal("edit-po", order)}
                        >
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </button>
                        <button
                          className="px-3 py-1 bg-red-600/20 hover:bg-red-600/40 text-red-300 rounded-md text-sm flex items-center"
                          onClick={() => confirmDelete(order, "po")}
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredPOs.length === 0 && (
                  <tr>
                    <td colSpan="7" className="py-4 text-center text-gray-500">
                      No purchase orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "vendors" && (
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <div className="bg-gray-100 p-4 border-b border-gray-300 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-black">Vendor Master</h3>
              <p className="text-sm text-black">Manage vendor information and history</p>
            </div>
            <button
              className="px-3 py-1 bg-black hover:bg-gray-800 text-white rounded-md text-sm flex items-center"
              onClick={() => openModal("new-vendor")}
            >
              <Plus className="h-4 w-4 mr-1" /> New Vendor
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left py-3 px-4 font-medium text-black">Vendor Name</th>
                  <th className="text-left py-3 px-4 font-medium text-black">Contact Person</th>
                  <th className="text-left py-3 px-4 font-medium text-black">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-black">Industry</th>
                  <th className="text-left py-3 px-4 font-medium text-black">Total Purchases</th>
                  <th className="text-left py-3 px-4 font-medium text-black">Rating</th>
                  <th className="text-right py-3 px-4 font-medium text-black">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVendors.map((vendor, index) => (
                  <tr
                    key={vendor.id}
                    className={`border-b border-gray-300 hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : ""}`}
                  >
                    <td className="py-3 px-4 font-medium">{vendor.name}</td>
                    <td className="py-3 px-4">{vendor.contact.name}</td>
                    <td className="py-3 px-4">{vendor.contact.email}</td>
                    <td className="py-3 px-4">
                      {vendor.industryType === "both" ? (
                        <span className="flex items-center">
                          <Building className="h-4 w-4 mr-1 text-blue-400" />
                          <Utensils className="h-4 w-4 mr-1 text-green-400" /> Both
                        </span>
                      ) : vendor.industryType === "construction" ? (
                        <span className="flex items-center">
                          <Building className="h-4 w-4 mr-1 text-blue-400" /> Construction
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Utensils className="h-4 w-4 mr-1 text-green-400" /> Restaurant
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">{vendor.purchases}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          vendor.rating === "A"
                            ? "bg-green-500/20 text-green-400"
                            : vendor.rating === "B"
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {vendor.rating}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-black rounded-md text-sm flex items-center"
                          onClick={() => openModal("view-vendor", vendor)}
                        >
                          <Eye className="h-4 w-4 mr-1" /> Details
                        </button>
                        <button
                          className="px-3 py-1 bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 rounded-md text-sm flex items-center"
                          onClick={() => openModal("edit-vendor", vendor)}
                        >
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </button>
                        <button
                          className="px-3 py-1 bg-red-600/20 hover:bg-red-600/40 text-red-300 rounded-md text-sm flex items-center"
                          onClick={() => confirmDelete(vendor, "vendor")}
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredVendors.length === 0 && (
                  <tr>
                    <td colSpan="7" className="py-4 text-center text-gray-500">
                      No vendors found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modals */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-black border border-gray-300 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gray-100 p-4 border-b border-gray-300 flex justify-between items-center">
              <h3 className="text-lg font-medium text-black">
                {modalType === "new-request" && "New Purchase Request"}
                {modalType === "edit-request" && "Edit Purchase Request"}
                {modalType === "view-request" && "Purchase Request Details"}
                {modalType === "new-po" && "New Purchase Order"}
                {modalType === "edit-po" && "Edit Purchase Order"}
                {modalType === "view-po" && "Purchase Order Details"}
                {modalType === "new-vendor" && "New Vendor"}
                {modalType === "edit-vendor" && "Edit Vendor"}
                {modalType === "view-vendor" && "Vendor Details"}
              </h3>
              <button className="text-black hover:text-white" onClick={closeModal}>
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* New/Edit Purchase Request Form */}
              {(modalType === "new-request" || modalType === "edit-request") && (
                <form onSubmit={handleFormSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm text-black mb-1">Requester</label>
                      <input
                        type="text"
                        name="requester"
                        className="w-full bg-white border border-gray-300 rounded-md p-2 text-black"
                        placeholder="Your Name"
                        value={formData.requester}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-black mb-1">Department</label>
                      <select
                        name="department"
                        className="w-full bg-white border border-gray-300 rounded-md p-2 text-black"
                        value={formData.department}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-black mb-1">Industry Type</label>
                      <select
                        name="industryType"
                        className="w-full bg-white border border-gray-300 rounded-md p-2 text-black"
                        value={formData.industryType}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="construction">Construction</option>
                        <option value="restaurant">Restaurant</option>
                      </select>
                    </div>
                    {formData.industryType === "construction" ? (
                      <div>
                        <label className="block text-sm text-black mb-1">Construction Site</label>
                        <select
                          name="constructionSite"
                          className="w-full bg-white border border-gray-300 rounded-md p-2 text-black"
                          value={formData.constructionSite}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select Construction Site</option>
                          {constructionSites.map((site) => (
                            <option key={site.id} value={site.name}>
                              {site.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <div>
                        <label className="block text-sm text-black mb-1">Restaurant Location</label>
                        <select
                          name="restaurantLocation"
                          className="w-full bg-white border border-gray-300 rounded-md p-2 text-black"
                          value={formData.restaurantLocation}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select Restaurant Location</option>
                          {restaurantLocations.map((location) => (
                            <option key={location.id} value={location.name}>
                              {location.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm text-black">Items</label>
                      <button
                        type="button"
                        className="px-2 py-1 bg-black hover:bg-gray-800 text-white rounded-md text-xs flex items-center"
                        onClick={() => addItemRow("items")}
                      >
                        <Plus className="h-3 w-3 mr-1" /> Add Item
                      </button>
                    </div>
                    <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="text-left p-2 text-xs font-medium text-black">Item Name</th>
                          <th className="text-left p-2 text-xs font-medium text-black">Quantity</th>
                          <th className="text-left p-2 text-xs font-medium text-black">Est. Cost</th>
                          <th className="text-left p-2 text-xs font-medium text-black">Justification</th>
                          <th className="w-10 p-2 text-xs font-medium text-black"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.items.map((item, index) => (
                          <tr key={index} className="border-b border-gray-300">
                            <td className="p-2">
                              <input
                                type="text"
                                name="name"
                                className="w-full bg-white border border-gray-300 rounded-md p-1 text-black text-sm"
                                placeholder="Item name"
                                value={item.name}
                                onChange={(e) => handleInputChange(e, index, "items")}
                                required
                              />
                            </td>
                            <td className="p-2">
                              <input
                                type="number"
                                name="quantity"
                                className="w-full bg-white border border-gray-300 rounded-md p-1 text-black text-sm"
                                placeholder="Qty"
                                value={item.quantity}
                                onChange={(e) => handleInputChange(e, index, "items")}
                                min="1"
                                required
                              />
                            </td>
                            <td className="p-2">
                              <input
                                type="text"
                                name="estimatedCost"
                                className="w-full bg-white border border-gray-300 rounded-md p-1 text-black text-sm"
                                placeholder="0.00"
                                value={item.estimatedCost}
                                onChange={(e) => handleInputChange(e, index, "items")}
                                required
                              />
                            </td>
                            <td className="p-2">
                              <input
                                type="text"
                                name="justification"
                                className="w-full bg-white border border-gray-300 rounded-md p-1 text-black text-sm"
                                placeholder="Reason for purchase"
                                value={item.justification}
                                onChange={(e) => handleInputChange(e, index, "items")}
                                required
                              />
                            </td>
                            <td className="p-2">
                              <button
                                type="button"
                                className="text-red-400 hover:text-red-300"
                                onClick={() => removeItemRow(index, "items")}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      className="px-4 py-2 border border-gray-300 text-black hover:bg-gray-100 rounded-md"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-md flex items-center"
                    >
                      <Save className="h-4 w-4 mr-2" />{" "}
                      {modalType === "new-request" ? "Submit Request" : "Update Request"}
                    </button>
                  </div>
                </form>
              )}

              {/* New/Edit Vendor Form */}
              {(modalType === "new-vendor" || modalType === "edit-vendor") && (
                <form onSubmit={handleFormSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm text-black mb-1">Vendor Name</label>
                      <input
                        type="text"
                        name="vendorName"
                        className="w-full bg-white border border-gray-300 rounded-md p-2 text-black"
                        placeholder="Vendor Name"
                        value={formData.vendorName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-black mb-1">Contact Person</label>
                      <input
                        type="text"
                        name="contactPerson"
                        className="w-full bg-white border border-gray-300 rounded-md p-2 text-black"
                        placeholder="Contact Person"
                        value={formData.contactPerson}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-black mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="w-full bg-white border border-gray-300 rounded-md p-2 text-black"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-black mb-1">Phone</label>
                      <input
                        type="text"
                        name="phone"
                        className="w-full bg-white border border-gray-300 rounded-md p-2 text-black"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm text-black mb-1">Address</label>
                      <input
                        type="text"
                        name="address"
                        className="w-full bg-white border border-gray-300 rounded-md p-2 text-black"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-black mb-1">Industry Type</label>
                      <select
                        name="industryType"
                        className="w-full bg-white border border-gray-300 rounded-md p-2 text-black"
                        value={formData.industryType}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="both">Both Industries</option>
                        <option value="construction">Construction Only</option>
                        <option value="restaurant">Restaurant Only</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      className="px-4 py-2 border border-gray-300 text-black hover:bg-gray-100 rounded-md"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-md flex items-center"
                    >
                      <Save className="h-4 w-4 mr-2" /> {modalType === "new-vendor" ? "Add Vendor" : "Update Vendor"}
                    </button>
                  </div>
                </form>
              )}

              {/* View Purchase Request */}
              {modalType === "view-request" && selectedItem && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm text-black mb-1">Request ID</label>
                      <div className="p-2 bg-gray-100 border border-gray-300 rounded-md text-black">
                        {selectedItem.id}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-black mb-1">Status</label>
                      <div className="p-2 bg-gray-100 border border-gray-300 rounded-md">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            selectedItem.status === "Approved"
                              ? "bg-green-500/20 text-green-400"
                              : selectedItem.status === "Rejected"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {selectedItem.status}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-black mb-1">Requester</label>
                      <div className="p-2 bg-gray-100 border border-gray-300 rounded-md text-black">
                        {selectedItem.requester}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-black mb-1">Department</label>
                      <div className="p-2 bg-gray-100 border border-gray-300 rounded-md text-black">
                        {selectedItem.department}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-black mb-1">Industry</label>
                      <div className="p-2 bg-gray-100 border border-gray-300 rounded-md text-black">
                        {selectedItem.industryType === "construction" ? "Construction" : "Restaurant"}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-black mb-1">Location</label>
                      <div className="p-2 bg-gray-100 border border-gray-300 rounded-md text-black">
                        {selectedItem.industryType === "construction"
                          ? selectedItem.constructionSite
                          : selectedItem.restaurantLocation}
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm text-black mb-2">Requested Items</label>
                    <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="text-left p-3 text-sm font-medium text-black">Item Name</th>
                          <th className="text-center p-3 text-sm font-medium text-black">Quantity</th>
                          <th className="text-right p-3 text-sm font-medium text-black">Est. Cost</th>
                          <th className="text-left p-3 text-sm font-medium text-black">Justification</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedItem.items.map((item) => (
                          <tr key={item.id} className="border-b border-gray-300">
                            <td className="p-3 text-black">{item.name}</td>
                            <td className="p-3 text-center text-black">{item.quantity}</td>
                            <td className="p-3 text-right text-black">{item.estimatedCost}</td>
                            <td className="p-3 text-black">{item.justification}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      className="px-4 py-2 border border-gray-300 text-black hover:bg-gray-100 rounded-md"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                    {selectedItem.status === "Approved" && (
                      <button
                        className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-md flex items-center"
                        onClick={() => {
                          closeModal()
                          openModal("create-po", selectedItem)
                        }}
                      >
                        <ShoppingBag className="h-4 w-4 mr-2" /> Create PO
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Delete Confirmation */}
              {isDeleteConfirmOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
                  <div className="bg-black border border-gray-300 rounded-lg p-6 w-full max-w-md">
                    <h3 className="text-lg font-medium text-black mb-4">Confirm Delete</h3>
                    <p className="text-black mb-6">
                      Are you sure you want to delete this {deleteType}? This action cannot be undone.
                    </p>
                    <div className="flex justify-end gap-3">
                      <button
                        className="px-4 py-2 border border-gray-300 text-black hover:bg-gray-100 rounded-md"
                        onClick={() => {
                          setIsDeleteConfirmOpen(false)
                          setItemToDelete(null)
                          setDeleteType("")
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-md flex items-center"
                        onClick={handleDelete}
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
