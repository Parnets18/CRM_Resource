

import { useState } from "react"
import {
  BarChart3,
  Package,
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
  ChevronDown,
  ArrowUpDown,
  Menu,
  X,
} from "lucide-react"
import * as Dialog from "@radix-ui/react-dialog"
import * as Select from "@radix-ui/react-select"
import { Label } from "@radix-ui/react-label"
import { motion } from "framer-motion"

// Mock data for demonstration
const mockProducts = [
  {
    id: 1,
    name: "Laptop",
    sku: "LPT-001",
    barcode: "8901234567890",
    unit: "pcs",
    hsn: "8471",
    tax: 18,
    serialNumber: "SN12345",
    stock: 25,
    warehouse: "Main",
    zone: "Electronics",
    batchNumber: "B2023-01",
    expiryDate: "2025-12-31",
    reorderLevel: 10,
    valuationMethod: "FIFO",
    status: "Active",
    movement: "High",
  },
  {
    id: 2,
    name: "Smartphone",
    sku: "SPH-002",
    barcode: "8901234567891",
    unit: "pcs",
    hsn: "8517",
    tax: 18,
    serialNumber: "SN12346",
    stock: 42,
    warehouse: "Main",
    zone: "Electronics",
    batchNumber: "B2023-02",
    expiryDate: "2025-10-15",
    reorderLevel: 15,
    valuationMethod: "FIFO",
    status: "Active",
    movement: "High",
  },
  {
    id: 3,
    name: "Headphones",
    sku: "HPH-003",
    barcode: "8901234567892",
    unit: "pcs",
    hsn: "8518",
    tax: 18,
    serialNumber: "SN12347",
    stock: 78,
    warehouse: "Main",
    zone: "Electronics",
    batchNumber: "B2023-03",
    expiryDate: "2026-05-20",
    reorderLevel: 20,
    valuationMethod: "FIFO",
    status: "Active",
    movement: "Medium",
  },
  {
    id: 4,
    name: "Printer",
    sku: "PRT-004",
    barcode: "8901234567893",
    unit: "pcs",
    hsn: "8443",
    tax: 18,
    serialNumber: "SN12348",
    stock: 12,
    warehouse: "Secondary",
    zone: "Office",
    batchNumber: "B2023-04",
    expiryDate: "2025-08-10",
    reorderLevel: 5,
    valuationMethod: "LIFO",
    status: "Active",
    movement: "Low",
  },
  {
    id: 5,
    name: "Monitor",
    sku: "MNT-005",
    barcode: "8901234567894",
    unit: "pcs",
    hsn: "8528",
    tax: 18,
    serialNumber: "SN12349",
    stock: 8,
    warehouse: "Main",
    zone: "Electronics",
    batchNumber: "B2023-05",
    expiryDate: "2026-02-28",
    reorderLevel: 10,
    valuationMethod: "FIFO",
    status: "Low Stock",
    movement: "Medium",
  },
  {
    id: 6,
    name: "Keyboard",
    sku: "KBD-006",
    barcode: "8901234567895",
    unit: "pcs",
    hsn: "8471",
    tax: 18,
    serialNumber: "SN12350",
    stock: 35,
    warehouse: "Main",
    zone: "Electronics",
    batchNumber: "B2023-06",
    expiryDate: "2026-04-15",
    reorderLevel: 15,
    valuationMethod: "Weighted Average",
    status: "Active",
    movement: "Medium",
  },
  {
    id: 7,
    name: "Mouse",
    sku: "MOU-007",
    barcode: "8901234567896",
    unit: "pcs",
    hsn: "8471",
    tax: 18,
    serialNumber: "SN12351",
    stock: 50,
    warehouse: "Main",
    zone: "Electronics",
    batchNumber: "B2023-07",
    expiryDate: "2026-03-10",
    reorderLevel: 20,
    valuationMethod: "FIFO",
    status: "Active",
    movement: "High",
  },
  {
    id: 8,
    name: "Tablet",
    sku: "TBL-008",
    barcode: "8901234567897",
    unit: "pcs",
    hsn: "8471",
    tax: 18,
    serialNumber: "SN12352",
    stock: 3,
    warehouse: "Secondary",
    zone: "Electronics",
    batchNumber: "B2023-08",
    expiryDate: "2025-11-20",
    reorderLevel: 5,
    valuationMethod: "LIFO",
    status: "Low Stock",
    movement: "Low",
  },
]

const mockWarehouses = [
  { id: 1, name: "Main", location: "New Delhi", zones: ["Electronics", "Accessories", "Storage"] },
  { id: 2, name: "Secondary", location: "Mumbai", zones: ["Office", "Electronics", "Peripherals"] },
  { id: 3, name: "Warehouse 3", location: "Bangalore", zones: ["Components", "Accessories"] },
]

const mockTransfers = [
  {
    id: 1,
    date: "2023-05-15",
    product: "Laptop",
    quantity: 5,
    fromWarehouse: "Main",
    toWarehouse: "Secondary",
    status: "Completed",
  },
  {
    id: 2,
    date: "2023-06-20",
    product: "Smartphone",
    quantity: 10,
    fromWarehouse: "Secondary",
    toWarehouse: "Main",
    status: "In Transit",
  },
  {
    id: 3,
    date: "2023-07-10",
    product: "Headphones",
    quantity: 15,
    fromWarehouse: "Main",
    toWarehouse: "Warehouse 3",
    status: "Completed",
  },
]

const mockStockMovements = [
  { id: 1, date: "2023-05-10", product: "Laptop", type: "Purchase", quantity: 10, warehouse: "Main" },
  { id: 2, date: "2023-05-15", product: "Laptop", type: "Sale", quantity: -2, warehouse: "Main" },
  { id: 3, date: "2023-06-05", product: "Smartphone", type: "Purchase", quantity: 20, warehouse: "Main" },
  { id: 4, date: "2023-06-10", product: "Smartphone", type: "Sale", quantity: -5, warehouse: "Main" },
  { id: 5, date: "2023-06-15", product: "Headphones", type: "Purchase", quantity: 30, warehouse: "Main" },
  { id: 6, date: "2023-06-20", product: "Headphones", type: "Sale", quantity: -8, warehouse: "Main" },
]

const InventoryManagement = () => {
  const [activeTab, setActiveTab] = useState("products")
  const [products, setProducts] = useState(mockProducts)
  const [warehouses, setWarehouses] = useState(mockWarehouses)
  const [transfers, setTransfers] = useState(mockTransfers)
  const [stockMovements, setStockMovements] = useState(mockStockMovements)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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
    zone: "Electronics",
    batchNumber: "",
    expiryDate: "",
    reorderLevel: 10,
    valuationMethod: "FIFO",
  })
  const [selectedValuationMethod, setSelectedValuationMethod] = useState("FIFO")
  const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false)
  const [newTransfer, setNewTransfer] = useState({
    product: "",
    quantity: 1,
    fromWarehouse: "Main",
    toWarehouse: "Secondary",
    date: new Date().toISOString().split("T")[0],
  })

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.barcode.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Products with low stock (below reorder level)
  const lowStockProducts = products.filter((product) => product.stock <= product.reorderLevel)

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
      zone: "Electronics",
      batchNumber: "",
      expiryDate: "",
      reorderLevel: 10,
      valuationMethod: "FIFO",
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

    setTransfers([...transfers, transferToAdd])
    setIsTransferDialogOpen(false)
    setNewTransfer({
      product: "",
      quantity: 1,
      fromWarehouse: "Main",
      toWarehouse: "Secondary",
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
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
                            <button className="text-yellow-400 hover:text-yellow-300">
                              <Edit size={16} />
                            </button>
                            <button className="text-red-400 hover:text-red-300">
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
            <Dialog.Root open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
                <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 border border-purple-700/30 rounded-lg p-6 w-full max-w-md max-h-[85vh] overflow-y-auto">
                  <Dialog.Title className="text-lg font-semibold text-purple-300 mb-4">Add New Product</Dialog.Title>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-sm text-gray-300 block mb-1">
                        Product Name
                      </Label>
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
                        <Label htmlFor="sku" className="text-sm text-gray-300 block mb-1">
                          SKU
                        </Label>
                        <input
                          id="sku"
                          type="text"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={newProduct.sku}
                          onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="barcode" className="text-sm text-gray-300 block mb-1">
                          Barcode
                        </Label>
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
                        <Label htmlFor="unit" className="text-sm text-gray-300 block mb-1">
                          Unit
                        </Label>
                        <Select.Root
                          value={newProduct.unit}
                          onValueChange={(value) => setNewProduct({ ...newProduct, unit: value })}
                        >
                          <Select.Trigger className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 flex justify-between items-center">
                            <Select.Value />
                            <Select.Icon>
                              <ChevronDown size={16} />
                            </Select.Icon>
                          </Select.Trigger>
                          <Select.Portal>
                            <Select.Content className="bg-gray-800 border border-purple-700/30 rounded-md overflow-hidden">
                              <Select.Viewport>
                                <Select.Item
                                  value="pcs"
                                  className="px-3 py-2 text-white hover:bg-purple-700/30 cursor-pointer outline-none"
                                >
                                  <Select.ItemText>pcs</Select.ItemText>
                                </Select.Item>
                                <Select.Item
                                  value="kg"
                                  className="px-3 py-2 text-white hover:bg-purple-700/30 cursor-pointer outline-none"
                                >
                                  <Select.ItemText>kg</Select.ItemText>
                                </Select.Item>
                                <Select.Item
                                  value="ltr"
                                  className="px-3 py-2 text-white hover:bg-purple-700/30 cursor-pointer outline-none"
                                >
                                  <Select.ItemText>ltr</Select.ItemText>
                                </Select.Item>
                                <Select.Item
                                  value="box"
                                  className="px-3 py-2 text-white hover:bg-purple-700/30 cursor-pointer outline-none"
                                >
                                  <Select.ItemText>box</Select.ItemText>
                                </Select.Item>
                              </Select.Viewport>
                            </Select.Content>
                          </Select.Portal>
                        </Select.Root>
                      </div>
                      <div>
                        <Label htmlFor="hsn" className="text-sm text-gray-300 block mb-1">
                          HSN Code
                        </Label>
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
                        <Label htmlFor="tax" className="text-sm text-gray-300 block mb-1">
                          Tax (%)
                        </Label>
                        <input
                          id="tax"
                          type="number"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={newProduct.tax}
                          onChange={(e) => setNewProduct({ ...newProduct, tax: Number.parseInt(e.target.value) || 0 })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="serialNumber" className="text-sm text-gray-300 block mb-1">
                          Serial Number
                        </Label>
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
                        <Label htmlFor="stock" className="text-sm text-gray-300 block mb-1">
                          Initial Stock
                        </Label>
                        <input
                          id="stock"
                          type="number"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={newProduct.stock}
                          onChange={(e) =>
                            setNewProduct({ ...newProduct, stock: Number.parseInt(e.target.value) || 0 })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="reorderLevel" className="text-sm text-gray-300 block mb-1">
                          Reorder Level
                        </Label>
                        <input
                          id="reorderLevel"
                          type="number"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={newProduct.reorderLevel}
                          onChange={(e) =>
                            setNewProduct({ ...newProduct, reorderLevel: Number.parseInt(e.target.value) || 0 })
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="warehouse" className="text-sm text-gray-300 block mb-1">
                          Warehouse
                        </Label>
                        <Select.Root
                          value={newProduct.warehouse}
                          onValueChange={(value) => setNewProduct({ ...newProduct, warehouse: value })}
                        >
                          <Select.Trigger className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 flex justify-between items-center">
                            <Select.Value />
                            <Select.Icon>
                              <ChevronDown size={16} />
                            </Select.Icon>
                          </Select.Trigger>
                          <Select.Portal>
                            <Select.Content className="bg-gray-800 border border-purple-700/30 rounded-md overflow-hidden">
                              <Select.Viewport>
                                {warehouses.map((warehouse) => (
                                  <Select.Item
                                    key={warehouse.id}
                                    value={warehouse.name}
                                    className="px-3 py-2 text-white hover:bg-purple-700/30 cursor-pointer outline-none"
                                  >
                                    <Select.ItemText>{warehouse.name}</Select.ItemText>
                                  </Select.Item>
                                ))}
                              </Select.Viewport>
                            </Select.Content>
                          </Select.Portal>
                        </Select.Root>
                      </div>
                      <div>
                        <Label htmlFor="zone" className="text-sm text-gray-300 block mb-1">
                          Zone
                        </Label>
                        <Select.Root
                          value={newProduct.zone}
                          onValueChange={(value) => setNewProduct({ ...newProduct, zone: value })}
                        >
                          <Select.Trigger className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 flex justify-between items-center">
                            <Select.Value />
                            <Select.Icon>
                              <ChevronDown size={16} />
                            </Select.Icon>
                          </Select.Trigger>
                          <Select.Portal>
                            <Select.Content className="bg-gray-800 border border-purple-700/30 rounded-md overflow-hidden">
                              <Select.Viewport>
                                {warehouses
                                  .find((w) => w.name === newProduct.warehouse)
                                  ?.zones.map((zone, index) => (
                                    <Select.Item
                                      key={index}
                                      value={zone}
                                      className="px-3 py-2 text-white hover:bg-purple-700/30 cursor-pointer outline-none"
                                    >
                                      <Select.ItemText>{zone}</Select.ItemText>
                                    </Select.Item>
                                  ))}
                              </Select.Viewport>
                            </Select.Content>
                          </Select.Portal>
                        </Select.Root>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="batchNumber" className="text-sm text-gray-300 block mb-1">
                          Batch Number
                        </Label>
                        <input
                          id="batchNumber"
                          type="text"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={newProduct.batchNumber}
                          onChange={(e) => setNewProduct({ ...newProduct, batchNumber: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="expiryDate" className="text-sm text-gray-300 block mb-1">
                          Expiry Date
                        </Label>
                        <input
                          id="expiryDate"
                          type="date"
                          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={newProduct.expiryDate}
                          onChange={(e) => setNewProduct({ ...newProduct, expiryDate: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="valuationMethod" className="text-sm text-gray-300 block mb-1">
                        Valuation Method
                      </Label>
                      <Select.Root
                        value={newProduct.valuationMethod}
                        onValueChange={(value) => setNewProduct({ ...newProduct, valuationMethod: value })}
                      >
                        <Select.Trigger className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 flex justify-between items-center">
                          <Select.Value />
                          <Select.Icon>
                            <ChevronDown size={16} />
                          </Select.Icon>
                        </Select.Trigger>
                        <Select.Portal>
                          <Select.Content className="bg-gray-800 border border-purple-700/30 rounded-md overflow-hidden">
                            <Select.Viewport>
                              <Select.Item
                                value="FIFO"
                                className="px-3 py-2 text-white hover:bg-purple-700/30 cursor-pointer outline-none"
                              >
                                <Select.ItemText>FIFO</Select.ItemText>
                              </Select.Item>
                              <Select.Item
                                value="LIFO"
                                className="px-3 py-2 text-white hover:bg-purple-700/30 cursor-pointer outline-none"
                              >
                                <Select.ItemText>LIFO</Select.ItemText>
                              </Select.Item>
                              <Select.Item
                                value="Weighted Average"
                                className="px-3 py-2 text-white hover:bg-purple-700/30 cursor-pointer outline-none"
                              >
                                <Select.ItemText>Weighted Average</Select.ItemText>
                              </Select.Item>
                            </Select.Viewport>
                          </Select.Content>
                        </Select.Portal>
                      </Select.Root>
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
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </motion.div>
        )}

        {/* Stock In/Out */}
        {activeTab === "stock" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-white">Stock Movements</h2>
                <p className="text-gray-400 mt-1">Track stock movements from purchases, sales, and adjustments</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button className="flex items-center justify-center px-4 py-2 rounded-md bg-green-700 hover:bg-green-600 text-white">
                  <Plus size={16} className="mr-2" />
                  Stock In
                </button>
                <button className="flex items-center justify-center px-4 py-2 rounded-md bg-red-700 hover:bg-red-600 text-white">
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
                              movement.type === "Purchase"
                                ? "bg-green-800/30 text-green-300"
                                : movement.type === "Sale"
                                  ? "bg-red-800/30 text-red-300"
                                  : "bg-blue-800/30 text-blue-300"
                            }`}
                          >
                            {movement.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-white">{movement.quantity}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-white">{movement.warehouse}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Warehouses */}
        {activeTab === "warehouses" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-white">Warehouses & Zones</h2>
                <p className="text-gray-400 mt-1">Manage warehouse locations and storage zones</p>
              </div>
              <button className="flex items-center justify-center px-4 py-2 rounded-md bg-purple-700 hover:bg-purple-600 text-white">
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
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Transfers */}
        {activeTab === "transfers" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Transfer Dialog */}
            <Dialog.Root open={isTransferDialogOpen} onOpenChange={setIsTransferDialogOpen}>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
                <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 border border-purple-700/30 rounded-lg p-6 w-full max-w-md">
                  <Dialog.Title className="text-lg font-semibold text-purple-300 mb-4">
                    Create Stock Transfer
                  </Dialog.Title>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="product" className="text-sm text-gray-300 block mb-1">
                        Product
                      </Label>
                      <Select.Root
                        value={newTransfer.product}
                        onValueChange={(value) => setNewTransfer({ ...newTransfer, product: value })}
                      >
                        <Select.Trigger className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 flex justify-between items-center">
                          <Select.Value placeholder="Select a product" />
                          <Select.Icon>
                            <ChevronDown size={16} />
                          </Select.Icon>
                        </Select.Trigger>
                        <Select.Portal>
                          <Select.Content className="bg-gray-800 border border-purple-700/30 rounded-md overflow-hidden">
                            <Select.Viewport>
                              {products.map((product) => (
                                <Select.Item
                                  key={product.id}
                                  value={product.name}
                                  className="px-3 py-2 text-white hover:bg-purple-700/30 cursor-pointer outline-none"
                                >
                                  <Select.ItemText>{product.name}</Select.ItemText>
                                </Select.Item>
                              ))}
                            </Select.Viewport>
                          </Select.Content>
                        </Select.Portal>
                      </Select.Root>
                    </div>

                    <div>
                      <Label htmlFor="quantity" className="text-sm text-gray-300 block mb-1">
                        Quantity
                      </Label>
                      <input
                        id="quantity"
                        type="number"
                        className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                        value={newTransfer.quantity}
                        onChange={(e) =>
                          setNewTransfer({ ...newTransfer, quantity: Number.parseInt(e.target.value) || 1 })
                        }
                        min="1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="fromWarehouse" className="text-sm text-gray-300 block mb-1">
                        From Warehouse
                      </Label>
                      <Select.Root
                        value={newTransfer.fromWarehouse}
                        onValueChange={(value) => setNewTransfer({ ...newTransfer, fromWarehouse: value })}
                      >
                        <Select.Trigger className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 flex justify-between items-center">
                          <Select.Value />
                          <Select.Icon>
                            <ChevronDown size={16} />
                          </Select.Icon>
                        </Select.Trigger>
                        <Select.Portal>
                          <Select.Content className="bg-gray-800 border border-purple-700/30 rounded-md overflow-hidden">
                            <Select.Viewport>
                              {warehouses.map((warehouse) => (
                                <Select.Item
                                  key={warehouse.id}
                                  value={warehouse.name}
                                  className="px-3 py-2 text-white hover:bg-purple-700/30 cursor-pointer outline-none"
                                >
                                  <Select.ItemText>{warehouse.name}</Select.ItemText>
                                </Select.Item>
                              ))}
                            </Select.Viewport>
                          </Select.Content>
                        </Select.Portal>
                      </Select.Root>
                    </div>

                    <div>
                      <Label htmlFor="toWarehouse" className="text-sm text-gray-300 block mb-1">
                        To Warehouse
                      </Label>
                      <Select.Root
                        value={newTransfer.toWarehouse}
                        onValueChange={(value) => setNewTransfer({ ...newTransfer, toWarehouse: value })}
                      >
                        <Select.Trigger className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 flex justify-between items-center">
                          <Select.Value />
                          <Select.Icon>
                            <ChevronDown size={16} />
                          </Select.Icon>
                        </Select.Trigger>
                        <Select.Portal>
                          <Select.Content className="bg-gray-800 border border-purple-700/30 rounded-md overflow-hidden">
                            <Select.Viewport>
                              {warehouses
                                .filter((w) => w.name !== newTransfer.fromWarehouse)
                                .map((warehouse) => (
                                  <Select.Item
                                    key={warehouse.id}
                                    value={warehouse.name}
                                    className="px-3 py-2 text-white hover:bg-purple-700/30 cursor-pointer outline-none"
                                  >
                                    <Select.ItemText>{warehouse.name}</Select.ItemText>
                                  </Select.Item>
                                ))}
                            </Select.Viewport>
                          </Select.Content>
                        </Select.Portal>
                      </Select.Root>
                    </div>

                    <div>
                      <Label htmlFor="date" className="text-sm text-gray-300 block mb-1">
                        Transfer Date
                      </Label>
                      <input
                        id="date"
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
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </motion.div>
        )}

        {/* Batches & Expiry */}
        {activeTab === "batches" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
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
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-700/20">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-purple-900/10">
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-white">{product.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-white">{product.batchNumber}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-white">{product.expiryDate}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                          {product.stock} {product.unit}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              new Date(product.expiryDate) > new Date(new Date().setMonth(new Date().getMonth() + 6))
                                ? "bg-green-800/30 text-green-300"
                                : new Date(product.expiryDate) > new Date()
                                  ? "bg-yellow-800/30 text-yellow-300"
                                  : "bg-red-800/30 text-red-300"
                            }`}
                          >
                            {new Date(product.expiryDate) > new Date(new Date().setMonth(new Date().getMonth() + 6))
                              ? "Valid"
                              : new Date(product.expiryDate) > new Date()
                                ? "Expiring Soon"
                                : "Expired"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Reorder Levels */}
        {activeTab === "reorder" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
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
          </motion.div>
        )}

        {/* Inventory Valuation */}
        {activeTab === "valuation" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-white">Inventory Valuation</h2>
                <p className="text-gray-400 mt-1">Support FIFO, LIFO, and Weighted Average methods</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <Select.Root value={selectedValuationMethod} onValueChange={setSelectedValuationMethod}>
                  <Select.Trigger className="px-3 py-2 rounded-md bg-gray-800 border border-purple-700/30 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 flex justify-between items-center">
                    <Select.Value />
                    <Select.Icon>
                      <ChevronDown size={16} />
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="bg-gray-800 border border-purple-700/30 rounded-md overflow-hidden">
                      <Select.Viewport>
                        <Select.Item
                          value="FIFO"
                          className="px-3 py-2 text-white hover:bg-purple-700/30 cursor-pointer outline-none"
                        >
                          <Select.ItemText>FIFO</Select.ItemText>
                        </Select.Item>
                        <Select.Item
                          value="LIFO"
                          className="px-3 py-2 text-white hover:bg-purple-700/30 cursor-pointer outline-none"
                        >
                          <Select.ItemText>LIFO</Select.ItemText>
                        </Select.Item>
                        <Select.Item
                          value="Weighted Average"
                          className="px-3 py-2 text-white hover:bg-purple-700/30 cursor-pointer outline-none"
                        >
                          <Select.ItemText>Weighted Average</Select.ItemText>
                        </Select.Item>
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
                <button className="flex items-center justify-center px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white">
                  <Download size={16} className="mr-2" />
                  Export
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-4 shadow-lg">
                <h3 className="text-md font-semibold text-white mb-2">Total Inventory Value</h3>
                <div className="text-3xl font-bold text-purple-400">₹ 1,245,750</div>
                <p className="text-sm text-gray-400 mt-1">Based on {selectedValuationMethod} method</p>
              </div>

              <div className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-4 shadow-lg">
                <h3 className="text-md font-semibold text-white mb-2">Total Items</h3>
                <div className="text-3xl font-bold text-blue-400">{products.reduce((sum, p) => sum + p.stock, 0)}</div>
                <p className="text-sm text-gray-400 mt-1">Across all warehouses</p>
              </div>

              <div className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-4 shadow-lg">
                <h3 className="text-md font-semibold text-white mb-2">Average Item Value</h3>
                <div className="text-3xl font-bold text-green-400">₹ 4,950</div>
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
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-700/20">
                    {products.map((product) => {
                      const unitCost = Math.floor(Math.random() * 10000) + 1000
                      const totalValue = unitCost * product.stock

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
                            ₹ {unitCost.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                            ₹ {totalValue.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-white">{product.valuationMethod}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Stock Analysis */}
        {activeTab === "analysis" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
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
                <div className="text-3xl font-bold text-green-400">3</div>
                <p className="text-sm text-gray-400 mt-1">High turnover products</p>
              </div>

              <div className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-4 shadow-lg">
                <h3 className="text-md font-semibold text-white mb-2">Medium Moving Items</h3>
                <div className="text-3xl font-bold text-yellow-400">3</div>
                <p className="text-sm text-gray-400 mt-1">Average turnover products</p>
              </div>

              <div className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-4 shadow-lg">
                <h3 className="text-md font-semibold text-white mb-2">Slow/Dead Stock</h3>
                <div className="text-3xl font-bold text-red-400">2</div>
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
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </div>

     
    </div>
  )
}

export default InventoryManagement
