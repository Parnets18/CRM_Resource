import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  Store,
  Users,
  ShoppingCart,
  Package,
  Receipt,
  Calendar,
  ChefHat,
  UserCheck,
  DollarSign,
  TrendingUp,
  Bell,
  Settings,
  Eye,
  AlertTriangle,
  Clock,
  Utensils,
  Table,
  CreditCard,
  Star,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import RestoNav from "./RestoNav";

const RestaurantDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Sample data
  const salesData = [
    { name: "Mon", sales: 4500, orders: 45, profit: 1350 },
    { name: "Tue", sales: 5200, orders: 52, profit: 1560 },
    { name: "Wed", sales: 4800, orders: 48, profit: 1440 },
    { name: "Thu", sales: 6100, orders: 61, profit: 1830 },
    { name: "Fri", sales: 7500, orders: 75, profit: 2250 },
    { name: "Sat", sales: 8200, orders: 82, profit: 2460 },
    { name: "Sun", sales: 6800, orders: 68, profit: 2040 },
  ];

  const hourlyData = [
    { hour: "9AM", orders: 5, revenue: 850 },
    { hour: "10AM", orders: 12, revenue: 1200 },
    { hour: "11AM", orders: 18, revenue: 1800 },
    { hour: "12PM", orders: 35, revenue: 3500 },
    { hour: "1PM", orders: 42, revenue: 4200 },
    { hour: "2PM", orders: 28, revenue: 2800 },
    { hour: "3PM", orders: 15, revenue: 1500 },
    { hour: "4PM", orders: 8, revenue: 800 },
    { hour: "5PM", orders: 22, revenue: 2200 },
    { hour: "6PM", orders: 38, revenue: 3800 },
    { hour: "7PM", orders: 45, revenue: 4500 },
    { hour: "8PM", orders: 52, revenue: 5200 },
    { hour: "9PM", orders: 35, revenue: 3500 },
  ];

  const categoryData = [
    { name: "Main Course", value: 45, color: "#3b82f6", amount: 20250 },
    { name: "Starters", value: 30, color: "#10b981", amount: 13500 },
    { name: "Beverages", value: 15, color: "#f59e0b", amount: 6750 },
    { name: "Desserts", value: 10, color: "#ef4444", amount: 4500 },
  ];

  const topItems = [
    { name: "Chicken Biryani", sales: 45, revenue: 6750, growth: 12 },
    { name: "Butter Chicken", sales: 38, revenue: 5700, growth: 8 },
    { name: "Paneer Tikka", sales: 32, revenue: 4800, growth: -3 },
    { name: "Fish Curry", sales: 28, revenue: 4200, growth: 15 },
    { name: "Veg Fried Rice", sales: 25, revenue: 3000, growth: 5 },
  ];

  const tableStatus = [
    { id: 1, status: "occupied", waiter: "John", order: 2450, time: "45 min" },
    { id: 2, status: "reserved", customer: "Smith Family", time: "7:30 PM" },
    { id: 3, status: "free" },
    { id: 4, status: "occupied", waiter: "Sarah", order: 1850, time: "25 min" },
    { id: 5, status: "free" },
    { id: 6, status: "occupied", waiter: "Mike", order: 3200, time: "12 min" },
    { id: 7, status: "reserved", customer: "Johnson", time: "8:00 PM" },
    { id: 8, status: "free" },
  ];

  const kitchenOrders = [
    { id: "KOT001", table: 3, items: 2, status: "ready", time: "2 min" },
    { id: "KOT002", table: 7, items: 3, status: "cooking", time: "8 min" },
    { id: "KOT003", table: 2, items: 1, status: "pending", time: "1 min" },
    { id: "KOT004", table: 5, items: 4, status: "cooking", time: "12 min" },
  ];

  const lowStockItems = [
    { name: "Chicken Breast", current: 2, min: 5, unit: "kg", urgency: "high" },
    { name: "Tomatoes", current: 3, min: 10, unit: "kg", urgency: "high" },
    {
      name: "Basmati Rice",
      current: 8,
      min: 15,
      unit: "kg",
      urgency: "medium",
    },
    { name: "Cheese", current: 1, min: 3, unit: "kg", urgency: "high" },
  ];

  const StatCard = ({
    title,
    value,
    change,
    icon: Icon,
    color = "#3b82f6",
    subtitle,
  }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
          {change !== undefined && (
            <div className="flex items-center mt-2">
              {change >= 0 ? (
                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span
                className={`text-sm font-medium ${
                  change >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {Math.abs(change)}%
              </span>
              <span className="text-xs text-gray-500 ml-1">vs yesterday</span>
            </div>
          )}
        </div>
        <div className="ml-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${color}20` }}
          >
            <Icon className="h-6 w-6" style={{ color }} />
          </div>
        </div>
      </div>
    </div>
  );

  const TableMiniCard = ({ table }) => {
    const statusColors = {
      free: "bg-green-500",
      occupied: "bg-red-500",
      reserved: "bg-yellow-500",
    };

    return (
      <div className="bg-white rounded-lg p-3 border border-gray-200 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-sm">T{table.id}</span>
          <div
            className={`w-3 h-3 rounded-full ${statusColors[table.status]}`}
          ></div>
        </div>
        {table.status === "occupied" && (
          <div className="text-xs text-gray-600">
            <p>{table.waiter}</p>
            <p>₹{table.order}</p>
            <p>{table.time}</p>
          </div>
        )}
        {table.status === "reserved" && (
          <div className="text-xs text-gray-600">
            <p>{table.customer}</p>
            <p>{table.time}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="lg:ml-64 flex">
      {/* Sidebar navigation for desktop */}
      <div className="hidden lg:block">
        <RestoNav />
      </div>
      {/* Main content */}
      <div className="flex-1 min-h-screen bg-gray-50">
        {/* Responsive Nav for mobile */}
        <div className="block lg:hidden">
          <RestoNav />
        </div>
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 lg:mb-8">
            <StatCard
              title="Today's Revenue"
              value="₹45,230"
              change={12.5}
              icon={DollarSign}
              color="#10b981"
              subtitle="Target: ₹50,000"
            />
            <StatCard
              title="Orders Completed"
              value="127"
              change={8.2}
              icon={Receipt}
              color="#3b82f6"
              subtitle="Avg: ₹356 per order"
            />
            <StatCard
              title="Table Occupancy"
              value="60%"
              change={-5.1}
              icon={Table}
              color="#f59e0b"
              subtitle="12 of 20 tables"
            />
            <StatCard
              title="Kitchen Queue"
              value="4"
              change={-25.0}
              icon={ChefHat}
              color="#ef4444"
              subtitle="Avg wait: 8 min"
            />
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 lg:mb-8">
            {/* Sales Trend */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  Weekly Sales & Profit
                </h3>
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient
                      id="salesGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="profitGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#salesGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="profit"
                    stroke="#10b981"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#profitGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Hourly Performance */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  Today's Hourly Performance
                </h3>
                <Clock className="h-5 w-5 text-blue-500" />
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="hour" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="orders"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 lg:mb-8">
            {/* Category Performance */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                Sales by Category
              </h3>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={60}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name, props) => [
                      `${value}% (₹${props.payload.amount})`,
                      props.payload.name,
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {categoryData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span>{item.name}</span>
                    </div>
                    <span className="font-medium">₹{item.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Menu Items */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                Top Selling Items
              </h3>
              <div className="space-y-4">
                {topItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{item.name}</span>
                        <div className="flex items-center">
                          {item.growth >= 0 ? (
                            <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                          ) : (
                            <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
                          )}
                          <span
                            className={`text-xs ${
                              item.growth >= 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {Math.abs(item.growth)}%
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{item.sales} orders</span>
                        <span>₹{item.revenue}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Tables */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  Table Status
                </h3>
                <div className="flex space-x-3 text-xs">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                    <span>Free</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
                    <span>Occupied</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></div>
                    <span>Reserved</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-4 gap-2">
                {tableStatus.map((table) => (
                  <TableMiniCard key={table.id} table={table} />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Kitchen Orders */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  Kitchen Queue
                </h3>
                <ChefHat className="h-5 w-5 text-orange-500" />
              </div>
              <div className="space-y-3">
                {kitchenOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-xs font-medium text-blue-600">
                          T{order.table}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{order.id}</p>
                        <p className="text-xs text-gray-500">
                          {order.items} items
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === "ready"
                            ? "bg-green-100 text-green-800"
                            : order.status === "cooking"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{order.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stock Alerts */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  Stock Alerts
                </h3>
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
              <div className="space-y-3">
                {lowStockItems.map((item, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border-l-4 ${
                      item.urgency === "high"
                        ? "bg-red-50 border-red-500"
                        : "bg-yellow-50 border-yellow-500"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-gray-600">
                          Current: {item.current} {item.unit} | Min: {item.min}{" "}
                          {item.unit}
                        </p>
                      </div>
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.urgency === "high"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {item.urgency}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;