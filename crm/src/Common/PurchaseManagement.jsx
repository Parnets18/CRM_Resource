"use client"

import { useState } from "react"
import {
  ShoppingBag,
  DollarSign,
  Package,
  Plus,
  Search,
  Filter,
  Calendar,
  Truck,
  Clipboard,
  Eye,
  Download,
  FileText,
  RefreshCw,
} from "lucide-react"

export default function PurchaseManagement() {
  const [activeTab, setActiveTab] = useState("purchase-orders")

  // Sample data
  const purchaseStats = [
    {
      title: "Total Purchases",
      value: "$87,342.50",
      change: "+8.3%",
      icon: ShoppingBag,
    },
    {
      title: "Pending Orders",
      value: "24",
      change: "-3.7%",
      icon: Calendar,
    },
    {
      title: "Received Items",
      value: "1,432",
      change: "+12.2%",
      icon: Package,
    },
    {
      title: "Vendor Payments",
      value: "$45,230.75",
      change: "+5.1%",
      icon: DollarSign,
    },
  ]

  // Sample purchase orders data
  const purchaseOrders = [
    { id: "PO-2001", vendor: "Global Supplies", date: "2025-05-07", amount: "$4,250.00", status: "Received" },
    { id: "PO-2002", vendor: "Tech Components", date: "2025-05-06", amount: "$2,875.50", status: "In Transit" },
    { id: "PO-2003", vendor: "Office Solutions", date: "2025-05-05", amount: "$1,240.75", status: "Pending" },
    { id: "PO-2004", vendor: "Industrial Parts", date: "2025-05-04", amount: "$3,950.25", status: "Received" },
    { id: "PO-2005", vendor: "Raw Materials Inc", date: "2025-05-03", amount: "$5,120.00", status: "Pending Approval" },
  ]

  // Sample vendor data
  const vendors = [
    { name: "Global Supplies", purchases: "$12,450.00", orders: 8, rating: "A" },
    { name: "Tech Components", purchases: "$8,975.50", orders: 5, rating: "A" },
    { name: "Office Solutions", purchases: "$6,240.75", orders: 4, rating: "B" },
    { name: "Industrial Parts", purchases: "$9,950.25", orders: 6, rating: "A" },
    { name: "Raw Materials Inc", purchases: "$7,120.00", orders: 3, rating: "C" },
  ]

  // Sample purchase requests data
  const purchaseRequests = [
    { id: "PR-1001", requester: "John Smith", department: "Operations", date: "2025-05-07", status: "Approved" },
    { id: "PR-1002", requester: "Sarah Johnson", department: "Marketing", date: "2025-05-06", status: "Pending" },
    { id: "PR-1003", requester: "Michael Brown", department: "IT", date: "2025-05-05", status: "Rejected" },
    { id: "PR-1004", requester: "Emily Davis", department: "HR", date: "2025-05-04", status: "Approved" },
    { id: "PR-1005", requester: "David Wilson", department: "Finance", date: "2025-05-03", status: "Pending" },
  ]

  // Sample goods receipt data
  const goodsReceipts = [
    { id: "GR-3001", poRef: "PO-2001", vendor: "Global Supplies", date: "2025-05-07", items: 12, status: "Complete" },
    { id: "GR-3002", poRef: "PO-2002", vendor: "Tech Components", date: "2025-05-06", items: 8, status: "Partial" },
    { id: "GR-3003", poRef: "PO-2004", vendor: "Industrial Parts", date: "2025-05-04", items: 15, status: "Complete" },
    { id: "GR-3004", poRef: "PO-2003", vendor: "Office Solutions", date: "2025-05-05", items: 5, status: "Pending" },
    {
      id: "GR-3005",
      poRef: "PO-2005",
      vendor: "Raw Materials Inc",
      date: "2025-05-03",
      items: 20,
      status: "Scheduled",
    },
  ]

  // Sample invoices data
  const invoices = [
    { id: "INV-4001", vendor: "Global Supplies", date: "2025-05-07", amount: "$4,250.00", status: "Paid" },
    { id: "INV-4002", vendor: "Tech Components", date: "2025-05-06", amount: "$2,875.50", status: "Pending" },
    { id: "INV-4003", vendor: "Office Solutions", date: "2025-05-05", amount: "$1,240.75", status: "Overdue" },
    { id: "INV-4004", vendor: "Industrial Parts", date: "2025-05-04", amount: "$3,950.25", status: "Paid" },
    { id: "INV-4005", vendor: "Raw Materials Inc", date: "2025-05-03", amount: "$5,120.00", status: "Pending" },
  ]

  // Sample payments data
  const payments = [
    { id: "PAY-5001", vendor: "Global Supplies", date: "2025-05-07", amount: "$4,250.00", method: "Bank Transfer" },
    { id: "PAY-5002", vendor: "Tech Components", date: "2025-05-06", amount: "$2,875.50", method: "Credit Card" },
    { id: "PAY-5003", vendor: "Office Solutions", date: "2025-05-05", amount: "$1,240.75", method: "Check" },
    { id: "PAY-5004", vendor: "Industrial Parts", date: "2025-05-04", amount: "$3,950.25", method: "Bank Transfer" },
    { id: "PAY-5005", vendor: "Raw Materials Inc", date: "2025-05-03", amount: "$5,120.00", method: "Wire Transfer" },
  ]

  return (
    <div className="p-6 bg-black/90 border-r border-purple-700/30 text-gray-400 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-purple-400">Purchase Management</h1>
          <p className="text-gray-400">Manage vendor orders and procurement</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-purple-700/30 text-purple-400 hover:bg-purple-900/20 rounded-md flex items-center">
            <Download className="h-4 w-4 mr-2" /> Export
          </button>
          <button className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-md flex items-center">
            <Plus className="h-4 w-4 mr-2" /> New Purchase
          </button>
        </div>
      </div>

      {/* Stats Cards as Table */}
      <div className="mb-8 overflow-x-auto">
        <table className="w-full border border-purple-700/30 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-purple-900/20">
              {purchaseStats.map((stat, index) => (
                <th
                  key={index}
                  className="p-4 text-left font-medium text-purple-300 border-r border-purple-700/30 last:border-r-0"
                >
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-800/30 rounded-full mr-3">
                      <stat.icon className="h-5 w-5 text-purple-400" />
                    </div>
                    {stat.title}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {purchaseStats.map((stat, index) => (
                <td key={index} className="p-4 border-r border-purple-700/30 last:border-r-0">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="flex items-center mt-1">
                    <span className={`text-sm ${stat.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                      {stat.change}
                    </span>
                    <span className="text-gray-400 text-xs ml-1">from last month</span>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Purchase Process Steps as Table */}
      <div className="mb-8 overflow-x-auto">
        <table className="w-full border border-purple-700/30 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-purple-900/20">
              <th className="p-4 text-center font-medium text-purple-300" colSpan={5}>
                Purchase Process Flow
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-4 text-center border-r border-purple-700/30">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-purple-800/30 flex items-center justify-center mb-2">
                    <Clipboard className="h-6 w-6 text-purple-400" />
                  </div>
                  <span className="text-sm">Request</span>
                </div>
              </td>
              <td className="p-4 text-center border-r border-purple-700/30">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-purple-800/30 flex items-center justify-center mb-2">
                    <ShoppingBag className="h-6 w-6 text-purple-400" />
                  </div>
                  <span className="text-sm">Order</span>
                </div>
              </td>
              <td className="p-4 text-center border-r border-purple-700/30">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-purple-800/30 flex items-center justify-center mb-2">
                    <Truck className="h-6 w-6 text-purple-400" />
                  </div>
                  <span className="text-sm">Delivery</span>
                </div>
              </td>
              <td className="p-4 text-center border-r border-purple-700/30">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-purple-800/30 flex items-center justify-center mb-2">
                    <Package className="h-6 w-6 text-purple-400" />
                  </div>
                  <span className="text-sm">Receive</span>
                </div>
              </td>
              <td className="p-4 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-purple-800/30 flex items-center justify-center mb-2">
                    <DollarSign className="h-6 w-6 text-purple-400" />
                  </div>
                  <span className="text-sm">Payment</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="grid grid-cols-5 bg-purple-900/20 border border-purple-700/30 rounded-lg p-1">
          {["purchase-requests", "purchase-orders", "goods-receipt", "vendor-invoices", "payments"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-md ${
                activeTab === tab
                  ? "bg-purple-800/30 text-purple-300"
                  : "text-gray-400 hover:text-purple-300 hover:bg-purple-900/10"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </button>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 my-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-black border border-purple-700/30 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
            />
          </div>
          <button className="px-4 py-2 border border-purple-700/30 text-purple-400 hover:bg-purple-900/20 rounded-md flex items-center">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </button>
          <button className="px-4 py-2 border border-purple-700/30 text-purple-400 hover:bg-purple-900/20 rounded-md flex items-center">
            <RefreshCw className="h-4 w-4 mr-2" /> Refresh
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "purchase-requests" && (
          <div className="border border-purple-700/30 rounded-lg overflow-hidden">
            <div className="bg-purple-900/20 p-4 border-b border-purple-700/30">
              <h3 className="text-lg font-medium text-purple-300">Purchase Requests</h3>
              <p className="text-sm text-gray-400">Manage and track purchase requisitions</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-purple-900/10">
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Request ID</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Requester</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Department</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Status</th>
                    <th className="text-right py-3 px-4 font-medium text-purple-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseRequests.map((request, index) => (
                    <tr
                      key={request.id}
                      className={`border-b border-purple-700/20 hover:bg-purple-900/10 ${index % 2 === 0 ? "bg-purple-900/5" : ""}`}
                    >
                      <td className="py-3 px-4 font-medium">{request.id}</td>
                      <td className="py-3 px-4">{request.requester}</td>
                      <td className="py-3 px-4">{request.department}</td>
                      <td className="py-3 px-4">{request.date}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            request.status === "Approved"
                              ? "bg-green-500/20 text-green-400"
                              : request.status === "Rejected"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {request.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button className="px-3 py-1 bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 rounded-md text-sm flex items-center ml-auto">
                          <Eye className="h-4 w-4 mr-1" /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "purchase-orders" && (
          <div className="border border-purple-700/30 rounded-lg overflow-hidden">
            <div className="bg-purple-900/20 p-4 border-b border-purple-700/30">
              <h3 className="text-lg font-medium text-purple-300">Purchase Orders</h3>
              <p className="text-sm text-gray-400">Manage and track vendor orders</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-purple-900/10">
                    <th className="text-left py-3 px-4 font-medium text-purple-300">PO Number</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Vendor</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Status</th>
                    <th className="text-right py-3 px-4 font-medium text-purple-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseOrders.map((order, index) => (
                    <tr
                      key={order.id}
                      className={`border-b border-purple-700/20 hover:bg-purple-900/10 ${index % 2 === 0 ? "bg-purple-900/5" : ""}`}
                    >
                      <td className="py-3 px-4 font-medium">{order.id}</td>
                      <td className="py-3 px-4">{order.vendor}</td>
                      <td className="py-3 px-4">{order.date}</td>
                      <td className="py-3 px-4 font-medium">{order.amount}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            order.status === "Received"
                              ? "bg-green-500/20 text-green-400"
                              : order.status === "In Transit"
                                ? "bg-blue-500/20 text-blue-400"
                                : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button className="px-3 py-1 bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 rounded-md text-sm flex items-center ml-auto">
                          <Eye className="h-4 w-4 mr-1" /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "goods-receipt" && (
          <div className="border border-purple-700/30 rounded-lg overflow-hidden">
            <div className="bg-purple-900/20 p-4 border-b border-purple-700/30">
              <h3 className="text-lg font-medium text-purple-300">Goods Receipt</h3>
              <p className="text-sm text-gray-400">Track received items and deliveries</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-purple-900/10">
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Receipt ID</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">PO Reference</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Vendor</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Items</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Status</th>
                    <th className="text-right py-3 px-4 font-medium text-purple-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {goodsReceipts.map((receipt, index) => (
                    <tr
                      key={receipt.id}
                      className={`border-b border-purple-700/20 hover:bg-purple-900/10 ${index % 2 === 0 ? "bg-purple-900/5" : ""}`}
                    >
                      <td className="py-3 px-4 font-medium">{receipt.id}</td>
                      <td className="py-3 px-4">{receipt.poRef}</td>
                      <td className="py-3 px-4">{receipt.vendor}</td>
                      <td className="py-3 px-4">{receipt.date}</td>
                      <td className="py-3 px-4">{receipt.items}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            receipt.status === "Complete"
                              ? "bg-green-500/20 text-green-400"
                              : receipt.status === "Partial"
                                ? "bg-blue-500/20 text-blue-400"
                                : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {receipt.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button className="px-3 py-1 bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 rounded-md text-sm flex items-center ml-auto">
                          <Eye className="h-4 w-4 mr-1" /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "vendor-invoices" && (
          <div className="border border-purple-700/30 rounded-lg overflow-hidden">
            <div className="bg-purple-900/20 p-4 border-b border-purple-700/30">
              <h3 className="text-lg font-medium text-purple-300">Vendor Invoices</h3>
              <p className="text-sm text-gray-400">Manage and track vendor invoices</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-purple-900/10">
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Invoice ID</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Vendor</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Status</th>
                    <th className="text-right py-3 px-4 font-medium text-purple-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice, index) => (
                    <tr
                      key={invoice.id}
                      className={`border-b border-purple-700/20 hover:bg-purple-900/10 ${index % 2 === 0 ? "bg-purple-900/5" : ""}`}
                    >
                      <td className="py-3 px-4 font-medium">{invoice.id}</td>
                      <td className="py-3 px-4">{invoice.vendor}</td>
                      <td className="py-3 px-4">{invoice.date}</td>
                      <td className="py-3 px-4 font-medium">{invoice.amount}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            invoice.status === "Paid"
                              ? "bg-green-500/20 text-green-400"
                              : invoice.status === "Overdue"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {invoice.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button className="px-3 py-1 bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 rounded-md text-sm flex items-center ml-auto">
                          <FileText className="h-4 w-4 mr-1" /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "payments" && (
          <div className="border border-purple-700/30 rounded-lg overflow-hidden">
            <div className="bg-purple-900/20 p-4 border-b border-purple-700/30">
              <h3 className="text-lg font-medium text-purple-300">Payments</h3>
              <p className="text-sm text-gray-400">Track vendor payments</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-purple-900/10">
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Payment ID</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Vendor</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-purple-300">Method</th>
                    <th className="text-right py-3 px-4 font-medium text-purple-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment, index) => (
                    <tr
                      key={payment.id}
                      className={`border-b border-purple-700/20 hover:bg-purple-900/10 ${index % 2 === 0 ? "bg-purple-900/5" : ""}`}
                    >
                      <td className="py-3 px-4 font-medium">{payment.id}</td>
                      <td className="py-3 px-4">{payment.vendor}</td>
                      <td className="py-3 px-4">{payment.date}</td>
                      <td className="py-3 px-4 font-medium">{payment.amount}</td>
                      <td className="py-3 px-4">{payment.method}</td>
                      <td className="py-3 px-4 text-right">
                        <button className="px-3 py-1 bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 rounded-md text-sm flex items-center ml-auto">
                          <Eye className="h-4 w-4 mr-1" /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Vendor Table */}
      <div className="mt-8 border border-purple-700/30 rounded-lg overflow-hidden">
        <div className="bg-purple-900/20 p-4 border-b border-purple-700/30">
          <h3 className="text-lg font-medium text-purple-300">Top Vendors</h3>
          <p className="text-sm text-gray-400">Performance and purchase volume</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-purple-900/10">
                <th className="text-left py-3 px-4 font-medium text-purple-300">Vendor Name</th>
                <th className="text-left py-3 px-4 font-medium text-purple-300">Total Purchases</th>
                <th className="text-left py-3 px-4 font-medium text-purple-300">Orders</th>
                <th className="text-left py-3 px-4 font-medium text-purple-300">Rating</th>
                <th className="text-right py-3 px-4 font-medium text-purple-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor, index) => (
                <tr
                  key={vendor.name}
                  className={`border-b border-purple-700/20 hover:bg-purple-900/10 ${index % 2 === 0 ? "bg-purple-900/5" : ""}`}
                >
                  <td className="py-3 px-4 font-medium">{vendor.name}</td>
                  <td className="py-3 px-4">{vendor.purchases}</td>
                  <td className="py-3 px-4">{vendor.orders}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        vendor.rating === "A"
                          ? "bg-green-500/20 text-green-400"
                          : vendor.rating === "B"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {vendor.rating}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="px-3 py-1 bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 rounded-md text-sm flex items-center ml-auto">
                      <Eye className="h-4 w-4 mr-1" /> Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
