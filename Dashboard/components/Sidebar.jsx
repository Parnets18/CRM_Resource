import { Link, useLocation } from "react-router-dom"
import {
  Store,
  Menu,
  Package,
  ShoppingCart,
  Users,
  CreditCard,
  Coffee,
  UserCheck,
  DollarSign,
  BarChart2,
  Settings,
  ChevronRight,
} from "lucide-react"
import { cn } from "../lib/utils"

const menuItems = [
  {
    name: "Dashboard",
    icon: <Store className="h-5 w-5" />,
    path: "/",
  },
  {
    name: "Restaurant Setup",
    icon: <Store className="h-5 w-5" />,
    path: "/setup",
  },
  {
    name: "Menu Management",
    icon: <Menu className="h-5 w-5" />,
    path: "/menu",
  },
  {
    name: "Inventory Management",
    icon: <Package className="h-5 w-5" />,
    path: "/inventory",
  },
  {
    name: "Purchase Management",
    icon: <ShoppingCart className="h-5 w-5" />,
    path: "/purchase",
  },
  {
    name: "POS & Billing",
    icon: <CreditCard className="h-5 w-5" />,
    path: "/pos",
  },
  {
    name: "Customer Management",
    icon: <Users className="h-5 w-5" />,
    path: "/customers",
  },
  {
    name: "Table Management",
    icon: <Coffee className="h-5 w-5" />,
    path: "/tables",
  },
  {
    name: "Kitchen Management",
    icon: <Coffee className="h-5 w-5" />,
    path: "/kitchen",
  },
  {
    name: "HR & Payroll",
    icon: <UserCheck className="h-5 w-5" />,
    path: "/hr-payroll",
  },
  {
    name: "Expense Management",
    icon: <DollarSign className="h-5 w-5" />,
    path: "/expenses",
  },
  {
    name: "Reports & Analytics",
    icon: <BarChart2 className="h-5 w-5" />,
    path: "/reports",
  },
  {
    name: "Admin & Settings",
    icon: <Settings className="h-5 w-5" />,
    path: "/settings",
  },
]

export default function Sidebar({ collapsed, setCollapsed }) {
  const location = useLocation()

  return (
    <aside className={cn("bg-black text-white transition-all duration-300 ease-in-out", collapsed ? "w-20" : "w-64")}>
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <Link to="/" className="flex items-center">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-600 text-white font-bold text-xl">
            N
          </div>
          {!collapsed && <span className="ml-3 text-xl font-bold">CRM</span>}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="mt-5 px-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center px-4 py-3 mt-1 rounded-lg transition-colors",
              location.pathname === item.path
                ? "bg-purple-800 text-white"
                : "text-gray-400 hover:bg-purple-900 hover:text-white",
              collapsed ? "justify-center" : "justify-between",
            )}
          >
            <div className="flex items-center">
              {item.icon}
              {!collapsed && <span className="ml-3">{item.name}</span>}
            </div>
            {!collapsed && location.pathname === item.path && <ChevronRight className="h-4 w-4" />}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
