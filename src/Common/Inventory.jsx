import React, { useState, useEffect } from "react"
import { 
  Search, 
  Menu, 
  X, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  Filter, 
  Download, 
  RefreshCw,
  ArrowUpDown,
  ChevronDown,
  BarChart3,
  Package,
  Truck,
  ArrowLeftRight,
  Calendar,
  AlertTriangle,
  DollarSign,
  TrendingUp
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

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

export default function Inventory() {
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
  const [isFilterOpen, setIsFilterOpen] = useState(false)

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

  const handleExportProducts = () => {
    // Create CSV content
    const headers = ["Name", "SKU", "Barcode", "Stock", "Unit", "Warehouse", "Zone", "Category", "Status", "Reorder Level"];
    
    const csvContent = [
      headers.join(","),
      ...products.map(product => [
        product.name,
        product.sku,
        product.barcode,
        product.stock,
        product.unit,
        product.warehouse,
        product.zone,
        product.category,
        product.status,
        product.reorderLevel
      ].join(","))
    ].join("\n");
    
    // Create a blob and download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "inventory_products.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetFilters = () => {
    setFilterCategory("All");
    setFilterWarehouse("All");
    setFilterStatus("All");
    setSearchTerm("");
  };

  const applyFilters = () => {
    // This function can be empty as the filtering is already handled by the filteredProducts variable
    setIsFilterOpen(false);
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* Header with horizontal navigation */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4">
          {/* Top header with logo and user controls */}
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-primary">Inventory & Stock Management</h1>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* User controls - can be expanded */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-8 pr-4 py-1 rounded-md bg-input border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="font-semibold text-primary-foreground">A</span>
              </div>
            </div>
          </div>

          {/* Navigation tabs */}
          <div className="flex space-x-1 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 overflow-auto p-4 md:p-6">
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{products.length}</div>
                    <p className="text-xs text-muted-foreground">
                      {products.filter((p) => p.status === "Active").length} active
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
                    <Badge variant="destructive">{lowStockProducts.length}</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{lowStockProducts.length}</div>
                    <p className="text-xs text-muted-foreground">
                      {Math.round((lowStockProducts.length / products.length) * 100)}% of inventory
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
                    <Badge variant="outline">₹</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹ {calculateTotalInventoryValue().toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      Across {products.reduce((acc, p) => acc + p.stock, 0)} items
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Warehouses</CardTitle>
                    <Badge variant="secondary">{warehouses.length}</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{warehouses.length}</div>
                    <p className="text-xs text-muted-foreground">
                      {warehouses.reduce((acc, w) => acc + w.capacity, 0).toLocaleString()} total capacity
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Dashboard content... */}
          </div>
        )}

        {activeTab === "products" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <h2 className="text-2xl font-bold">Product Inventory</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" onClick={handleExportProducts}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="default" size="sm" onClick={() => setIsAddProductOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </div>
            </div>

            {isFilterOpen && (
              <div className="bg-card border border-border rounded-lg p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    className="w-full p-2 rounded-md border border-input bg-background"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    className="w-full p-2 rounded-md border border-input bg-background"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Warehouse</label>
                  <select
                    className="w-full p-2 rounded-md border border-input bg-background"
                    value={filterWarehouse}
                    onChange={(e) => setFilterWarehouse(e.target.value)}
                  >
                    <option value="">All Warehouses</option>
                    {warehouses.map((warehouse) => (
                      <option key={warehouse.id} value={warehouse.name}>
                        {warehouse.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-3 flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={resetFilters}>
                    Reset
                  </Button>
                  <Button variant="default" size="sm" onClick={applyFilters}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <input
                type="text"
                className="block w-full p-2 pl-10 text-sm border border-input rounded-lg bg-background"
                placeholder="Search products by name, SKU, or serial number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-border">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        SKU/Barcode
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Stock
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Warehouse
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-accent/50">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-2">
                              <div className="text-sm font-medium">{product.name}</div>
                              <div className="text-xs text-muted-foreground">SN: {product.serialNumber}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm">{product.sku}</div>
                          <div className="text-xs text-muted-foreground">{product.barcode}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm">
                            {product.stock} {product.unit}
                          </div>
                          <div className="text-xs text-muted-foreground">Reorder: {product.reorderLevel}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm">{product.warehouse}</div>
                          <div className="text-xs text-muted-foreground">Zone: {product.zone}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm">{product.category}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <Badge
                            variant={
                              product.status === "Active"
                                ? "default"
                                : product.status === "Low Stock"
                                ? "secondary"
                                : "destructive"
                            }
                          >
                            {product.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-amber-500"
                              onClick={() => {
                                setSelectedProduct(product)
                                setIsEditProductOpen(true)
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-500"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
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
                <div className="bg-card border border-border rounded-lg p-6 shadow-lg max-w-2xl w-full">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Add New Product</h3>
                    <Button variant="ghost" size="icon" onClick={() => setIsAddProductOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Product Name</label>
                      <input
                        type="text"
                        className="w-full p-2 rounded-md border border-input bg-background"
                        placeholder="Enter product name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">SKU</label>
                      <input
                        type="text"
                        className="w-full p-2 rounded-md border border-input bg-background"
                        placeholder="Enter SKU"
                        value={newProduct.sku}
                        onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Category</label>
                      <select
                        className="w-full p-2 rounded-md border border-input bg-background"
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Warehouse</label>
                      <select
                        className="w-full p-2 rounded-md border border-input bg-background"
                        value={newProduct.warehouse}
                        onChange={(e) => setNewProduct({ ...newProduct, warehouse: e.target.value })}
                      >
                        <option value="">Select Warehouse</option>
                        {warehouses.map((warehouse) => (
                          <option key={warehouse.id} value={warehouse.name}>
                            {warehouse.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Initial Stock</label>
                      <input
                        type="number"
                        className="w-full p-2 rounded-md border border-input bg-background"
                        placeholder="Enter initial stock"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Reorder Level</label>
                      <input
                        type="number"
                        className="w-full p-2 rounded-md border border-input bg-background"
                        placeholder="Enter reorder level"
                        value={newProduct.reorderLevel}
                        onChange={(e) => setNewProduct({ ...newProduct, reorderLevel: parseInt(e.target.value) })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Unit</label>
                      <input
                        type="text"
                        className="w-full p-2 rounded-md border border-input bg-background"
                        placeholder="e.g. pcs, kg, liters"
                        value={newProduct.unit}
                        onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Zone</label>
                      <input
                        type="text"
                        className="w-full p-2 rounded-md border border-input bg-background"
                        placeholder="e.g. A1, B2, C3"
                        value={newProduct.zone}
                        onChange={(e) => setNewProduct({ ...newProduct, zone: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 mt-6">
                    <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
                      Cancel
                    </Button>
                    <Button variant="default" onClick={handleAddProduct}>
                      Add Product
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Edit Product Dialog */}
            {isEditProductOpen && selectedProduct && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="bg-card border border-border rounded-lg p-6 shadow-lg max-w-2xl w-full">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Edit Product</h3>
                    <Button variant="ghost" size="icon" onClick={() => setIsEditProductOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Product Name</label>
                      <input
                        type="text"
                        className="w-full p-2 rounded-md border border-input bg-background"
                        value={selectedProduct.name}
                        onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">SKU</label>
                      <input
                        type="text"
                        className="w-full p-2 rounded-md border border-input bg-background"
                        value={selectedProduct.sku}
                        onChange={(e) => setSelectedProduct({ ...selectedProduct, sku: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Category</label>
                      <select
                        className="w-full p-2 rounded-md border border-input bg-background"
                        value={selectedProduct.category}
                        onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })}
                      >
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Warehouse</label>
                      <select
                        className="w-full p-2 rounded-md border border-input bg-background"
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
                      <label className="block text-sm font-medium mb-1">Stock</label>
                      <input
                        type="number"
                        className="w-full p-2 rounded-md border border-input bg-background"
                        value={selectedProduct.stock}
                        onChange={(e) => setSelectedProduct({ ...selectedProduct, stock: parseInt(e.target.value) })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Reorder Level</label>
                      <input
                        type="number"
                        className="w-full p-2 rounded-md border border-input bg-background"
                        value={selectedProduct.reorderLevel}
                        onChange={(e) => setSelectedProduct({ ...selectedProduct, reorderLevel: parseInt(e.target.value) })}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 mt-6">
                    <Button variant="outline" onClick={() => setIsEditProductOpen(false)}>
                      Cancel
                    </Button>
                    <Button variant="default" onClick={handleEditProduct}>
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
