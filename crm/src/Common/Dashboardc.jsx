"use client"

import { useState } from "react"
import { Outlet } from "react-router-dom"
import {
  BarChart,
  DollarSign,
  Package,
  Users,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Clipboard,
  UserCheck,
  Settings,
  Plus,
  AlertTriangle,
  Calendar,
  Cake,
  RefreshCw,
  ChevronRight,
  Clock,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Mock data for the dashboard
const kpiData = {
  todaySales: {
    value: 12850,
    change: 15.2,
    trend: "up",
  },
  revenue: {
    value: 45231.89,
    change: 20.1,
    trend: "up",
  },
  outstandingPayments: {
    value: 12450.5,
    change: -5.3,
    trend: "down",
  },
}

const inventoryAlerts = [
  { id: 1, name: "Laptop Dell XPS 15", stock: 3, threshold: 5, category: "Electronics" },
  { id: 2, name: "Office Desk Chair", stock: 2, threshold: 10, category: "Furniture" },
  { id: 3, name: "Printer Ink Cartridge", stock: 4, threshold: 15, category: "Supplies" },
  { id: 4, name: "Wireless Mouse", stock: 6, threshold: 10, category: "Accessories" },
]

const hrInsights = {
  attendance: {
    present: 42,
    absent: 8,
    total: 50,
    onLeave: 3,
  },
  birthdays: [
    { id: 1, name: "John Smith", department: "Sales", date: "Today", image: "/placeholder.svg?height=40&width=40" },
    {
      id: 2,
      name: "Emily Johnson",
      department: "Marketing",
      date: "Tomorrow",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Michael Brown",
      department: "Development",
      date: "May 12",
      image: "/placeholder.svg?height=40&width=40",
    },
  ],
}

const shortcuts = [
  { id: 1, name: "Create Invoice", icon: FileText, path: "/invoices/new" },
  { id: 2, name: "Purchase Order", icon: Clipboard, path: "/purchase-orders/new" },
  { id: 3, name: "Attendance", icon: UserCheck, path: "/hr/attendance" },
  { id: 4, name: "Inventory", icon: Package, path: "/inventory" },
]

const recentActivity = [
  { id: 1, type: "order", number: "ORD-1001", amount: 450.0, items: 3, time: "2 minutes ago" },
  { id: 2, type: "payment", number: "PAY-2342", amount: 1250.75, items: null, time: "15 minutes ago" },
  { id: 3, type: "inventory", number: "INV-5432", amount: null, items: 25, time: "1 hour ago" },
  { id: 4, type: "order", number: "ORD-1002", amount: 850.5, items: 7, time: "3 hours ago" },
  { id: 5, type: "payment", number: "PAY-2343", amount: 550.25, items: null, time: "5 hours ago" },
]

// Available widget types for customization
const availableWidgets = [
  { id: "kpi", name: "KPI Metrics", icon: BarChart },
  { id: "inventory", name: "Inventory Alerts", icon: AlertTriangle },
  { id: "hr", name: "HR Insights", icon: Users },
  { id: "shortcuts", name: "Quick Shortcuts", icon: ChevronRight },
  { id: "activity", name: "Recent Activity", icon: Clock },
  { id: "sales", name: "Sales Overview", icon: BarChart },
]

export default function Dashboard() {
  const [refreshing, setRefreshing] = useState(false)
  const [activeWidgets, setActiveWidgets] = useState(["kpi", "inventory", "hr", "shortcuts", "activity", "sales"])
  const [activeTab, setActiveTab] = useState("attendance")
  const [customizeOpen, setCustomizeOpen] = useState(false)

  // Simulate data refresh
  const refreshData = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 1500)
  }

  // Add or remove widget
  const toggleWidget = (widgetId) => {
    if (activeWidgets.includes(widgetId)) {
      setActiveWidgets(activeWidgets.filter((id) => id !== widgetId))
    } else {
      setActiveWidgets([...activeWidgets, widgetId])
    }
    setCustomizeOpen(false)
  }

  // Container animation
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  return (
    <div className="p-6 bg-black/90 border-r border-purple-700/30 min-h-screen text-white">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Dashboard
          </h1>
          <p className="text-gray-400">Welcome back to your NexusCRM overview</p>
        </div>
        <div className="flex gap-3">
          <button
            className="px-4 py-2 border border-purple-700/30 text-purple-400 hover:bg-purple-900/20 rounded-md flex items-center"
            onClick={refreshData}
            disabled={refreshing}
          >
            {refreshing ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Data
              </>
            )}
          </button>
          <div className="relative">
            <button
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-md text-white"
              onClick={() => setCustomizeOpen(!customizeOpen)}
            >
              Customize Dashboard
            </button>
            {customizeOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-gray-900 border border-purple-700/30 rounded-md shadow-lg z-10">
                <div className="p-2 border-b border-purple-700/30 text-sm font-medium">Manage Widgets</div>
                <div className="p-1">
                  {availableWidgets.map((widget) => (
                    <div
                      key={widget.id}
                      className="flex items-center p-2 hover:bg-purple-900/20 rounded-md cursor-pointer"
                      onClick={() => toggleWidget(widget.id)}
                    >
                      <widget.icon className="h-4 w-4 mr-2 text-purple-400" />
                      <span>{widget.name}</span>
                      <div className="ml-auto">
                        {activeWidgets.includes(widget.id) ? (
                          <span className="px-2 py-0.5 text-xs bg-purple-500/20 text-purple-300 border border-purple-500 rounded-md">
                            Active
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 text-xs bg-gray-800 text-gray-400 border border-gray-700 rounded-md">
                            Hidden
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <AnimatePresence>
        {activeWidgets.includes("kpi") && (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <motion.div variants={item}>
              <div className="bg-gray-900 border border-purple-700/30 rounded-lg overflow-hidden">
                <div className="flex flex-row items-center justify-between p-4 pb-2">
                  <h3 className="text-lg font-medium">Today's Sales</h3>
                  <DollarSign className="h-5 w-5 text-purple-400" />
                </div>
                <div className="p-4 pt-0">
                  <div className="text-2xl font-bold">${kpiData.todaySales.value.toLocaleString()}</div>
                  <div className="flex items-center mt-1">
                    <span
                      className={`text-sm ${kpiData.todaySales.trend === "up" ? "text-green-500" : "text-red-500"}`}
                    >
                      {kpiData.todaySales.trend === "up" ? "+" : ""}
                      {kpiData.todaySales.change}%
                    </span>
                    {kpiData.todaySales.trend === "up" ? (
                      <ArrowUpRight className="h-4 w-4 text-green-500 ml-1" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-500 ml-1" />
                    )}
                    <span className="text-gray-400 text-xs ml-1">from yesterday</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={item}>
              <div className="bg-gray-900 border border-purple-700/30 rounded-lg overflow-hidden">
                <div className="flex flex-row items-center justify-between p-4 pb-2">
                  <h3 className="text-lg font-medium">Revenue</h3>
                  <DollarSign className="h-5 w-5 text-purple-400" />
                </div>
                <div className="p-4 pt-0">
                  <div className="text-2xl font-bold">${kpiData.revenue.value.toLocaleString()}</div>
                  <div className="flex items-center mt-1">
                    <span className={`text-sm ${kpiData.revenue.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                      {kpiData.revenue.trend === "up" ? "+" : ""}
                      {kpiData.revenue.change}%
                    </span>
                    {kpiData.revenue.trend === "up" ? (
                      <ArrowUpRight className="h-4 w-4 text-green-500 ml-1" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-500 ml-1" />
                    )}
                    <span className="text-gray-400 text-xs ml-1">from last month</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={item}>
              <div className="bg-gray-900 border border-purple-700/30 rounded-lg overflow-hidden">
                <div className="flex flex-row items-center justify-between p-4 pb-2">
                  <h3 className="text-lg font-medium">Outstanding Payments</h3>
                  <DollarSign className="h-5 w-5 text-purple-400" />
                </div>
                <div className="p-4 pt-0">
                  <div className="text-2xl font-bold">${kpiData.outstandingPayments.value.toLocaleString()}</div>
                  <div className="flex items-center mt-1">
                    <span
                      className={`text-sm ${kpiData.outstandingPayments.trend === "up" ? "text-green-500" : "text-red-500"}`}
                    >
                      {kpiData.outstandingPayments.trend === "up" ? "+" : ""}
                      {kpiData.outstandingPayments.change}%
                    </span>
                    {kpiData.outstandingPayments.trend === "up" ? (
                      <ArrowUpRight className="h-4 w-4 text-green-500 ml-1" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-500 ml-1" />
                    )}
                    <span className="text-gray-400 text-xs ml-1">from last month</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Middle Section - Inventory Alerts and HR Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Inventory Alerts */}
        {activeWidgets.includes("inventory") && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-gray-900 border border-purple-700/30 rounded-lg overflow-hidden">
              <div className="p-4 flex flex-row items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Inventory Alerts</h3>
                  <p className="text-gray-400 text-sm">Items below threshold</p>
                </div>
                <span className="px-2.5 py-0.5 text-xs font-semibold bg-red-900/50 text-red-300 border border-red-700 rounded-md">
                  {inventoryAlerts.length} Items
                </span>
              </div>
              <div>
                <div className="space-y-1">
                  {inventoryAlerts.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between px-6 py-2 hover:bg-purple-900/20 transition-colors"
                    >
                      <div className="flex items-center">
                        <AlertTriangle className="h-4 w-4 text-amber-400 mr-2" />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-gray-400">{item.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center">
                          <span className="text-red-400 font-medium">{item.stock}</span>
                          <span className="text-gray-400 mx-1">/</span>
                          <span className="text-gray-400">{item.threshold}</span>
                        </div>
                        <div className="h-1 w-20 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              item.stock < item.threshold * 0.3
                                ? "bg-red-500"
                                : item.stock < item.threshold * 0.6
                                  ? "bg-amber-500"
                                  : "bg-green-500"
                            }`}
                            style={{ width: `${(item.stock / item.threshold) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between p-4 border-t border-purple-700/30">
                <a href="#" className="text-purple-400 text-sm">
                  View All Inventory
                </a>
                <button className="px-3 py-1 text-sm border border-purple-700/30 text-purple-400 hover:bg-purple-900/20 rounded-md flex items-center">
                  <Plus className="h-4 w-4 mr-1" /> Restock Order
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* HR Insights */}
        {activeWidgets.includes("hr") && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-gray-900 border border-purple-700/30 rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">HR Insights</h3>
                  <div className="bg-gray-800/50 rounded-lg p-1 flex">
                    <button
                      className={`px-3 py-1 text-sm rounded-md ${activeTab === "attendance" ? "bg-purple-900/50 text-purple-300" : ""}`}
                      onClick={() => setActiveTab("attendance")}
                    >
                      Attendance
                    </button>
                    <button
                      className={`px-3 py-1 text-sm rounded-md ${activeTab === "birthdays" ? "bg-purple-900/50 text-purple-300" : ""}`}
                      onClick={() => setActiveTab("birthdays")}
                    >
                      Birthdays
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  {activeTab === "attendance" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-purple-900/20 rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-400">Present</p>
                          <p className="text-2xl font-bold text-green-400">{hrInsights.attendance.present}</p>
                        </div>
                        <div className="bg-purple-900/20 rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-400">Absent</p>
                          <p className="text-2xl font-bold text-red-400">{hrInsights.attendance.absent}</p>
                        </div>
                        <div className="bg-purple-900/20 rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-400">On Leave</p>
                          <p className="text-2xl font-bold text-amber-400">{hrInsights.attendance.onLeave}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-2">Attendance Rate</p>
                        <div className="flex items-center">
                          <div className="h-2 flex-1 bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                              style={{
                                width: `${(hrInsights.attendance.present / hrInsights.attendance.total) * 100}%`,
                              }}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm font-medium">
                            {Math.round((hrInsights.attendance.present / hrInsights.attendance.total) * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "birthdays" && (
                    <div className="space-y-3">
                      {hrInsights.birthdays.map((person) => (
                        <div
                          key={person.id}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-purple-900/20 transition-colors"
                        >
                          <div className="flex items-center">
                            <div className="h-10 w-10 mr-3 rounded-full overflow-hidden bg-purple-900 flex items-center justify-center">
                              <img
                                src={person.image || "/placeholder.svg"}
                                alt={person.name}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = ""
                                  e.currentTarget.parentElement.innerHTML = person.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                }}
                              />
                            </div>
                            <div>
                              <p className="font-medium">{person.name}</p>
                              <p className="text-xs text-gray-400">{person.department}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Cake className="h-4 w-4 text-pink-400 mr-1" />
                            <span className={person.date === "Today" ? "text-green-400 font-medium" : "text-gray-400"}>
                              {person.date}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-between p-4 border-t border-purple-700/30">
                <a href="#" className="text-purple-400 text-sm">
                  View HR Dashboard
                </a>
                <button className="px-3 py-1 text-sm border border-purple-700/30 text-purple-400 hover:bg-purple-900/20 rounded-md flex items-center">
                  <Calendar className="h-4 w-4 mr-1" /> Schedule
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom Section - Quick Shortcuts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {/* Quick Shortcuts */}
        {activeWidgets.includes("shortcuts") && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-900 border border-purple-700/30 rounded-lg overflow-hidden">
              <div className="p-4">
                <h3 className="text-lg font-medium">Quick Shortcuts</h3>
                <p className="text-gray-400 text-sm">Frequently used actions</p>
              </div>
              <div>
                <div className="space-y-1">
                  {shortcuts.map((shortcut) => (
                    <a
                      key={shortcut.id}
                      href={shortcut.path}
                      className="flex items-center w-full justify-start px-6 py-3 hover:bg-purple-900/20 transition-colors"
                    >
                      <shortcut.icon className="h-5 w-5 text-purple-400 mr-3" />
                      <span>{shortcut.name}</span>
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex justify-center p-4 border-t border-purple-700/30">
                <div className="relative">
                  <button className="px-3 py-1 text-sm border border-purple-700/30 text-purple-400 hover:bg-purple-900/20 rounded-md flex items-center">
                    <Settings className="h-4 w-4 mr-1" /> Customize
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Recent Activity */}
        {activeWidgets.includes("activity") && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-3"
          >
            <div className="bg-gray-900 border border-purple-700/30 rounded-lg overflow-hidden">
              <div className="p-4">
                <h3 className="text-lg font-medium">Recent Activity</h3>
                <p className="text-gray-400 text-sm">Latest transactions and updates</p>
              </div>
              <div className="p-4 pt-0">
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between border-b border-purple-700/20 pb-3"
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600/30 to-pink-600/30 flex items-center justify-center mr-3">
                          {activity.type === "order" && <ShoppingCart className="h-5 w-5 text-purple-400" />}
                          {activity.type === "payment" && <DollarSign className="h-5 w-5 text-green-400" />}
                          {activity.type === "inventory" && <Package className="h-5 w-5 text-amber-400" />}
                        </div>
                        <div>
                          <p className="font-medium">
                            {activity.type === "order" && "New order "}
                            {activity.type === "payment" && "Payment received "}
                            {activity.type === "inventory" && "Inventory update "}
                            <span className="text-purple-400">{activity.number}</span>
                          </p>
                          <p className="text-sm text-gray-400">{activity.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {activity.amount && <p className="font-medium">${activity.amount.toLocaleString()}</p>}
                        {activity.items && <p className="text-sm text-gray-400">{activity.items} items</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between p-4 border-t border-purple-700/30">
                <a href="#" className="text-purple-400 text-sm">
                  View All Activity
                </a>
                <button
                  className="p-2 border border-purple-700/30 text-purple-400 hover:bg-purple-900/20 rounded-md"
                  title="Refresh Activity"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Sales Overview Chart */}
      {activeWidgets.includes("sales") && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <div className="bg-gray-900 border border-purple-700/30 rounded-lg overflow-hidden">
            <div className="p-4 flex flex-row items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Sales Overview</h3>
                <p className="text-gray-400 text-sm">Monthly revenue breakdown</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-sm border border-purple-700/30 text-purple-400 hover:bg-purple-900/20 rounded-md">
                  Weekly
                </button>
                <button className="px-3 py-1 text-sm border border-purple-700/30 bg-purple-900/30 text-purple-300 hover:bg-purple-900/40 rounded-md">
                  Monthly
                </button>
                <button className="px-3 py-1 text-sm border border-purple-700/30 text-purple-400 hover:bg-purple-900/20 rounded-md">
                  Yearly
                </button>
              </div>
            </div>
            <div className="h-80 flex items-center justify-center">
              <div className="w-full h-full flex flex-col items-center justify-center">
                <BarChart className="h-16 w-16 text-purple-400 opacity-50 mb-4" />
                <p className="text-gray-400">Sales chart visualization would appear here</p>
                <p className="text-xs text-gray-500 mt-2">Showing data for May 2024</p>
              </div>
            </div>
            <div className="flex justify-between p-4 border-t border-purple-700/30">
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                  <span className="text-sm text-gray-400">Revenue</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-pink-500 mr-2"></div>
                  <span className="text-sm text-gray-400">Expenses</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm text-gray-400">Profit</span>
                </div>
              </div>
              <button className="px-3 py-1 text-sm border border-purple-700/30 text-purple-400 hover:bg-purple-900/20 rounded-md">
                Export Data
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Router Outlet for nested routes */}
      <Outlet />
    </div>
  )
}
