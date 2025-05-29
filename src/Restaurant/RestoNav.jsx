import React, { useState, useEffect } from "react";
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
import { Link, useLocation } from "react-router-dom";

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
  const location = useLocation();

  // Track active subtab by current path
  const [activeSubtab, setActiveSubtab] = useState(location.pathname);

  useEffect(() => {
    setActiveSubtab(location.pathname);
    // Expand the main section if the current path matches a subtab
    navItems.forEach((item) => {
      if (item.subtabs.some((sub) => sub.path === location.pathname)) {
        setExpandedSection(item.id);
      }
    });
    // eslint-disable-next-line
  }, [location.pathname]);

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
        { title: "Category", icon: ChartBarStacked, path: "/Category" },
        { title: "Menu", icon: SquareMenu, path: "/Menu" },
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
      title: "Order & Billing",
      icon: CreditCard, // Previously ShoppingCart
      id: "kop",
      subtabs: [{ title: "Pos", icon: CreditCard, path: "/Addtocart" }],
    },
    {
      title: "Customer Management",
      icon: Users2, // Changed from ShoppingCart
      id: "k",
      subtabs: [
        {
          title: "Customer Profile",
          icon: UserPlus,
          path: "/Customermanagemnet",
        },
      ],
    },
    {
      title: "Reservations Management",
      icon: Calendar, // Changed from ShoppingCart
      id: "ko",
      subtabs: [
        {
          title: "Table Management",
          icon: TableCellsSplit,
          path: "/Tablemangement",
        },
      ],
    },
    {
      title: "Kitchen Management",
      icon: CookingPot, // Changed from ShoppingCart
      subtabs: [
        {
          title: "Kitchen Management",
          icon: Utensils,
          path: "/Kitchebnmanagement",
        },
      ],
    },
    {
      title: "HR & Management",
      icon: Building, // Changed from ShoppingCart
      id: "kop",
      subtabs: [
        {
          title: "HR Payroll",
          icon: DollarSign,
          path: "/Hrpayroll",
        },
      ],
    },

    {
      title: "Expense Management",
      icon: Scale,
      id: "expense",
      subtabs: [
        {
          title: "Expense Managemnet",
          icon: CreditCard,
          path: "/Restaurantexpense",
        },
      ],
    },

    {
      title: "Restaurant Analytics",
      icon: PieChart, // Changed from Scale
      id: "analytics",
      subtabs: [
        {
          title: "Report & Analytics",
          icon: BarChart3, // Changed from CreditCard
          path: "/Restaurant&analytics",
        },
      ],
    },

    {
      title: "Supervisor",
      icon: Users2, // Changed from Scale
      id: "supervisor",
      subtabs: [
        {
          title: "Supervisor",
          icon: Users2,
          path: "/Supervisor",
        },
      ],
    },
  ];

  return (
    <div>
    {/* Hamburger Menu Button */}
      {isMobile && !isNavOpen && (
        <button
          onClick={() => setIsNavOpen(true)}
          className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white hover:bg-gray-100 text-purple-700 border border-purple-200"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

     <div
        className="w-64 fixed top-0 left-0 h-screen border-r border-purple-500/20 bg-white backdrop-blur-sm p-4 overflow-y-auto z-40"
        style={{ display: isMobile && !isNavOpen ? "none" : "block" }}
      >
        <div className="flex items-center gap-2 mb-8">
          <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            CRM
          </h1>
          {isMobile && isNavOpen && (
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
                className={`w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-purple-700 ${
                  expandedSection === item.id ? "bg-purple-50" : ""
                }`}
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
              {expandedSection === item.id && (
                <div className="overflow-hidden">
                  {item.subtabs.map((subtab, index) => (
                    <Link
                      key={index}
                      to={subtab.path}
                      className="block no-underline"
                      onClick={() => {
                        setActiveSubtab(subtab.path);
                        if (isMobile) setIsNavOpen(false);
                      }}
                    >
                      <Button
                        variant="ghost"
                        className={`w-full justify-start pl-8 text-gray-500 hover:bg-gray-100 hover:text-purple-700 ${
                          activeSubtab === subtab.path
                            ? "bg-purple-100 text-purple-700"
                            : ""
                        }`}
                      >
                        <subtab.icon className="w-4 h-4 mr-2 text-purple-400" />
                        {subtab.title}
                      </Button>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
