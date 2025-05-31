"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { motion } from "framer-motion"
import { Plus, Trash2, Edit, Utensils, X, Search, Building2, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import RestoNav from "../RestoNav"

export default function MenuManagement() {
  // Sample branches data
  const branches = [
    { id: 1, name: "Main Branch", location: "Downtown", manager: "John Doe" },
    { id: 2, name: "North Branch", location: "North City", manager: "Jane Smith" },
    { id: 3, name: "South Branch", location: "South City", manager: "Mike Johnson" },
    { id: 4, name: "East Branch", location: "East Side", manager: "Sarah Williams" },
  ]

  // Sample menu data with branch information
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: "Margherita Pizza",
      category: "Pizza",
      price: 12.99,
      status: "Available",
      ingredients: "Tomato sauce, mozzarella, basil",
      type: "veg",
      sizes: { small: "10.99", medium: "12.99", large: "14.99" },
      unit: "plate",
      branchId: 1,
      branchName: "Main Branch",
    },
    {
      id: 2,
      name: "Chicken Sandwich",
      category: "Sandwich",
      price: 9.99,
      status: "Available",
      ingredients: "Grilled chicken, lettuce, tomato",
      type: "non-veg",
      sizes: { small: "7.99", medium: "9.99", large: "11.99" },
      unit: "plate",
      branchId: 2,
      branchName: "North Branch",
    },
    {
      id: 3,
      name: "Spaghetti Carbonara",
      category: "Pasta",
      price: 14.99,
      status: "Out of Stock",
      ingredients: "Pasta, eggs, cheese, pancetta",
      type: "non-veg",
      sizes: { small: "12.99", medium: "14.99", large: "16.99" },
      unit: "plate",
      branchId: 1,
      branchName: "Main Branch",
    },
    {
      id: 4,
      name: "Caesar Salad",
      category: "Salad",
      price: 8.99,
      status: "Available",
      ingredients: "Romaine, croutons, parmesan, dressing",
      type: "veg",
      sizes: { small: "6.99", medium: "8.99", large: "10.99" },
      unit: "bowl",
      branchId: 3,
      branchName: "South Branch",
    },
    {
      id: 5,
      name: "Pepperoni Pizza",
      category: "Pizza",
      price: 13.99,
      status: "Limited",
      ingredients: "Tomato sauce, mozzarella, pepperoni",
      type: "non-veg",
      sizes: { small: "11.99", medium: "13.99", large: "15.99" },
      unit: "plate",
      branchId: 4,
      branchName: "East Branch",
    },
    {
      id: 6,
      name: "Veggie Burger",
      category: "Sandwich",
      price: 8.99,
      status: "Available",
      ingredients: "Plant-based patty, lettuce, tomato, onion",
      type: "veg",
      sizes: { small: "6.99", medium: "8.99", large: "10.99" },
      unit: "plate",
      branchId: 2,
      branchName: "North Branch",
    },
    {
      id: 7,
      name: "Chocolate Cake",
      category: "Dessert",
      price: 6.99,
      status: "Available",
      ingredients: "Rich chocolate cake with frosting",
      type: "veg",
      sizes: { small: "4.99", medium: "6.99", large: "8.99" },
      unit: "slice",
      branchId: 1,
      branchName: "Main Branch",
    },
    {
      id: 8,
      name: "Fresh Orange Juice",
      category: "Beverage",
      price: 4.99,
      status: "Available",
      ingredients: "Freshly squeezed orange juice",
      type: "veg",
      sizes: { small: "", medium: "4.99", large: "" },
      unit: "glass",
      branchId: 3,
      branchName: "South Branch",
    },
  ])

  // State for modals and filters
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBranch, setSelectedBranch] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [currentItem, setCurrentItem] = useState(null)

  const [formData, setFormData] = useState({
    name: "",
    category: "Pizza",
    type: "veg",
    sizes: {
      small: "",
      medium: "",
      large: "",
    },
    unit: "plate",
    description: "",
    status: "Available",
    branchId: "",
  })

  const categories = ["Pizza", "Sandwich", "Pasta", "Salad", "Starter", "Beverage", "Dessert"]
  const foodTypes = ["veg", "non-veg"]
  const statusOptions = ["Available", "Limited", "Out of Stock"]

  // Filter menu items based on search query, branch, category, and status
  const filteredMenuItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ingredients.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesBranch = selectedBranch === "all" || item.branchId.toString() === selectedBranch
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus

    return matchesSearch && matchesBranch && matchesCategory && matchesStatus
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name in formData.sizes) {
      setFormData({
        ...formData,
        sizes: {
          ...formData.sizes,
          [name]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
        ...(name === "category" && {
          unit: value === "Beverage" ? "glass" : "plate",
        }),
      })
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      category: "Pizza",
      type: "veg",
      sizes: {
        small: "",
        medium: "",
        large: "",
      },
      unit: "plate",
      description: "",
      status: "Available",
      branchId: "",
    })
  }

  const handleAddItem = (e) => {
    e.preventDefault()

    // Find branch name
    const selectedBranchData = branches.find((branch) => branch.id.toString() === formData.branchId)

    // Create new menu item
    const newItem = {
      id: menuItems.length > 0 ? Math.max(...menuItems.map((item) => item.id)) + 1 : 1,
      name: formData.name,
      category: formData.category,
      type: formData.type,
      price: Number.parseFloat(formData.sizes.medium || formData.sizes.small || 0),
      status: formData.status,
      ingredients: formData.description,
      sizes: formData.sizes,
      unit: formData.unit,
      branchId: Number.parseInt(formData.branchId),
      branchName: selectedBranchData?.name || "",
    }

    // Add to menu items
    setMenuItems([...menuItems, newItem])

    // Reset form and close modal
    resetForm()
    setIsAddModalOpen(false)
  }

  const handleEditClick = (item) => {
    setCurrentItem(item)
    setFormData({
      name: item.name,
      category: item.category,
      type: item.type || "veg",
      sizes: item.sizes || {
        small: "",
        medium: item.price.toString(),
        large: "",
      },
      unit: item.unit || "plate",
      description: item.ingredients,
      status: item.status,
      branchId: item.branchId.toString(),
    })
    setIsEditModalOpen(true)
  }

  const handleEditItem = (e) => {
    e.preventDefault()

    // Find branch name
    const selectedBranchData = branches.find((branch) => branch.id.toString() === formData.branchId)

    // Update the item
    const updatedItems = menuItems.map((item) => {
      if (item.id === currentItem.id) {
        return {
          ...item,
          name: formData.name,
          category: formData.category,
          type: formData.type,
          price: Number.parseFloat(formData.sizes.medium || formData.sizes.small || 0),
          status: formData.status,
          ingredients: formData.description,
          sizes: formData.sizes,
          unit: formData.unit,
          branchId: Number.parseInt(formData.branchId),
          branchName: selectedBranchData?.name || "",
        }
      }
      return item
    })

    setMenuItems(updatedItems)

    // Reset and close modal
    resetForm()
    setIsEditModalOpen(false)
    setCurrentItem(null)
  }

  const handleDeleteClick = (item) => {
    setCurrentItem(item)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteItem = () => {
    // Remove the item
    const updatedItems = menuItems.filter((item) => item.id !== currentItem.id)
    setMenuItems(updatedItems)

    // Close dialog
    setIsDeleteModalOpen(false)
    setCurrentItem(null)
  }

  // Form component for reuse in add and edit modals
  const MenuItemForm = ({ onSubmit, submitText }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Item Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-black"
          placeholder="e.g., Pizza, Sandwich, Pasta"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Branch *</label>
          <select
            name="branchId"
            value={formData.branchId}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-black"
            required
          >
            <option value="" className="bg-gray-100 text-black">
              Select Branch
            </option>
            {branches.map((branch) => (
              <option key={branch.id} value={branch.id} className="bg-gray-100 text-black">
                {branch.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-black"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-gray-100 text-black">
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-black"
          >
            {foodTypes.map((type) => (
              <option key={type} value={type} className="bg-gray-100 text-black">
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Serving Unit</label>
          <select
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-black"
          >
            <option value="plate" className="bg-gray-100 text-black">
              Plate
            </option>
            <option value="bowl" className="bg-gray-100 text-black">
              Bowl
            </option>
            <option value="glass" className="bg-gray-100 text-black">
              Glass
            </option>
            <option value="slice" className="bg-gray-100 text-black">
              Slice
            </option>
            <option value="litre" className="bg-gray-100 text-black">
              Litre
            </option>
            <option value="piece" className="bg-gray-100 text-black">
              Piece
            </option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-black"
        >
          {statusOptions.map((status) => (
            <option key={status} value={status} className="bg-gray-100 text-black">
              {status}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Prices</label>
        <div className="space-y-2">
          {formData.category !== "Beverage" ? (
            <>
              <div className="flex items-center">
                <span className="w-20 text-gray-500">Small:</span>
                <input
                  type="number"
                  name="small"
                  value={formData.sizes.small}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-black ml-2"
                  placeholder="Price"
                  step="0.01"
                />
              </div>
              <div className="flex items-center">
                <span className="w-20 text-gray-500">Medium:</span>
                <input
                  type="number"
                  name="medium"
                  value={formData.sizes.medium}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-black ml-2"
                  placeholder="Price"
                  required
                  step="0.01"
                />
              </div>
              <div className="flex items-center">
                <span className="w-20 text-gray-500">Large:</span>
                <input
                  type="number"
                  name="large"
                  value={formData.sizes.large}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-black ml-2"
                  placeholder="Price"
                  step="0.01"
                />
              </div>
            </>
          ) : (
            <div className="flex items-center">
              <span className="w-20 text-gray-500">Price:</span>
              <input
                type="number"
                name="medium"
                value={formData.sizes.medium}
                onChange={handleChange}
                className="flex-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-black ml-2"
                placeholder="Price"
                required
                step="0.01"
              />
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description (Ingredients)</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-black"
          rows="3"
          placeholder="Enter item ingredients..."
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={() => {
            if (onSubmit === handleAddItem) setIsAddModalOpen(false)
            else setIsEditModalOpen(false)
          }}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
          {submitText}
        </button>
      </div>
    </form>
  )

  return (
    <div className="min-h-screen bg-white lg:ml-64">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-gray-100 to-white"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-600/10 to-transparent"></div>
      </div>

      <div className="relative z-10">
        <div className="flex-1 p-4 md:p-8">
          {/* Header */}
          <RestoNav />
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4 mt-12">
            <div>
              <h2 className="text-2xl font-bold text-black">Menu Items</h2>
              <p className="text-gray-700">Manage your restaurant's menu items across all branches</p>
            </div>
            <Button
              onClick={() => {
                resetForm()
                setIsAddModalOpen(true)
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white w-full md:w-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>

          {/* Filters Section */}
          <Card className="mb-6 border border-purple-500/20 bg-white backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center text-sm font-medium text-gray-700">
                    <Building2 className="w-4 h-4 mr-2 text-purple-500" />
                    Restaurant Branch
                  </Label>
                  <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                    <SelectTrigger className="bg-gray-100 border-gray-300 text-black">
                      <SelectValue placeholder="All Branches" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Branches</SelectItem>
                      {branches.map((branch) => (
                        <SelectItem key={branch.id} value={branch.id.toString()}>
                          {branch.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center text-sm font-medium text-gray-700">
                    <Filter className="w-4 h-4 mr-2 text-purple-500" />
                    Category
                  </Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="bg-gray-100 border-gray-300 text-black">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center text-sm font-medium text-gray-700">
                    <Filter className="w-4 h-4 mr-2 text-purple-500" />
                    Status
                  </Label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="bg-gray-100 border-gray-300 text-black">
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center text-sm font-medium text-gray-700">
                    <Search className="w-4 h-4 mr-2 text-purple-500" />
                    Search
                  </Label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search items..."
                      className="bg-gray-100 border-gray-300 text-black pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Add Item Modal */}
          {isAddModalOpen && (
            <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border border-purple-500/30 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto backdrop-blur-sm"
              >
                <div className="flex justify-between items-center border-b border-purple-500/20 px-4 py-3">
                  <h3 className="text-base font-medium text-black flex items-center gap-2">
                    <Utensils className="h-5 w-5 text-purple-400" />
                    Add Menu Item
                  </h3>
                  <button onClick={() => setIsAddModalOpen(false)} className="text-gray-500 hover:text-black">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="px-4 py-4">
                  <p className="text-gray-700 text-sm mb-4">Fill the form below to add a new item.</p>
                  <MenuItemForm onSubmit={handleAddItem} submitText="Add Item" />
                </div>
              </motion.div>
            </div>
          )}

          {/* Edit Item Modal */}
          {isEditModalOpen && (
            <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border border-purple-500/30 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto backdrop-blur-sm"
              >
                <div className="flex justify-between items-center border-b border-purple-500/20 px-4 py-3">
                  <h3 className="text-base font-medium text-black flex items-center gap-2">
                    <Edit className="h-5 w-5 text-purple-400" />
                    Edit Menu Item
                  </h3>
                  <button onClick={() => setIsEditModalOpen(false)} className="text-gray-500 hover:text-black">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="px-4 py-4">
                  <p className="text-gray-700 text-sm mb-4">Update the details of this menu item.</p>
                  <MenuItemForm onSubmit={handleEditItem} submitText="Save Changes" />
                </div>
              </motion.div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {isDeleteModalOpen && (
            <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border border-purple-500/30 rounded-lg shadow-xl w-full max-w-md backdrop-blur-sm"
              >
                <div className="flex justify-between items-center border-b border-purple-500/20 p-4">
                  <h3 className="text-lg font-semibold text-black flex items-center gap-2">
                    <Trash2 className="h-5 w-5 text-red-400" />
                    Delete Menu Item
                  </h3>
                  <button onClick={() => setIsDeleteModalOpen(false)} className="text-gray-500 hover:text-black">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4">
                  <p className="text-gray-700 mb-6">
                    Are you sure you want to delete "{currentItem?.name}" from {currentItem?.branchName}? This action
                    cannot be undone.
                  </p>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setIsDeleteModalOpen(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteItem}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Main Content */}
          <div>
            <Card className="border border-purple-500/20 bg-white backdrop-blur-sm">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <CardTitle className="text-black">
                    All Menu Items
                    {selectedBranch !== "all" && (
                      <span className="text-sm font-normal text-gray-600 ml-2">
                        - {branches.find((b) => b.id.toString() === selectedBranch)?.name}
                      </span>
                    )}
                  </CardTitle>
                  <div className="text-sm text-gray-600">
                    Showing {filteredMenuItems.length} of {menuItems.length} items
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="text-gray-700 min-w-[140px]">Item</TableHead>
                        <TableHead className="text-gray-700 min-w-[120px]">Branch</TableHead>
                        <TableHead className="text-gray-700 min-w-[120px]">Category</TableHead>
                        <TableHead className="text-gray-700 min-w-[100px]">Price</TableHead>
                        <TableHead className="text-gray-700 min-w-[120px]">Status</TableHead>
                        <TableHead className="text-right text-gray-700 min-w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMenuItems.length > 0 ? (
                        filteredMenuItems.map((item) => (
                          <motion.tr
                            key={item.id}
                            whileHover={{
                              backgroundColor: "rgba(139, 92, 246, 0.08)",
                            }}
                            className="border-b border-gray-200"
                          >
                            <TableCell>
                              <div className="font-medium text-black">{item.name}</div>
                              <div className="text-xs text-gray-500">{item.ingredients}</div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="border-blue-500/50 text-blue-700">
                                {item.branchName}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="border-purple-500/50 text-purple-700">
                                {item.category}
                              </Badge>
                              {item.type && (
                                <Badge
                                  variant="outline"
                                  className={`ml-2 ₹{
                                    item.type === "veg"
                                      ? "border-green-500/50 text-green-700"
                                      : "border-red-500/50 text-red-700"
                                  }`}
                                >
                                  {item.type === "veg" ? "Veg" : "Non-Veg"}
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-black">₹{item.price.toFixed(2)}</TableCell>
                            <TableCell>
                              <span
                                className={`px-2 py-1 rounded-full text-xs ₹{
                                  item.status === "Available"
                                    ? "bg-green-100 text-green-700"
                                    : item.status === "Out of Stock"
                                      ? "bg-red-100 text-red-700"
                                      : "bg-yellow-100 text-yellow-700"
                                }`}
                              >
                                {item.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-purple-700 "
                                  onClick={() => handleEditClick(item)}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-red-700 "
                                  onClick={() => handleDeleteClick(item)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </motion.tr>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                            No menu items found. Try adjusting your filters or add a new item.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
