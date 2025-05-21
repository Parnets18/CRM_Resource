"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { motion } from "framer-motion"
import { Plus, Trash2, Edit, User, X, Key, Search, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import RestoNav from "../RestoNav"

export default function UserManagement() {
  // Sample user data with roles
  const [users, setUsers] = useState([
    { id: 1, name: "Admin User", email: "admin@resto.com", role: "Admin", status: "Active" },
    { id: 2, name: "Cashier 1", email: "cashier@resto.com", role: "Cashier", status: "Active" },
    { id: 3, name: "Head Chef", email: "chef@resto.com", role: "Chef", status: "Active" },
    { id: 4, name: "Waiter 1", email: "waiter@resto.com", role: "Waiter", status: "Inactive" },
    { id: 5, name: "Store Manager", email: "manager@resto.com", role: "Store Manager", status: "Active" },
  ])

  // Sample restaurant data
  const restaurants = [
    { id: 1, name: "Urban Bites", location: "Downtown" },
    { id: 2, name: "Coastal Kitchen", location: "Seaside" },
    { id: 3, name: "Mountain Grill", location: "Highlands" },
  ]

  // State for selected restaurant
  const [selectedRestaurant, setSelectedRestaurant] = useState(restaurants[0]) // Auto-select first restaurant

  // State for modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Cashier",
    status: "Active",
    restaurant: "",
  })

  const roles = ["Admin", "Cashier", "Chef", "Waiter", "Store Manager", "Delivery"]
  const statusOptions = ["Active", "Inactive", "Suspended"]

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Handle restaurant selection
  const handleRestaurantChange = (value) => {
    const restaurant = restaurants.find((r) => r.id === Number.parseInt(value))
    setSelectedRestaurant(restaurant)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      role: "Cashier",
      status: "Active",
      restaurant: selectedRestaurant.name,
    })
  }

  // Initialize form with restaurant name when modal opens
  useEffect(() => {
    if (isAddModalOpen) {
      setFormData((prev) => ({
        ...prev,
        restaurant: selectedRestaurant.name,
      }))
    }
  }, [isAddModalOpen, selectedRestaurant])

  const handleAddUser = (e) => {
    e.preventDefault()

    // Create new user
    const newUser = {
      id: users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: formData.status,
    }

    // Add to users
    setUsers([...users, newUser])

    // Reset form and close modal
    resetForm()
    setIsAddModalOpen(false)
  }

  const handleEditClick = (user) => {
    setCurrentUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      restaurant: selectedRestaurant.name,
    })
    setIsEditModalOpen(true)
  }

  const handleEditUser = (e) => {
    e.preventDefault()

    // Update the user
    const updatedUsers = users.map((user) => {
      if (user.id === currentUser.id) {
        return {
          ...user,
          name: formData.name,
          email: formData.email,
          role: formData.role,
          status: formData.status,
        }
      }
      return user
    })

    setUsers(updatedUsers)

    // Reset and close modal
    resetForm()
    setIsEditModalOpen(false)
    setCurrentUser(null)
  }

  const handleDeleteClick = (user) => {
    setCurrentUser(user)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteUser = () => {
    // Remove the user
    const updatedUsers = users.filter((user) => user.id !== currentUser.id)
    setUsers(updatedUsers)

    // Close dialog
    setIsDeleteModalOpen(false)
    setCurrentUser(null)
  }

  const handleResetPasswordClick = (user) => {
    setCurrentUser(user)
    setIsResetPasswordModalOpen(true)
  }

  const handleResetPassword = (e) => {
    e.preventDefault()
    // In a real app, this would call an API to reset the password
    // For now, we'll just close the modal
    setIsResetPasswordModalOpen(false)
    setCurrentUser(null)
  }

  return (
    <div className="min-h-screen   lg:ml-64">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-gray-900 to-black"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-600/10 to-transparent"></div>
      </div>

      <div className="relative z-10">
        <div className="flex-1 p-8">
          {/* Header */}
          <RestoNav />
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-black">User Management</h2>
              <div className="flex items-center gap-2 mt-1">
                <Select value={selectedRestaurant.id.toString()} onValueChange={handleRestaurantChange}>
                  <SelectTrigger className=" border-gray-700 text-black w-48">
                    <SelectValue placeholder="Select Restaurant" />
                  </SelectTrigger>
                  <SelectContent>
                    {restaurants.map((restaurant) => (
                      <SelectItem key={restaurant.id} value={restaurant.id.toString()}>
                        {restaurant.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Badge variant="outline" className="border-green-500/50 text-green-400">
                  {selectedRestaurant.name}
                </Badge>
                <span className="text-gray-400 text-sm">{selectedRestaurant.location}</span>
              </div>
            </div>
            <Button
              onClick={() => {
                resetForm()
                setIsAddModalOpen(true)
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>

          {/* Add User Modal */}
          {isAddModalOpen && (
            <div className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center p-4 z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="     rounded-lg shadow-xl w-full max-w-md backdrop-blur-sm"
              >
                <div className="flex justify-between items-center border-b border-purple-500/20 p-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <User className="h-5 w-5 text-purple-400" />
                    Add New User
                  </h3>
                  <button onClick={() => setIsAddModalOpen(false)} className="text-black">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleAddUser} className="p-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">Restaurant</label>
                    <input
                      type="text"
                      name="restaurant"
                      value={formData.restaurant}
                      disabled
                      className="w-full px-3 py-2  border border-gray-700 rounded-md text-black opacity-70"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2   border border-gray-700 rounded-md text-black"
                      placeholder="Enter full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2   border border-gray-700 rounded-md text-black"
                      placeholder="Enter email address"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">Role</label>
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-3 py-2  border border-gray-700 rounded-md text-black"
                        required
                      >
                        {roles.map((role) => (
                          <option key={role} value={role} className="">
                            {role}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-1">Status</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-3 py-2  border border-gray-700 rounded-md text-black"
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status} className="">
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsAddModalOpen(false)}
                      className="px-4 py-2 border border-gray-700 rounded-md text-black"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                      Add User
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}

          {/* Edit User Modal */}
          {isEditModalOpen && (
            <div className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center p-4 z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="  rounded-lg shadow-xl w-full max-w-md backdrop-blur-sm"
              >
                <div className="flex justify-between items-center border-b border-purple-500/20 p-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Edit className="h-5 w-5 text-purple-400" />
                    Edit User
                  </h3>
                  <button onClick={() => setIsEditModalOpen(false)} className="text-black">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleEditUser} className="p-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">Restaurant</label>
                    <input
                      type="text"
                      name="restaurant"
                      value={formData.restaurant}
                      disabled
                      className="w-full px-3 py-2  border border-gray-700 rounded-md text-black opacity-70"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-700 rounded-md text-black"
                      placeholder="Enter full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium  mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2  border border-gray-700 rounded-md text-black"
                      placeholder="Enter email address"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium  mb-1">Role</label>
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-3 py-2  border border-gray-700 rounded-md text-black"
                        required
                      >
                        {roles.map((role) => (
                          <option key={role} value={role} className="">
                            {role}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium  mb-1">Status</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-3 py-2  border border-gray-700 rounded-md "
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status} className="">
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsEditModalOpen(false)}
                      className="px-4 py-2 border border-gray-700 rounded-md "
                    >
                      Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                      Save Changes
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {isDeleteModalOpen && (
            <div className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center p-4 z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border border-purple-500/30 rounded-lg shadow-xl w-full max-w-md backdrop-blur-sm"
              >
                <div className="flex justify-between items-center border-b border-purple-500/20 p-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                    Delete User
                  </h3>
                  <button onClick={() => setIsDeleteModalOpen(false)} className="text-black">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-4">
                  <p className="text-black mb-6">
                    Are you sure you want to delete{" "}
                    <span className=" font-semibold">{currentUser?.name}</span>? This action cannot be undone.
                  </p>

                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setIsDeleteModalOpen(false)}
                      className="px-4 py-2 border border-gray-700 rounded-md  "
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteUser}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Reset Password Modal */}
          {isResetPasswordModalOpen && (
            <div className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center p-4 z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className=" border border-purple-500/30 rounded-lg shadow-xl w-full max-w-md backdrop-blur-sm"
              >
                <div className="flex justify-between items-center border-b border-purple-500/20 p-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Key className="h-5 w-5 text-purple-400" />
                    Reset Password
                  </h3>
                  <button onClick={() => setIsResetPasswordModalOpen(false)} className="text-black">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleResetPassword} className="p-4 space-y-4">
                  <div>
                    <p className="text-black mb-2">
                      Reset password for <span className="text-black font-semibold">{currentUser?.name}</span>
                    </p>
                    <p className="text-sm mb-4">
                      A password reset link will be sent to {currentUser?.email}
                    </p>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsResetPasswordModalOpen(false)}
                      className="px-4 py-2 border border-gray-700 rounded-md "
                    >
                      Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                      Send Reset Link
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}

          {/* Main Content */}
          <div>
            <Card className="border border-purple-500/20  backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-black">Staff Members</CardTitle>
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-black" />
                    <Input
                      placeholder="Search users..."
                      className="border-gray-700 text-white pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-black">User</TableHead>
                      <TableHead className="text-black">Email</TableHead>
                      <TableHead className="text-black">Role</TableHead>
                      <TableHead className="text-black">Status</TableHead>
                      <TableHead className="text-right text-black">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <motion.tr
                          key={user.id}
                          whileHover={{ backgroundColor: "rgba(107, 33, 168, 0.2)" }}
                          className="border-b border-gray-800"
                        >
                          <TableCell>
                            <div className="flex items-center">
                              <div className="bg-purple-600/20 p-2 rounded-full mr-3">
                                <User className="w-5 h-5 text-purple-400" />
                              </div>
                              <div className="font-medium text-black">{user.name}</div>
                            </div>
                          </TableCell>
                          <TableCell className="text-black">{user.email}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={`${
                                user.role === "Admin"
                                  ? "border-red-500/50 text-red-400"
                                  : user.role === "Cashier"
                                    ? "border-blue-500/50 text-blue-400"
                                    : user.role === "Chef"
                                      ? "border-orange-500/50 text-orange-400"
                                      : user.role === "Store Manager"
                                        ? "border-green-500/50 text-green-400"
                                        : "border-purple-500/50 text-purple-400"
                              }`}
                            >
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                user.status === "Active"
                                  ? "bg-white text-green-400"
                                  : user.status === "Suspended"
                                    ? "bg-white text-red-400"
                                    : "bg-white text-yellow-400"
                              }`}
                            >
                              {user.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-purple-400 hover:bg-purple-900/20"
                                onClick={() => handleResetPasswordClick(user)}
                                title="Reset Password"
                              >
                                <Key className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-purple-400 hover:bg-purple-900/20"
                                onClick={() => handleEditClick(user)}
                                title="Edit User"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-400 hover:bg-red-900/20"
                                onClick={() => handleDeleteClick(user)}
                                title="Delete User"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </motion.tr>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-gray-400">
                          No users found. Try a different search or add a new user.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
