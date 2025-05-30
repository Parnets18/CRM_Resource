// import React, { useState, useEffect } from "react"
// import {
//   Search,
//   Menu,
//   X,
//   Plus,
//   Eye,
//   Edit,
//   Trash2,
//   Filter,
//   Download,
//   RefreshCw,
//   ArrowUpDown,
//   ChevronDown,
//   BarChart3,
//   Package,
//   Truck,
//   ArrowLeftRight,
//   Calendar,
//   AlertTriangle,
//   DollarSign,
//   TrendingUp
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { motion } from "framer-motion"

// // Mock data for demonstration
// const initialProducts = [
//   {
//     id: 1,
//     name: "Cement",
//     sku: "CEM-001",
//     barcode: "8901234567890",
//     unit: "bags",
//     hsn: "2523",
//     tax: 18,
//     serialNumber: "SN12345",
//     stock: 250,
//     warehouse: "Main",
//     zone: "Construction",
//     batchNumber: "B2023-01",
//     expiryDate: "2025-12-31",
//     reorderLevel: 50,
//     valuationMethod: "FIFO",
//     status: "Active",
//     movement: "High",
//     category: "Construction",
//     price: 350,
//   },
//   {
//     id: 2,
//     name: "Steel Bars",
//     sku: "STL-002",
//     barcode: "8901234567891",
//     unit: "tons",
//     hsn: "7214",
//     tax: 18,
//     serialNumber: "SN12346",
//     stock: 42,
//     warehouse: "Main",
//     zone: "Construction",
//     batchNumber: "B2023-02",
//     expiryDate: "2025-10-15",
//     reorderLevel: 15,
//     valuationMethod: "FIFO",
//     status: "Active",
//     movement: "High",
//     category: "Construction",
//     price: 55000,
//   },
//   {
//     id: 3,
//     name: "Bricks",
//     sku: "BRK-003",
//     barcode: "8901234567892",
//     unit: "pcs",
//     hsn: "6904",
//     tax: 18,
//     serialNumber: "SN12347",
//     stock: 7800,
//     warehouse: "Main",
//     zone: "Construction",
//     batchNumber: "B2023-03",
//     expiryDate: "2026-05-20",
//     reorderLevel: 2000,
//     valuationMethod: "FIFO",
//     status: "Active",
//     movement: "Medium",
//     category: "Construction",
//     price: 8,
//   },
//   {
//     id: 4,
//     name: "Rice",
//     sku: "RCE-004",
//     barcode: "8901234567893",
//     unit: "kg",
//     hsn: "1006",
//     tax: 5,
//     serialNumber: "SN12348",
//     stock: 120,
//     warehouse: "Restaurant",
//     zone: "Food",
//     batchNumber: "B2023-04",
//     expiryDate: "2025-08-10",
//     reorderLevel: 50,
//     valuationMethod: "FIFO",
//     status: "Active",
//     movement: "High",
//     category: "Restaurant",
//     price: 60,
//   },
//   {
//     id: 5,
//     name: "Cooking Oil",
//     sku: "OIL-005",
//     barcode: "8901234567894",
//     unit: "ltr",
//     hsn: "1512",
//     tax: 5,
//     serialNumber: "SN12349",
//     stock: 80,
//     warehouse: "Restaurant",
//     zone: "Food",
//     batchNumber: "B2023-05",
//     expiryDate: "2026-02-28",
//     reorderLevel: 30,
//     valuationMethod: "FIFO",
//     status: "Active",
//     movement: "Medium",
//     category: "Restaurant",
//     price: 120,
//   },
//   {
//     id: 6,
//     name: "Chicken",
//     sku: "CHK-006",
//     barcode: "8901234567895",
//     unit: "kg",
//     hsn: "0207",
//     tax: 5,
//     serialNumber: "SN12350",
//     stock: 35,
//     warehouse: "Restaurant",
//     zone: "Food",
//     batchNumber: "B2023-06",
//     expiryDate: "2023-06-20",
//     reorderLevel: 15,
//     valuationMethod: "FIFO",
//     status: "Low Stock",
//     movement: "High",
//     category: "Restaurant",
//     price: 180,
//   },
//   {
//     id: 7,
//     name: "Paint",
//     sku: "PNT-007",
//     barcode: "8901234567896",
//     unit: "ltr",
//     hsn: "3208",
//     tax: 18,
//     serialNumber: "SN12351",
//     stock: 50,
//     warehouse: "Main",
//     zone: "Construction",
//     batchNumber: "B2023-07",
//     expiryDate: "2026-03-10",
//     reorderLevel: 20,
//     valuationMethod: "FIFO",
//     status: "Active",
//     movement: "Medium",
//     category: "Construction",
//     price: 250,
//   },
//   {
//     id: 8,
//     name: "Vegetables",
//     sku: "VEG-008",
//     barcode: "8901234567897",
//     unit: "kg",
//     hsn: "0706",
//     tax: 0,
//     serialNumber: "SN12352",
//     stock: 25,
//     warehouse: "Restaurant",
//     zone: "Food",
//     batchNumber: "B2023-08",
//     expiryDate: "2023-05-25",
//     reorderLevel: 20,
//     valuationMethod: "FIFO",
//     status: "Low Stock",
//     movement: "High",
//     category: "Restaurant",
//     price: 40,
//   },
// ]

// const initialWarehouses = [
//   { id: 1, name: "Main", location: "New Delhi", zones: ["Construction", "Storage", "Equipment"] },
//   { id: 2, name: "Restaurant", location: "Mumbai", zones: ["Food", "Beverages", "Utensils"] },
//   { id: 3, name: "Warehouse 3", location: "Bangalore", zones: ["Construction", "Food", "Miscellaneous"] },
// ]

// const initialTransfers = [
//   {
//     id: 1,
//     date: "2023-05-15",
//     product: "Cement",
//     quantity: 50,
//     fromWarehouse: "Main",
//     toWarehouse: "Warehouse 3",
//     status: "Completed",
//   },
//   {
//     id: 2,
//     date: "2023-06-20",
//     product: "Rice",
//     quantity: 100,
//     fromWarehouse: "Restaurant",
//     toWarehouse: "Main",
//     status: "In Transit",
//   },
//   {
//     id: 3,
//     date: "2023-07-10",
//     product: "Steel Bars",
//     quantity: 15,
//     fromWarehouse: "Main",
//     toWarehouse: "Warehouse 3",
//     status: "Completed",
//   },
// ]

// const initialStockMovements = [
//   { id: 1, date: "2023-05-10", product: "Cement", type: "Purchase", quantity: 100, warehouse: "Main" },
//   { id: 2, date: "2023-05-15", product: "Cement", type: "Sale", quantity: -20, warehouse: "Main" },
//   { id: 3, date: "2023-06-05", product: "Rice", type: "Purchase", quantity: 200, warehouse: "Restaurant" },
//   { id: 4, date: "2023-06-10", product: "Rice", type: "Sale", quantity: -50, warehouse: "Restaurant" },
//   { id: 5, date: "2023-06-15", product: "Steel Bars", type: "Purchase", quantity: 30, warehouse: "Main" },
//   { id: 6, date: "2023-06-20", product: "Steel Bars", type: "Sale", quantity: -8, warehouse: "Main" },
// ]

// export default function Inventory() {
//   const [activeTab, setActiveTab] = useState("products")
//   const [products, setProducts] = useState(initialProducts)
//   const [warehouses, setWarehouses] = useState(initialWarehouses)
//   const [transfers, setTransfers] = useState(initialTransfers)
//   const [stockMovements, setStockMovements] = useState(initialStockMovements)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [isAddProductOpen, setIsAddProductOpen] = useState(false)
//   const [isEditProductOpen, setIsEditProductOpen] = useState(false)
//   const [isAddWarehouseOpen, setIsAddWarehouseOpen] = useState(false)
//   const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false)
//   const [isStockAdjustmentOpen, setIsStockAdjustmentOpen] = useState(false)
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
//   const [selectedProduct, setSelectedProduct] = useState(null)
//   const [selectedValuationMethod, setSelectedValuationMethod] = useState("FIFO")
//   const [filterCategory, setFilterCategory] = useState("All")
//   const [filterWarehouse, setFilterWarehouse] = useState("All")
//   const [filterStatus, setFilterStatus] = useState("All")
//   const [isFilterOpen, setIsFilterOpen] = useState(false)

//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     sku: "",
//     barcode: "",
//     unit: "pcs",
//     hsn: "",
//     tax: 18,
//     serialNumber: "",
//     stock: 0,
//     warehouse: "Main",
//     zone: "Construction",
//     batchNumber: "",
//     expiryDate: "",
//     reorderLevel: 10,
//     valuationMethod: "FIFO",
//     category: "Construction",
//     price: 0,
//   })

//   const [newWarehouse, setNewWarehouse] = useState({
//     name: "",
//     location: "",
//     zones: [""],
//   })

//   const [newTransfer, setNewTransfer] = useState({
//     product: "",
//     quantity: 1,
//     fromWarehouse: "Main",
//     toWarehouse: "Restaurant",
//     date: new Date().toISOString().split("T")[0],
//   })

//   const [stockAdjustment, setStockAdjustment] = useState({
//     product: "",
//     quantity: 0,
//     type: "Addition",
//     reason: "",
//     warehouse: "Main",
//     date: new Date().toISOString().split("T")[0],
//   })

//   // Filter products based on search term and filters
//   const filteredProducts = products.filter((product) => {
//     const matchesSearch =
//       product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.barcode.toLowerCase().includes(searchTerm.toLowerCase())

//     const matchesCategory = filterCategory === "All" || product.category === filterCategory
//     const matchesWarehouse = filterWarehouse === "All" || product.warehouse === filterWarehouse
//     const matchesStatus = filterStatus === "All" || product.status === filterStatus

//     return matchesSearch && matchesCategory && matchesWarehouse && matchesStatus
//   })

//   // Products with low stock (below reorder level)
//   const lowStockProducts = products.filter((product) => product.stock <= product.reorderLevel)

//   // Products expiring soon (within 30 days)
//   const expiringProducts = products.filter((product) => {
//     const expiryDate = new Date(product.expiryDate)
//     const today = new Date()
//     const thirtyDaysFromNow = new Date()
//     thirtyDaysFromNow.setDate(today.getDate() + 30)

//     return expiryDate <= thirtyDaysFromNow && expiryDate >= today
//   })

//   // Handle adding a new product
//   const handleAddProduct = () => {
//     const id = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1
//     const status = newProduct.stock <= newProduct.reorderLevel ? "Low Stock" : "Active"
//     const movement = "Low" // Default for new products

//     const productToAdd = {
//       ...newProduct,
//       id,
//       status,
//       movement,
//     }

//     setProducts([...products, productToAdd])
//     setIsAddProductOpen(false)
//     setNewProduct({
//       name: "",
//       sku: "",
//       barcode: "",
//       unit: "pcs",
//       hsn: "",
//       tax: 18,
//       serialNumber: "",
//       stock: 0,
//       warehouse: "Main",
//       zone: "Construction",
//       batchNumber: "",
//       expiryDate: "",
//       reorderLevel: 10,
//       valuationMethod: "FIFO",
//       category: "Construction",
//       price: 0,
//     })
//   }

//   // Handle editing a product
//   const handleEditProduct = () => {
//     const updatedProducts = products.map((product) => (product.id === selectedProduct.id ? selectedProduct : product))

//     setProducts(updatedProducts)
//     setIsEditProductOpen(false)
//     setSelectedProduct(null)
//   }

//   // Handle deleting a product
//   const handleDeleteProduct = (id) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       setProducts(products.filter((product) => product.id !== id))
//     }
//   }

//   // Handle adding a new warehouse
//   const handleAddWarehouse = () => {
//     const id = warehouses.length > 0 ? Math.max(...warehouses.map((w) => w.id)) + 1 : 1

//     const warehouseToAdd = {
//       ...newWarehouse,
//       id,
//     }

//     setWarehouses([...warehouses, warehouseToAdd])
//     setIsAddWarehouseOpen(false)
//     setNewWarehouse({
//       name: "",
//       location: "",
//       zones: [""],
//     })
//   }

//   // Handle creating a new transfer
//   const handleCreateTransfer = () => {
//     const id = transfers.length > 0 ? Math.max(...transfers.map((t) => t.id)) + 1 : 1

//     const transferToAdd = {
//       ...newTransfer,
//       id,
//       status: "In Transit",
//     }

//     // Update product stock in source and destination warehouses
//     const updatedProducts = products.map((product) => {
//       if (product.name === newTransfer.product) {
//         if (product.warehouse === newTransfer.fromWarehouse) {
//           return { ...product, stock: product.stock - newTransfer.quantity }
//         }
//         if (product.warehouse === newTransfer.toWarehouse) {
//           return { ...product, stock: product.stock + newTransfer.quantity }
//         }
//       }
//       return product
//     })

//     // Add stock movement records
//     const stockOutId = stockMovements.length > 0 ? Math.max(...stockMovements.map((m) => m.id)) + 1 : 1
//     const stockInId = stockOutId + 1

//     const newStockMovements = [
//       ...stockMovements,
//       {
//         id: stockOutId,
//         date: newTransfer.date,
//         product: newTransfer.product,
//         type: "Transfer Out",
//         quantity: -newTransfer.quantity,
//         warehouse: newTransfer.fromWarehouse,
//       },
//       {
//         id: stockInId,
//         date: newTransfer.date,
//         product: newTransfer.product,
//         type: "Transfer In",
//         quantity: newTransfer.quantity,
//         warehouse: newTransfer.toWarehouse,
//       },
//     ]

//     setTransfers([...transfers, transferToAdd])
//     setProducts(updatedProducts)
//     setStockMovements(newStockMovements)
//     setIsTransferDialogOpen(false)
//     setNewTransfer({
//       product: "",
//       quantity: 1,
//       fromWarehouse: "Main",
//       toWarehouse: "Restaurant",
//       date: new Date().toISOString().split("T")[0],
//     })
//   }

//   // Handle stock adjustment
//   const handleStockAdjustment = () => {
//     const adjustmentQuantity =
//       stockAdjustment.type === "Addition" ? stockAdjustment.quantity : -stockAdjustment.quantity

//     // Update product stock
//     const updatedProducts = products.map((product) => {
//       if (product.name === stockAdjustment.product && product.warehouse === stockAdjustment.warehouse) {
//         const newStock = product.stock + adjustmentQuantity
//         const status = newStock <= product.reorderLevel ? "Low Stock" : "Active"
//         return { ...product, stock: newStock, status }
//       }
//       return product
//     })

//     // Add stock movement record
//     const movementId = stockMovements.length > 0 ? Math.max(...stockMovements.map((m) => m.id)) + 1 : 1

//     const newStockMovement = {
//       id: movementId,
//       date: stockAdjustment.date,
//       product: stockAdjustment.product,
//       type: stockAdjustment.type === "Addition" ? "Stock Addition" : "Stock Reduction",
//       quantity: adjustmentQuantity,
//       warehouse: stockAdjustment.warehouse,
//       reason: stockAdjustment.reason,
//     }

//     setProducts(updatedProducts)
//     setStockMovements([...stockMovements, newStockMovement])
//     setIsStockAdjustmentOpen(false)
//     setStockAdjustment({
//       product: "",
//       quantity: 0,
//       type: "Addition",
//       reason: "",
//       warehouse: "Main",
//       date: new Date().toISOString().split("T")[0],
//     })
//   }

//   // Navigation tabs
//   const tabs = [
//     { id: "products", label: "Product Master", icon: <Package size={18} /> },
//     { id: "stock", label: "Stock In/Out", icon: <BarChart3 size={18} /> },
//     { id: "warehouses", label: "Warehouses", icon: <Truck size={18} /> },
//     { id: "transfers", label: "Transfers", icon: <ArrowLeftRight size={18} /> },
//     { id: "batches", label: "Batches & Expiry", icon: <Calendar size={18} /> },
//     { id: "reorder", label: "Reorder Levels", icon: <AlertTriangle size={18} /> },
//     { id: "valuation", label: "Inventory Valuation", icon: <DollarSign size={18} /> },
//     { id: "analysis", label: "Stock Analysis", icon: <TrendingUp size={18} /> },
//   ]

//   // Calculate total inventory value
//   const calculateTotalInventoryValue = () => {
//     return products.reduce((total, product) => {
//       return total + product.stock * product.price
//     }, 0)
//   }

//   // Add a zone to new warehouse
//   const addZoneToNewWarehouse = () => {
//     setNewWarehouse({
//       ...newWarehouse,
//       zones: [...newWarehouse.zones, ""],
//     })
//   }

//   // Update zone in new warehouse
//   const updateZoneInNewWarehouse = (index, value) => {
//     const updatedZones = [...newWarehouse.zones]
//     updatedZones[index] = value
//     setNewWarehouse({
//       ...newWarehouse,
//       zones: updatedZones,
//     })
//   }

//   // Remove zone from new warehouse
//   const removeZoneFromNewWarehouse = (index) => {
//     if (newWarehouse.zones.length > 1) {
//       const updatedZones = newWarehouse.zones.filter((_, i) => i !== index)
//       setNewWarehouse({
//         ...newWarehouse,
//         zones: updatedZones,
//       })
//     }
//   }

//   const handleExportProducts = () => {
//     // Create CSV content
//     const headers = ["Name", "SKU", "Barcode", "Stock", "Unit", "Warehouse", "Zone", "Category", "Status", "Reorder Level"];
    
//     const csvContent = [
//       headers.join(","),
//       ...products.map(product => [
//         product.name,
//         product.sku,
//         product.barcode,
//         product.stock,
//         product.unit,
//         product.warehouse,
//         product.zone,
//         product.category,
//         product.status,
//         product.reorderLevel
//       ].join(","))
//     ].join("\n");
    
//     // Create a blob and download link
//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.setAttribute("href", url);
//     link.setAttribute("download", "inventory_products.csv");
//     link.style.visibility = "hidden";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const resetFilters = () => {
//     setFilterCategory("All");
//     setFilterWarehouse("All");
//     setFilterStatus("All");
//     setSearchTerm("");
//   };

//   const applyFilters = () => {
//     // This function can be empty as the filtering is already handled by the filteredProducts variable
//     setIsFilterOpen(false);
//   };

//   return (
//     <div className="flex flex-col h-screen bg-background text-foreground">
//       {/* Header with horizontal navigation */}
//       <header className="bg-card border-b border-border">
//         <div className="container mx-auto px-4">
//           {/* Top header with logo and user controls */}
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center">
//               <h1 className="text-xl font-bold text-primary">Inventory & Stock Management</h1>
//             </div>

//             {/* Mobile menu button */}
//             <button
//               className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             >
//               {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>

//             {/* User controls - can be expanded */}
//             <div className="hidden md:flex items-center space-x-4">
//               <div className="relative">
//                 <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   className="pl-8 pr-4 py-1 rounded-md bg-input border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//               <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
//                 <span className="font-semibold text-primary-foreground">A</span>
//               </div>
//             </div>
//           </div>

//           {/* Navigation tabs */}
//           <div className="flex space-x-1 overflow-x-auto pb-2">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
//                   activeTab === tab.id
//                     ? "bg-primary text-primary-foreground"
//                     : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
//                 }`}
//                 onClick={() => setActiveTab(tab.id)}
//               >
//                 {tab.name}
//               </button>
//             ))}
//           </div>
//         </div>
//       </header>

//       {/* Main content */}
//       <div className="flex-1 overflow-auto p-4 md:p-6">
//         {activeTab === "dashboard" && (
//           <div className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//               <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
//                 <Card>
//                   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                     <CardTitle className="text-sm font-medium">Total Products</CardTitle>
//                     <BarChart3 className="h-4 w-4 text-muted-foreground" />
//                   </CardHeader>
//                   <CardContent>
//                     <div className="text-2xl font-bold">{products.length}</div>
//                     <p className="text-xs text-muted-foreground">
//                       {products.filter((p) => p.status === "Active").length} active
//                     </p>
//                   </CardContent>
//                 </Card>
//               </motion.div>

//               <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
//                 <Card>
//                   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                     <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
//                     <Badge variant="destructive">{lowStockProducts.length}</Badge>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="text-2xl font-bold">{lowStockProducts.length}</div>
//                     <p className="text-xs text-muted-foreground">
//                       {Math.round((lowStockProducts.length / products.length) * 100)}% of inventory
//                     </p>
//                   </CardContent>
//                 </Card>
//               </motion.div>

//               <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
//                 <Card>
//                   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                     <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
//                     <Badge variant="outline">₹</Badge>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="text-2xl font-bold">₹ {calculateTotalInventoryValue().toLocaleString()}</div>
//                     <p className="text-xs text-muted-foreground">
//                       Across {products.reduce((acc, p) => acc + p.stock, 0)} items
//                     </p>
//                   </CardContent>
//                 </Card>
//               </motion.div>

//               <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
//                 <Card>
//                   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                     <CardTitle className="text-sm font-medium">Warehouses</CardTitle>
//                     <Badge variant="secondary">{warehouses.length}</Badge>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="text-2xl font-bold">{warehouses.length}</div>
//                     <p className="text-xs text-muted-foreground">
//                       {warehouses.reduce((acc, w) => acc + w.capacity, 0).toLocaleString()} total capacity
//                     </p>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             </div>

//             {/* Dashboard content... */}
//           </div>
//         )}

//         {activeTab === "products" && (
//           <div className="space-y-4">
//             <div className="flex flex-col sm:flex-row justify-between gap-4">
//               <h2 className="text-2xl font-bold">Product Inventory</h2>
//               <div className="flex gap-2">
//                 <Button variant="outline" size="sm" onClick={() => setIsFilterOpen(!isFilterOpen)}>
//                   <Filter className="h-4 w-4 mr-2" />
//                   Filter
//                 </Button>
//                 <Button variant="outline" size="sm" onClick={handleExportProducts}>
//                   <Download className="h-4 w-4 mr-2" />
//                   Export
//                 </Button>
//                 <Button variant="default" size="sm" onClick={() => setIsAddProductOpen(true)}>
//                   <Plus className="h-4 w-4 mr-2" />
//                   Add Product
//                 </Button>
//               </div>
//             </div>

//             {isFilterOpen && (
//               <div className="bg-card border border-border rounded-lg p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Category</label>
//                   <select
//                     className="w-full p-2 rounded-md border border-input bg-background"
//                     value={filterCategory}
//                     onChange={(e) => setFilterCategory(e.target.value)}
//                   >
//                     <option value="">All Categories</option>
//                     {categories.map((category) => (
//                       <option key={category} value={category}>
//                         {category}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Status</label>
//                   <select
//                     className="w-full p-2 rounded-md border border-input bg-background"
//                     value={filterStatus}
//                     onChange={(e) => setFilterStatus(e.target.value)}
//                   >
//                     <option value="">All Statuses</option>
//                     <option value="Active">Active</option>
//                     <option value="Low Stock">Low Stock</option>
//                     <option value="Out of Stock">Out of Stock</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Warehouse</label>
//                   <select
//                     className="w-full p-2 rounded-md border border-input bg-background"
//                     value={filterWarehouse}
//                     onChange={(e) => setFilterWarehouse(e.target.value)}
//                   >
//                     <option value="">All Warehouses</option>
//                     {warehouses.map((warehouse) => (
//                       <option key={warehouse.id} value={warehouse.name}>
//                         {warehouse.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="md:col-span-3 flex justify-end gap-2">
//                   <Button variant="outline" size="sm" onClick={resetFilters}>
//                     Reset
//                   </Button>
//                   <Button variant="default" size="sm" onClick={applyFilters}>
//                     Apply Filters
//                   </Button>
//                 </div>
//               </div>
//             )}

//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                 <Search className="h-4 w-4 text-muted-foreground" />
//               </div>
//               <input
//                 type="text"
//                 className="block w-full p-2 pl-10 text-sm border border-input rounded-lg bg-background"
//                 placeholder="Search products by name, SKU, or serial number..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>

//             <div className="bg-card border border-border rounded-lg overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-border">
//                   <thead className="bg-muted">
//                     <tr>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
//                         Product
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
//                         SKU/Barcode
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
//                         Stock
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
//                         Warehouse
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
//                         Category
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
//                         Status
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-border">
//                     {filteredProducts.map((product) => (
//                       <tr key={product.id} className="hover:bg-accent/50">
//                         <td className="px-4 py-3 whitespace-nowrap">
//                           <div className="flex items-center">
//                             <div className="ml-2">
//                               <div className="text-sm font-medium">{product.name}</div>
//                               <div className="text-xs text-muted-foreground">SN: {product.serialNumber}</div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-4 py-3 whitespace-nowrap">
//                           <div className="text-sm">{product.sku}</div>
//                           <div className="text-xs text-muted-foreground">{product.barcode}</div>
//                         </td>
//                         <td className="px-4 py-3 whitespace-nowrap">
//                           <div className="text-sm">
//                             {product.stock} {product.unit}
//                           </div>
//                           <div className="text-xs text-muted-foreground">Reorder: {product.reorderLevel}</div>
//                         </td>
//                         <td className="px-4 py-3 whitespace-nowrap">
//                           <div className="text-sm">{product.warehouse}</div>
//                           <div className="text-xs text-muted-foreground">Zone: {product.zone}</div>
//                         </td>
//                         <td className="px-4 py-3 whitespace-nowrap">
//                           <div className="text-sm">{product.category}</div>
//                         </td>
//                         <td className="px-4 py-3 whitespace-nowrap">
//                           <Badge
//                             variant={
//                               product.status === "Active"
//                                 ? "default"
//                                 : product.status === "Low Stock"
//                                 ? "secondary"
//                                 : "destructive"
//                             }
//                           >
//                             {product.status}
//                           </Badge>
//                         </td>
//                         <td className="px-4 py-3 whitespace-nowrap">
//                           <div className="flex space-x-2">
//                             <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500">
//                               <Eye className="h-4 w-4" />
//                             </Button>
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               className="h-8 w-8 text-amber-500"
//                               onClick={() => {
//                                 setSelectedProduct(product)
//                                 setIsEditProductOpen(true)
//                               }}
//                             >
//                               <Edit className="h-4 w-4" />
//                             </Button>
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               className="h-8 w-8 text-red-500"
//                               onClick={() => handleDeleteProduct(product.id)}
//                             >
//                               <Trash2 className="h-4 w-4" />
//                             </Button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Add Product Dialog */}
//             {isAddProductOpen && (
//               <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//                 <div className="bg-card border border-border rounded-lg p-6 shadow-lg max-w-2xl w-full">
//                   <div className="flex justify-between items-center mb-4">
//                     <h3 className="text-lg font-bold">Add New Product</h3>
//                     <Button variant="ghost" size="icon" onClick={() => setIsAddProductOpen(false)}>
//                       <X className="h-5 w-5" />
//                     </Button>
//                   </div>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium mb-1">Product Name</label>
//                       <input
//                         type="text"
//                         className="w-full p-2 rounded-md border border-input bg-background"
//                         placeholder="Enter product name"
//                         value={newProduct.name}
//                         onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-1">SKU</label>
//                       <input
//                         type="text"
//                         className="w-full p-2 rounded-md border border-input bg-background"
//                         placeholder="Enter SKU"
//                         value={newProduct.sku}
//                         onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-1">Category</label>
//                       <select
//                         className="w-full p-2 rounded-md border border-input bg-background"
//                         value={newProduct.category}
//                         onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
//                       >
//                         <option value="">Select Category</option>
//                         {categories.map((category) => (
//                           <option key={category} value={category}>
//                             {category}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-1">Warehouse</label>
//                       <select
//                         className="w-full p-2 rounded-md border border-input bg-background"
//                         value={newProduct.warehouse}
//                         onChange={(e) => setNewProduct({ ...newProduct, warehouse: e.target.value })}
//                       >
//                         <option value="">Select Warehouse</option>
//                         {warehouses.map((warehouse) => (
//                           <option key={warehouse.id} value={warehouse.name}>
//                             {warehouse.name}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-1">Initial Stock</label>
//                       <input
//                         type="number"
//                         className="w-full p-2 rounded-md border border-input bg-background"
//                         placeholder="Enter initial stock"
//                         value={newProduct.stock}
//                         onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-1">Reorder Level</label>
//                       <input
//                         type="number"
//                         className="w-full p-2 rounded-md border border-input bg-background"
//                         placeholder="Enter reorder level"
//                         value={newProduct.reorderLevel}
//                         onChange={(e) => setNewProduct({ ...newProduct, reorderLevel: parseInt(e.target.value) })}
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-1">Unit</label>
//                       <input
//                         type="text"
//                         className="w-full p-2 rounded-md border border-input bg-background"
//                         placeholder="e.g. pcs, kg, liters"
//                         value={newProduct.unit}
//                         onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-1">Zone</label>
//                       <input
//                         type="text"
//                         className="w-full p-2 rounded-md border border-input bg-background"
//                         placeholder="e.g. A1, B2, C3"
//                         value={newProduct.zone}
//                         onChange={(e) => setNewProduct({ ...newProduct, zone: e.target.value })}
//                       />
//                     </div>
//                   </div>
                  
//                   <div className="flex justify-end gap-2 mt-6">
//                     <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
//                       Cancel
//                     </Button>
//                     <Button variant="default" onClick={handleAddProduct}>
//                       Add Product
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Edit Product Dialog */}
//             {isEditProductOpen && selectedProduct && (
//               <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//                 <div className="bg-card border border-border rounded-lg p-6 shadow-lg max-w-2xl w-full">
//                   <div className="flex justify-between items-center mb-4">
//                     <h3 className="text-lg font-bold">Edit Product</h3>
//                     <Button variant="ghost" size="icon" onClick={() => setIsEditProductOpen(false)}>
//                       <X className="h-5 w-5" />
//                     </Button>
//                   </div>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium mb-1">Product Name</label>
//                       <input
//                         type="text"
//                         className="w-full p-2 rounded-md border border-input bg-background"
//                         value={selectedProduct.name}
//                         onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-1">SKU</label>
//                       <input
//                         type="text"
//                         className="w-full p-2 rounded-md border border-input bg-background"
//                         value={selectedProduct.sku}
//                         onChange={(e) => setSelectedProduct({ ...selectedProduct, sku: e.target.value })}
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-1">Category</label>
//                       <select
//                         className="w-full p-2 rounded-md border border-input bg-background"
//                         value={selectedProduct.category}
//                         onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })}
//                       >
//                         {categories.map((category) => (
//                           <option key={category} value={category}>
//                             {category}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-1">Warehouse</label>
//                       <select
//                         className="w-full p-2 rounded-md border border-input bg-background"
//                         value={selectedProduct.warehouse}
//                         onChange={(e) => setSelectedProduct({ ...selectedProduct, warehouse: e.target.value })}
//                       >
//                         {warehouses.map((warehouse) => (
//                           <option key={warehouse.id} value={warehouse.name}>
//                             {warehouse.name}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-1">Stock</label>
//                       <input
//                         type="number"
//                         className="w-full p-2 rounded-md border border-input bg-background"
//                         value={selectedProduct.stock}
//                         onChange={(e) => setSelectedProduct({ ...selectedProduct, stock: parseInt(e.target.value) })}
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-1">Reorder Level</label>
//                       <input
//                         type="number"
//                         className="w-full p-2 rounded-md border border-input bg-background"
//                         value={selectedProduct.reorderLevel}
//                         onChange={(e) => setSelectedProduct({ ...selectedProduct, reorderLevel: parseInt(e.target.value) })}
//                       />
//                     </div>
//                   </div>
                  
//                   <div className="flex justify-end gap-2 mt-6">
//                     <Button variant="outline" onClick={() => setIsEditProductOpen(false)}>
//                       Cancel
//                     </Button>
//                     <Button variant="default" onClick={handleEditProduct}>
//                       Save Changes
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
 
 
 
 
 
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
  BarChart3,
  Package,
  ArrowLeftRight,
  Calendar,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  Building,
  Users,
  CheckCircle2,
  Archive,
  Phone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Initial data for inventory management
const initialProducts = [
  {
    id: 1,
    name: "Cement Portland",
    sku: "CEM-001",
    barcode: "8901234567890",
    unit: "bags",
    hsn: "2523",
    tax: 18,
    serialNumber: "SN12345",
    stock: 250,
    warehouse: "Main Warehouse",
    zone: "A1",
    batchNumber: "B2024-001",
    expiryDate: "2025-12-31",
    reorderLevel: 50,
    maxLevel: 500,
    valuationMethod: "FIFO",
    status: "Active",
    movement: "High",
    category: "Construction Materials",
    price: 350,
    supplier: "Cement Corp Ltd",
    lastPurchaseDate: "2024-05-15",
    lastSaleDate: "2024-05-20",
    avgMonthlyConsumption: 45,
  },
  {
    id: 2,
    name: "Steel Reinforcement Bars",
    sku: "STL-002",
    barcode: "8901234567891",
    unit: "tons",
    hsn: "7214",
    tax: 18,
    serialNumber: "SN12346",
    stock: 42,
    warehouse: "Main Warehouse",
    zone: "B2",
    batchNumber: "B2024-002",
    expiryDate: "2025-10-15",
    reorderLevel: 15,
    maxLevel: 100,
    valuationMethod: "FIFO",
    status: "Active",
    movement: "High",
    category: "Construction Materials",
    price: 55000,
    supplier: "Steel Industries",
    lastPurchaseDate: "2024-05-10",
    lastSaleDate: "2024-05-18",
    avgMonthlyConsumption: 12,
  },
  {
    id: 3,
    name: "Red Clay Bricks",
    sku: "BRK-003",
    barcode: "8901234567892",
    unit: "pcs",
    hsn: "6904",
    tax: 18,
    serialNumber: "SN12347",
    stock: 7800,
    warehouse: "Main Warehouse",
    zone: "C1",
    batchNumber: "B2024-003",
    expiryDate: "2026-05-20",
    reorderLevel: 2000,
    maxLevel: 15000,
    valuationMethod: "FIFO",
    status: "Active",
    movement: "Medium",
    category: "Construction Materials",
    price: 8,
    supplier: "Brick Works Ltd",
    lastPurchaseDate: "2024-05-05",
    lastSaleDate: "2024-05-19",
    avgMonthlyConsumption: 1500,
  },
  {
    id: 4,
    name: "Basmati Rice Premium",
    sku: "RCE-004",
    barcode: "8901234567893",
    unit: "kg",
    hsn: "1006",
    tax: 5,
    serialNumber: "SN12348",
    stock: 120,
    warehouse: "Restaurant Warehouse",
    zone: "F1",
    batchNumber: "B2024-004",
    expiryDate: "2025-08-10",
    reorderLevel: 50,
    maxLevel: 300,
    valuationMethod: "FIFO",
    status: "Active",
    movement: "High",
    category: "Food & Beverages",
    price: 60,
    supplier: "Rice Mills Co",
    lastPurchaseDate: "2024-05-12",
    lastSaleDate: "2024-05-21",
    avgMonthlyConsumption: 80,
  },
  {
    id: 5,
    name: "Sunflower Cooking Oil",
    sku: "OIL-005",
    barcode: "8901234567894",
    unit: "ltr",
    hsn: "1512",
    tax: 5,
    serialNumber: "SN12349",
    stock: 80,
    warehouse: "Restaurant Warehouse",
    zone: "F2",
    batchNumber: "B2024-005",
    expiryDate: "2026-02-28",
    reorderLevel: 30,
    maxLevel: 200,
    valuationMethod: "FIFO",
    status: "Active",
    movement: "Medium",
    category: "Food & Beverages",
    price: 120,
    supplier: "Oil Refinery Ltd",
    lastPurchaseDate: "2024-05-08",
    lastSaleDate: "2024-05-20",
    avgMonthlyConsumption: 25,
  },
  {
    id: 6,
    name: "Fresh Chicken",
    sku: "CHK-006",
    barcode: "8901234567895",
    unit: "kg",
    hsn: "0207",
    tax: 5,
    serialNumber: "SN12350",
    stock: 35,
    warehouse: "Restaurant Warehouse",
    zone: "F3",
    batchNumber: "B2024-006",
    expiryDate: "2024-06-20",
    reorderLevel: 15,
    maxLevel: 100,
    valuationMethod: "FIFO",
    status: "Low Stock",
    movement: "High",
    category: "Food & Beverages",
    price: 180,
    supplier: "Poultry Farm",
    lastPurchaseDate: "2024-05-22",
    lastSaleDate: "2024-05-22",
    avgMonthlyConsumption: 60,
  },
  {
    id: 7,
    name: "Acrylic Wall Paint",
    sku: "PNT-007",
    barcode: "8901234567896",
    unit: "ltr",
    hsn: "3208",
    tax: 18,
    serialNumber: "SN12351",
    stock: 50,
    warehouse: "Main Warehouse",
    zone: "D1",
    batchNumber: "B2024-007",
    expiryDate: "2026-03-10",
    reorderLevel: 20,
    maxLevel: 150,
    valuationMethod: "FIFO",
    status: "Active",
    movement: "Medium",
    category: "Construction Materials",
    price: 250,
    supplier: "Paint Industries",
    lastPurchaseDate: "2024-05-14",
    lastSaleDate: "2024-05-17",
    avgMonthlyConsumption: 18,
  },
  {
    id: 8,
    name: "Mixed Vegetables",
    sku: "VEG-008",
    barcode: "8901234567897",
    unit: "kg",
    hsn: "0706",
    tax: 0,
    serialNumber: "SN12352",
    stock: 25,
    warehouse: "Restaurant Warehouse",
    zone: "F4",
    batchNumber: "B2024-008",
    expiryDate: "2024-05-25",
    reorderLevel: 20,
    maxLevel: 80,
    valuationMethod: "FIFO",
    status: "Low Stock",
    movement: "High",
    category: "Food & Beverages",
    price: 40,
    supplier: "Fresh Farms",
    lastPurchaseDate: "2024-05-23",
    lastSaleDate: "2024-05-23",
    avgMonthlyConsumption: 35,
  },
]

const initialWarehouses = [
  {
    id: 1,
    name: "Main Warehouse",
    location: "New Delhi",
    address: "Plot 123, Industrial Area, New Delhi - 110001",
    manager: "Rajesh Kumar",
    phone: "+91-9876543210",
    email: "rajesh@company.com",
    capacity: 10000,
    currentUtilization: 7500,
    zones: ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2"],
    categories: ["Construction Materials", "Equipment", "Tools"],
    status: "Active",
  },
  {
    id: 2,
    name: "Restaurant Warehouse",
    location: "Mumbai",
    address: "Shop 45, Food Complex, Mumbai - 400001",
    manager: "Priya Sharma",
    phone: "+91-9876543211",
    email: "priya@company.com",
    capacity: 2000,
    currentUtilization: 1200,
    zones: ["F1", "F2", "F3", "F4", "B1", "B2"],
    categories: ["Food & Beverages", "Kitchen Equipment", "Utensils"],
    status: "Active",
  },
  {
    id: 3,
    name: "Secondary Warehouse",
    location: "Bangalore",
    address: "Building 67, Tech Park, Bangalore - 560001",
    manager: "Amit Patel",
    phone: "+91-9876543212",
    email: "amit@company.com",
    capacity: 5000,
    currentUtilization: 2800,
    zones: ["S1", "S2", "S3", "S4"],
    categories: ["Construction Materials", "Food & Beverages", "Miscellaneous"],
    status: "Active",
  },
]

const initialTransfers = [
  {
    id: 1,
    transferNumber: "TRF-2024-001",
    date: "2024-05-15",
    product: "Cement Portland",
    sku: "CEM-001",
    quantity: 50,
    unit: "bags",
    fromWarehouse: "Main Warehouse",
    toWarehouse: "Secondary Warehouse",
    fromZone: "A1",
    toZone: "S1",
    status: "Completed",
    requestedBy: "Site Manager",
    approvedBy: "Warehouse Manager",
    transportMode: "Truck",
    estimatedDelivery: "2024-05-16",
    actualDelivery: "2024-05-16",
    cost: 2500,
    reason: "Site requirement",
  },
  {
    id: 2,
    transferNumber: "TRF-2024-002",
    date: "2024-05-20",
    product: "Basmati Rice Premium",
    sku: "RCE-004",
    quantity: 100,
    unit: "kg",
    fromWarehouse: "Restaurant Warehouse",
    toWarehouse: "Secondary Warehouse",
    fromZone: "F1",
    toZone: "S2",
    status: "In Transit",
    requestedBy: "Restaurant Manager",
    approvedBy: "Operations Head",
    transportMode: "Van",
    estimatedDelivery: "2024-05-21",
    actualDelivery: null,
    cost: 800,
    reason: "Branch requirement",
  },
  {
    id: 3,
    transferNumber: "TRF-2024-003",
    date: "2024-05-22",
    product: "Steel Reinforcement Bars",
    sku: "STL-002",
    quantity: 15,
    unit: "tons",
    fromWarehouse: "Main Warehouse",
    toWarehouse: "Secondary Warehouse",
    fromZone: "B2",
    toZone: "S3",
    status: "Pending Approval",
    requestedBy: "Project Manager",
    approvedBy: null,
    transportMode: "Heavy Truck",
    estimatedDelivery: "2024-05-25",
    actualDelivery: null,
    cost: 15000,
    reason: "Project requirement",
  },
]

const initialStockMovements = [
  {
    id: 1,
    date: "2024-05-10",
    product: "Cement Portland",
    sku: "CEM-001",
    type: "Purchase",
    quantity: 100,
    unit: "bags",
    warehouse: "Main Warehouse",
    zone: "A1",
    batchNumber: "B2024-001",
    reference: "PO-2024-001",
    supplier: "Cement Corp Ltd",
    rate: 350,
    value: 35000,
    user: "Purchase Manager",
  },
  {
    id: 2,
    date: "2024-05-15",
    product: "Cement Portland",
    sku: "CEM-001",
    type: "Sale",
    quantity: -20,
    unit: "bags",
    warehouse: "Main Warehouse",
    zone: "A1",
    batchNumber: "B2024-001",
    reference: "SO-2024-001",
    customer: "ABC Construction",
    rate: 380,
    value: -7600,
    user: "Sales Executive",
  },
  {
    id: 3,
    date: "2024-05-05",
    product: "Basmati Rice Premium",
    sku: "RCE-004",
    type: "Purchase",
    quantity: 200,
    unit: "kg",
    warehouse: "Restaurant Warehouse",
    zone: "F1",
    batchNumber: "B2024-004",
    reference: "PO-2024-002",
    supplier: "Rice Mills Co",
    rate: 60,
    value: 12000,
    user: "Restaurant Manager",
  },
  {
    id: 4,
    date: "2024-05-10",
    product: "Basmati Rice Premium",
    sku: "RCE-004",
    type: "Sale",
    quantity: -50,
    unit: "kg",
    warehouse: "Restaurant Warehouse",
    zone: "F1",
    batchNumber: "B2024-004",
    reference: "SO-2024-002",
    customer: "Hotel Grand",
    rate: 75,
    value: -3750,
    user: "Sales Executive",
  },
  {
    id: 5,
    date: "2024-05-15",
    product: "Steel Reinforcement Bars",
    sku: "STL-002",
    type: "Purchase",
    quantity: 30,
    unit: "tons",
    warehouse: "Main Warehouse",
    zone: "B2",
    batchNumber: "B2024-002",
    reference: "PO-2024-003",
    supplier: "Steel Industries",
    rate: 55000,
    value: 1650000,
    user: "Purchase Manager",
  },
  {
    id: 6,
    date: "2024-05-20",
    product: "Steel Reinforcement Bars",
    sku: "STL-002",
    type: "Sale",
    quantity: -8,
    unit: "tons",
    warehouse: "Main Warehouse",
    zone: "B2",
    batchNumber: "B2024-002",
    reference: "SO-2024-003",
    customer: "XYZ Builders",
    rate: 58000,
    value: -464000,
    user: "Sales Executive",
  },
]

const categories = ["Construction Materials", "Food & Beverages", "Equipment", "Tools", "Kitchen Equipment", "Utensils"]
const valuationMethods = ["FIFO", "LIFO", "Weighted Average"]
const units = ["pcs", "kg", "ltr", "tons", "bags", "boxes", "meters", "sq ft"]

export default function InventoryManagement() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [products, setProducts] = useState(initialProducts)
  const [warehouses, setWarehouses] = useState(initialWarehouses)
  const [transfers, setTransfers] = useState(initialTransfers)
  const [stockMovements, setStockMovements] = useState(initialStockMovements)
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  // Modal states
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isEditProductOpen, setIsEditProductOpen] = useState(false)
  const [isAddWarehouseOpen, setIsAddWarehouseOpen] = useState(false)
  const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false)
  const [isStockAdjustmentOpen, setIsStockAdjustmentOpen] = useState(false)
  const [isViewProductOpen, setIsViewProductOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Selected items
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedWarehouse, setSelectedWarehouse] = useState(null)

  // Filter states
  const [filterCategory, setFilterCategory] = useState("All")
  const [filterWarehouse, setFilterWarehouse] = useState("All")
  const [filterStatus, setFilterStatus] = useState("All")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" })

  // Form states
  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "",
    barcode: "",
    unit: "pcs",
    hsn: "",
    tax: 18,
    serialNumber: "",
    stock: 0,
    warehouse: "Main Warehouse",
    zone: "A1",
    batchNumber: "",
    expiryDate: "",
    reorderLevel: 10,
    maxLevel: 100,
    valuationMethod: "FIFO",
    category: "Construction Materials",
    price: 0,
    supplier: "",
  })

  const [newWarehouse, setNewWarehouse] = useState({
    name: "",
    location: "",
    address: "",
    manager: "",
    phone: "",
    email: "",
    capacity: 1000,
    zones: [""],
    categories: [],
  })

  const [newTransfer, setNewTransfer] = useState({
    product: "",
    sku: "",
    quantity: 1,
    fromWarehouse: "Main Warehouse",
    toWarehouse: "Restaurant Warehouse",
    fromZone: "",
    toZone: "",
    date: new Date().toISOString().split("T")[0],
    reason: "",
    transportMode: "Truck",
  })

  const [stockAdjustment, setStockAdjustment] = useState({
    product: "",
    sku: "",
    quantity: 0,
    type: "Addition",
    reason: "",
    warehouse: "Main Warehouse",
    zone: "",
    date: new Date().toISOString().split("T")[0],
  })

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  // Filter and sort products
  const getFilteredAndSortedProducts = () => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.barcode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = filterCategory === "All" || product.category === filterCategory
      const matchesWarehouse = filterWarehouse === "All" || product.warehouse === filterWarehouse
      const matchesStatus = filterStatus === "All" || product.status === filterStatus

      return matchesSearch && matchesCategory && matchesWarehouse && matchesStatus
    })

    // Sort products
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1
        }
        return 0
      })
    }

    return filtered
  }

  const filteredProducts = getFilteredAndSortedProducts()

  // Calculate inventory metrics
  const lowStockProducts = products.filter((product) => product.stock <= product.reorderLevel)
  const outOfStockProducts = products.filter((product) => product.stock === 0)
  const expiringProducts = products.filter((product) => {
    const expiryDate = new Date(product.expiryDate)
    const today = new Date()
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(today.getDate() + 30)
    return expiryDate <= thirtyDaysFromNow && expiryDate >= today
  })

  const totalInventoryValue = products.reduce((total, product) => total + product.stock * product.price, 0)
  const totalProducts = products.length
  const activeProducts = products.filter((p) => p.status === "Active").length

  // Handle refresh
  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 1500)
  }

  // Handle sort
  const handleSort = (key) => {
    let direction = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200"
      case "Low Stock":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "Out of Stock":
        return "bg-red-100 text-red-800 border-red-200"
      case "Inactive":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-blue-100 text-blue-800 border-blue-200"
    }
  }

  // Get movement color
  const getMovementColor = (movement) => {
    switch (movement) {
      case "High":
        return "text-green-600"
      case "Medium":
        return "text-amber-600"
      case "Low":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  // Handle add product
  const handleAddProduct = () => {
    const id = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1
    const status = newProduct.stock <= newProduct.reorderLevel ? "Low Stock" : "Active"

    const productToAdd = {
      ...newProduct,
      id,
      status,
      movement: "Low",
      lastPurchaseDate: new Date().toISOString().split("T")[0],
      lastSaleDate: null,
      avgMonthlyConsumption: 0,
    }

    setProducts([...products, productToAdd])
    setIsAddProductOpen(false)
    resetNewProduct()
  }

  // Handle edit product
  const handleEditProduct = () => {
    const updatedProducts = products.map((product) =>
      product.id === selectedProduct.id
        ? {
            ...selectedProduct,
            status: selectedProduct.stock <= selectedProduct.reorderLevel ? "Low Stock" : "Active",
          }
        : product,
    )

    setProducts(updatedProducts)
    setIsEditProductOpen(false)
    setSelectedProduct(null)
  }

  // Handle delete product
  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((product) => product.id !== id))
    }
  }

  // Handle add warehouse
  const handleAddWarehouse = () => {
    const id = warehouses.length > 0 ? Math.max(...warehouses.map((w) => w.id)) + 1 : 1

    const warehouseToAdd = {
      ...newWarehouse,
      id,
      currentUtilization: 0,
      status: "Active",
    }

    setWarehouses([...warehouses, warehouseToAdd])
    setIsAddWarehouseOpen(false)
    resetNewWarehouse()
  }

  // Handle create transfer
  const handleCreateTransfer = () => {
    const id = transfers.length > 0 ? Math.max(...transfers.map((t) => t.id)) + 1 : 1
    const transferNumber = `TRF-2024-${String(id).padStart(3, "0")}`

    const transferToAdd = {
      ...newTransfer,
      id,
      transferNumber,
      status: "Pending Approval",
      requestedBy: "Current User",
      approvedBy: null,
      estimatedDelivery: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      actualDelivery: null,
      cost: 0,
    }

    setTransfers([...transfers, transferToAdd])
    setIsTransferDialogOpen(false)
    resetNewTransfer()
  }

  // Handle stock adjustment
  const handleStockAdjustment = () => {
    const adjustmentQuantity =
      stockAdjustment.type === "Addition" ? stockAdjustment.quantity : -stockAdjustment.quantity

    // Update product stock
    const updatedProducts = products.map((product) => {
      if (product.sku === stockAdjustment.sku && product.warehouse === stockAdjustment.warehouse) {
        const newStock = Math.max(0, product.stock + adjustmentQuantity)
        const status = newStock === 0 ? "Out of Stock" : newStock <= product.reorderLevel ? "Low Stock" : "Active"
        return { ...product, stock: newStock, status }
      }
      return product
    })

    // Add stock movement record
    const movementId = stockMovements.length > 0 ? Math.max(...stockMovements.map((m) => m.id)) + 1 : 1
    const product = products.find((p) => p.sku === stockAdjustment.sku)

    const newStockMovement = {
      id: movementId,
      date: stockAdjustment.date,
      product: product?.name || "",
      sku: stockAdjustment.sku,
      type: stockAdjustment.type === "Addition" ? "Stock Addition" : "Stock Reduction",
      quantity: adjustmentQuantity,
      unit: product?.unit || "",
      warehouse: stockAdjustment.warehouse,
      zone: stockAdjustment.zone,
      reference: `ADJ-${movementId}`,
      reason: stockAdjustment.reason,
      rate: product?.price || 0,
      value: adjustmentQuantity * (product?.price || 0),
      user: "Current User",
    }

    setProducts(updatedProducts)
    setStockMovements([...stockMovements, newStockMovement])
    setIsStockAdjustmentOpen(false)
    resetStockAdjustment()
  }

  // Reset form functions
  const resetNewProduct = () => {
    setNewProduct({
      name: "",
      sku: "",
      barcode: "",
      unit: "pcs",
      hsn: "",
      tax: 18,
      serialNumber: "",
      stock: 0,
      warehouse: "Main Warehouse",
      zone: "A1",
      batchNumber: "",
      expiryDate: "",
      reorderLevel: 10,
      maxLevel: 100,
      valuationMethod: "FIFO",
      category: "Construction Materials",
      price: 0,
      supplier: "",
    })
  }

  const resetNewWarehouse = () => {
    setNewWarehouse({
      name: "",
      location: "",
      address: "",
      manager: "",
      phone: "",
      email: "",
      capacity: 1000,
      zones: [""],
      categories: [],
    })
  }

  const resetNewTransfer = () => {
    setNewTransfer({
      product: "",
      sku: "",
      quantity: 1,
      fromWarehouse: "Main Warehouse",
      toWarehouse: "Restaurant Warehouse",
      fromZone: "",
      toZone: "",
      date: new Date().toISOString().split("T")[0],
      reason: "",
      transportMode: "Truck",
    })
  }

  const resetStockAdjustment = () => {
    setStockAdjustment({
      product: "",
      sku: "",
      quantity: 0,
      type: "Addition",
      reason: "",
      warehouse: "Main Warehouse",
      zone: "",
      date: new Date().toISOString().split("T")[0],
    })
  }

  // Export functions
  const handleExportProducts = () => {
    const headers = [
      "Name",
      "SKU",
      "Barcode",
      "Stock",
      "Unit",
      "Warehouse",
      "Zone",
      "Category",
      "Status",
      "Reorder Level",
      "Price",
      "Value",
    ]

    const csvContent = [
      headers.join(","),
      ...products.map((product) =>
        [
          product.name,
          product.sku,
          product.barcode,
          product.stock,
          product.unit,
          product.warehouse,
          product.zone,
          product.category,
          product.status,
          product.reorderLevel,
          product.price,
          product.stock * product.price,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "inventory_products.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Reset filters
  const resetFilters = () => {
    setFilterCategory("All")
    setFilterWarehouse("All")
    setFilterStatus("All")
    setSearchTerm("")
    setIsFilterOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
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
            <span>Refreshing inventory data...</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Inventory & Stock Management</h1>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop controls */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search inventory..."
                  className="pl-8 pr-4 py-2 w-64 rounded-md bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing}>
                <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-200"
          >
            <div className="px-4 py-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search inventory..."
                  className="pl-8 pr-4 py-2 w-full rounded-md bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing} className="w-full">
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tab Navigation */}
          <div className="mb-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8 bg-white border border-gray-200">
              <TabsTrigger
                value="dashboard"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger
                value="products"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                <Package className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Products</span>
              </TabsTrigger>
              <TabsTrigger value="stock" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                <TrendingUp className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Stock</span>
              </TabsTrigger>
              <TabsTrigger
                value="warehouses"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                <Building className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Warehouses</span>
              </TabsTrigger>
              <TabsTrigger
                value="transfers"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                <ArrowLeftRight className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Transfers</span>
              </TabsTrigger>
              <TabsTrigger value="batches" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Batches</span>
              </TabsTrigger>
              <TabsTrigger value="reorder" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                <AlertTriangle className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Reorder</span>
              </TabsTrigger>
              <TabsTrigger
                value="valuation"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                <DollarSign className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Valuation</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 animate-pulse">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-sm font-medium text-gray-500">Total Products</CardTitle>
                        <div className="p-2 bg-blue-50 rounded-full">
                          <Package className="h-4 w-4 text-blue-600" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-900">{totalProducts}</div>
                      <div className="text-xs text-green-600 mt-1">{activeProducts} active products</div>
                    </CardContent>
                  </Card>

                  <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-sm font-medium text-gray-500">Low Stock Items</CardTitle>
                        <div className="p-2 bg-amber-50 rounded-full">
                          <AlertTriangle className="h-4 w-4 text-amber-600" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-900">{lowStockProducts.length}</div>
                      <div className="text-xs text-amber-600 mt-1">
                        {Math.round((lowStockProducts.length / totalProducts) * 100)}% of inventory
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-sm font-medium text-gray-500">Inventory Value</CardTitle>
                        <div className="p-2 bg-green-50 rounded-full">
                          <DollarSign className="h-4 w-4 text-green-600" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-900">₹{totalInventoryValue.toLocaleString()}</div>
                      <div className="text-xs text-green-600 mt-1">
                        Across {products.reduce((acc, p) => acc + p.stock, 0)} items
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-sm font-medium text-gray-500">Warehouses</CardTitle>
                        <div className="p-2 bg-purple-50 rounded-full">
                          <Building className="h-4 w-4 text-purple-600" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-900">{warehouses.length}</div>
                      <div className="text-xs text-purple-600 mt-1">
                        {warehouses.reduce((acc, w) => acc + w.capacity, 0).toLocaleString()} total capacity
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Alert Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Low Stock Alert */}
                  <Card className="border border-amber-200 bg-amber-50">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-amber-800 flex items-center">
                        <AlertTriangle className="h-5 w-5 mr-2" />
                        Low Stock Alert
                      </CardTitle>
                      <CardDescription className="text-amber-700">
                        {lowStockProducts.length} items below reorder level
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {lowStockProducts.slice(0, 5).map((product) => (
                          <div key={product.id} className="flex justify-between items-center p-2 bg-white rounded">
                            <div>
                              <div className="font-medium text-gray-900">{product.name}</div>
                              <div className="text-sm text-gray-600">
                                {product.stock} {product.unit} (Min: {product.reorderLevel})
                              </div>
                            </div>
                            <Badge variant="outline" className="text-amber-700 border-amber-300">
                              Low
                            </Badge>
                          </div>
                        ))}
                        {lowStockProducts.length > 5 && (
                          <div className="text-center text-sm text-amber-700 pt-2">
                            +{lowStockProducts.length - 5} more items
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Expiring Products */}
                  <Card className="border border-red-200 bg-red-50">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-red-800 flex items-center">
                        <Calendar className="h-5 w-5 mr-2" />
                        Expiring Soon
                      </CardTitle>
                      <CardDescription className="text-red-700">
                        {expiringProducts.length} items expiring within 30 days
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {expiringProducts.slice(0, 5).map((product) => (
                          <div key={product.id} className="flex justify-between items-center p-2 bg-white rounded">
                            <div>
                              <div className="font-medium text-gray-900">{product.name}</div>
                              <div className="text-sm text-gray-600">Expires: {product.expiryDate}</div>
                            </div>
                            <Badge variant="outline" className="text-red-700 border-red-300">
                              Expiring
                            </Badge>
                          </div>
                        ))}
                        {expiringProducts.length > 5 && (
                          <div className="text-center text-sm text-red-700 pt-2">
                            +{expiringProducts.length - 5} more items
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Stock Movements */}
                  <Card className="border border-blue-200 bg-blue-50">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-blue-800 flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2" />
                        Recent Movements
                      </CardTitle>
                      <CardDescription className="text-blue-700">Latest stock transactions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {stockMovements
                          .slice(-5)
                          .reverse()
                          .map((movement) => (
                            <div key={movement.id} className="flex justify-between items-center p-2 bg-white rounded">
                              <div>
                                <div className="font-medium text-gray-900">{movement.product}</div>
                                <div className="text-sm text-gray-600">
                                  {movement.type}: {Math.abs(movement.quantity)} {movement.unit}
                                </div>
                              </div>
                              <div className="text-right">
                                <div
                                  className={`text-sm font-medium ${
                                    movement.quantity > 0 ? "text-green-600" : "text-red-600"
                                  }`}
                                >
                                  {movement.quantity > 0 ? "+" : ""}
                                  {movement.quantity}
                                </div>
                                <div className="text-xs text-gray-500">{movement.date}</div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Warehouse Utilization */}
                <Card className="border border-gray-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900">Warehouse Utilization</CardTitle>
                    <CardDescription>Current capacity usage across all warehouses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {warehouses.map((warehouse) => {
                        const utilizationPercentage = Math.round(
                          (warehouse.currentUtilization / warehouse.capacity) * 100,
                        )
                        return (
                          <div key={warehouse.id} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium text-gray-900">{warehouse.name}</div>
                                <div className="text-sm text-gray-600">{warehouse.location}</div>
                              </div>
                              <div className="text-right">
                                <div className="font-medium text-gray-900">{utilizationPercentage}%</div>
                                <div className="text-sm text-gray-600">
                                  {warehouse.currentUtilization.toLocaleString()} /{" "}
                                  {warehouse.capacity.toLocaleString()}
                                </div>
                              </div>
                            </div>
                            <Progress value={utilizationPercentage} className="h-2" />
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            {/* Products Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Product Master</h2>
                <p className="text-gray-600">Manage your product inventory and details</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" onClick={handleExportProducts}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button size="sm" onClick={() => setIsAddProductOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </div>
            </div>

            {/* Filters */}
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white border border-gray-200 rounded-lg p-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <Select value={filterCategory} onValueChange={setFilterCategory}>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All">All Categories</SelectItem>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Warehouse</label>
                      <Select value={filterWarehouse} onValueChange={setFilterWarehouse}>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="All Warehouses" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All">All Warehouses</SelectItem>
                          {warehouses.map((warehouse) => (
                            <SelectItem key={warehouse.id} value={warehouse.name}>
                              {warehouse.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All">All Statuses</SelectItem>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Low Stock">Low Stock</SelectItem>
                          <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" size="sm" onClick={resetFilters}>
                      Reset
                    </Button>
                    <Button size="sm" onClick={() => setIsFilterOpen(false)}>
                      Apply Filters
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Products Table */}
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort("name")}
                        >
                          <div className="flex items-center">
                            Product
                            <ArrowUpDown className="ml-1 h-3 w-3" />
                          </div>
                        </th>
                        <th
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort("sku")}
                        >
                          <div className="flex items-center">
                            SKU/Barcode
                            <ArrowUpDown className="ml-1 h-3 w-3" />
                          </div>
                        </th>
                        <th
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort("stock")}
                        >
                          <div className="flex items-center">
                            Stock
                            <ArrowUpDown className="ml-1 h-3 w-3" />
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Location
                        </th>
                        <th
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort("category")}
                        >
                          <div className="flex items-center">
                            Category
                            <ArrowUpDown className="ml-1 h-3 w-3" />
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Value
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                              <div className="text-xs text-gray-500">SN: {product.serialNumber}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{product.sku}</div>
                            <div className="text-xs text-gray-500">{product.barcode}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {product.stock} {product.unit}
                            </div>
                            <div className="text-xs text-gray-500">Min: {product.reorderLevel}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{product.warehouse}</div>
                            <div className="text-xs text-gray-500">Zone: {product.zone}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{product.category}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={getStatusColor(product.status)}>{product.status}</Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              ₹{(product.stock * product.price).toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500">@ ₹{product.price}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedProduct(product)
                                  setIsViewProductOpen(true)
                                }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedProduct(product)
                                  setIsEditProductOpen(true)
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filteredProducts.length === 0 && (
                  <div className="text-center py-12">
                    <Package className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      No products match your current search and filter criteria.
                    </p>
                    <div className="mt-6">
                      <Button onClick={() => setIsAddProductOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add your first product
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Stock Movements Tab */}
          <TabsContent value="stock" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Stock Movements</h2>
                <p className="text-gray-600">Track all stock in and out transactions</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setIsStockAdjustmentOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Stock Adjustment
                </Button>
              </div>
            </div>

            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Location
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Reference
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Value
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {stockMovements
                        .slice()
                        .reverse()
                        .map((movement) => (
                          <tr key={movement.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{movement.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{movement.product}</div>
                              <div className="text-xs text-gray-500">{movement.sku}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge
                                className={
                                  movement.type.includes("Purchase") || movement.type.includes("Addition")
                                    ? "bg-green-100 text-green-800 border-green-200"
                                    : movement.type.includes("Sale") || movement.type.includes("Reduction")
                                      ? "bg-red-100 text-red-800 border-red-200"
                                      : "bg-blue-100 text-blue-800 border-blue-200"
                                }
                              >
                                {movement.type}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div
                                className={`text-sm font-medium ${
                                  movement.quantity > 0 ? "text-green-600" : "text-red-600"
                                }`}
                              >
                                {movement.quantity > 0 ? "+" : ""}
                                {movement.quantity} {movement.unit}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{movement.warehouse}</div>
                              <div className="text-xs text-gray-500">Zone: {movement.zone}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{movement.reference}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div
                                className={`text-sm font-medium ${
                                  movement.value > 0 ? "text-green-600" : "text-red-600"
                                }`}
                              >
                                ₹{Math.abs(movement.value).toLocaleString()}
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Warehouses Tab */}
          <TabsContent value="warehouses" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Warehouse Management</h2>
                <p className="text-gray-600">Manage warehouse locations and zones</p>
              </div>
              <Button size="sm" onClick={() => setIsAddWarehouseOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Warehouse
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {warehouses.map((warehouse) => {
                const utilizationPercentage = Math.round((warehouse.currentUtilization / warehouse.capacity) * 100)
                return (
                  <Card
                    key={warehouse.id}
                    className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg font-semibold text-gray-900">{warehouse.name}</CardTitle>
                          <CardDescription className="text-gray-600">{warehouse.location}</CardDescription>
                        </div>
                        <Badge className="bg-green-100 text-green-800 border-green-200">{warehouse.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700">Capacity Utilization</span>
                          <span className="text-sm text-gray-600">{utilizationPercentage}%</span>
                        </div>
                        <Progress value={utilizationPercentage} className="h-2" />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>{warehouse.currentUtilization.toLocaleString()} used</span>
                          <span>{warehouse.capacity.toLocaleString()} total</span>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-2">Contact Information</div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Users className="h-3 w-3 mr-2" />
                            {warehouse.manager}
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-3 w-3 mr-2" />
                            {warehouse.phone}
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-2">Zones</div>
                        <div className="flex flex-wrap gap-1">
                          {warehouse.zones.slice(0, 4).map((zone, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {zone}
                            </Badge>
                          ))}
                          {warehouse.zones.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{warehouse.zones.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-2">Categories</div>
                        <div className="flex flex-wrap gap-1">
                          {warehouse.categories.slice(0, 2).map((category, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {category}
                            </Badge>
                          ))}
                          {warehouse.categories.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{warehouse.categories.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Transfers Tab */}
          <TabsContent value="transfers" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Stock Transfers</h2>
                <p className="text-gray-600">Manage transfers between warehouses</p>
              </div>
              <Button size="sm" onClick={() => setIsTransferDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Transfer
              </Button>
            </div>

            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Transfer #
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          From → To
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {transfers.map((transfer) => (
                        <tr key={transfer.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {transfer.transferNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{transfer.product}</div>
                            <div className="text-xs text-gray-500">{transfer.sku}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {transfer.fromWarehouse} → {transfer.toWarehouse}
                            </div>
                            <div className="text-xs text-gray-500">
                              {transfer.fromZone} → {transfer.toZone}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {transfer.quantity} {transfer.unit}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge
                              className={
                                transfer.status === "Completed"
                                  ? "bg-green-100 text-green-800 border-green-200"
                                  : transfer.status === "In Transit"
                                    ? "bg-blue-100 text-blue-800 border-blue-200"
                                    : "bg-amber-100 text-amber-800 border-amber-200"
                              }
                            >
                              {transfer.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transfer.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Batches & Expiry Tab */}
          <TabsContent value="batches" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Batches & Expiry Management</h2>
              <p className="text-gray-600">Track batch numbers and expiry dates</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Expiring Soon */}
              <Card className="border border-red-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-red-800 flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Expiring Soon
                  </CardTitle>
                  <CardDescription>Products expiring within 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {expiringProducts.map((product) => (
                      <div key={product.id} className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-600">
                            Batch: {product.batchNumber} | Stock: {product.stock} {product.unit}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-red-600">{product.expiryDate}</div>
                          <div className="text-xs text-gray-500">{product.warehouse}</div>
                        </div>
                      </div>
                    ))}
                    {expiringProducts.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Calendar className="mx-auto h-8 w-8 mb-2" />
                        <p>No products expiring soon</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* All Batches */}
              <Card className="border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                    <Archive className="h-5 w-5 mr-2" />
                    All Batches
                  </CardTitle>
                  <CardDescription>Complete batch tracking information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {products.map((product) => (
                      <div key={product.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-600">Batch: {product.batchNumber}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-900">{product.expiryDate}</div>
                          <div className="text-xs text-gray-500">
                            {product.stock} {product.unit}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reorder Levels Tab */}
          <TabsContent value="reorder" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Reorder Level Management</h2>
              <p className="text-gray-600">Monitor and manage minimum stock levels</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Low Stock Alert */}
              <Card className="border border-amber-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-amber-800 flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Low Stock Alert
                  </CardTitle>
                  <CardDescription>Products below reorder level</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {lowStockProducts.map((product) => (
                      <div key={product.id} className="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-600">
                            Current: {product.stock} {product.unit} | Min: {product.reorderLevel} {product.unit}
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="text-amber-700 border-amber-300">
                            Reorder Now
                          </Badge>
                          <div className="text-xs text-gray-500 mt-1">{product.warehouse}</div>
                        </div>
                      </div>
                    ))}
                    {lowStockProducts.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <CheckCircle2 className="mx-auto h-8 w-8 mb-2 text-green-500" />
                        <p>All products are above reorder level</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Reorder Suggestions */}
              <Card className="border border-blue-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-blue-800 flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Reorder Suggestions
                  </CardTitle>
                  <CardDescription>Based on consumption patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {products
                      .filter((product) => product.avgMonthlyConsumption > 0)
                      .slice(0, 5)
                      .map((product) => {
                        const daysOfStock = Math.floor(product.stock / (product.avgMonthlyConsumption / 30))
                        const suggestedOrder = Math.max(
                          product.reorderLevel * 2 - product.stock,
                          product.avgMonthlyConsumption,
                        )
                        return (
                          <div key={product.id} className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                            <div>
                              <div className="font-medium text-gray-900">{product.name}</div>
                              <div className="text-sm text-gray-600">{daysOfStock} days of stock remaining</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium text-blue-600">
                                Order: {suggestedOrder} {product.unit}
                              </div>
                              <div className="text-xs text-gray-500">Suggested</div>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Valuation Tab */}
          <TabsContent value="valuation" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Inventory Valuation</h2>
                <p className="text-gray-600">Calculate inventory value using different methods</p>
              </div>
              <Select defaultValue="FIFO">
                <SelectTrigger className="w-48 bg-white">
                  <SelectValue placeholder="Valuation Method" />
                </SelectTrigger>
                <SelectContent>
                  {valuationMethods.map((method) => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">Total Inventory Value</CardTitle>
                  <CardDescription>Current market value</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">₹{totalInventoryValue.toLocaleString()}</div>
                  <div className="text-sm text-green-600 mt-2 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +5.2% from last month
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">Average Unit Cost</CardTitle>
                  <CardDescription>Weighted average</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">
                    ₹{Math.round(totalInventoryValue / products.reduce((acc, p) => acc + p.stock, 0)).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 mt-2">Per unit across all products</div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">Turnover Ratio</CardTitle>
                  <CardDescription>Inventory efficiency</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">4.2x</div>
                  <div className="text-sm text-gray-600 mt-2">Times per year</div>
                </CardContent>
              </Card>
            </div>

            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Valuation by Category</CardTitle>
                <CardDescription>Breakdown of inventory value by product category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categories.map((category) => {
                    const categoryProducts = products.filter((p) => p.category === category)
                    const categoryValue = categoryProducts.reduce((sum, p) => sum + p.stock * p.price, 0)
                    const percentage = Math.round((categoryValue / totalInventoryValue) * 100)

                    return (
                      <div key={category} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium text-gray-900">{category}</div>
                            <div className="text-sm text-gray-600">{categoryProducts.length} products</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-gray-900">₹{categoryValue.toLocaleString()}</div>
                            <div className="text-sm text-gray-600">{percentage}%</div>
                          </div>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Product Modal */}
      <AnimatePresence>
        {isAddProductOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setIsAddProductOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Add New Product</h3>
                <Button variant="ghost" size="sm" onClick={() => setIsAddProductOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                  <input
                    type="text"
                    className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter product name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SKU *</label>
                  <input
                    type="text"
                    className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter SKU"
                    value={newProduct.sku}
                    onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Barcode</label>
                  <input
                    type="text"
                    className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter barcode"
                    value={newProduct.barcode}
                    onChange={(e) => setNewProduct({ ...newProduct, barcode: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Serial Number</label>
                  <input
                    type="text"
                    className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter serial number"
                    value={newProduct.serialNumber}
                    onChange={(e) => setNewProduct({ ...newProduct, serialNumber: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <Select
                    value={newProduct.category}
                    onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit *</label>
                  <Select
                    value={newProduct.unit}
                    onValueChange={(value) => setNewProduct({ ...newProduct, unit: value })}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {units.map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Warehouse *</label>
                  <Select
                    value={newProduct.warehouse}
                    onValueChange={(value) => setNewProduct({ ...newProduct, warehouse: value })}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select warehouse" />
                    </SelectTrigger>
                    <SelectContent>
                      {warehouses.map((warehouse) => (
                        <SelectItem key={warehouse.id} value={warehouse.name}>
                          {warehouse.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Zone</label>
                  <input
                    type="text"
                    className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. A1, B2, C3"
                    value={newProduct.zone}
                    onChange={(e) => setNewProduct({ ...newProduct, zone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Initial Stock *</label>
                  <input
                    type="number"
                    className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter initial stock"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: Number.parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reorder Level *</label>
                  <input
                    type="number"
                    className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter reorder level"
                    value={newProduct.reorderLevel}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, reorderLevel: Number.parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Level</label>
                  <input
                    type="number"
                    className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter max level"
                    value={newProduct.maxLevel}
                    onChange={(e) => setNewProduct({ ...newProduct, maxLevel: Number.parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                  <input
                    type="number"
                    className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number.parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">HSN Code</label>
                  <input
                    type="text"
                    className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter HSN code"
                    value={newProduct.hsn}
                    onChange={(e) => setNewProduct({ ...newProduct, hsn: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tax Rate (%)</label>
                  <input
                    type="number"
                    className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter tax rate"
                    value={newProduct.tax}
                    onChange={(e) => setNewProduct({ ...newProduct, tax: Number.parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Batch Number</label>
                  <input
                    type="text"
                    className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter batch number"
                    value={newProduct.batchNumber}
                    onChange={(e) => setNewProduct({ ...newProduct, batchNumber: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input
                    type="date"
                    className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newProduct.expiryDate}
                    onChange={(e) => setNewProduct({ ...newProduct, expiryDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Valuation Method</label>
                  <Select
                    value={newProduct.valuationMethod}
                    onValueChange={(value) => setNewProduct({ ...newProduct, valuationMethod: value })}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      {valuationMethods.map((method) => (
                        <SelectItem key={method} value={method}>
                          {method}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                  <input
                    type="text"
                    className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter supplier name"
                    value={newProduct.supplier}
                    onChange={(e) => setNewProduct({ ...newProduct, supplier: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddProduct} disabled={!newProduct.name || !newProduct.sku}>
                  Add Product
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stock Adjustment Modal */}
      <AnimatePresence>
        {isStockAdjustmentOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setIsStockAdjustmentOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 shadow-xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Stock Adjustment</h3>
                <Button variant="ghost" size="sm" onClick={() => setIsStockAdjustmentOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product *</label>
                  <Select
                    value={stockAdjustment.sku}
                    onValueChange={(value) => {
                      const product = products.find((p) => p.sku === value)
                      setStockAdjustment({
                        ...stockAdjustment,
                        sku: value,
                        product: product?.name || "",
                        warehouse: product?.warehouse || "Main Warehouse",
                        zone: product?.zone || "",
                      })
                    }}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.sku}>
                          {product.name} ({product.sku})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adjustment Type *</label>
                  <Select
                    value={stockAdjustment.type}
                    onValueChange={(value) => setStockAdjustment({ ...stockAdjustment, type: value })}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Addition">Addition</SelectItem>
                      <SelectItem value="Reduction">Reduction</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
                  <input
                    type="number"
                    className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter quantity"
                    value={stockAdjustment.quantity}
                    onChange={(e) =>
                      setStockAdjustment({ ...stockAdjustment, quantity: Number.parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason *</label>
                  <input
                    type="text"
                    className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter reason for adjustment"
                    value={stockAdjustment.reason}
                    onChange={(e) => setStockAdjustment({ ...stockAdjustment, reason: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                  <input
                    type="date"
                    className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={stockAdjustment.date}
                    onChange={(e) => setStockAdjustment({ ...stockAdjustment, date: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setIsStockAdjustmentOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleStockAdjustment}
                  disabled={!stockAdjustment.sku || !stockAdjustment.quantity || !stockAdjustment.reason}
                >
                  Apply Adjustment
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
