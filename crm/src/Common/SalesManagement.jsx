"use client"

import { useState, useEffect } from "react"
import {
  Users,
  FileText,
  DollarSign,
  Plus,
  Search,
  Filter,
  ArrowUpRight,
  Calendar,
  Mail,
  Phone,
  ExternalLink,
} from "lucide-react"

export default function SalesManagement() {
  const [activeTab, setActiveTab] = useState("leads")
  const [isLoading, setIsLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  // Sample data
  const salesStats = [
    { title: "Total Sales", value: "$124,592", icon: DollarSign },
    { title: "New Leads", value: "432", icon: Users },
    { title: "Quotations", value: "87", icon: FileText },
    { title: "Conversion", value: "24.8%", icon: ArrowUpRight },
  ]

  // Pipeline stages with data
  const pipelineStages = [
    {
      id: "leads",
      name: "Leads",
      count: 145,
      value: "$217,500",
      items: [
        { name: "Acme Corp", value: "$12,000", date: "May 7", status: "New" },
        { name: "TechGiant Inc", value: "$8,500", date: "May 6", status: "Contacted" },
        { name: "Global Services", value: "$15,000", date: "May 5", status: "Qualified" },
      ],
    },
    {
      id: "opportunities",
      name: "Opportunities",
      count: 87,
      value: "$189,300",
      items: [
        { name: "Innovate Solutions", value: "$22,000", date: "May 4", status: "Needs Analysis" },
        { name: "Prime Industries", value: "$18,500", date: "May 3", status: "Value Proposition" },
      ],
    },
    {
      id: "quotations",
      name: "Quotations",
      count: 54,
      value: "$142,750",
      items: [
        { name: "Stellar Systems", value: "$32,000", date: "May 2", status: "Sent" },
        { name: "Apex Manufacturing", value: "$27,500", date: "May 1", status: "Negotiating" },
      ],
    },
    {
      id: "orders",
      name: "Orders",
      count: 32,
      value: "$98,400",
      items: [
        { name: "Quantum Enterprises", value: "$42,000", date: "Apr 30", status: "Processing" },
        { name: "Horizon Group", value: "$35,500", date: "Apr 29", status: "Ready for Delivery" },
      ],
    },
  ]

  // Get active stage data
  const activeStage = pipelineStages.find((stage) => stage.id === activeTab) || pipelineStages[0]

  // Get status color
  const getStatusColor = (status) => {
    if (["New", "Qualified", "Paid"].includes(status)) return "bg-green-500/20 text-green-400"
    if (["Contacted", "Processing", "Sent"].includes(status)) return "bg-blue-500/20 text-blue-400"
    if (["Overdue", "Disqualified"].includes(status)) return "bg-red-500/20 text-red-400"
    return "bg-amber-500/20 text-amber-400"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0817] to-black text-white p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Sales Dashboard</h1>
          <p className="text-gray-400">Manage your sales pipeline</p>
        </div>
        <button className="px-4 py-2 bg-black/90 border-r border-purple-700/30 rounded-lg text-purple-300 hover:bg-purple-900/20 transition-colors flex items-center gap-2">
          <Plus className="h-4 w-4" /> New Lead
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {salesStats.map((stat, index) => (
          <div key={index} className="bg-black/90 border-r border-purple-700/30 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm text-gray-400">{stat.title}</h3>
              <stat.icon className="h-4 w-4 text-purple-400" />
            </div>
            <div className="text-xl font-bold">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Pipeline Summary Card */}
      <div className="bg-black/90 border-r border-purple-700/30 rounded-lg overflow-hidden mb-6">
        <div className="p-4 border-b border-purple-700/30">
          <h2 className="font-bold">Pipeline Summary</h2>
        </div>
        <div className="p-4">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-400">
                <th className="pb-3 font-medium">Stage</th>
                <th className="pb-3 font-medium">Count</th>
                <th className="pb-3 font-medium">Value</th>
                <th className="pb-3 font-medium">Avg. Deal</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-700/10">
              {pipelineStages.map((stage) => {
                const avgDeal = Number.parseInt(stage.value.replace("$", "").replace(",", "")) / stage.count
                const formattedAvg = `$${Math.round(avgDeal).toLocaleString()}`

                // Determine status based on count
                let status = "Low"
                let statusColor = "bg-red-500/20 text-red-400"

                if (stage.count > 100) {
                  status = "High"
                  statusColor = "bg-green-500/20 text-green-400"
                } else if (stage.count > 50) {
                  status = "Medium"
                  statusColor = "bg-amber-500/20 text-amber-400"
                }

                return (
                  <tr key={stage.id} className="hover:bg-purple-900/10">
                    <td className="py-3 font-medium">{stage.name}</td>
                    <td className="py-3">{stage.count}</td>
                    <td className="py-3">{stage.value}</td>
                    <td className="py-3">{formattedAvg}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${statusColor}`}>{status}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto mb-6 border-b border-purple-700/30">
        {pipelineStages.map((stage) => (
          <button
            key={stage.id}
            className={`px-4 py-2 whitespace-nowrap ${
              activeTab === stage.id ? "text-purple-400 border-b-2 border-purple-500" : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab(stage.id)}
          >
            {stage.name} ({stage.count})
          </button>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder={`Search ${activeStage.name.toLowerCase()}...`}
            className="w-full pl-10 pr-4 py-2.5 bg-black/90 border-r border-purple-700/30 rounded-lg focus:outline-none text-white"
          />
        </div>
        <button className="px-4 py-2.5 bg-black/90 border-r border-purple-700/30 rounded-lg text-purple-300 hover:bg-purple-900/20 transition-colors flex items-center gap-2">
          <Filter className="h-4 w-4" /> Filter
        </button>
      </div>

      {/* Items List */}
      <div className="bg-black/90 border-r border-purple-700/30 rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="p-8 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-500 border-t-transparent"></div>
          </div>
        ) : (
          <>
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-purple-700/30 bg-black/40 text-xs font-medium text-gray-400 uppercase">
              <div className="col-span-5">Name</div>
              <div className="col-span-2">Value</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-3">Status</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-purple-700/10">
              {activeStage.items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 p-4 hover:bg-purple-900/10 transition-colors">
                  <div className="col-span-5 font-medium">{item.name}</div>
                  <div className="col-span-2 text-gray-300">{item.value}</div>
                  <div className="col-span-2 text-gray-400 flex items-center">
                    <Calendar className="h-3 w-3 mr-1.5" />
                    {item.date}
                  </div>
                  <div className="col-span-3 flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                    <div className="flex space-x-1">
                      <button className="p-1 rounded-lg hover:bg-purple-900/30 text-gray-400 hover:text-white transition-colors">
                        <Mail size={14} />
                      </button>
                      <button className="p-1 rounded-lg hover:bg-purple-900/30 text-gray-400 hover:text-white transition-colors">
                        <Phone size={14} />
                      </button>
                      <button className="p-1 rounded-lg hover:bg-purple-900/30 text-gray-400 hover:text-white transition-colors">
                        <ExternalLink size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center p-4 border-t border-purple-700/30">
              <div className="text-sm text-gray-400">
                Showing <span className="font-medium text-white">1-{activeStage.items.length}</span> of{" "}
                <span className="font-medium text-white">{activeStage.count}</span> items
              </div>
              <div className="flex gap-1">
                <button
                  className="px-3 py-1.5 rounded-lg bg-black/90 border-r border-purple-700/30 text-gray-400 hover:text-white hover:bg-purple-900/20 transition-colors disabled:opacity-50"
                  disabled
                >
                  Previous
                </button>
                <button className="px-3 py-1.5 rounded-lg bg-black/90 border-r border-purple-700/30 text-gray-400 hover:text-white hover:bg-purple-900/20 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
