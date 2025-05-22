import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Banknote,
  MapPin,
  Scale,
  ShoppingCart,
  Warehouse,
  Users,
  ChevronDown,
  ChevronRight,
  UserPlus,
  FileSpreadsheet,
  Calendar,
  Building,
  Settings,
  Users2,
  ClipboardList,
  Package,
  BarChart3,
  CreditCard,
  Receipt,
  DollarSign,
  PieChart,
  Wallet,
  Calculator,
  Menu,
  X,
  CalendarDays,
  Star,
  Gift,
  LockKeyhole,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

export default function Nav() {
  const [expandedSection, setExpandedSection] = useState(null);
  const [expandedSubtabs, setExpandedSubtabs] = useState([]);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleSubtabExpansion = (subtabId) => {
    setExpandedSubtabs((prev) =>
      prev.includes(subtabId)
        ? prev.filter((id) => id !== subtabId)
        : [...prev, subtabId]
    );
  };

  const navItems = [
       {
      title: "Dashboard",
      icon: PieChart,
      id: "dashboard",
      path: "/ConstructionDashboard",
    }, 
    {
      title: "HR & Payroll Module",
      icon: MapPin,
      id: "hr",
      subtabs: [
        {
          title: "Admin",
          icon: UserPlus,
          subtabs: [
            { title: "Create Role", icon: Users, path: "/admin/create" },
            { title: "Config", icon: LockKeyhole, path: "/admin/config" },
            { title: "Report", icon: ClipboardList, path: "/admin/report" },
          ],
        },
        {
          title: "HR Manager",
          icon: FileSpreadsheet,
          path: "/manager",
          // subtabs: [
          //   { title: "Employee Detail", icon: Users, path: "/manager/employee" },
          //   { title: "Leave Management", icon: CalendarDays, path: "/leave" },
          //   { title: "Performance Reviews", icon: Star, path: "/performance" }
          // ]
        },
        {
          title: "Employee",
          icon: Calendar,
          path: "/employee",
          // subtabs: [
          //   { title: "My Profile", icon: User, path: "/profile" },
          //   { title: "Pay Slips", icon: Wallet, path: "/payslips" },
          //   { title: "Benefits", icon: Gift, path: "/benefits" }
          // ]
        },
      ],
    },
    {
      title: "Site Management",
      icon: Users,
      id: "site",
      subtabs: [
        { title: "Admin", icon: Building, path: "/siteadmin" },
        { title: "Project Manager", icon: Settings, path: "/siteproject" },
        { title: "Site Supervisor", icon: Users2, path: "/sitesupervisor" },
      ],
    },
    {
      title: "Indent & Inventory",
      icon: Warehouse,
      id: "inventory",
      subtabs: [
        {
          title: "Site Supervisor",
          icon: ClipboardList,
          path: "/inventorysite",
        },
        {
          title: "Procurement Office",
          icon: Package,
          path: "/inventoryofficer",
        },
        { title: "Project Manager", icon: Users, path: "/inventorymanager" },
        { title: "Admin", icon: BarChart3, path: "/inventoryadmin" },
      ],
    },
    {
      title: "Purchase Management",
      icon: ShoppingCart,
      id: "purchase",
      subtabs: [
        {
          title: "Procurement Officer",
          icon: CreditCard,
          path: "/purchaseofficer",
        },
        { title: "Accountant", icon: Users, path: "/purchaseaccountant" },
        { title: "Admin", icon: Receipt, path: "/purchaseadmin" },
      ],
    },
    {
      title: "Sales Management",
      icon: Banknote,
      id: "sales",
      subtabs: [
        { title: "Admin", icon: DollarSign, path: "/salesadmin" },
        { title: "Accountant", icon: PieChart, path: "/salesaccountant" },
        { title: "Project Manager", icon: Users, path: "/salesproject" },
      ],
    },
    {
      title: "Expense Management",
      icon: Scale,
      id: "expense",
      subtabs: [
        { title: "Site Supervisor", icon: Wallet, path: "/expensesupervisor" },
        { title: "Project Manager", icon: Calculator, path: "/expensemanager" },
        { title: "Accountant", icon: BarChart3, path: "/expenseaccountant" },
        { title: "Admin", icon: DollarSign, path: "/expenseadmin" },
      ],
    },
  ];

  return (
    <>
      {isMobile && !isNavOpen && (
        <button
          onClick={() => setIsNavOpen(true)}
          className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white hover:bg-gray-100 text-purple-700 border border-purple-200"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      <motion.div
        initial={{ x: isMobile ? "-100%" : 0 }}
        animate={{ x: isMobile && !isNavOpen ? "-100%" : 0 }}
        transition={{ type: "tween", duration: 0.3 }}
        className="w-64 fixed top-0 left-0 h-screen border-r border-purple-500/20 bg-white backdrop-blur-sm p-4 overflow-y-auto z-40"
      >
        <div className="flex items-center gap-2 mb-8">
          {/* <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center"
          >
            <span className="text-white font-bold text-sm">N</span>
          </motion.div> */}
          <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            CRM
          </h1>
          {isMobile && (
            <button onClick={() => setIsNavOpen(false)} className="ml-auto">
              <X className="w-6 h-6 text-purple-400" />
            </button>
          )}
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <div key={item.id}>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-purple-700"
                onClick={() =>
                  setExpandedSection(
                    expandedSection === item.id ? null : item.id
                  )
                }
              >
                <item.icon className="w-4 h-4 mr-2 text-purple-500" />
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
                    {item.subtabs.map((subtab, index) => {
                      const subtabId = `${item.id}-${subtab.title
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`;
                      const hasSubtabs =
                        subtab.subtabs && subtab.subtabs.length > 0;

                      return (
                        <div key={index}>
                          {hasSubtabs ? (
                            <>
                              <Button
                                variant="ghost"
                                className="w-full justify-start text-gray-500 hover:bg-gray-100 hover:text-purple-700 pl-8"
                                onClick={() => toggleSubtabExpansion(subtabId)}
                              >
                                <subtab.icon className="w-4 h-4 mr-2 text-purple-400" />
                                {subtab.title}
                                {expandedSubtabs.includes(subtabId) ? (
                                  <ChevronDown className="w-4 h-4 ml-auto text-purple-400" />
                                ) : (
                                  <ChevronRight className="w-4 h-4 ml-auto text-purple-400" />
                                )}
                              </Button>
                              <AnimatePresence>
                                {expandedSubtabs.includes(subtabId) && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                  >
                                    {subtab.subtabs.map(
                                      (nestedSubtab, nestedIndex) => (
                                        <Link
                                          key={nestedIndex}
                                          to={nestedSubtab.path}
                                          className="block no-underline"
                                          onClick={() =>
                                            isMobile && setIsNavOpen(false)
                                          }
                                        >
                                          <Button
                                            variant="ghost"
                                            className="w-full justify-start text-gray-500 hover:bg-gray-100 hover:text-purple-700 pl-12"
                                          >
                                            <nestedSubtab.icon className="w-4 h-4 mr-2 text-purple-400" />
                                            {nestedSubtab.title}
                                          </Button>
                                        </Link>
                                      )
                                    )}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </>
                          ) : (
                            <Link
                              to={subtab.path}
                              className="block no-underline"
                              onClick={() => isMobile && setIsNavOpen(false)}
                            >
                              <Button
                                variant="ghost"
                                className="w-full justify-start text-gray-500 hover:bg-gray-100 hover:text-purple-700 pl-8"
                              >
                                <subtab.icon className="w-4 h-4 mr-2 text-purple-400" />
                                {subtab.title}
                              </Button>
                            </Link>
                          )}
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>
      </motion.div>
    </>
  );
}
