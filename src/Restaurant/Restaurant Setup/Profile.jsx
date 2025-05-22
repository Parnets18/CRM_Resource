"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Users, Search, UserPlus, Star, Gift, Calendar, Phone, Mail, Heart, MessageSquare, Menu } from "lucide-react"
import RestoNav from "../RestoNav"

export default function CustomerManagement() {
  // Initial state for customer form
  const initialCustomerState = {
    id: "",
    name: "",
    mobileNumber: "",
    email: "",
    dob: "",
    anniversary: "",
    preferences: "",
    feedback: "",
    rating: 5,
    loyaltyPoints: 0,
    lastVisit: "",
    totalVisits: 0,
    totalSpent: 0,
  }

  // State for customer form data
  const [customerData, setCustomerData] = useState(initialCustomerState)

  // State for customer list
  const [customers, setCustomers] = useState([])

  // State for search query
  const [searchQuery, setSearchQuery] = useState("")

  // State for edit mode
  const [isEditMode, setIsEditMode] = useState(false)

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target
    setCustomerData((prevData) => ({
      ...prevData,
      [id]: value,
    }))
  }

  // Function to handle rating change
  const handleRatingChange = (rating) => {
    setCustomerData((prevData) => ({
      ...prevData,
      rating,
    }))
  }

  // Function to save customer data
  const handleSave = () => {
    // Generate a unique ID if not in edit mode
    if (!isEditMode) {
      const newCustomer = {
        ...customerData,
        id: Date.now().toString(),
        lastVisit: new Date().toISOString().split("T")[0],
        totalVisits: 1,
      }

      // Add to customers list
      setCustomers([...customers, newCustomer])

      // Save to localStorage
      const savedCustomers = JSON.parse(localStorage.getItem("restaurantCustomers") || "[]")
      localStorage.setItem("restaurantCustomers", JSON.stringify([...savedCustomers, newCustomer]))

      // Reset form
      setCustomerData(initialCustomerState)

      console.log("New customer added:", newCustomer)
      alert("Customer added successfully!")
    } else {
      // Update existing customer
      const updatedCustomers = customers.map((customer) => (customer.id === customerData.id ? customerData : customer))

      setCustomers(updatedCustomers)

      // Save to localStorage
      localStorage.setItem("restaurantCustomers", JSON.stringify(updatedCustomers))

      // Reset form and edit mode
      setCustomerData(initialCustomerState)
      setIsEditMode(false)

      console.log("Customer updated:", customerData)
      alert("Customer updated successfully!")
    }
  }

  // Function to edit customer
  const handleEdit = (customer) => {
    setCustomerData(customer)
    setIsEditMode(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Function to delete customer
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      const filteredCustomers = customers.filter((customer) => customer.id !== id)
      setCustomers(filteredCustomers)

      // Save to localStorage
      localStorage.setItem("restaurantCustomers", JSON.stringify(filteredCustomers))

      console.log("Customer deleted:", id)

      // If in edit mode and deleting the current customer, reset form
      if (isEditMode && customerData.id === id) {
        setCustomerData(initialCustomerState)
        setIsEditMode(false)
      }
    }
  }

  // Function to clear form
  const handleClear = () => {
    setCustomerData(initialCustomerState)
    setIsEditMode(false)
  }

  // Function to filter customers based on search query
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.mobileNumber.includes(searchQuery) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Load saved customers on component mount
  useEffect(() => {
    const savedCustomers = localStorage.getItem("restaurantCustomers")
    if (savedCustomers) {
      try {
        const parsedCustomers = JSON.parse(savedCustomers)
        setCustomers(parsedCustomers)
        console.log("Loaded saved customers:", parsedCustomers)
      } catch (error) {
        console.error("Error loading saved customers:", error)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-white lg:ml-64">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-gray-100 to-white"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-blue-600/10 to-transparent"></div>
      </div>

      <div className="relative z-10 flex">
        <RestoNav />

        <div className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-black">Customer Management</h2>
              <p className="text-gray-700">Manage your customer relationships</p>
            </div>
            <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-200">
              <Menu className="w-5 h-5" />
            </Button>
          </div>

          {/* Customer Form Section */}
          <Card className="border border-blue-500/20 bg-white backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle className="text-black flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-blue-400" />
                {isEditMode ? "Edit Customer" : "Add New Customer"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-gray-700" htmlFor="name">
                      Customer Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter customer name"
                      className="bg-gray-100 border-gray-300 text-black"
                      value={customerData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700" htmlFor="mobileNumber">
                      Mobile Number
                    </Label>
                    <Input
                      id="mobileNumber"
                      placeholder="Enter mobile number"
                      className="bg-gray-100 border-gray-300 text-black"
                      value={customerData.mobileNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="text-gray-700" htmlFor="email">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="customer@example.com"
                      className="bg-gray-100 border-gray-300 text-black"
                      value={customerData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700" htmlFor="dob">
                      Date of Birth
                    </Label>
                    <Input
                      id="dob"
                      type="date"
                      className="bg-gray-100 border-gray-300 text-black"
                      value={customerData.dob}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700" htmlFor="anniversary">
                      Anniversary
                    </Label>
                    <Input
                      id="anniversary"
                      type="date"
                      className="bg-gray-100 border-gray-300 text-black"
                      value={customerData.anniversary}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-gray-700" htmlFor="preferences">
                      Preferences
                    </Label>
                    <Textarea
                      id="preferences"
                      placeholder="Food preferences, allergies, favorite dishes, etc."
                      className="bg-gray-100 border-gray-300 text-black h-24"
                      value={customerData.preferences}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700" htmlFor="feedback">
                      Feedback
                    </Label>
                    <Textarea
                      id="feedback"
                      placeholder="Customer feedback and comments"
                      className="bg-gray-100 border-gray-300 text-black h-24"
                      value={customerData.feedback}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-gray-700">Rating</Label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingChange(star)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= customerData.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700" htmlFor="loyaltyPoints">
                      Loyalty Points
                    </Label>
                    <Input
                      id="loyaltyPoints"
                      type="number"
                      min="0"
                      placeholder="0"
                      className="bg-gray-100 border-gray-300 text-black"
                      value={customerData.loyaltyPoints}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="text-gray-700 border-gray-300"
                    onClick={handleClear}
                  >
                    {isEditMode ? "Cancel" : "Clear"}
                  </Button>
                  <Button type="button" className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleSave}>
                    {isEditMode ? "Update Customer" : "Add Customer"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Customer List Section */}
          <Card className="border border-blue-500/20 bg-white backdrop-blur-sm mb-8">
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <CardTitle className="text-black flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  Customer List
                </CardTitle>
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                  <Input
                    placeholder="Search customers..."
                    className="bg-gray-100 border-gray-300 text-black pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Contact</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Special Dates</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Loyalty</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Rating</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomers.length > 0 ? (
                      filteredCustomers.map((customer) => (
                        <tr key={customer.id} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="font-medium text-black">{customer.name}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex flex-col">
                              <div className="flex items-center text-gray-700 text-sm">
                                <Phone className="w-3 h-3 mr-1" />
                                {customer.mobileNumber}
                              </div>
                              <div className="flex items-center text-gray-700 text-sm">
                                <Mail className="w-3 h-3 mr-1" />
                                {customer.email}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex flex-col">
                              {customer.dob && (
                                <div className="flex items-center text-gray-700 text-sm">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  Birthday: {customer.dob}
                                </div>
                              )}
                              {customer.anniversary && (
                                <div className="flex items-center text-gray-700 text-sm">
                                  <Heart className="w-3 h-3 mr-1" />
                                  Anniversary: {customer.anniversary}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <Gift className="w-4 h-4 text-blue-500 mr-1" />
                              <span className="font-medium">{customer.loyaltyPoints} points</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= customer.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2 text-blue-600"
                                onClick={() => handleEdit(customer)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2 text-red-600"
                                onClick={() => handleDelete(customer.id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="py-8 text-center text-gray-500">
                          {searchQuery
                            ? "No customers found matching your search."
                            : "No customers added yet. Add your first customer above."}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Customer Insights Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border border-blue-500/20 bg-white backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-black text-lg flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  Total Customers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">{customers.length}</div>
                <p className="text-gray-600 text-sm">Active customer records</p>
              </CardContent>
            </Card>

            <Card className="border border-blue-500/20 bg-white backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-black text-lg flex items-center gap-2">
                  <Gift className="w-4 h-4 text-blue-400" />
                  Total Loyalty Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">
                  {customers.reduce((total, customer) => total + (Number.parseInt(customer.loyaltyPoints) || 0), 0)}
                </div>
                <p className="text-gray-600 text-sm">Points issued to customers</p>
              </CardContent>
            </Card>

            <Card className="border border-blue-500/20 bg-white backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-black text-lg flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-blue-400" />
                  Feedback Collected
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">
                  {customers.filter((customer) => customer.feedback && customer.feedback.trim() !== "").length}
                </div>
                <p className="text-gray-600 text-sm">Customer feedback entries</p>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Birthdays & Anniversaries */}
          <Card className="border border-blue-500/20 bg-white backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle className="text-black flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-400" />
                Upcoming Special Dates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                    Upcoming Birthdays
                  </h3>
                  <div className="space-y-3">
                    {customers
                      .filter((customer) => customer.dob)
                      .slice(0, 3)
                      .map((customer) => (
                        <div
                          key={`birthday-${customer.id}`}
                          className="flex items-center p-2 border border-gray-200 rounded-md"
                        >
                          <div className="bg-blue-100 p-2 rounded-full mr-3">
                            <Calendar className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-800">{customer.name}</div>
                            <div className="text-sm text-gray-600">{customer.dob}</div>
                          </div>
                        </div>
                      ))}
                    {customers.filter((customer) => customer.dob).length === 0 && (
                      <p className="text-gray-500 text-sm italic">No birthdays recorded yet.</p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <Heart className="w-4 h-4 mr-2 text-red-500" />
                    Upcoming Anniversaries
                  </h3>
                  <div className="space-y-3">
                    {customers
                      .filter((customer) => customer.anniversary)
                      .slice(0, 3)
                      .map((customer) => (
                        <div
                          key={`anniversary-${customer.id}`}
                          className="flex items-center p-2 border border-gray-200 rounded-md"
                        >
                          <div className="bg-red-100 p-2 rounded-full mr-3">
                            <Heart className="w-5 h-5 text-red-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-800">{customer.name}</div>
                            <div className="text-sm text-gray-600">{customer.anniversary}</div>
                          </div>
                        </div>
                      ))}
                    {customers.filter((customer) => customer.anniversary).length === 0 && (
                      <p className="text-gray-500 text-sm italic">No anniversaries recorded yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
