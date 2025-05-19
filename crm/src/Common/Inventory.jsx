"use client"

import { useState } from "react"
import {
  Package,
  BarChart3,
  Truck,
  ArrowLeftRight,
  Calendar,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  Plus,
  Search,
  Filter,
  Download,
  Trash2,
  Edit,
  Eye,
  ArrowUpDown,
  Menu,
  X,
  CheckCircle,
  XCircle,
} from "lucide-react"

// Mock data for demonstration
const initialProducts = [
  {
    id: 1,
    name: "Cement",
    sku: "CEM-001",
    barcode: "8901234567890",
    unit: "bags",
    hsn: "2523",
    tax: 18,
    serialNumber: "SN12345",
    stock: 250,
    warehouse: "Main",
    zone: "Construction",
    batchNumber: "B2023-01",
    expiryDate: "2025-12-31",
    reorderLevel: 50,
    valuationMethod: "FIFO",
    status: "Active",
    movement: "High",
    category: "Construction",
    price: 350,
  },
  {
    id: 2,
    name: "Steel Bars",
    sku: "STL-002",
    barcode: "8901234567891",
    unit: "tons",
    hsn: "7214",
    tax: 18,
    serialNumber: "SN12346",
    stock: 42,
    warehouse: "Main",
    zone: "Construction",
    batchNumber: "B2023-02",
    expiryDate: "2025-10-15",
    reorderLevel: 15,
    valuationMethod: "FIFO",
    status: "Active",
    movement: "High",
    category: "Construction",
    price: 55000,
  },
  {
    id: 3,
    name: "Bricks",
    sku: "BRK-003",
    barcode: "8901234567892",
    unit: "pcs",
    hsn: "6904",
    tax: 18,
    serialNumber: "SN12347",
    stock: 7800,
    warehouse: "Main",
    zone: "Construction",
    batchNumber: "B2023-03",
    expiryDate: "2026-05-20",
    reorderLevel: 2000,
    valuationMethod: "FIFO",
    status: "Active",
    movement: "Medium",
    category: "Construction",
    price: 8,
  },
  {
    id: 4,
    name: "Rice",
    sku: "RCE-004",
    barcode: "8901234567893",
    unit: "kg",
    hsn: "1006",
    tax: 5,
    serialNumber: "SN12348",
    stock: 120,
    warehouse: "Restaurant",
    zone: "Food",
    batchNumber: "B2023-04",
    expiryDate: "2025-08-10",
    reorderLevel: 50,
    valuationMethod: "FIFO",
    status: "Active",
    movement: "High",
    category: "Restaurant",
    price: 60,
  },
  {
    id: 5,
    name: "Cooking Oil",
    sku: "OIL-005",
    barcode: "8901234567894",
    unit: "ltr",
    hsn: "1512",
    tax: 5,
    serialNumber: "SN12349",
    stock: 80,
    warehouse: "Restaurant",
    zone: "Food",
    batchNumber: "B2023-05",
    expiryDate: "2026-02-28",
    reorderLevel: 30,
    valuationMethod: "FIFO",
    status: "Active",
    movement: "Medium",
    category: "Restaurant",
    price: 120,
  },
  {
    id: 6,
    name: "Chicken",
    sku: "CHK-006",
    barcode: "8901234567895",
    unit: "kg",
    hsn: "0207",
    tax: 5,
    serialNumber: "SN12350",
    stock: 35,
    warehouse: "Restaurant",
    zone: "Food",
    batchNumber: "B2023-06",
    expiryDate: "2023-06-20",
    reorderLevel: 15,
    valuationMethod: "FIFO",
    status: "Low Stock",
    movement: "High",
    category: "Restaurant",
    price: 180,
  },
  {
    id: 7,
    name: "Paint",
    sku: "PNT-007",
    barcode: "8901234567896",
    unit: "ltr",
    hsn: "3208",
    tax: 18,
    serialNumber: "SN12351",
    stock: 50,
    warehouse: "Main",
    zone: "Construction",
    batchNumber: "B2023-07",
    expiryDate: "2026-03-10",
    reorderLevel: 20,
    valuationMethod: "FIFO",
    status: "Active",
    movement: "Medium",
    category: "Construction",
    price: 250,
  },
  {
    id: 8,
    name: "Vegetables",
    sku: "VEG-008",
    barcode: "8901234567897",
    unit: "kg",
    hsn: "0706",
    tax: 0,
    serialNumber: "SN12352",
    stock: 25,
    warehouse: "Restaurant",
    zone: "Food",
    batchNumber: "B2023-08",
    expiryDate: "2023-05-25",
    reorderLevel: 20,
    valuationMethod: "FIFO",
    status: "Low Stock",
    movement: "High",
    category: "Restaurant",
    price: 40,
  },
]

const initialWarehouses = [
  { id: 1, name: "Main", location: "New Delhi", zones: ["Construction", "Storage", "Equipment"] },
  { id: 2, name: "Restaurant", location: "Mumbai", zones: ["Food", "Beverages", "Utensils"] },
  { id: 3, name: "Warehouse 3", location: "Bangalore", zones: ["Construction", "Food", "Miscellaneous"] },
]

const initialTransfers = [
  {
    id: 1,
    date: "2023-05-15",
    product: "Cement",
    quantity: 50,
    fromWarehouse: "Main",
    toWarehouse: "Warehouse 3",
    status: "Completed",
  },
  {
    id: 2,
    date: "2023-06-20",
    product: "Rice",
    quantity: 100,
    fromWarehouse: "Restaurant",
    toWarehouse: "Main",
    status: "In Transit",
  },
  {
    id: 3,
    date: "2023-07-10",
    product: "Steel Bars",
    quantity: 15,
    fromWarehouse: "Main",
    toWarehouse: "Warehouse 3",
    status: "Completed",
  },
]

const initialStockMovements = [
  { id: 1, date: "2023-05-10", product: "Cement", type: "Purchase", quantity: 100, warehouse: "Main" },
  { id: 2, date: "2023-05-15", product: "Cement", type: "Sale", quantity: -20, warehouse: "Main" },
  { id: 3, date: "2023-06-05", product: "Rice", type: "Purchase", quantity: 200, warehouse: "Restaurant" },
  { id: 4, date: "2023-06-10", product: "Rice", type: "Sale", quantity: -50, warehouse: "Restaurant" },
  { id: 5, date: "2023-06-15", product: "Steel Bars", type: "Purchase", quantity: 30, warehouse: "Main" },
  { id: 6, date: "2023-06-20", product: "Steel Bars", type: "Sale", quantity: -8, warehouse: "Main" },
]

const Inventory = () => {
  const [activeTab, setActiveTab] = useState("products")
  const [products, setProducts] = useState(initialProducts)
  const [warehouses, setWarehouses] = useState(initialWarehouses)
  const [transfers, setTransfers] = useState(initialTransfers)
  const [stockMovements, setStockMovements] = useState(initialStockMovements)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isEditProductOpen, setIsEditProductOpen] = useState(false)
  const [isAddWarehouseOpen, setIsAddWarehouseOpen] = useState(false)
  const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false)
  const [isStockAdjustmentOpen, setIsStockAdjustmentOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedValuationMethod, setSelectedValuationMethod] = useState("FIFO")
  const [filterCategory, setFilterCategory] = useState("All")
  const [filterWarehouse, setFilterWarehouse] = useState("All")
  const [filterStatus, setFilterStatus] = useState("All")

  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "",
    barcode: "",
    unit: "pcs",
    hsn: "",
    tax: 18,
    serialNumber: "",
    stock: 0,
    warehouse: "Main",
    zone: "Construction",
    batchNumber: "",
    expiryDate: "",
    reorderLevel: 10,
    valuationMethod: "FIFO",
    category: "Construction",
    price: 0,
  })

  const [newWarehouse, setNewWarehouse] = useState({
    name: "",
    location: "",
    zones: [""],
  })

  const [newTransfer, setNewTransfer] = useState({
    product: "",
    quantity: 1,
    fromWarehouse: "Main",
    toWarehouse: "Restaurant",
    date: new Date().toISOString().split("T")[0],
  })

  const [stockAdjustment, setStockAdjustment] = useState({
    product: "",
    quantity: 0,
    type: "Addition",
    reason: "",
    warehouse: "Main",
    date: new Date().toISOString().split("T")[0],
  })

  // Filter products based on search term and filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.barcode.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = filterCategory === "All" || product.category === filterCategory
    const matchesWarehouse = filterWarehouse === "All" || product.warehouse === filterWarehouse
    const matchesStatus = filterStatus === "All" || product.status === filterStatus

    return matchesSearch && matchesCategory && matchesWarehouse && matchesStatus
  })

  // Products with low stock (below reorder level)
  const lowStockProducts = products.filter((product) => product.stock <= product.reorderLevel)

  // Products expiring soon (within 30 days)
  const expiringProducts = products.filter((product) => {
    const expiryDate = new Date(product.expiryDate)
    const today = new Date()
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(today.getDate() + 30)

    return expiryDate <= thirtyDaysFromNow && expiryDate >= today
  })

  // Handle adding a new product
  const handleAddProduct = () => {
    const id = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1
    const status = newProduct.stock <= newProduct.reorderLevel ? "Low Stock" : "Active"
    const movement = "Low" // Default for new products

    const productToAdd = {
      ...newProduct,
      id,
      status,
      movement,
    }

    setProducts([...products, productToAdd])
    setIsAddProductOpen(false)
    setNewProduct({
      name: "",
      sku: "",
      barcode: "",
      unit: "pcs",
      hsn: "",
      tax: 18,
      serialNumber: "",
      stock: 0,
      warehouse: "Main",
      zone: "Construction",
      batchNumber: "",
      expiryDate: "",
      reorderLevel: 10,
      valuationMethod: "FIFO",
      category: "Construction",
      price: 0,
    })
  }

  // Handle editing a product
  const handleEditProduct = () => {
    const updatedProducts = products.map((product) => (product.id === selectedProduct.id ? selectedProduct : product))

    setProducts(updatedProducts)
    setIsEditProductOpen(false)
    setSelectedProduct(null)
  }

  // Handle deleting a product
  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((product) => product.id !== id))
    }
  }

  // Handle adding a new warehouse
  const handleAddWarehouse = () => {
    const id = warehouses.length > 0 ? Math.max(...warehouses.map((w) => w.id)) + 1 : 1

    const warehouseToAdd = {
      ...newWarehouse,
      id,
    }

    setWarehouses([...warehouses, warehouseToAdd])
    setIsAddWarehouseOpen(false)
    setNewWarehouse({
      name: "",
      location: "",
      zones: [""],
    })
  }

  // Handle creating a new transfer
  const handleCreateTransfer = () => {
    const id = transfers.length > 0 ? Math.max(...transfers.map((t) => t.id)) + 1 : 1

    const transferToAdd = {
      ...newTransfer,
      id,
      status: "In Transit",
    }

    // Update product stock in source and destination warehouses
    const updatedProducts = products.map((product) => {
      if (product.name === newTransfer.product) {
        if (product.warehouse === newTransfer.fromWarehouse) {
          return { ...product, stock: product.stock - newTransfer.quantity }
        }
        if (product.warehouse === newTransfer.toWarehouse) {
          return { ...product, stock: product.stock + newTransfer.quantity }
        }
      }
      return product
    })

    // Add stock movement records
    const stockOutId = stockMovements.length > 0 ? Math.max(...stockMovements.map((m) => m.id)) + 1 : 1
    const stockInId = stockOutId + 1

    const newStockMovements = [
      ...stockMovements,
      {
        id: stockOutId,
        date: newTransfer.date,
        product: newTransfer.product,
        type: "Transfer Out",
        quantity: -newTransfer.quantity,
        warehouse: newTransfer.fromWarehouse,
      },
      {
        id: stockInId,
        date: newTransfer.date,
        product: newTransfer.product,
        type: "Transfer In",
        quantity: newTransfer.quantity,
        warehouse: newTransfer.toWarehouse,
      },
    ]

    setTransfers([...transfers, transferToAdd])
    setProducts(updatedProducts)
    setStockMovements(newStockMovements)
    setIsTransferDialogOpen(false)
    setNewTransfer({
      product: "",
      quantity: 1,
      fromWarehouse: "Main",
      toWarehouse: "Restaurant",
      date: new Date().toISOString().split("T")[0],
    })
  }

  // Handle stock adjustment
  const handleStockAdjustment = () => {
    const adjustmentQuantity =
      stockAdjustment.type === "Addition" ? stockAdjustment.quantity : -stockAdjustment.quantity

    // Update product stock
    const updatedProducts = products.map((product) => {
      if (product.name === stockAdjustment.product && product.warehouse === stockAdjustment.warehouse) {
        const newStock = product.stock + adjustmentQuantity
        const status = newStock <= product.reorderLevel ? "Low Stock" : "Active"
        return { ...product, stock: newStock, status }
      }
      return product
    })

    // Add stock movement record
    const movementId = stockMovements.length > 0 ? Math.max(...stockMovements.map((m) => m.id)) + 1 : 1

    const newStockMovement = {
      id: movementId,
      date: stockAdjustment.date,
      product: stockAdjustment.product,
      type: stockAdjustment.type === "Addition" ? "Stock Addition" : "Stock Reduction",
      quantity: adjustmentQuantity,
      warehouse: stockAdjustment.warehouse,
      reason: stockAdjustment.reason,
    }

    setProducts(updatedProducts)
    setStockMovements([...stockMovements, newStockMovement])
    setIsStockAdjustmentOpen(false)
    setStockAdjustment({
      product: "",
      quantity: 0,
      type: "Addition",
      reason: "",
      warehouse: "Main",
      date: new Date().toISOString().split("T")[0],
    })
  }

  // Navigation tabs
  const tabs = [
    { id: "products", label: "Product Master", icon: <Package size={18} /> },
    { id: "stock", label: "Stock In/Out", icon: <BarChart3 size={18} /> },
    { id: "warehouses", label: "Warehouses", icon: <Truck size={18} /> },
    { id: "transfers", label: "Transfers", icon: <ArrowLeftRight size={18} /> },
    { id: "batches", label: "Batches & Expiry", icon: <Calendar size={18} /> },
    { id: "reorder", label: "Reorder Levels", icon: <AlertTriangle size={18} /> },
    { id: "valuation", label: "Inventory Valuation", icon: <DollarSign size={18} /> },
    { id: "analysis", label: "Stock Analysis", icon: <TrendingUp size={18} /> },
  ]

  // Calculate total inventory value
  const calculateTotalInventoryValue = () => {
    return products.reduce((total, product) => {
      return total + product.stock * product.price
    }, 0)
  }

  // Add a zone to new warehouse
  const addZoneToNewWarehouse = () => {
    setNewWarehouse({
      ...newWarehouse,
      zones: [...newWarehouse.zones, ""],
    })
  }

  // Update zone in new warehouse
  const updateZoneInNewWarehouse = (index, value) => {
    const updatedZones = [...newWarehouse.zones]
    updatedZones[index] = value
    setNewWarehouse({
      ...newWarehouse,
      zones: updatedZones,
    })
  }

  // Remove zone from new warehouse
  const removeZoneFromNewWarehouse = (index) => {
    if (newWarehouse.zones.length > 1) {
      const updatedZones = newWarehouse.zones.filter((_, i) => i !== index)
      setNewWarehouse({
        ...newWarehouse,
        zones: updatedZones,
      })
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-white">
      {/* Header with horizontal navigation */}
      <header className="bg-gray-900 border-b border-purple-700/30">
        <div className="container mx-auto px-4">
          {/* Top header with logo and user controls */}
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-purple-400">Inventory & Stock Management</h1>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* User controls - can be expanded */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
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
                <span className="mr-2">{tab.icon}</span>
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
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="mt-2 pt-2 border-t border-purple-700/30">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
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
        {/* Product Master */}
        {activeTab === "products" && (
          <div className="animate-fadeIn">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-white">Product Master</h2>
                <p className="text-gray-400 mt-1">Manage your product catalog and inventory</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button
                  className="flex items-center justify-center px-4 py-2 rounded-md bg-purple-700 hover:bg-purple-600 text-white"
                  onClick={() => setIsAddProductOpen(true)}
                >
                  <Plus size={16} className="mr-2" />
                  Add Product
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-gray-900/50 p-4 rounded-lg mb-6 flex flex-wrap gap-4">
              <div>
                <label className="text-sm text-gray-300 block mb-1">Category</label>
                <select
                  className="px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  <option value="Construction">Construction</option>
                  <option value="Restaurant">Restaurant</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 block mb-1">Warehouse</label>
                <select
                  className="px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                  value={filterWarehouse}
                  onChange={(e) => setFilterWarehouse(e.target.value)}
                >
                  <option value="All">All Warehouses</option>
                  {warehouses.map((warehouse) => (
                    <option key={warehouse.id} value={warehouse.name}>
                      {warehouse.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 block mb-1">Status</label>
                <select
                  className="px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Low Stock">Low Stock</option>
                </select>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg overflow-hidden shadow-xl border border-purple-700/20">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-purple-700/30">
                  <thead className="bg-gray-800/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        SKU/Barcode
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Stock
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Warehouse
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Category
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
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-purple-900/10">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-2">
                              <div className="text-sm font-medium text-white">{product.name}</div>
                              <div className="text-xs text-gray-400">SN: {product.serialNumber}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-white">{product.sku}</div>
                          <div className="text-xs text-gray-400">{product.barcode}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-white">
                            {product.stock} {product.unit}
                          </div>
                          <div className="text-xs text-gray-400">Reorder: {product.reorderLevel}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-white">{product.warehouse}</div>
                          <div className="text-xs text-gray-400">Zone: {product.zone}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-white">{product.category}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              product.status === "Active"
                                ? "bg-green-800/30 text-green-300"
                                : product.status === "Low Stock"
                                  ? "bg-yellow-800/30 text-yellow-300"
                                  : "bg-red-800/30 text-red-300"
                            }`}
                          >
                            {product.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                          <div className="flex space-x-2">
                            <button className="text-blue-400 hover:text-blue-300">
                              <Eye size={16} />
                            </button>
                            <button
                              className="text-yellow-400 hover:text-yellow-300"
                              onClick={() => {
                                setSelectedProduct(product)
                                setIsEditProductOpen(true)
                              }}
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              className="text-red-400 hover:text-red-300"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add Product Dialog */}
            {isAddProductOpen && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="bg-gray-900 border border-purple-700/30 rounded-lg p-6 w-full max-w-md max-h-[85vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-purple-300">Add New Product</h3>
                    <button className="text-gray-400 hover:text-white" onClick={() => setIsAddProductOpen(false)}>
                      <X size={20} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="text-sm text-gray-300 block mb-1">
                        Product Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="sku" className="text-sm text-gray-300 block mb-1">
                          SKU
                        </label>
                        <input
                          id="sku"
                          type="text"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={newProduct.sku}
                          onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="barcode" className="text-sm text-gray-300 block mb-1">
                          Barcode
                        </label>
                        <input
                          id="barcode"
                          type="text"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={newProduct.barcode}
                          onChange={(e) => setNewProduct({ ...newProduct, barcode: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="unit" className="text-sm text-gray-300 block mb-1">
                          Unit
                        </label>
                        <select
                          id="unit"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={newProduct.unit}
                          onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                        >
                          <option value="pcs">pcs</option>
                          <option value="kg">kg</option>
                          <option value="ltr">ltr</option>
                          <option value="box">box</option>
                          <option value="bags">bags</option>
                          <option value="tons">tons</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="hsn" className="text-sm text-gray-300 block mb-1">
                          HSN Code
                        </label>
                        <input
                          id="hsn"
                          type="text"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={newProduct.hsn}
                          onChange={(e) => setNewProduct({ ...newProduct, hsn: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="tax" className="text-sm text-gray-300 block mb-1">
                          Tax (%)
                        </label>
                        <input
                          id="tax"
                          type="number"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={newProduct.tax}
                          onChange={(e) => setNewProduct({ ...newProduct, tax: Number(e.target.value) || 0 })}
                        />
                      </div>
                      <div>
                        <label htmlFor="serialNumber" className="text-sm text-gray-300 block mb-1">
                          Serial Number
                        </label>
                        <input
                          id="serialNumber"
                          type="text"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={newProduct.serialNumber}
                          onChange={(e) => setNewProduct({ ...newProduct, serialNumber: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="stock" className="text-sm text-gray-300 block mb-1">
                          Initial Stock
                        </label>
                        <input
                          id="stock"
                          type="number"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={newProduct.stock}
                          onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) || 0 })}
                        />
                      </div>
                      <div>
                        <label htmlFor="reorderLevel" className="text-sm text-gray-300 block mb-1">
                          Reorder Level
                        </label>
                        <input
                          id="reorderLevel"
                          type="number"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={newProduct.reorderLevel}
                          onChange={(e) => setNewProduct({ ...newProduct, reorderLevel: Number(e.target.value) || 0 })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="warehouse" className="text-sm text-gray-300 block mb-1">
                          Warehouse
                        </label>
                        <select
                          id="warehouse"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={newProduct.warehouse}
                          onChange={(e) => setNewProduct({ ...newProduct, warehouse: e.target.value })}
                        >
                          {warehouses.map((warehouse) => (
                            <option key={warehouse.id} value={warehouse.name}>
                              {warehouse.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="zone" className="text-sm text-gray-300 block mb-1">
                          Zone
                        </label>
                        <select
                          id="zone"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={newProduct.zone}
                          onChange={(e) => setNewProduct({ ...newProduct, zone: e.target.value })}
                        >
                          {warehouses
                            .find((w) => w.name === newProduct.warehouse)
                            ?.zones.map((zone, index) => (
                              <option key={index} value={zone}>
                                {zone}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="batchNumber" className="text-sm text-gray-300 block mb-1">
                          Batch Number
                        </label>
                        <input
                          id="batchNumber"
                          type="text"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={newProduct.batchNumber}
                          onChange={(e) => setNewProduct({ ...newProduct, batchNumber: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="expiryDate" className="text-sm text-gray-300 block mb-1">
                          Expiry Date
                        </label>
                        <input
                          id="expiryDate"
                          type="date"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={newProduct.expiryDate}
                          onChange={(e) => setNewProduct({ ...newProduct, expiryDate: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="valuationMethod" className="text-sm text-gray-300 block mb-1">
                          Valuation Method
                        </label>
                        <select
                          id="valuationMethod"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={newProduct.valuationMethod}
                          onChange={(e) => setNewProduct({ ...newProduct, valuationMethod: e.target.value })}
                        >
                          <option value="FIFO">FIFO</option>
                          <option value="LIFO">LIFO</option>
                          <option value="Weighted Average">Weighted Average</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="category" className="text-sm text-gray-300 block mb-1">
                          Category
                        </label>
                        <select
                          id="category"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={newProduct.category}
                          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        >
                          <option value="Construction">Construction</option>
                          <option value="Restaurant">Restaurant</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="price" className="text-sm text-gray-300 block mb-1">
                        Unit Price
                      </label>
                      <input
                        id="price"
                        type="number"
                        className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) || 0 })}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 mt-6">
                    <button
                      className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white"
                      onClick={() => setIsAddProductOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 rounded-md bg-purple-700 hover:bg-purple-600 text-white"
                      onClick={handleAddProduct}
                    >
                      Add Product
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Edit Product Dialog */}
            {isEditProductOpen && selectedProduct && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="bg-gray-900 border border-purple-700/30 rounded-lg p-6 w-full max-w-md max-h-[85vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-purple-300">Edit Product</h3>
                    <button
                      className="text-gray-400 hover:text-white"
                      onClick={() => {
                        setIsEditProductOpen(false)
                        setSelectedProduct(null)
                      }}
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="edit-name" className="text-sm text-gray-300 block mb-1">
                        Product Name
                      </label>
                      <input
                        id="edit-name"
                        type="text"
                        className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                        value={selectedProduct.name}
                        onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="edit-sku" className="text-sm text-gray-300 block mb-1">
                          SKU
                        </label>
                        <input
                          id="edit-sku"
                          type="text"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={selectedProduct.sku}
                          onChange={(e) => setSelectedProduct({ ...selectedProduct, sku: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="edit-barcode" className="text-sm text-gray-300 block mb-1">
                          Barcode
                        </label>
                        <input
                          id="edit-barcode"
                          type="text"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={selectedProduct.barcode}
                          onChange={(e) => setSelectedProduct({ ...selectedProduct, barcode: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="edit-stock" className="text-sm text-gray-300 block mb-1">
                          Stock
                        </label>
                        <input
                          id="edit-stock"
                          type="number"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={selectedProduct.stock}
                          onChange={(e) => {
                            const newStock = Number(e.target.value) || 0
                            const status = newStock <= selectedProduct.reorderLevel ? "Low Stock" : "Active"
                            setSelectedProduct({
                              ...selectedProduct,
                              stock: newStock,
                              status,
                            })
                          }}
                        />
                      </div>
                      <div>
                        <label htmlFor="edit-reorderLevel" className="text-sm text-gray-300 block mb-1">
                          Reorder Level
                        </label>
                        <input
                          id="edit-reorderLevel"
                          type="number"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={selectedProduct.reorderLevel}
                          onChange={(e) => {
                            const newReorderLevel = Number(e.target.value) || 0
                            const status = selectedProduct.stock <= newReorderLevel ? "Low Stock" : "Active"
                            setSelectedProduct({
                              ...selectedProduct,
                              reorderLevel: newReorderLevel,
                              status,
                            })
                          }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="edit-warehouse" className="text-sm text-gray-300 block mb-1">
                          Warehouse
                        </label>
                        <select
                          id="edit-warehouse"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={selectedProduct.warehouse}
                          onChange={(e) => setSelectedProduct({ ...selectedProduct, warehouse: e.target.value })}
                        >
                          {warehouses.map((warehouse) => (
                            <option key={warehouse.id} value={warehouse.name}>
                              {warehouse.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="edit-zone" className="text-sm text-gray-300 block mb-1">
                          Zone
                        </label>
                        <select
                          id="edit-zone"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={selectedProduct.zone}
                          onChange={(e) => setSelectedProduct({ ...selectedProduct, zone: e.target.value })}
                        >
                          {warehouses
                            .find((w) => w.name === selectedProduct.warehouse)
                            ?.zones.map((zone, index) => (
                              <option key={index} value={zone}>
                                {zone}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="edit-batchNumber" className="text-sm text-gray-300 block mb-1">
                          Batch Number
                        </label>
                        <input
                          id="edit-batchNumber"
                          type="text"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={selectedProduct.batchNumber}
                          onChange={(e) => setSelectedProduct({ ...selectedProduct, batchNumber: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="edit-expiryDate" className="text-sm text-gray-300 block mb-1">
                          Expiry Date
                        </label>
                        <input
                          id="edit-expiryDate"
                          type="date"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={selectedProduct.expiryDate}
                          onChange={(e) => setSelectedProduct({ ...selectedProduct, expiryDate: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="edit-price" className="text-sm text-gray-300 block mb-1">
                        Unit Price
                      </label>
                      <input
                        id="edit-price"
                        type="number"
                        className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                        value={selectedProduct.price}
                        onChange={(e) => setSelectedProduct({ ...selectedProduct, price: Number(e.target.value) || 0 })}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 mt-6">
                    <button
                      className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white"
                      onClick={() => {
                        setIsEditProductOpen(false)
                        setSelectedProduct(null)
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 rounded-md bg-purple-700 hover:bg-purple-600 text-white"
                      onClick={handleEditProduct}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Stock In/Out */}
        {activeTab === "stock" && (
          <div className="animate-fadeIn">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-white">Stock Movements</h2>
                <p className="text-gray-400 mt-1">Track stock movements from purchases, sales, and adjustments</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button
                  className="flex items-center justify-center px-4 py-2 rounded-md bg-green-700 hover:bg-green-600 text-white"
                  onClick={() => {
                    setStockAdjustment({
                      ...stockAdjustment,
                      type: "Addition",
                    })
                    setIsStockAdjustmentOpen(true)
                  }}
                >
                  <Plus size={16} className="mr-2" />
                  Stock In
                </button>
                <button
                  className="flex items-center justify-center px-4 py-2 rounded-md bg-red-700 hover:bg-red-600 text-white"
                  onClick={() => {
                    setStockAdjustment({
                      ...stockAdjustment,
                      type: "Reduction",
                    })
                    setIsStockAdjustmentOpen(true)
                  }}
                >
                  <ArrowUpDown size={16} className="mr-2" />
                  Stock Out
                </button>
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
                        Product
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Warehouse
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Reason
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-700/20">
                    {stockMovements.map((movement) => (
                      <tr key={movement.id} className="hover:bg-purple-900/10">
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-white">{movement.date}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-white">{movement.product}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              movement.type === "Purchase" ||
                              movement.type === "Stock Addition" ||
                              movement.type === "Transfer In"
                                ? "bg-green-800/30 text-green-300"
                                : movement.type === "Sale" ||
                                    movement.type === "Stock Reduction" ||
                                    movement.type === "Transfer Out"
                                  ? "bg-red-800/30 text-red-300"
                                  : "bg-blue-800/30 text-blue-300"
                            }`}
                          >
                            {movement.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-white">{movement.quantity}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-white">{movement.warehouse}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-white">{movement.reason || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Stock Adjustment Dialog */}
            {isStockAdjustmentOpen && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="bg-gray-900 border border-purple-700/30 rounded-lg p-6 w-full max-w-md">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-purple-300">
                      {stockAdjustment.type === "Addition" ? "Stock Addition" : "Stock Reduction"}
                    </h3>
                    <button className="text-gray-400 hover:text-white" onClick={() => setIsStockAdjustmentOpen(false)}>
                      <X size={20} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="adjustment-product" className="text-sm text-gray-300 block mb-1">
                        Product
                      </label>
                      <select
                        id="adjustment-product"
                        className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                        value={stockAdjustment.product}
                        onChange={(e) => setStockAdjustment({ ...stockAdjustment, product: e.target.value })}
                      >
                        <option value="">Select a product</option>
                        {products.map((product) => (
                          <option key={product.id} value={product.name}>
                            {product.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="adjustment-quantity" className="text-sm text-gray-300 block mb-1">
                        Quantity
                      </label>
                      <input
                        id="adjustment-quantity"
                        type="number"
                        className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                        value={stockAdjustment.quantity}
                        onChange={(e) =>
                          setStockAdjustment({ ...stockAdjustment, quantity: Number(e.target.value) || 0 })
                        }
                        min="0"
                      />
                    </div>

                    <div>
                      <label htmlFor="adjustment-warehouse" className="text-sm text-gray-300 block mb-1">
                        Warehouse
                      </label>
                      <select
                        id="adjustment-warehouse"
                        className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                        value={stockAdjustment.warehouse}
                        onChange={(e) => setStockAdjustment({ ...stockAdjustment, warehouse: e.target.value })}
                      >
                        {warehouses.map((warehouse) => (
                          <option key={warehouse.id} value={warehouse.name}>
                            {warehouse.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="adjustment-reason" className="text-sm text-gray-300 block mb-1">
                        Reason
                      </label>
                      <textarea
                        id="adjustment-reason"
                        className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                        value={stockAdjustment.reason}
                        onChange={(e) => setStockAdjustment({ ...stockAdjustment, reason: e.target.value })}
                        rows="3"
                      ></textarea>
                    </div>

                    <div>
                      <label htmlFor="adjustment-date" className="text-sm text-gray-300 block mb-1">
                        Date
                      </label>
                      <input
                        id="adjustment-date"
                        type="date"
                        className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                        value={stockAdjustment.date}
                        onChange={(e) => setStockAdjustment({ ...stockAdjustment, date: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 mt-6">
                    <button
                      className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white"
                      onClick={() => setIsStockAdjustmentOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className={`px-4 py-2 rounded-md ${
                        stockAdjustment.type === "Addition"
                          ? "bg-green-700 hover:bg-green-600"
                          : "bg-red-700 hover:bg-red-600"
                      } text-white`}
                      onClick={handleStockAdjustment}
                    >
                      {stockAdjustment.type === "Addition" ? "Add Stock" : "Reduce Stock"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Warehouses */}
        {activeTab === "warehouses" && (
          <div className="animate-fadeIn">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-white">Warehouses & Zones</h2>
                <p className="text-gray-400 mt-1">Manage warehouse locations and storage zones</p>
              </div>
              <button
                className="flex items-center justify-center px-4 py-2 rounded-md bg-purple-700 hover:bg-purple-600 text-white"
                onClick={() => setIsAddWarehouseOpen(true)}
              >
                <Plus size={16} className="mr-2" />
                Add Warehouse
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {warehouses.map((warehouse) => (
                <div key={warehouse.id} className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-4 shadow-lg">
                  <div className="flex justify-between items-start">
                    <h3 className="text-md font-semibold text-white">{warehouse.name}</h3>
                    <div className="flex space-x-1">
                      <button className="text-yellow-400 hover:text-yellow-300">
                        <Edit size={14} />
                      </button>
                      <button className="text-red-400 hover:text-red-300">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{warehouse.location}</p>

                  <div className="mt-3">
                    <h4 className="text-xs font-medium text-gray-300 uppercase tracking-wider mb-2">Zones</h4>
                    <div className="flex flex-wrap gap-2">
                      {warehouse.zones.map((zone, index) => (
                        <span key={index} className="px-2 py-1 text-xs rounded-md bg-purple-800/30 text-purple-300">
                          {zone}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3">
                    <h4 className="text-xs font-medium text-gray-300 uppercase tracking-wider mb-2">Inventory</h4>
                    <div className="text-sm text-white">
                      {products.filter((p) => p.warehouse === warehouse.name).length} Products
                    </div>
                    <div className="text-xs text-gray-400">
                      {products.filter((p) => p.warehouse === warehouse.name && p.status === "Low Stock").length} Low
                      Stock Items
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Warehouse Dialog */}
            {isAddWarehouseOpen && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="bg-gray-900 border border-purple-700/30 rounded-lg p-6 w-full max-w-md">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-purple-300">Add New Warehouse</h3>
                    <button className="text-gray-400 hover:text-white" onClick={() => setIsAddWarehouseOpen(false)}>
                      <X size={20} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="warehouse-name" className="text-sm text-gray-300 block mb-1">
                        Warehouse Name
                      </label>
                      <input
                        id="warehouse-name"
                        type="text"
                        className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                        value={newWarehouse.name}
                        onChange={(e) => setNewWarehouse({ ...newWarehouse, name: e.target.value })}
                      />
                    </div>

                    <div>
                      <label htmlFor="warehouse-location" className="text-sm text-gray-300 block mb-1">
                        Location
                      </label>
                      <input
                        id="warehouse-location"
                        type="text"
                        className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                        value={newWarehouse.location}
                        onChange={(e) => setNewWarehouse({ ...newWarehouse, location: e.target.value })}
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-sm text-gray-300">Zones</label>
                        <button
                          className="text-xs text-purple-400 hover:text-purple-300"
                          onClick={addZoneToNewWarehouse}
                        >
                          + Add Zone
                        </button>
                      </div>

                      {newWarehouse.zones.map((zone, index) => (
                        <div key={index} className="flex items-center gap-2 mb-2">
                          <input
                            type="text"
                            className="flex-1 px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                            value={zone}
                            onChange={(e) => updateZoneInNewWarehouse(index, e.target.value)}
                            placeholder="Zone name"
                          />
                          {newWarehouse.zones.length > 1 && (
                            <button
                              className="text-red-400 hover:text-red-300"
                              onClick={() => removeZoneFromNewWarehouse(index)}
                            >
                              <X size={16} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 mt-6">
                    <button
                      className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white"
                      onClick={() => setIsAddWarehouseOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 rounded-md bg-purple-700 hover:bg-purple-600 text-white"
                      onClick={handleAddWarehouse}
                    >
                      Add Warehouse
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Transfers */}
        {activeTab === "transfers" && (
          <div className="animate-fadeIn">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-white">Stock Transfers</h2>
                <p className="text-gray-400 mt-1">Manage inter-location stock movements</p>
              </div>
              <button
                className="flex items-center justify-center px-4 py-2 rounded-md bg-purple-700 hover:bg-purple-600 text-white"
                onClick={() => setIsTransferDialogOpen(true)}
              >
                <Plus size={16} className="mr-2" />
                New Transfer
              </button>
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
                        Product
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        From
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        To
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
                    {transfers.map((transfer) => (
                      <tr key={transfer.id} className="hover:bg-purple-900/10">
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-white">{transfer.date}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-white">{transfer.product}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-white">{transfer.quantity}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-white">{transfer.fromWarehouse}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-white">{transfer.toWarehouse}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              transfer.status === "Completed"
                                ? "bg-green-800/30 text-green-300"
                                : transfer.status === "In Transit"
                                  ? "bg-yellow-800/30 text-yellow-300"
                                  : "bg-red-800/30 text-red-300"
                            }`}
                          >
                            {transfer.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                          <div className="flex space-x-2">
                            {transfer.status === "In Transit" && (
                              <button
                                className="text-green-400 hover:text-green-300"
                                onClick={() => {
                                  const updatedTransfers = transfers.map((t) =>
                                    t.id === transfer.id ? { ...t, status: "Completed" } : t,
                                  )
                                  setTransfers(updatedTransfers)
                                }}
                              >
                                <CheckCircle size={16} />
                              </button>
                            )}
                            <button className="text-red-400 hover:text-red-300">
                              <XCircle size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Transfer Dialog */}
            {isTransferDialogOpen && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="bg-gray-900 border border-purple-700/30 rounded-lg p-6 w-full max-w-md">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-purple-300">Create Stock Transfer</h3>
                    <button className="text-gray-400 hover:text-white" onClick={() => setIsTransferDialogOpen(false)}>
                      <X size={20} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="transfer-product" className="text-sm text-gray-300 block mb-1">
                        Product
                      </label>
                      <select
                        id="transfer-product"
                        className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                        value={newTransfer.product}
                        onChange={(e) => setNewTransfer({ ...newTransfer, product: e.target.value })}
                      >
                        <option value="">Select a product</option>
                        {products.map((product) => (
                          <option key={product.id} value={product.name}>
                            {product.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="transfer-quantity" className="text-sm text-gray-300 block mb-1">
                        Quantity
                      </label>
                      <input
                        id="transfer-quantity"
                        type="number"
                        className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                        value={newTransfer.quantity}
                        onChange={(e) => setNewTransfer({ ...newTransfer, quantity: Number(e.target.value) || 1 })}
                        min="1"
                      />
                    </div>

                    <div>
                      <label htmlFor="transfer-from" className="text-sm text-gray-300 block mb-1">
                        From Warehouse
                      </label>
                      <select
                        id="transfer-from"
                        className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                        value={newTransfer.fromWarehouse}
                        onChange={(e) => setNewTransfer({ ...newTransfer, fromWarehouse: e.target.value })}
                      >
                        {warehouses.map((warehouse) => (
                          <option key={warehouse.id} value={warehouse.name}>
                            {warehouse.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="transfer-to" className="text-sm text-gray-300 block mb-1">
                        To Warehouse
                      </label>
                      <select
                        id="transfer-to"
                        className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                        value={newTransfer.toWarehouse}
                        onChange={(e) => setNewTransfer({ ...newTransfer, toWarehouse: e.target.value })}
                      >
                        {warehouses
                          .filter((w) => w.name !== newTransfer.fromWarehouse)
                          .map((warehouse) => (
                            <option key={warehouse.id} value={warehouse.name}>
                              {warehouse.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="transfer-date" className="text-sm text-gray-300 block mb-1">
                        Transfer Date
                      </label>
                      <input
                        id="transfer-date"
                        type="date"
                        className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                        value={newTransfer.date}
                        onChange={(e) => setNewTransfer({ ...newTransfer, date: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 mt-6">
                    <button
                      className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white"
                      onClick={() => setIsTransferDialogOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 rounded-md bg-purple-700 hover:bg-purple-600 text-white"
                      onClick={handleCreateTransfer}
                    >
                      Create Transfer
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Batches & Expiry */}
        {activeTab === "batches" && (
          <div className="animate-fadeIn">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-white">Batches & Expiry Dates</h2>
                <p className="text-gray-400 mt-1">Monitor batch numbers and expiry dates</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button className="flex items-center justify-center px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white">
                  <Filter size={16} className="mr-2" />
                  Filter
                </button>
                <button className="flex items-center justify-center px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white">
                  <Download size={16} className="mr-2" />
                  Export
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-4 shadow-lg">
                <h3 className="text-md font-semibold text-white mb-2">Expiring Soon</h3>
                <div className="text-3xl font-bold text-yellow-400">{expiringProducts.length}</div>
                <p className="text-sm text-gray-400 mt-1">Products expiring in 30 days</p>
              </div>

              <div className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-4 shadow-lg">
                <h3 className="text-md font-semibold text-white mb-2">Expired Products</h3>
                <div className="text-3xl font-bold text-red-400">
                  {products.filter((p) => new Date(p.expiryDate) < new Date()).length}
                </div>
                <p className="text-sm text-gray-400 mt-1">Products past expiry date</p>
              </div>

              <div className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-4 shadow-lg">
                <h3 className="text-md font-semibold text-white mb-2">Total Batches</h3>
                <div className="text-3xl font-bold text-purple-400">
                  {new Set(products.map((p) => p.batchNumber).filter(Boolean)).size}
                </div>
                <p className="text-sm text-gray-400 mt-1">Active batch numbers</p>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg overflow-hidden shadow-xl border border-purple-700/20">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-purple-700/30">
                  <thead className="bg-gray-800/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Batch Number
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Expiry Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Stock
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Warehouse
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-700/20">
                    {products
                      .filter((p) => p.batchNumber && p.expiryDate)
                      .sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate))
                      .map((product) => {
                        const today = new Date()
                        const expiryDate = new Date(product.expiryDate)
                        const thirtyDaysFromNow = new Date()
                        thirtyDaysFromNow.setDate(today.getDate() + 30)

                        let status = "Valid"
                        if (expiryDate < today) {
                          status = "Expired"
                        } else if (expiryDate <= thirtyDaysFromNow) {
                          status = "Expiring Soon"
                        }

                        return (
                          <tr key={product.id} className="hover:bg-purple-900/10">
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-white">{product.name}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-white">{product.batchNumber}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-white">{product.expiryDate}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                              {product.stock} {product.unit}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-white">{product.warehouse}</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  status === "Valid"
                                    ? "bg-green-800/30 text-green-300"
                                    : status === "Expiring Soon"
                                      ? "bg-yellow-800/30 text-yellow-300"
                                      : "bg-red-800/30 text-red-300"
                                }`}
                              >
                                {status}
                              </span>
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Reorder Levels */}
        {activeTab === "reorder" && (
          <div className="animate-fadeIn">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-white">Reorder Levels</h2>
                <p className="text-gray-400 mt-1">Set alerts for low stock levels</p>
              </div>
              <button className="flex items-center justify-center px-4 py-2 rounded-md bg-purple-700 hover:bg-purple-600 text-white">
                <Plus size={16} className="mr-2" />
                Purchase Order
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-4 shadow-lg">
                <h3 className="text-md font-semibold text-white mb-2">Low Stock Items</h3>
                <div className="text-3xl font-bold text-yellow-400">{lowStockProducts.length}</div>
                <p className="text-sm text-gray-400 mt-1">Items below reorder level</p>
              </div>

              <div className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-4 shadow-lg">
                <h3 className="text-md font-semibold text-white mb-2">Critical Items</h3>
                <div className="text-3xl font-bold text-red-400">
                  {products.filter((p) => p.stock <= p.reorderLevel * 0.5).length}
                </div>
                <p className="text-sm text-gray-400 mt-1">Items at critical level</p>
              </div>

              <div className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-4 shadow-lg">
                <h3 className="text-md font-semibold text-white mb-2">Pending Orders</h3>
                <div className="text-3xl font-bold text-purple-400">0</div>
                <p className="text-sm text-gray-400 mt-1">Purchase orders in progress</p>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg overflow-hidden shadow-xl border border-purple-700/20">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-purple-700/30">
                  <thead className="bg-gray-800/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Current Stock
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Reorder Level
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Warehouse
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
                    {lowStockProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-purple-900/10">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-2">
                              <div className="text-sm font-medium text-white">{product.name}</div>
                              <div className="text-xs text-gray-400">SKU: {product.sku}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                          {product.stock} {product.unit}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                          {product.reorderLevel} {product.unit}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-white">{product.warehouse}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              product.stock <= product.reorderLevel * 0.5
                                ? "bg-red-800/30 text-red-300"
                                : "bg-yellow-800/30 text-yellow-300"
                            }`}
                          >
                            {product.stock <= product.reorderLevel * 0.5 ? "Critical" : "Low Stock"}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <button className="px-2 py-1 text-xs rounded-md bg-purple-700 hover:bg-purple-600 text-white">
                            Reorder
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Inventory Valuation */}
        {activeTab === "valuation" && (
          <div className="animate-fadeIn">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-white">Inventory Valuation</h2>
                <p className="text-gray-400 mt-1">Support FIFO, LIFO, and Weighted Average methods</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <select
                  className="px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                  value={selectedValuationMethod}
                  onChange={(e) => setSelectedValuationMethod(e.target.value)}
                >
                  <option value="FIFO">FIFO</option>
                  <option value="LIFO">LIFO</option>
                  <option value="Weighted Average">Weighted Average</option>
                </select>
                <button className="flex items-center justify-center px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white">
                  <Download size={16} className="mr-2" />
                  Export
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-4 shadow-lg">
                <h3 className="text-md font-semibold text-white mb-2">Total Inventory Value</h3>
                <div className="text-3xl font-bold text-purple-400">
                  ₹ {calculateTotalInventoryValue().toLocaleString()}
                </div>
                <p className="text-sm text-gray-400 mt-1">Based on {selectedValuationMethod} method</p>
              </div>

              <div className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-4 shadow-lg">
                <h3 className="text-md font-semibold text-white mb-2">Total Items</h3>
                <div className="text-3xl font-bold text-blue-400">{products.reduce((sum, p) => sum + p.stock, 0)}</div>
                <p className="text-sm text-gray-400 mt-1">Across all warehouses</p>
              </div>

              <div className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-4 shadow-lg">
                <h3 className="text-md font-semibold text-white mb-2">Average Item Value</h3>
                <div className="text-3xl font-bold text-green-400">
                  ₹{" "}
                  {Math.round(
                    calculateTotalInventoryValue() / products.reduce((sum, p) => sum + p.stock, 0),
                  ).toLocaleString()}
                </div>
                <p className="text-sm text-gray-400 mt-1">Per unit average</p>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg overflow-hidden shadow-xl border border-purple-700/20">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-purple-700/30">
                  <thead className="bg-gray-800/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Unit Cost
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Total Value
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Method
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Warehouse
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-700/20">
                    {products.map((product) => {
                      const totalValue = product.price * product.stock

                      return (
                        <tr key={product.id} className="hover:bg-purple-900/10">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-2">
                                <div className="text-sm font-medium text-white">{product.name}</div>
                                <div className="text-xs text-gray-400">SKU: {product.sku}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                            {product.stock} {product.unit}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                            ₹ {product.price.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                            ₹ {totalValue.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-white">{product.valuationMethod}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-white">{product.warehouse}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Stock Analysis */}
        {activeTab === "analysis" && (
          <div className="animate-fadeIn">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-white">Stock Analysis</h2>
                <p className="text-gray-400 mt-1">Identify dead stock and fast-moving items</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button className="flex items-center justify-center px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white">
                  <Filter size={16} className="mr-2" />
                  Filter
                </button>
                <button className="flex items-center justify-center px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white">
                  <Download size={16} className="mr-2" />
                  Export
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-4 shadow-lg">
                <h3 className="text-md font-semibold text-white mb-2">Fast Moving Items</h3>
                <div className="text-3xl font-bold text-green-400">
                  {products.filter((p) => p.movement === "High").length}
                </div>
                <p className="text-sm text-gray-400 mt-1">High turnover products</p>
              </div>

              <div className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-4 shadow-lg">
                <h3 className="text-md font-semibold text-white mb-2">Medium Moving Items</h3>
                <div className="text-3xl font-bold text-yellow-400">
                  {products.filter((p) => p.movement === "Medium").length}
                </div>
                <p className="text-sm text-gray-400 mt-1">Average turnover products</p>
              </div>

              <div className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-4 shadow-lg">
                <h3 className="text-md font-semibold text-white mb-2">Slow/Dead Stock</h3>
                <div className="text-3xl font-bold text-red-400">
                  {products.filter((p) => p.movement === "Low").length}
                </div>
                <p className="text-sm text-gray-400 mt-1">Low turnover products</p>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg overflow-hidden shadow-xl border border-purple-700/20">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-purple-700/30">
                  <thead className="bg-gray-800/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Current Stock
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Avg. Monthly Sales
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Days in Stock
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Movement
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Category
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-700/20">
                    {products.map((product) => {
                      const avgMonthlySales =
                        product.movement === "High"
                          ? Math.floor(Math.random() * 20) + 20
                          : product.movement === "Medium"
                            ? Math.floor(Math.random() * 10) + 5
                            : Math.floor(Math.random() * 3) + 1

                      const daysInStock = avgMonthlySales > 0 ? Math.floor((product.stock / avgMonthlySales) * 30) : 0

                      return (
                        <tr key={product.id} className="hover:bg-purple-900/10">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-2">
                                <div className="text-sm font-medium text-white">{product.name}</div>
                                <div className="text-xs text-gray-400">SKU: {product.sku}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                            {product.stock} {product.unit}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                            {avgMonthlySales} {product.unit}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-white">{daysInStock}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                product.movement === "High"
                                  ? "bg-green-800/30 text-green-300"
                                  : product.movement === "Medium"
                                    ? "bg-yellow-800/30 text-yellow-300"
                                    : "bg-red-800/30 text-red-300"
                              }`}
                            >
                              {product.movement}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-white">{product.category}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Inventory
