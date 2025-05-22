import React, { useState, useEffect } from "react";
import { motion , AnimatePresence } from "framer-motion";
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
  SquareMenu,
  SquareKanban,
  ChartBarStacked,
  CookingPot,
  Utensils,
  Grid2x2,
  TableCellsSplit,
  CircleDollarSign,
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

export default function RestoNav() {
  const [expandedSection, setExpandedSection] = useState(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const isMobile = useIsMobile();

  const navItems = [
   
  
    {
      title: "Restaurant Setup",
      icon: Utensils,
      id: "hr",
      subtabs: [
        { title: "Profile", icon: UserPlus, path: "/profile" },
        { title: "Role", icon: FileSpreadsheet, path: "/Role" },
        { title: "TableSetUp", icon: Grid2x2, path: "/TableSetUp" },
        { title: "Configure", icon: TableCellsSplit, path: "/Configure" },
      ],
    },
    {
      title: "Menu Management",
      icon: SquareKanban,
      id: "site",
      subtabs: [
        { title: "Menu", icon: SquareMenu, path: "/Menu" },
        { title: "Category", icon: ChartBarStacked, path: "/Category" },
        { title: "Recipe", icon: CookingPot, path: "/Recipe" },
        { title: "Price", icon: CircleDollarSign, path: "/Price" },
      ],
    },
    {
      title: "Stock Management",
      icon: Warehouse,
      id: "inventory",
      subtabs: [
        { title: "Raw Material", icon: ClipboardList, path: "/RawMaterial" },
        { title: "Store Location", icon: Package, path: "/StoreLocation" },
        { title: "Stock Level", icon: Users, path: "/StockLevel" },
        { title: "ManageStock", icon: BarChart3, path: "/ManageStock" },
        { title: "StockDeduction", icon: BarChart3, path: "/StockDeduction" },
      ],
    },
    {
      title: "Purchase Management",
      icon: ShoppingCart,
      id: "purchase",
      subtabs: [
        {
          title: "SuppliersVendors",
          icon: CreditCard,
          path: "/SuppliersVendors",
        },
        { title: "PurchaseOrders", icon: CreditCard, path: "/PurchaseOrders" },
        { title: "GoodsReceiptNotes", icon: Users, path: "/GoodsReceiptNotes" },
        {
          title: "StockInwardApproval",
          icon: Receipt,
          path: "/StockInwardApproval",
        },
        {
          title: "PendingPOsPayment",
          icon: Receipt,
          path: "/PendingPOsPayment",
        },
      ],
    },
    {
      title: "Order&Billing",
      icon: ShoppingCart,
      id: "kop",
      subtabs: [{ title: "Pos", icon: CreditCard, path: "/Addtocart" }],
    },
    {
      title: "Customer Managment",
      icon: ShoppingCart,
      id: "kop",
      subtabs: [
        {
          title: "CustomerProfiile",
          icon: CreditCard,
          path: "/Customermanagemnet",
        },
      ],
    },
      {
      title: "Reservations Management",
      icon: ShoppingCart,
      id: "kop",
      subtabs: [
        { title: "Table Mangagemnet", icon: CreditCard, path: "/Tablemangement" },
       
      ]
    },
      {
      title: "Kitchen Management",
      icon: ShoppingCart,
      id: "kop",
      subtabs: [
        { title: "Kitchen Mangemnet", icon: CreditCard, path: "/Kitchebnmanagement" },
       
      ]
    },
      {
      title: "Hr & Management",
      icon: ShoppingCart,
      id: "kop",
      subtabs: [
        { title: "Hr Payroll", icon: CreditCard, path: "/Hrpayroll" },
       
      ]
    },
    
    // {
    //   title: "Sales Management",
    //   icon: Banknote,
    //   id: "sales",
    //   subtabs: [
    //     { title: "Admin", icon: DollarSign, path: "/salesadmin" },
    //     { title: "Accountant", icon: PieChart, path: "/salesaccountant" },
    //     { title: "Project Manager", icon: Users, path: "/salesproject" },
    //   ],
    // },
    {
      title: "Expense Management",
      icon: Scale,
      id: "expense",
      subtabs: [
       
      ],
    },
  ];

  return (
    <div>
      {" "}
      <>
        {/* Hamburger Menu Button */}

        {isMobile && (
          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white hover:bg-gray-100 text-purple-700 border border-purple-200"
          >
            {isNavOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
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
            <h1 className="text-xl font-bold text- text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
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
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>
        </motion.div>
      </>
    </div>
  );
}
