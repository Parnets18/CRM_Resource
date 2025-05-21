"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  ChefHat,
  Clock,
  Search,
  Bell,
  CheckCircle,
  AlertCircle,
  Coffee,
  Utensils,
  Timer,
  Menu,
  Filter,
  RotateCcw,
  CheckSquare,
  Clock3,
  Send,
} from "lucide-react"
import RestoNav from "../RestoNav"

export default function KitchenManagement() {
  // Sample KOT data (in a real app, this would come from an API or database)
  const initialKOTs = [
    {
      id: "KOT001",
      tableNumber: "T05",
      waiterName: "Rahul",
      orderTime: new Date(Date.now() - 15 * 60000).toISOString(), // 15 minutes ago
      category: "Starter",
      items: [
        {
          id: 1,
          name: "Paneer Tikka",
          quantity: 2,
          status: "Pending",
          startTime: null,
          completionTime: null,
          notes: "Extra spicy",
        },
        {
          id: 2,
          name: "Veg Spring Rolls",
          quantity: 1,
          status: "Pending",
          startTime: null,
          completionTime: null,
          notes: "",
        },
      ],
    },
    {
      id: "KOT002",
      tableNumber: "T08",
      waiterName: "Priya",
      orderTime: new Date(Date.now() - 10 * 60000).toISOString(), // 10 minutes ago
      category: "Main Course",
      items: [
        {
          id: 3,
          name: "Butter Chicken",
          quantity: 1,
          status: "Pending",
          startTime: null,
          completionTime: null,
          notes: "Medium spicy",
        },
        {
          id: 4,
          name: "Garlic Naan",
          quantity: 3,
          status: "Pending",
          startTime: null,
          completionTime: null,
          notes: "",
        },
      ],
    },
    {
      id: "KOT003",
      tableNumber: "T02",
      waiterName: "Amit",
      orderTime: new Date(Date.now() - 5 * 60000).toISOString(), // 5 minutes ago
      category: "Dessert",
      items: [
        {
          id: 5,
          name: "Gulab Jamun",
          quantity: 2,
          status: "Pending",
          startTime: null,
          completionTime: null,
          notes: "With extra sugar syrup",
        },
      ],
    },
  ]

  // State for KOTs
  const [kots, setKOTs] = useState([])

  // State for completed KOTs
  const [completedKOTs, setCompletedKOTs] = useState([])

  // State for search query
  const [searchQuery, setSearchQuery] = useState("")

  // State for category filter
  const [categoryFilter, setCategoryFilter] = useState("All")

  // State for status filter
  const [statusFilter, setStatusFilter] = useState("All")

  // State for notifications
  const [notifications, setNotifications] = useState([])

  // Function to update item status
  const updateItemStatus = (kotId, itemId, newStatus) => {
    const now = new Date().toISOString()

    setKOTs((prevKOTs) =>
      prevKOTs.map((kot) => {
        if (kot.id === kotId) {
          const updatedItems = kot.items.map((item) => {
            if (item.id === itemId) {
              // Update status and time logs based on the new status
              const updatedItem = { ...item, status: newStatus }

              if (newStatus === "In Progress" && !item.startTime) {
                updatedItem.startTime = now
              } else if (newStatus === "Ready") {
                updatedItem.completionTime = now

                // Add notification when item is ready
                const notification = {
                  id: Date.now(),
                  message: `${item.name} (${kot.id}) for Table ${kot.tableNumber} is ready!`,
                  time: now,
                  read: false,
                }
                setNotifications((prev) => [notification, ...prev])
              }

              return updatedItem
            }
            return item
          })

          return { ...kot, items: updatedItems }
        }
        return kot
      }),
    )

    // Save to localStorage
    saveToLocalStorage()
  }

  // Function to check if all items in a KOT are ready
  const areAllItemsReady = (kot) => {
    return kot.items.every((item) => item.status === "Ready")
  }

  // Function to mark KOT as completed and move to completed KOTs
  const completeKOT = (kotId) => {
    const kotToComplete = kots.find((kot) => kot.id === kotId)

    if (kotToComplete && areAllItemsReady(kotToComplete)) {
      // Add to completed KOTs
      setCompletedKOTs((prev) => [{ ...kotToComplete, completionTime: new Date().toISOString() }, ...prev])

      // Remove from active KOTs
      setKOTs((prev) => prev.filter((kot) => kot.id !== kotId))

      // Add notification
      const notification = {
        id: Date.now(),
        message: `Complete order for Table ${kotToComplete.tableNumber} (${kotId}) is ready for service!`,
        time: new Date().toISOString(),
        read: false,
      }
      setNotifications((prev) => [notification, ...prev])

      // Save to localStorage
      saveToLocalStorage()
    }
  }

  // Function to mark notification as read
  const markNotificationAsRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === notificationId ? { ...notification, read: true } : notification)),
    )

    // Save to localStorage
    saveToLocalStorage()
  }

  // Function to clear all notifications
  const clearAllNotifications = () => {
    setNotifications([])

    // Save to localStorage
    saveToLocalStorage()
  }

  // Function to reset KOT data (for demo purposes)
  const resetKOTData = () => {
    setKOTs(initialKOTs)
    setCompletedKOTs([])
    setNotifications([])

    // Save to localStorage
    localStorage.removeItem("kitchenData")
  }

  // Function to save all data to localStorage
  const saveToLocalStorage = () => {
    const kitchenData = {
      kots,
      completedKOTs,
      notifications,
    }

    localStorage.setItem("kitchenData", JSON.stringify(kitchenData))
  }

  // Function to calculate time elapsed
  const getTimeElapsed = (startTime) => {
    const start = new Date(startTime)
    const now = new Date()
    const diffMs = now - start
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 1) {
      return "Just now"
    } else if (diffMins === 1) {
      return "1 minute ago"
    } else if (diffMins < 60) {
      return `${diffMins} minutes ago`
    } else {
      const hours = Math.floor(diffMins / 60)
      return `${hours} hour${hours > 1 ? "s" : ""} ago`
    }
  }

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-500 bg-yellow-100"
      case "In Progress":
        return "text-blue-500 bg-blue-100"
      case "Ready":
        return "text-green-500 bg-green-100"
      default:
        return "text-gray-500 bg-gray-100"
    }
  }

  // Function to get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Starter":
        return <Coffee className="w-4 h-4" />
      case "Main Course":
        return <Utensils className="w-4 h-4" />
      case "Dessert":
        return <ChefHat className="w-4 h-4" />
      default:
        return <Utensils className="w-4 h-4" />
    }
  }

  // Filter KOTs based on search query and filters
  const filteredKOTs = kots.filter((kot) => {
    // Search filter
    const matchesSearch =
      kot.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kot.tableNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kot.waiterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kot.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

    // Category filter
    const matchesCategory = categoryFilter === "All" || kot.category === categoryFilter

    // Status filter - check if any item matches the status filter
    const matchesStatus =
      statusFilter === "All" ||
      kot.items.some((item) => {
        if (statusFilter === "Pending") return item.status === "Pending"
        if (statusFilter === "In Progress") return item.status === "In Progress"
        if (statusFilter === "Ready") return item.status === "Ready"
        return true
      })

    return matchesSearch && matchesCategory && matchesStatus
  })

  // Load saved data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("kitchenData")

    if (savedData) {
      try {
        const {
          kots: savedKOTs,
          completedKOTs: savedCompletedKOTs,
          notifications: savedNotifications,
        } = JSON.parse(savedData)

        if (savedKOTs && Array.isArray(savedKOTs)) {
          setKOTs(savedKOTs)
        } else {
          setKOTs(initialKOTs)
        }

        if (savedCompletedKOTs && Array.isArray(savedCompletedKOTs)) {
          setCompletedKOTs(savedCompletedKOTs)
        }

        if (savedNotifications && Array.isArray(savedNotifications)) {
          setNotifications(savedNotifications)
        }
      } catch (error) {
        console.error("Error loading saved kitchen data:", error)
        setKOTs(initialKOTs)
      }
    } else {
      // If no saved data, use initial data
      setKOTs(initialKOTs)
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
              <h2 className="text-2xl font-bold text-black">Kitchen Management</h2>
              <p className="text-gray-700">Manage kitchen orders and KOTs</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Button
                  variant="outline"
                  size="icon"
                  className="text-gray-700 hover:bg-gray-200 relative"
                  onClick={() => document.getElementById("notificationsPanel").classList.toggle("hidden")}
                >
                  <Bell className="w-5 h-5" />
                  {notifications.filter((n) => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {notifications.filter((n) => !n.read).length}
                    </span>
                  )}
                </Button>

                {/* Notifications Panel */}
                <div
                  id="notificationsPanel"
                  className="hidden absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50 border border-gray-200"
                >
                  <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">Notifications</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-gray-600"
                      onClick={clearAllNotifications}
                    >
                      Clear All
                    </Button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 border-b border-gray-100 hover:bg-gray-50 ${
                            !notification.read ? "bg-blue-50" : ""
                          }`}
                          onClick={() => markNotificationAsRead(notification.id)}
                        >
                          <div className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm text-gray-800">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{getTimeElapsed(notification.time)}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500 text-sm">No notifications yet</div>
                    )}
                  </div>
                </div>
              </div>

              <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-200" onClick={resetKOTData}>
                <RotateCcw className="w-5 h-5" />
              </Button>

              <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-200">
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Kitchen Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border border-blue-500/20 bg-white backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-black text-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-500" />
                  Pending Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-500">
                  {kots.filter((kot) => kot.items.some((item) => item.status === "Pending")).length}
                </div>
                <p className="text-gray-600 text-sm">Orders waiting to be prepared</p>
              </CardContent>
            </Card>

            <Card className="border border-blue-500/20 bg-white backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-black text-lg flex items-center gap-2">
                  <Timer className="w-4 h-4 text-blue-500" />
                  In Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-500">
                  {kots.filter((kot) => kot.items.some((item) => item.status === "In Progress")).length}
                </div>
                <p className="text-gray-600 text-sm">Orders currently being prepared</p>
              </CardContent>
            </Card>

            <Card className="border border-blue-500/20 bg-white backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-black text-lg flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Ready for Service
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500">
                  {kots.filter((kot) => areAllItemsReady(kot)).length}
                </div>
                <p className="text-gray-600 text-sm">Orders ready to be served</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card className="border border-blue-500/20 bg-white backdrop-blur-sm mb-8">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                  <Input
                    placeholder="Search KOT ID, table, or items..."
                    className="bg-gray-100 border-gray-300 text-black pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <select
                      className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                      <option value="All">All Categories</option>
                      <option value="Starter">Starter</option>
                      <option value="Main Course">Main Course</option>
                      <option value="Dessert">Dessert</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock3 className="w-4 h-4 text-gray-500" />
                    <select
                      className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="All">All Statuses</option>
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Ready">Ready</option>
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active KOTs */}
          <Card className="border border-blue-500/20 bg-white backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle className="text-black flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-blue-400" />
                Active Kitchen Order Tickets (KOTs)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredKOTs.length > 0 ? (
                <div className="space-y-6">
                  {filteredKOTs.map((kot) => (
                    <div key={kot.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                      <div className="bg-gray-50 p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200">
                        <div className="flex items-center gap-4">
                          <div className="bg-blue-100 p-2 rounded-full">{getCategoryIcon(kot.category)}</div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-gray-800">{kot.id}</h3>
                              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                                Table {kot.tableNumber}
                              </span>
                              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                                {kot.category}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600 flex items-center gap-2">
                              <Clock className="w-3 h-3" />
                              {getTimeElapsed(kot.orderTime)} • Waiter: {kot.waiterName}
                            </div>
                          </div>
                        </div>

                        {areAllItemsReady(kot) ? (
                          <Button
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => completeKOT(kot.id)}
                          >
                            <CheckSquare className="w-4 h-4 mr-2" />
                            Mark Order Complete
                          </Button>
                        ) : (
                          <div className="flex items-center gap-2">
                            <div className="text-sm text-gray-600">
                              {kot.items.filter((item) => item.status === "Ready").length} of {kot.items.length} items
                              ready
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="p-4">
                        <table className="w-full">
                          <thead>
                            <tr className="text-left text-gray-600 text-sm border-b border-gray-200">
                              <th className="pb-2 font-medium">Item</th>
                              <th className="pb-2 font-medium">Qty</th>
                              <th className="pb-2 font-medium">Notes</th>
                              <th className="pb-2 font-medium">Status</th>
                              <th className="pb-2 font-medium">Time</th>
                              <th className="pb-2 font-medium">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {kot.items.map((item) => (
                              <tr key={item.id} className="border-b border-gray-100">
                                <td className="py-3 font-medium text-gray-800">{item.name}</td>
                                <td className="py-3 text-gray-700">{item.quantity}x</td>
                                <td className="py-3 text-gray-700">
                                  {item.notes ? item.notes : <span className="text-gray-400">-</span>}
                                </td>
                                <td className="py-3">
                                  <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                      item.status,
                                    )}`}
                                  >
                                    {item.status}
                                  </span>
                                </td>
                                <td className="py-3 text-sm text-gray-600">
                                  {item.status === "Pending" ? (
                                    <span>-</span>
                                  ) : item.status === "In Progress" ? (
                                    <span>Started {getTimeElapsed(item.startTime)}</span>
                                  ) : (
                                    <span>Completed {getTimeElapsed(item.completionTime)}</span>
                                  )}
                                </td>
                                <td className="py-3">
                                  <div className="flex items-center gap-2">
                                    {item.status === "Pending" ? (
                                      <Button
                                        size="sm"
                                        className="h-8 bg-blue-600 hover:bg-blue-700 text-white"
                                        onClick={() => updateItemStatus(kot.id, item.id, "In Progress")}
                                      >
                                        Start Cooking
                                      </Button>
                                    ) : item.status === "In Progress" ? (
                                      <Button
                                        size="sm"
                                        className="h-8 bg-green-600 hover:bg-green-700 text-white"
                                        onClick={() => updateItemStatus(kot.id, item.id, "Ready")}
                                      >
                                        Mark Ready
                                      </Button>
                                    ) : (
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-8 border-green-500 text-green-600"
                                        disabled
                                      >
                                        <CheckCircle className="w-4 h-4 mr-1" />
                                        Ready
                                      </Button>
                                    )}

                                    {item.status === "Ready" && (
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 text-blue-600"
                                        onClick={() => {
                                          const notification = {
                                            id: Date.now(),
                                            message: `Reminder: ${item.name} for Table ${kot.tableNumber} is ready for service!`,
                                            time: new Date().toISOString(),
                                            read: false,
                                          }
                                          setNotifications((prev) => [notification, ...prev])
                                          saveToLocalStorage()
                                        }}
                                      >
                                        <Send className="w-4 h-4" />
                                      </Button>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <ChefHat className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">No active KOTs found</h3>
                  <p className="text-gray-500">
                    {searchQuery || categoryFilter !== "All" || statusFilter !== "All"
                      ? "Try adjusting your search or filters"
                      : "All orders have been completed"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recently Completed Orders */}
          <Card className="border border-blue-500/20 bg-white backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle className="text-black flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Recently Completed Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              {completedKOTs.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-gray-600 text-sm border-b border-gray-200">
                        <th className="pb-3 font-medium">KOT ID</th>
                        <th className="pb-3 font-medium">Table</th>
                        <th className="pb-3 font-medium">Category</th>
                        <th className="pb-3 font-medium">Items</th>
                        <th className="pb-3 font-medium">Waiter</th>
                        <th className="pb-3 font-medium">Completed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {completedKOTs.slice(0, 5).map((kot) => (
                        <tr key={kot.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 font-medium text-gray-800">{kot.id}</td>
                          <td className="py-3 text-gray-700">{kot.tableNumber}</td>
                          <td className="py-3">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                kot.category === "Starter"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : kot.category === "Main Course"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-purple-100 text-purple-800"
                              }`}
                            >
                              {kot.category}
                            </span>
                          </td>
                          <td className="py-3 text-gray-700">
                            {kot.items.length} item{kot.items.length !== 1 ? "s" : ""}
                          </td>
                          <td className="py-3 text-gray-700">{kot.waiterName}</td>
                          <td className="py-3 text-sm text-gray-600">{getTimeElapsed(kot.completionTime)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">No completed orders yet</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
