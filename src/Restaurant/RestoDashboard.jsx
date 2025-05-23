"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  BarChart3,
  Calendar,
  Clipboard,
  CreditCard,
  Package,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Clock,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import RestoNav from "./RestoNav"

// Mock data for dashboard
const salesData = {
  today: 12580,
  yesterday: 10450,
  percentChange: 20.38,
  orders: 42,
  averageOrder: 299.52,
}

const inventoryAlerts = [
  { item: "Chicken", status: "Low Stock", quantity: "2.5 kg", threshold: "5 kg" },
  { item: "Tomatoes", status: "Low Stock", quantity: "1.2 kg", threshold: "3 kg" },
  { item: "Cheese", status: "Expiring Soon", quantity: "4 kg", expiryDate: "2025-05-22" },
]

const pendingOrders = [
  { id: "ORD-2345", table: "Table 4", items: 6, time: "10 mins ago", status: "Preparing" },
  { id: "ORD-2344", table: "Table 7", items: 3, time: "15 mins ago", status: "Ready" },
  { id: "ORD-2343", table: "Takeaway", items: 2, time: "20 mins ago", status: "Preparing" },
]

const reservations = [
  { id: "RES-1234", name: "Rahul Sharma", time: "7:30 PM", guests: 4, table: "Table 8" },
  { id: "RES-1235", name: "Priya Patel", time: "8:00 PM", guests: 2, table: "Table 3" },
]

const topSellingItems = [
  { name: "Butter Chicken", quantity: 28, revenue: 5600 },
  { name: "Paneer Tikka", quantity: 22, revenue: 3300 },
  { name: "Veg Biryani", quantity: 18, revenue: 2700 },
  { name: "Gulab Jamun", quantity: 15, revenue: 1500 },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main layout with sidebar and content side by side */}
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <RestoNav />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 pt-4 overflow-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
            <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="flex space-x-2 border-b border-gray-200">
              <TabsTrigger
                value="overview"
                className={`pb-2 px-4 text-sm font-medium ${
                  activeTab === "overview"
                    ? "border-b-2 border-emerald-500 text-emerald-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="sales"
                className={`pb-2 px-4 text-sm font-medium ${
                  activeTab === "sales"
                    ? "border-b-2 border-emerald-500 text-emerald-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Sales
              </TabsTrigger>
              <TabsTrigger
                value="inventory"
                className={`pb-2 px-4 text-sm font-medium ${
                  activeTab === "inventory"
                    ? "border-b-2 border-emerald-500 text-emerald-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Inventory
              </TabsTrigger>
              <TabsTrigger
                value="orders"
                className={`pb-2 px-4 text-sm font-medium ${
                  activeTab === "orders"
                    ? "border-b-2 border-emerald-500 text-emerald-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Orders
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Stats Row */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Today's Sales</p>
                      <h3 className="text-2xl font-bold text-gray-900">₹{salesData.today.toLocaleString()}</h3>
                    </div>
                    <div className="rounded-full bg-emerald-100 p-3">
                      <CreditCard className="h-6 w-6 text-emerald-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    {salesData.percentChange > 0 ? (
                      <>
                        <TrendingUp className="mr-1 h-4 w-4 text-emerald-500" />
                        <span className="text-sm font-medium text-emerald-500">+{salesData.percentChange}%</span>
                      </>
                    ) : (
                      <>
                        <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
                        <span className="text-sm font-medium text-red-500">{salesData.percentChange}%</span>
                      </>
                    )}
                    <span className="ml-1 text-sm text-gray-500">vs yesterday</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Orders Today</p>
                      <h3 className="text-2xl font-bold text-gray-900">{salesData.orders}</h3>
                    </div>
                    <div className="rounded-full bg-blue-100 p-3">
                      <Clipboard className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <span className="text-sm text-gray-500">Avg. Order Value:</span>
                    <span className="ml-1 text-sm font-medium text-gray-700">₹{salesData.averageOrder}</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Inventory Alerts</p>
                      <h3 className="text-2xl font-bold text-gray-900">{inventoryAlerts.length}</h3>
                    </div>
                    <div className="rounded-full bg-amber-100 p-3">
                      <AlertCircle className="h-6 w-6 text-amber-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <span className="text-sm text-gray-500">{inventoryAlerts.length} items need attention</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Today's Reservations</p>
                      <h3 className="text-2xl font-bold text-gray-900">{reservations.length}</h3>
                    </div>
                    <div className="rounded-full bg-purple-100 p-3">
                      <Calendar className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <Clock className="mr-1 h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500">Next at {reservations[0]?.time}</span>
                  </div>
                </motion.div>
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Left Column - 2/3 width */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Top Selling Items */}
                  <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Top Selling Items</h3>
                      <Link to="/reports" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
                        View All
                      </Link>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="pb-3 text-left text-xs font-medium uppercase text-gray-500">Item</th>
                            <th className="pb-3 text-right text-xs font-medium uppercase text-gray-500">Quantity</th>
                            <th className="pb-3 text-right text-xs font-medium uppercase text-gray-500">Revenue</th>
                          </tr>
                        </thead>
                        <tbody>
                          {topSellingItems.map((item, index) => (
                            <tr key={index} className="border-b border-gray-100">
                              <td className="py-3 text-sm font-medium text-gray-900">{item.name}</td>
                              <td className="py-3 text-right text-sm text-gray-500">{item.quantity}</td>
                              <td className="py-3 text-right text-sm font-medium text-gray-900">
                                ₹{item.revenue.toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Pending Orders */}
                  <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Pending Orders</h3>
                      <Link to="/pos" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
                        View All
                      </Link>
                    </div>
                    <div className="space-y-4">
                      {pendingOrders.map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between rounded-lg border border-gray-100 p-4"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-900">{order.id}</span>
                              <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                                {order.table}
                              </span>
                            </div>
                            <div className="mt-1 text-sm text-gray-500">
                              {order.items} items • {order.time}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-medium ${
                                order.status === "Ready"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-amber-100 text-amber-700"
                              }`}
                            >
                              {order.status}
                            </span>
                            <button className="rounded-lg border border-gray-200 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50">
                              View
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - 1/3 width */}
                <div className="space-y-6">
                  {/* Quick Actions */}
                  <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        to="/pos"
                        className="flex flex-col items-center rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
                      >
                        <CreditCard className="h-6 w-6 text-emerald-600" />
                        <span className="mt-2 text-sm font-medium text-gray-700">New Order</span>
                      </Link>
                      <Link
                        to="/reservations"
                        className="flex flex-col items-center rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
                      >
                        <Calendar className="h-6 w-6 text-blue-600" />
                        <span className="mt-2 text-sm font-medium text-gray-700">Reservation</span>
                      </Link>
                      <Link
                        to="/inventory"
                        className="flex flex-col items-center rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
                      >
                        <Package className="h-6 w-6 text-amber-600" />
                        <span className="mt-2 text-sm font-medium text-gray-700">Inventory</span>
                      </Link>
                      <Link
                        to="/reports"
                        className="flex flex-col items-center rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
                      >
                        <BarChart3 className="h-6 w-6 text-purple-600" />
                        <span className="mt-2 text-sm font-medium text-gray-700">Reports</span>
                      </Link>
                    </div>
                  </div>

                  {/* Inventory Alerts */}
                  <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Inventory Alerts</h3>
                      <Link to="/inventory" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
                        View All
                      </Link>
                    </div>
                    <div className="space-y-3">
                      {inventoryAlerts.map((alert, index) => (
                        <div key={index} className="rounded-lg border border-gray-100 p-3">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900">{alert.item}</span>
                            <span
                              className={`rounded-full px-2 py-1 text-xs font-medium ${
                                alert.status === "Low Stock" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                              }`}
                            >
                              {alert.status}
                            </span>
                          </div>
                          <div className="mt-1 text-sm text-gray-500">
                            {alert.status === "Low Stock" ? (
                              <>
                                Current: {alert.quantity} (Min: {alert.threshold})
                              </>
                            ) : (
                              <>Expires on: {new Date(alert.expiryDate).toLocaleDateString()}</>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Today's Reservations */}
                  <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Today's Reservations</h3>
                      <Link to="/reservations" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
                        View All
                      </Link>
                    </div>
                    <div className="space-y-3">
                      {reservations.map((reservation) => (
                        <div key={reservation.id} className="rounded-lg border border-gray-100 p-3">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900">{reservation.name}</span>
                            <span className="text-sm text-gray-500">{reservation.time}</span>
                          </div>
                          <div className="mt-1 text-sm text-gray-500">
                            {reservation.guests} guests • {reservation.table}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sales" className="space-y-6">
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900">Sales Overview</h3>
                <p className="text-gray-500">Detailed sales information will be displayed here.</p>
              </div>
            </TabsContent>

            <TabsContent value="inventory" className="space-y-6">
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900">Inventory Overview</h3>
                <p className="text-gray-500">Detailed inventory information will be displayed here.</p>
              </div>
            </TabsContent>

            <TabsContent value="orders" className="space-y-6">
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900">Orders Overview</h3>
                <p className="text-gray-500">Detailed order information will be displayed here.</p>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
