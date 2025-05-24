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
  { name: "Security & Roles", icon: Shield, path: "/common/security" },
  { name: "Alerts & Notifications", icon: Bell, path: "/common/alerts" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className="w-64 min-h-screen p-5 bg-white border-r border-gray-200 shadow-md"
    >
      {/* Logo Header */}
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
          CRM
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
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-md transition-all duration-200
                  ${
                    isActive
                      ? "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 font-bold"
                      : "text-gray-700 hover:bg-gray-100 hover:text-purple-700 font-medium"
                  }`}
              >
                <span className="flex items-center gap-2">
                  <Icon className={`w-5 h-5 ${isActive ? "text-purple-600" : "text-gray-600"}`} />
                  <span className="text-sm">{item.name}</span>
                </span>
                {isActive && <ChevronRight className="w-4 h-4 text-purple-600" />}
              </button>
            </Link>
          );
        })}
      </nav>
    </motion.div>
  );
}
