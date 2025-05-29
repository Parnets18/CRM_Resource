import React, { useState, useEffect } from "react";
import {
  ChefHat,
  Package,
  AlertTriangle,
  TrendingUp,
  Clock,
  Users,
  CheckCircle,
  XCircle,
  Eye,
  Plus,
  Minus,
  Utensils,
  CreditCard,
  Calendar,
  BarChart2,
  UserCheck,
  ShoppingCart,
  Clipboard,
  FileText,
  Truck,
  DollarSign,
  Percent,
  Filter,
  Search,
  RefreshCw,
  Download,
} from "lucide-react";
import RestoNav from "../RestoNav";

const Supervisor = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedItem, setSelectedItem] = useState(null);
  const [dateRange, setDateRange] = useState("today");
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for kitchen operations
  const [kitchenData, setKitchenData] = useState({
    dailyProduction: [
      {
        id: 1,
        name: "Margherita Pizza",
        produced: 45,
        target: 50,
        ingredients: [
          { name: "Pizza Dough", used: 45, unit: "pieces", cost: 2.5 },
          { name: "Tomato Sauce", used: 2.25, unit: "liters", cost: 8.0 },
          { name: "Mozzarella", used: 4.5, unit: "kg", cost: 15.0 },
          { name: "Basil", used: 0.5, unit: "kg", cost: 12.0 },
        ],
        totalCost: 37.5,
        revenue: 675.0,
        profit: 637.5,
      },
      {
        id: 2,
        name: "Caesar Salad",
        produced: 32,
        target: 40,
        ingredients: [
          { name: "Romaine Lettuce", used: 8, unit: "heads", cost: 16.0 },
          { name: "Caesar Dressing", used: 1.6, unit: "liters", cost: 12.0 },
          { name: "Parmesan", used: 1.2, unit: "kg", cost: 18.0 },
          { name: "Croutons", used: 2, unit: "kg", cost: 6.0 },
        ],
        totalCost: 52.0,
        revenue: 384.0,
        profit: 332.0,
      },
      {
        id: 3,
        name: "Grilled Salmon",
        produced: 28,
        target: 35,
        ingredients: [
          { name: "Salmon Fillet", used: 8.4, unit: "kg", cost: 126.0 },
          { name: "Lemon", used: 14, unit: "pieces", cost: 7.0 },
          { name: "Herbs Mix", used: 0.3, unit: "kg", cost: 15.0 },
          { name: "Olive Oil", used: 0.5, unit: "liters", cost: 8.0 },
        ],
        totalCost: 156.0,
        revenue: 560.0,
        profit: 404.0,
      },
    ],
    inventory: [
      {
        name: "Pizza Dough",
        current: 25,
        minimum: 20,
        unit: "pieces",
        status: "ok",
      },
      {
        name: "Tomato Sauce",
        current: 8,
        minimum: 15,
        unit: "liters",
        status: "low",
      },
      {
        name: "Mozzarella",
        current: 12,
        minimum: 10,
        unit: "kg",
        status: "ok",
      },
      {
        name: "Salmon Fillet",
        current: 3,
        minimum: 8,
        unit: "kg",
        status: "critical",
      },
      {
        name: "Romaine Lettuce",
        current: 15,
        minimum: 12,
        unit: "heads",
        status: "ok",
      },
    ],
    activeOrders: [
      {
        id: 1,
        item: "Margherita Pizza",
        quantity: 3,
        table: "Table 5",
        time: "12:45",
        status: "cooking",
      },
      {
        id: 2,
        item: "Caesar Salad",
        quantity: 2,
        table: "Table 2",
        time: "12:48",
        status: "prep",
      },
      {
        id: 3,
        item: "Grilled Salmon",
        quantity: 1,
        table: "Table 8",
        time: "12:50",
        status: "cooking",
      },
      {
        id: 4,
        item: "Margherita Pizza",
        quantity: 2,
        table: "Table 1",
        time: "12:52",
        status: "prep",
      },
    ],
    staff: [
      {
        id: 1,
        name: "John Smith",
        role: "Head Chef",
        status: "active",
        orders: 8,
      },
      {
        id: 2,
        name: "Maria Garcia",
        role: "Sous Chef",
        status: "active",
        orders: 6,
      },
      {
        id: 3,
        name: "David Lee",
        role: "Line Cook",
        status: "break",
        orders: 4,
      },
      {
        id: 4,
        name: "Sarah Johnson",
        role: "Prep Cook",
        status: "active",
        orders: 3,
      },
    ],
    // New data for purchase management
    purchases: [
      {
        id: "PO-1001",
        supplier: "Fresh Produce Inc.",
        date: "2024-05-20",
        items: [
          { name: "Tomatoes", quantity: 20, unit: "kg", price: 3.5 },
          { name: "Onions", quantity: 15, unit: "kg", price: 2.0 },
        ],
        status: "received",
        total: 100.0,
      },
      {
        id: "PO-1002",
        supplier: "Seafood Suppliers",
        date: "2024-05-21",
        items: [
          { name: "Salmon Fillet", quantity: 10, unit: "kg", price: 15.0 },
          { name: "Shrimp", quantity: 5, unit: "kg", price: 18.0 },
        ],
        status: "pending",
        total: 240.0,
      },
      {
        id: "PO-1003",
        supplier: "Dairy Distributors",
        date: "2024-05-22",
        items: [
          { name: "Mozzarella", quantity: 8, unit: "kg", price: 12.0 },
          { name: "Cream", quantity: 5, unit: "liters", price: 8.0 },
        ],
        status: "partial",
        total: 136.0,
      },
    ],
    // New data for expense management
    expenses: [
      {
        id: "EXP-001",
        category: "Utilities",
        description: "Electricity Bill",
        amount: 450.0,
        date: "2024-05-15",
        status: "paid",
        paymentMethod: "Bank Transfer",
      },
      {
        id: "EXP-002",
        category: "Maintenance",
        description: "Kitchen Equipment Repair",
        amount: 280.0,
        date: "2024-05-18",
        status: "pending",
        paymentMethod: "Cash",
      },
      {
        id: "EXP-003",
        category: "Supplies",
        description: "Cleaning Supplies",
        amount: 120.0,
        date: "2024-05-20",
        status: "paid",
        paymentMethod: "Credit Card",
      },
    ],
    // New data for table management
    tables: [
      { id: 1, number: "T1", capacity: 4, status: "occupied", server: "Maria" },
      { id: 2, number: "T2", capacity: 2, status: "reserved", server: "John" },
      { id: 3, number: "T3", capacity: 6, status: "available", server: null },
      { id: 4, number: "T4", capacity: 4, status: "occupied", server: "David" },
      { id: 5, number: "T5", capacity: 8, status: "cleaning", server: null },
      { id: 6, number: "T6", capacity: 2, status: "available", server: null },
    ],
    // New data for customer management
    customers: [
      {
        id: 1,
        name: "Emma Wilson",
        phone: "+1-555-123-4567",
        visits: 12,
        lastVisit: "2024-05-18",
        loyaltyPoints: 240,
        totalSpent: 1250.0,
      },
      {
        id: 2,
        name: "Michael Brown",
        phone: "+1-555-987-6543",
        visits: 8,
        lastVisit: "2024-05-10",
        loyaltyPoints: 160, 
        totalSpent: 820.0,
      },
      {
        id: 3,
        name: "Sophia Martinez",
        phone: "+1-555-456-7890",
        visits: 5,
        lastVisit: "2024-05-22",
        loyaltyPoints: 100,
        totalSpent: 560.0,
      },
    ],
  });

  // Add new mock data for sales analytics
  const [salesData, setSalesData] = useState({
    dailySales: [
      { day: "Mon", amount: 1250 },
      { day: "Tue", amount: 1400 },
      { day: "Wed", amount: 1800 },
      { day: "Thu", amount: 1600 },
      { day: "Fri", amount: 2200 },
      { day: "Sat", amount: 2800 },
      { day: "Sun", amount: 2400 },
    ],
    topSellingItems: [
      { name: "Margherita Pizza", quantity: 145, revenue: 2175.0 },
      { name: "Grilled Salmon", quantity: 98, revenue: 1960.0 },
      { name: "Caesar Salad", quantity: 112, revenue: 1344.0 },
      { name: "Pasta Carbonara", quantity: 87, revenue: 1305.0 },
      { name: "Tiramisu", quantity: 76, revenue: 760.0 },
    ],
    categoryPerformance: [
      { category: "Main Course", sales: 4850.0, percentage: 42 },
      { category: "Appetizers", sales: 2340.0, percentage: 20 },
      { category: "Desserts", sales: 1520.0, percentage: 13 },
      { category: "Beverages", sales: 1750.0, percentage: 15 },
      { category: "Sides", sales: 1150.0, percentage: 10 },
    ],
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "ok":
        return "text-green-600 bg-green-100";
      case "low":
        return "text-yellow-600 bg-yellow-100";
      case "critical":
        return "text-red-600 bg-red-100";
      case "active":
        return "text-green-600 bg-green-100";
      case "break":
        return "text-yellow-600 bg-yellow-100";
      case "cooking":
        return "text-blue-600 bg-blue-100";
      case "prep":
        return "text-orange-600 bg-orange-100";
      case "received":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "partial":
        return "text-blue-600 bg-blue-100";
      case "paid":
        return "text-green-600 bg-green-100";
      case "occupied":
        return "text-blue-600 bg-blue-100";
      case "reserved":
        return "text-purple-600 bg-purple-100";
      case "available":
        return "text-green-600 bg-green-100";
      case "cleaning":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getProgressPercentage = (produced, target) => {
    return Math.min((produced / target) * 100, 100);
  };

  const totalRevenue = kitchenData.dailyProduction.reduce(
    (sum, item) => sum + item.revenue,
    0
  );
  const totalProfit = kitchenData.dailyProduction.reduce(
    (sum, item) => sum + item.profit,
    0
  );
  const totalCost = kitchenData.dailyProduction.reduce(
    (sum, item) => sum + item.totalCost,
    0
  );

  // Calculate total expenses
  const totalExpenses = kitchenData.expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  // Calculate profit margin
  const profitMargin = totalProfit > 0 ? (totalProfit / totalRevenue) * 100 : 0;

  // Calculate table utilization
  const occupiedTables = kitchenData.tables.filter(
    (table) => table.status === "occupied" || table.status === "reserved"
  ).length;
  const tableUtilization = (occupiedTables / kitchenData.tables.length) * 100;

  return (
    <div className="ml-64">
      <div className="min-h-screen bg-gray-50 p-6">
        <RestoNav />
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <ChefHat className="w-8 h-8 text-orange-600" />
                  Kitchen Supervisor Dashboard
                </h1>
                <p className="text-gray-600 mt-2">
                  Monitor kitchen operations, ingredient usage, and production
                  efficiency
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm p-2">
                  <select
                    className="text-sm border-none focus:ring-0"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                  >
                    <option value="today">Today</option>
                    <option value="yesterday">Yesterday</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                  <Calendar className="w-4 h-4 text-gray-500" />
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Today's Performance</div>
                  <div className="text-2xl font-bold text-green-600">
                    ${totalRevenue.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Revenue
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    ${totalRevenue.toFixed(2)}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Profit
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    ${totalProfit.toFixed(2)}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Cost
                  </p>
                  <p className="text-2xl font-bold text-red-600">
                    ${totalCost.toFixed(2)}
                  </p>
                </div>
                <Package className="w-8 h-8 text-red-600" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Active Orders
                  </p>
                  <p className="text-2xl font-bold text-orange-600">
                    {kitchenData.activeOrders.length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </div> */}

          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6 w-fit">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "overview"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Production Overview
            </button>
            <button
              onClick={() => setActiveTab("inventory")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "inventory"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Inventory Status
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "orders"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Active Orders
            </button>
            <button
              onClick={() => setActiveTab("staff")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "staff"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Staff Monitor
            </button>
          </div>

          {/* Content Based on Active Tab */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Production Items */}
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Daily Production
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  {kitchenData.dailyProduction.map((item) => (
                    <div
                      key={item.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">
                          {item.name}
                        </h4>
                        <button
                          onClick={() =>
                            setSelectedItem(
                              selectedItem === item.id ? null : item.id
                            )
                          }
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>
                          Progress: {item.produced}/{item.target}
                        </span>
                        <span>
                          {getProgressPercentage(
                            item.produced,
                            item.target
                          ).toFixed(1)}
                          %
                        </span>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${getProgressPercentage(
                              item.produced,
                              item.target
                            )}%`,
                          }}
                        ></div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Cost:</span>
                          <div className="font-medium text-red-600">
                            ${item.totalCost.toFixed(2)}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">Revenue:</span>
                          <div className="font-medium text-green-600">
                            ${item.revenue.toFixed(2)}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">Profit:</span>
                          <div className="font-medium text-blue-600">
                            ${item.profit.toFixed(2)}
                          </div>
                        </div>
                      </div>

                      {/* Ingredient Details */}
                      {selectedItem === item.id && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <h5 className="font-medium text-gray-900 mb-3">
                            Ingredient Usage
                          </h5>
                          <div className="space-y-2">
                            {item.ingredients.map((ingredient, idx) => (
                              <div
                                key={idx}
                                className="flex justify-between items-center text-sm"
                              >
                                <span className="text-gray-600">
                                  {ingredient.name}
                                </span>
                                <div className="text-right">
                                  <div className="font-medium">
                                    {ingredient.used} {ingredient.unit}
                                  </div>
                                  <div className="text-gray-500">
                                    ${ingredient.cost.toFixed(2)}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Efficiency Metrics
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">
                        Average Production Rate
                      </span>
                      <span className="font-medium text-green-600">87.3%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Profit Margin</span>
                      <span className="font-medium text-blue-600">94.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Waste Percentage</span>
                      <span className="font-medium text-red-600">2.1%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Cost per Item</span>
                      <span className="font-medium text-gray-900">$2.34</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Alerts & Notifications
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <div>
                        <div className="font-medium text-red-900">
                          Critical Stock Level
                        </div>
                        <div className="text-sm text-red-600">
                          Salmon Fillet running low
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      <div>
                        <div className="font-medium text-yellow-900">
                          Low Stock Warning
                        </div>
                        <div className="text-sm text-yellow-600">
                          Tomato Sauce below minimum
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="font-medium text-green-900">
                          Production Target Met
                        </div>
                        <div className="text-sm text-green-600">
                          Pizza production on track
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "inventory" && (
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Inventory Status
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {kitchenData.inventory.map((item, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium text-gray-900">
                          {item.name}
                        </h4>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Current:</span>
                          <span className="font-medium">
                            {item.current} {item.unit}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Minimum:</span>
                          <span className="font-medium">
                            {item.minimum} {item.unit}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${
                              item.status === "critical"
                                ? "bg-red-500"
                                : item.status === "low"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            }`}
                            style={{
                              width: `${Math.min(
                                (item.current / (item.minimum * 2)) * 100,
                                100
                              )}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Active Orders
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {kitchenData.activeOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {order.item}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Quantity: {order.quantity} | {order.table}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm text-gray-600">
                            Order Time
                          </div>
                          <div className="font-medium">{order.time}</div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "staff" && (
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Staff Monitor
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {kitchenData.staff.map((staff) => (
                    <div
                      key={staff.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {staff.name}
                          </h4>
                          <p className="text-sm text-gray-600">{staff.role}</p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            staff.status
                          )}`}
                        >
                          {staff.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          Orders Handled Today:
                        </span>
                        <span className="font-medium text-blue-600">
                          {staff.orders}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Supervisor;
