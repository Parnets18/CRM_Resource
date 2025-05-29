import React, { useState, useEffect } from "react";
import {
  PlusIcon,
  CameraIcon,
  DocumentTextIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  FolderIcon,
  TrashIcon,
  PencilIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import RestoNav from "../RestoNav";

const ExpenseManagement = () => {
  // State management
  const [activeTab, setActiveTab] = useState("expenses");
  const [expenses, setExpenses] = useState([]);
  const [expenseTypes, setExpenseTypes] = useState([
    { id: 1, name: "Rent", color: "#3B82F6", budget: 2000 },
    { id: 2, name: "Utilities", color: "#10B981", budget: 500 },
    { id: 3, name: "Repairs", color: "#F59E0B", budget: 300 },
  ]);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showAddType, setShowAddType] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [totalIncome, setTotalIncome] = useState(5000); // Mock income for percentage calculation
  const [editType, setEditType] = useState(null);
  const [showEditType, setShowEditType] = useState(false);

  // Form states
  const [newExpense, setNewExpense] = useState({
    type: "",
    amount: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    voucherNumber: "",
    receipt: null,
    frequency: "one-time",
  });

  const [newType, setNewType] = useState({
    name: "",
    color: "#3B82F6",
    budget: "",
  });

  // Load expenses from localStorage on component mount
  useEffect(() => {
    const savedExpenses = localStorage.getItem("expenses");
    const savedTypes = localStorage.getItem("expenseTypes");

    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
    if (savedTypes) {
      setExpenseTypes(JSON.parse(savedTypes));
    }
  }, []);

  // Save to localStorage whenever expenses or types change
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("expenseTypes", JSON.stringify(expenseTypes));
  }, [expenseTypes]);

  // Handle file upload for receipts
  const handleReceiptUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewExpense((prev) => ({
          ...prev,
          receipt: {
            name: file.name,
            size: file.size,
            data: e.target.result,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Add new expense
  const addExpense = () => {
    if (!newExpense.type || !newExpense.amount) return;

    const expense = {
      id: Date.now(),
      ...newExpense,
      amount: parseFloat(newExpense.amount),
      createdAt: new Date().toISOString(),
    };

    setExpenses((prev) => [expense, ...prev]);
    setNewExpense({
      type: "",
      amount: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      voucherNumber: "",
      receipt: null,
      frequency: "one-time",
    });
    setShowAddExpense(false);
  };

  // Add new expense type
  const addExpenseType = () => {
    if (!newType.name) return;

    const type = {
      id: Date.now(),
      ...newType,
      budget: parseFloat(newType.budget) || 0,
    };

    setExpenseTypes((prev) => [...prev, type]);
    setNewType({
      name: "",
      color: "#3B82F6",
      budget: "",
    });
    setShowAddType(false);
  };

  // Delete expense
  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  // Get filtered expenses based on period
  const getFilteredExpenses = () => {
    const now = new Date();
    const filtered = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);

      switch (selectedPeriod) {
        case "daily":
          return expenseDate.toDateString() === now.toDateString();
        case "weekly":
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return expenseDate >= weekAgo;
        case "monthly":
          return (
            expenseDate.getMonth() === now.getMonth() &&
            expenseDate.getFullYear() === now.getFullYear()
          );
        default:
          return true;
      }
    });

    return filtered;
  };

  // Calculate category-wise statistics
  const getCategoryStats = () => {
    const filtered = getFilteredExpenses();
    const stats = {};

    expenseTypes.forEach((type) => {
      const typeExpenses = filtered.filter((exp) => exp.type === type.name);
      const total = typeExpenses.reduce((sum, exp) => sum + exp.amount, 0);
      const percentage = totalIncome > 0 ? (total / totalIncome) * 100 : 0;

      stats[type.name] = {
        total,
        percentage,
        budget: type.budget,
        color: type.color,
        count: typeExpenses.length,
        budgetUsed: type.budget > 0 ? (total / type.budget) * 100 : 0,
      };
    });

    return stats;
  };

  const categoryStats = getCategoryStats();
  const totalExpenses = getFilteredExpenses().reduce(
    (sum, exp) => sum + exp.amount,
    0
  );

  return (
    <div className="ml-64">
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <RestoNav />
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Expense Management
            </h1>
            <p className="text-gray-600">
              Track and manage your business expenses efficiently
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
            {[
              { id: "expenses", label: "Expenses", icon: CurrencyDollarIcon },
              { id: "reports", label: "Reports", icon: ChartBarIcon },
              { id: "types", label: "Categories", icon: FolderIcon },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                  activeTab === tab.id
                    ? "bg-white shadow-sm text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Period Filter */}
          <div className="flex items-center space-x-4 mb-6">
            <CalendarIcon className="w-5 h-5 text-gray-500" />
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            <span className="text-sm text-gray-500">
              Total: ${totalExpenses.toFixed(2)}
            </span>
          </div>

          {/* Content based on active tab */}
          <AnimatePresence mode="wait">
            {activeTab === "expenses" && (
              <motion.div
                key="expenses"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Add Expense Button */}
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Recent Expenses
                  </h2>
                  <button
                    onClick={() => setShowAddExpense(true)}
                    className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-md  transition-colors"
                  >
                    <PlusIcon className="w-4 h-4" />
                    <span>Add Expense</span>
                  </button>
                </div>

                {/* Expenses List */}
                <div className="grid gap-4">
                  {getFilteredExpenses().map((expense) => {
                    const type = expenseTypes.find(
                      (t) => t.name === expense.type
                    );
                    return (
                      <motion.div
                        key={expense.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{
                                backgroundColor: type?.color || "#6B7280",
                              }}
                            ></div>
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {expense.type}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {expense.description}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-gray-900">
                              ${expense.amount.toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-500">
                              {new Date(expense.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                          <span>Voucher: {expense.voucherNumber || "N/A"}</span>
                          <div className="flex items-center space-x-3">
                            {expense.receipt && (
                              <span className="flex items-center space-x-1">
                                <DocumentTextIcon className="w-4 h-4" />
                                <span>Receipt attached</span>
                              </span>
                            )}
                            <button
                              onClick={() => deleteExpense(expense.id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {getFilteredExpenses().length === 0 && (
                  <div className="text-center py-12">
                    <CurrencyDollarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      No expenses found for the selected period
                    </p>
                  </div>
                )}
              </motion.div>
            )}
            {activeTab === "reports" && (
              <motion.div
                key="reports"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-gray-900">
                  Expense Reports
                </h2>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Object.entries(categoryStats).map(([category, stats]) => (
                    <div
                      key={category}
                      className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900">
                          {category}
                        </h3>
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: stats.color }}
                        ></div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="text-2xl font-bold text-gray-900">
                            ${stats.total.toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500">
                            {stats.percentage.toFixed(1)}% of income
                          </p>
                        </div>

                        {stats.budget > 0 && (
                          <div>
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                              <span>Budget Usage</span>
                              <span>{stats.budgetUsed.toFixed(1)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="h-2 rounded-full transition-all"
                                style={{
                                  width: `${Math.min(stats.budgetUsed, 100)}%`,
                                  backgroundColor:
                                    stats.budgetUsed > 100
                                      ? "#EF4444"
                                      : stats.color,
                                }}
                              ></div>
                            </div>
                          </div>
                        )}

                        <p className="text-sm text-gray-500">
                          {stats.count} transactions
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Integration Status */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-900 mb-2">
                    Accounting Integration
                  </h3>
                  <p className="text-blue-700 text-sm mb-3">
                    Connect with your accounting software to automatically sync
                    expense data
                  </p>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-700 transition-colors">
                    Configure Integration
                  </button>
                </div>
              </motion.div>
            )}
            {activeTab === "types" && (
              <motion.div
                key="types"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Expense Categories
                  </h2>
                  <button
                    onClick={() => setShowAddType(true)}
                    className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
                  >
                    <PlusIcon className="w-4 h-4" />
                    <span>Add Category</span>
                  </button>
                </div>

                <div className="grid gap-4">
                  {expenseTypes.map((type) => (
                    <div
                      key={type.id}
                      className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div
                            className="w-6 h-6 rounded-full"
                            style={{ backgroundColor: type.color }}
                          ></div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {type.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              Budget: ${type.budget.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                            onClick={() => {
                              setEditType(type);
                              setShowEditType(true);
                            }}
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            // Edit Category Modal
            {/* <AnimatePresence> */}
              {showEditType && editType && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50"
                  onClick={() => setShowEditType(false)}
                >
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md m-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Edit Category
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Category Name
                        </label>
                        <input
                          type="text"
                          value={editType.name}
                          onChange={(e) =>
                            setEditType((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter category name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Color
                        </label>
                        <input
                          type="color"
                          value={editType.color}
                          onChange={(e) =>
                            setEditType((prev) => ({
                              ...prev,
                              color: e.target.value,
                            }))
                          }
                          className="w-full h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Budget
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={editType.budget}
                          onChange={(e) =>
                            setEditType((prev) => ({
                              ...prev,
                              budget: e.target.value,
                            }))
                          }
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3 mt-6">
                      <button
                        onClick={() => setShowEditType(false)}
                        className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          setExpenseTypes((prev) =>
                            prev.map((t) =>
                              t.id === editType.id
                                ? {
                                    ...editType,
                                    budget: parseFloat(editType.budget) || 0,
                                  }
                                : t
                            )
                          );
                          setShowEditType(false);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          {/* </AnimatePresence> */}

          {/* Add Type Modal */}
          <AnimatePresence>
            {showAddType && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50"
                onClick={() => setShowAddType(false)}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md m-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Add New Category
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category Name
                      </label>
                      <input
                        type="text"
                        value={newType.name}
                        onChange={(e) =>
                          setNewType((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter category name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Color
                      </label>
                      <input
                        type="color"
                        value={newType.color}
                        onChange={(e) =>
                          setNewType((prev) => ({
                            ...prev,
                            color: e.target.value,
                          }))
                        }
                        className="w-full h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Budget
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={newType.budget}
                        onChange={(e) =>
                          setNewType((prev) => ({
                            ...prev,
                            budget: e.target.value,
                          }))
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      onClick={() => setShowAddType(false)}
                      className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={addExpenseType}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Add Category
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ExpenseManagement;
