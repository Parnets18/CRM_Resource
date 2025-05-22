import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  Users,
  Building2,
  Package,
  ShoppingCart,
  BarChart,
  DollarSign,
  Clock,
  Wallet,
  FileText,
  Shield,
  Bell,
  Home,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: Home, path: "/common" },

  { name: "Sales Management", icon: BarChart, path: "/common/sales" },
  { name: "Purchase Management", icon: ShoppingCart, path: "/common/purchase" },
  { name: "Inventory Management", icon: Package, path: "/common/inventory" },
  { name: "Customer Management", icon: Users, path: "/common/customers" },
  { name: "HR Management", icon: Building2, path: "/common/hr" },
  { name: "Attendance & Leave", icon: Clock, path: "/common/attendance" },
  { name: "Payroll", icon: Wallet, path: "/common/payroll" },
  { name: "Accounts & Finance", icon: DollarSign, path: "/common/finance" },
  { name: "Reports & Analytics", icon: FileText, path: "/common/reports" },
  { name: "Security & Roles", icon: Shield, path: "/security" },
  { name: "Alerts & Notifications", icon: Bell, path: "/alerts" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className="w-64 min-h-screen bg-black/90 border-r border-purple-700/30 backdrop-blur-md p-5"
    >
      {/* Logo Header */}
      <div className="flex items-center gap-3 mb-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center"
        >
          <span className="text-white font-extrabold text-lg">N</span>
        </motion.div>
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          NexusCRM
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link to={item.path} key={item.path}>
              <button
                className={`w-full flex items-center justify-between px-4 py-2 rounded-md transition-all duration-200
                  ${
                    isActive
                      ? "bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-white"
                      : "text-gray-400 hover:bg-gradient-to-r from-purple-500/10 to-pink-500/10"
                  }`}
              >
                <span className="flex items-center gap-2">
                  <Icon className="w-5 h-5 text-purple-400" />
                  <span className="text-sm">{item.name}</span>
                </span>
                {isActive && <ChevronRight className="w-4 h-4 text-purple-400" />}
              </button>
            </Link>
          );
        })}
      </nav>
    </motion.div>
  );
}
