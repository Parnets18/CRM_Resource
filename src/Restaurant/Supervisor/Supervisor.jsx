import React, { useState } from "react";
import {
  ChefHat,
  AlertTriangle,
  CheckCircle,
  Eye,
  Calendar,
} from "lucide-react";
import RestoNav from "../RestoNav";

const Supervisor = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedItem, setSelectedItem] = useState(null);
  const [dateRange, setDateRange] = useState("today");

  // Mock data (same as before)
  const [kitchenData] = useState({
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

  return (
    <div className="lg:ml-64">
      <div className="min-h-screen bg-gray-50 p-2 sm:p-4 md:p-6">
        <RestoNav />
        <div className="max-w-7xl mx-auto mt-12">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <ChefHat className="w-8 h-8 text-orange-600" />
                  Kitchen Supervisor Dashboard
                </h1>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">
                  Monitor kitchen operations, ingredient usage, and production efficiency
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm p-2">
                  <select
                    className="text-xs sm:text-sm border-none focus:ring-0"
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
                  <div className="text-xs sm:text-sm text-gray-500">Today's Performance</div>
                  <div className="text-xl sm:text-2xl font-bold text-green-600">
                    ${totalRevenue.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-1 bg-gray-100 p-1 rounded-lg mb-6 w-fit">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                activeTab === "overview"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Production Overview
            </button>
            <button
              onClick={() => setActiveTab("inventory")}
              className={`px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                activeTab === "inventory"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Inventory Status
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                activeTab === "orders"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Active Orders
            </button>
            <button
              onClick={() => setActiveTab("staff")}
              className={`px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
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
                <div className="p-4 sm:p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Daily Production
                  </h3>
                </div>
                <div className="p-4 sm:p-6 space-y-4">
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

                      <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
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

                      <div className="grid grid-cols-3 gap-4 text-xs sm:text-sm">
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
                                className="flex justify-between items-center text-xs sm:text-sm"
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
                <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Efficiency Metrics
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-xs sm:text-sm">
                        Average Production Rate
                      </span>
                      <span className="font-medium text-green-600 text-xs sm:text-sm">87.3%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-xs sm:text-sm">Profit Margin</span>
                      <span className="font-medium text-blue-600 text-xs sm:text-sm">94.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-xs sm:text-sm">Waste Percentage</span>
                      <span className="font-medium text-red-600 text-xs sm:text-sm">2.1%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-xs sm:text-sm">Cost per Item</span>
                      <span className="font-medium text-gray-900 text-xs sm:text-sm">$2.34</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
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
                        <div className="text-xs sm:text-sm text-red-600">
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
                        <div className="text-xs sm:text-sm text-yellow-600">
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
                        <div className="text-xs sm:text-sm text-green-600">
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
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Inventory Status
                </h3>
              </div>
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span className="text-gray-600">Current:</span>
                          <span className="font-medium">
                            {item.current} {item.unit}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs sm:text-sm">
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
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Active Orders
                </h3>
              </div>
              <div className="p-4 sm:p-6">
                <div className="space-y-4">
                  {kitchenData.activeOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 rounded-lg gap-2"
                    >
                      <div className="flex items-center gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {order.item}
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600">
                            Quantity: {order.quantity} | {order.table}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-xs sm:text-sm text-gray-600">
                            Order Time
                          </div>
                          <div className="font-medium">{order.time}</div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(
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
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Staff Monitor
                </h3>
              </div>
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                          <p className="text-xs sm:text-sm text-gray-600">{staff.role}</p>
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
                        <span className="text-xs sm:text-sm text-gray-600">
                          Orders Handled Today:
                        </span>
                        <span className="font-medium text-blue-600 text-xs sm:text-sm">
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