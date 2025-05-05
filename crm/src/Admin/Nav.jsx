import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Banknote, MapPin, Scale, ShoppingCart, Warehouse, Users,
  ChevronDown, ChevronRight, UserPlus, FileSpreadsheet, Calendar,
  Building, Settings, Users2, ClipboardList, Package, BarChart3,
  CreditCard, Receipt, DollarSign, PieChart, Wallet, Calculator
} from "lucide-react";
import { Link } from "react-router-dom";
export default function Nav() {
  const [expandedSection, setExpandedSection] = useState(null);

  const navItems = [
    {
      title: "HR & Payroll Module",
      icon: MapPin,
      id: "hr",
      subtabs: [
        { title: "Admin", icon: UserPlus ,  path: "/adminPayroll"},
        { title: "HR Manager", icon: FileSpreadsheet, path:"/manager" },
        { title: "Employee", icon: Calendar }
      ]
    },
    {
      title: "Site Management",
      icon: Users,
      id: "site",
      subtabs: [
        { title: "Admin", icon: Building },
        { title: "Project Manager", icon: Settings },
        { title: "Site Supervisor", icon: Users2 }
      ]
    },
    {
      title: "Indent & Inventory",
      icon: Warehouse,
      id: "inventory",
      subtabs: [
        { title: "Site Supervisor", icon: ClipboardList },
        { title: "Procurement Office", icon: Package },
        
        { title: "Project Manager", icon: Users },
        { title: "Admin", icon: BarChart3 }
      ]
    },
    {
      title: "Purchase Management",
      icon: ShoppingCart,
      id: "purchase",
      subtabs: [
        { title: "Procurement Officer", icon: CreditCard },
        { title: "Accountant", icon: Users },
        { title: "Admin", icon: Receipt },
        
      ]
    },
    {
      title: "Sales Management",
      icon: Banknote,
      id: "sales",
      subtabs: [
        { title: "Admin", icon: DollarSign },
        { title: "Accountant", icon: PieChart },
        { title: "Project Manager", icon: Users }
      ]
    },
    {
      title: "Expense Management",
      icon: Scale,
      id: "expense",
      subtabs: [
        { title: "Site Supervisor", icon: Wallet },
        { title: "Project Manager", icon: Calculator },
        { title: "Accountant", icon: BarChart3 },
        { title: "Admin", icon: DollarSign },
      ]
    }
  ];

  return (
    <motion.div 
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className="w-64 min-h-screen border-r border-purple-500/20 bg-black/80 backdrop-blur-sm p-4"
    >
      <div className="flex items-center gap-2 mb-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center"
        >
          <span className="text-white font-bold text-sm">N</span>
        </motion.div>
        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          NexusCRM
        </h1>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => (
          <div key={item.id}>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:bg-gradient-to-r from-purple-500/10 to-pink-500/10"
              onClick={() => setExpandedSection(expandedSection === item.id ? null : item.id)}
            >
              <item.icon className="w-4 h-4 mr-2 text-purple-400" />
              <span className="flex-1">{item.title}</span>
              {expandedSection === item.id ? (
                <ChevronDown className="w-4 h-4 text-purple-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-purple-400" />
              )}
            </Button>
            <AnimatePresence>
              {expandedSection === item.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                 {item.subtabs.map((subtab, index) => (
  <Link 
    key={index}
    to={subtab.path || `/${item.id}/${subtab.title.toLowerCase().replace(' ', '-')}`}
    className="block no-underline"
  >
    <Button
      variant="ghost"
      className="w-full justify-start text-gray-400 hover:bg-gradient-to-r from-purple-500/5 to-pink-500/5 pl-8"
    >
      <subtab.icon className="w-3.5 h-3.5 mr-2 text-purple-400/70" />
      {subtab.title}
    </Button>
  </Link>
))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))};
      </nav>
    </motion.div>
  );
}