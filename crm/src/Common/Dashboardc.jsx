import { Outlet } from 'react-router-dom';

import {
  BarChart,
  PieChart,
  DollarSign,
  Package,
  Users,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { motion } from "framer-motion"

export default function Dashboardc() {
  // Sample data for dashboard
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "New Orders",
      value: "356",
      change: "+12.2%",
      trend: "up",
      icon: ShoppingCart,
    },
    {
      title: "Inventory Items",
      value: "1,204",
      change: "-2.5%",
      trend: "down",
      icon: Package,
    },
    {
      title: "Active Customers",
      value: "3,721",
      change: "+4.7%",
      trend: "up",
      icon: Users,
    },
  ]

  // Animation variants
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
          <Button variant="outline" className="border-purple-700/30 text-purple-400 hover:bg-purple-900/20">
            Export
          </Button>
          <Button variant="gradient">Quick Actions</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {stats.map((stat, index) => (
          <motion.div key={index} variants={item}>
            <Card variant="gradient" className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-5 w-5 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center mt-1">
                  <span className={`text-sm ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                    {stat.change}
                  </span>
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500 ml-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500 ml-1" />
                  )}
                  <span className="text-gray-400 text-xs ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card variant="gradient">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription className="text-gray-400">Monthly revenue breakdown</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <BarChart className="h-16 w-16 text-purple-400 opacity-50" />
            <p className="text-gray-400 ml-4">Sales chart visualization would appear here</p>
          </CardContent>
        </Card>

        <Card variant="gradient">
          <CardHeader>
            <CardTitle>Inventory Status</CardTitle>
            <CardDescription className="text-gray-400">Stock levels by category</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <PieChart className="h-16 w-16 text-purple-400 opacity-50" />
            <p className="text-gray-400 ml-4">Inventory chart visualization would appear here</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card variant="gradient">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription className="text-gray-400">Latest transactions and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center justify-between border-b border-purple-700/20 pb-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600/30 to-pink-600/30 flex items-center justify-center mr-3">
                    <ShoppingCart className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="font-medium">New order #ORD-{1000 + item}</p>
                    <p className="text-sm text-gray-400">2 minutes ago</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${(Math.random() * 1000).toFixed(2)}</p>
                  <p className="text-sm text-gray-400">5 items</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
