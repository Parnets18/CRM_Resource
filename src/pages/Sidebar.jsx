// import React from "react";
// import { motion } from "framer-motion";
// import { Link, useLocation } from "react-router-dom";
// import {
//   Users,
//   Building2,
//   Package,
//   ShoppingCart,
//   BarChart,
//   DollarSign,
//   Clock,
//   Wallet,
//   FileText,
//   Shield,
//   Bell,
//   Home,
//   ChevronRight,
// } from "lucide-react";

// const menuItems = [
//   { name: "Dashboard", icon: Home, path: "/common" },
//   { name: "Sales Management", icon: BarChart, path: "/common/sales" },
//   { name: "Purchase Management", icon: ShoppingCart, path: "/common/purchase" },
//   { name: "Inventory Management", icon: Package, path: "/common/inventory" },
//   { name: "Customer Management", icon: Users, path: "/common/customers" },
//   { name: "HR Management", icon: Building2, path: "/common/hr" },
//   { name: "Attendance & Leave", icon: Clock, path: "/common/attendance" },
//   { name: "Payroll", icon: Wallet, path: "/common/payroll" },
//   { name: "Accounts & Finance", icon: DollarSign, path: "/common/finance" },
//   { name: "Reports & Analytics", icon: FileText, path: "/common/reports" },
//   { name: "Security & Roles", icon: Shield, path: "/common/security" },
//   { name: "Alerts & Notifications", icon: Bell, path: "/common/alerts" },
// ];

// export default function Sidebar() {
//   const location = useLocation();

//   return (
//     <motion.div
//       initial={{ x: -100 }}
//       animate={{ x: 0 }}
//       className="w-64 min-h-screen p-5 bg-white border-r border-gray-200 shadow-md"
//     >
//       {/* Logo Header */}
//       <div className="flex items-center gap-3 mb-8">
//         <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
//           CRM
//         </h1>
//       </div>

//       {/* Navigation Links */}
//       <nav className="space-y-1">
//         {menuItems.map((item) => {
//           const isActive = location.pathname === item.path;
//           const Icon = item.icon;

//           return (
//             <Link to={item.path} key={item.path}>
//               <button
//                 className={`w-full flex items-center justify-between px-4 py-2.5 rounded-md transition-all duration-200
//                   ${
//                     isActive
//                       ? "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 font-bold"
//                       : "text-gray-700 hover:bg-gray-100 hover:text-purple-700 font-medium"
//                   }`}
//               >
//                 <span className="flex items-center gap-2">
//                   <Icon className={`w-5 h-5 ${isActive ? "text-purple-600" : "text-gray-600"}`} />
//                   <span className="text-sm">{item.name}</span>
//                 </span>
//                 {isActive && <ChevronRight className="w-4 h-4 text-purple-600" />}
//               </button>
//             </Link>
//           );
//         })}
//       </nav>
//     </motion.div>
//   );
// }
  
 
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
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
  Menu,
  X,
} from "lucide-react"

const menuItems = [
  { name: "Dashboard", icon: Home, path: "/common" },
  // { name: "Sales Management", icon: BarChart, path: "/common/sales" },
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
]

export default function Sidebar() {
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <motion.div
          className="flex items-center gap-3"
          animate={{ opacity: isCollapsed ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {!isCollapsed && (
            <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                           CRM
            </h1>
          )}
        </motion.div>

        {/* Desktop Collapse Button */}
        <button
          onClick={toggleCollapse}
          className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Menu className="w-4 h-4 text-gray-600" />
        </button>

        {/* Mobile Close Button */}
        <button
          onClick={toggleMobile}
          className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path
          const Icon = item.icon

          return (
            <Link to={item.path} key={item.path} onClick={() => setIsMobileOpen(false)}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer
                  ${
                    isActive
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25"
                      : "text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-700"
                  }`}
              >
                {/* Icon */}
                <div className="flex-shrink-0">
                  <Icon
                    className={`w-5 h-5 transition-colors duration-300 ${
                      isActive ? "text-white" : "text-gray-600 group-hover:text-purple-600"
                    }`}
                  />
                </div>

                {/* Text */}
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-1 min-w-0"
                    >
                      <span
                        className={`text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis ${
                          isActive ? "text-white" : "text-gray-700 group-hover:text-purple-700"
                        }`}
                      >
                        {item.name}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Active Indicator */}
                {isActive && !isCollapsed && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex-shrink-0">
                    <ChevronRight className="w-4 h-4 text-white" />
                  </motion.div>
                )}

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.name}
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                  </div>
                )}
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            A
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-medium text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis">
                  Admin User
                </p>
                <p className="text-xs text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
                  admin@company.com
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobile}
        className="lg:hidden fixed top-4 left-4 z-50 flex items-center justify-center w-10 h-10 bg-white rounded-lg shadow-lg border border-gray-200"
      >
        <Menu className="w-5 h-5 text-gray-600" />
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={toggleMobile}
          />
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.div
        initial={{ x: -100 }}
        animate={{
          x: 0,
          width: isCollapsed ? "80px" : "280px",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden lg:flex flex-col bg-white border-r border-gray-200 shadow-lg h-screen fixed left-0 top-0 z-30"
      >
        <SidebarContent />
      </motion.div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden fixed left-0 top-0 w-80 h-screen bg-white shadow-xl z-50"
          >
            <SidebarContent />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Spacer */}
      <div className={`hidden lg:block transition-all duration-300 ${isCollapsed ? "w-20" : "w-70"}`} />
    </>
  )
}
