import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import Nav from "../Nav";
import { 
  BarChart, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Filter,
  Download,
  Eye,
  AlertTriangle,
  Building2,
  Wallet,
  PieChart
} from "lucide-react";
import { useState } from "react";

export default function ExpenseAdmin() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [selectedSite, setSelectedSite] = useState("all");

  const sites = [
    { 
      id: 1, 
      name: "Site A - Commercial Complex", 
      expenses: 245000, 
      profit: 420000, 
      budget: 800000,
      manager: "Rajesh Kumar",
      status: "active",
      location: "Whitefield, Bangalore",
      completionPercentage: 65
    },
    { 
      id: 2, 
      name: "Site B - Residential Towers", 
      expenses: 178000, 
      profit: 310000, 
      budget: 600000,
      manager: "Priya Sharma",
      status: "active",
      location: "Electronic City, Bangalore",
      completionPercentage: 40
    },
    { 
      id: 3, 
      name: "Site C - IT Park", 
      expenses: 392000, 
      profit: 580000, 
      budget: 1000000,
      manager: "Amit Patel",
      status: "active",
      location: "Koramangala, Bangalore",
      completionPercentage: 85
    }
  ];

  const expenseCategories = [
    { category: "Labor", amount: 450000, percentage: 45, color: "bg-blue-500" },
    { category: "Materials", amount: 320000, percentage: 32, color: "bg-green-500" },
    { category: "Equipment", amount: 150000, percentage: 15, color: "bg-yellow-500" },
    { category: "Utilities", amount: 80000, percentage: 8, color: "bg-purple-500" }
  ];

  const monthlyTrends = [
    { month: "Jan", expenses: 800000, profit: 1200000 },
    { month: "Feb", expenses: 750000, profit: 1100000 },
    { month: "Mar", expenses: 820000, profit: 1310000 },
    { month: "Apr", expenses: 815000, profit: 1310000 }
  ];

  const totalExpenses = sites.reduce((sum, site) => sum + site.expenses, 0);
  const totalProfit = sites.reduce((sum, site) => sum + site.profit, 0);
  const totalBudget = sites.reduce((sum, site) => sum + site.budget, 0);
  const netProfit = totalProfit - totalExpenses;
  const profitMargin = ((netProfit / totalProfit) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50 p-6 ml-64">
      <Nav/>
      <div className="mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Administrative Dashboard
            </h1>
            <p className="text-gray-600">
              Comprehensive financial overview across all sites and projects
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700">
              <Eye className="w-4 h-4" />
              View Details
            </Button>
          </div>
        </div>

        {/* Time Period Selector */}
        <div className="flex gap-2 mb-6">
          {["weekly", "monthly", "quarterly", "yearly"].map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
              className={`capitalize ${selectedPeriod === period ? 'bg-purple-600 hover:bg-purple-700' : ''}`}
            >
              {period}
            </Button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{totalExpenses.toLocaleString()}
                  </p>
                  <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    +12% from last month
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Wallet className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Profit</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{totalProfit.toLocaleString()}
                  </p>
                  <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    +8% from last month
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Net Profit</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{netProfit.toLocaleString()}
                  </p>
                  <p className="text-xs text-purple-600 flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    Margin: {profitMargin}%
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Budget</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{totalBudget.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                    <Building2 className="w-3 h-3" />
                    {sites.length} Active Sites
                  </p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <BarChart className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Site-wise Performance Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="w-5 h-5" />
              Site-wise Financial Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 p-4">
              <div className="relative w-full h-full">
                <div className="absolute bottom-12 left-8 right-0 flex justify-between items-end h-64 gap-4">
                  {sites.map((site) => (
                    <div key={site.id} className="flex-1 flex flex-col items-center">
                      <div className="relative w-full max-w-20 flex gap-1">
                        {/* Profit Bar */}
                        <div className="flex-1 bg-gray-200 rounded-t-md overflow-hidden">
                          <div 
                            className="bg-gradient-to-t from-green-500 to-green-400 rounded-t-md transition-all duration-1000 ease-out" 
                            style={{ height: `${(site.profit / 600000) * 100}%` }}
                          />
                        </div>
                        {/* Expense Bar */}
                        <div className="flex-1 bg-gray-200 rounded-t-md overflow-hidden">
                          <div 
                            className="bg-gradient-to-t from-red-500 to-red-400 rounded-t-md transition-all duration-1000 ease-out" 
                            style={{ height: `${(site.expenses / 600000) * 100}%` }}
                          />
                        </div>
                      </div>
                      <p className="text-xs text-gray-700 mt-3 text-center font-medium">
                        {site.name.split(' - ')[0]}
                      </p>
                      <p className="text-xs text-gray-500 text-center">
                        {site.completionPercentage}% Complete
                      </p>
                    </div>
                  ))}
                </div>
                
                {/* Y-axis labels */}
                <div className="absolute left-0 top-4 flex flex-col justify-between h-64 text-xs text-gray-500">
                  {[600, 450, 300, 150, 0].map((value) => (
                    <div key={value} className="flex items-center">
                      <span className="w-8 text-right">₹{value}k</span>
                      <div className="ml-2 w-2 h-px bg-gray-300" />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Legend */}
              <div className="flex gap-6 justify-center mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gradient-to-t from-green-500 to-green-400 rounded-sm" />
                  <span className="text-sm text-gray-700">Profit</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gradient-to-t from-red-500 to-red-400 rounded-sm" />
                  <span className="text-sm text-gray-700">Expenses</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expense Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Expense Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {expenseCategories.map((category, index) => (
              <motion.div 
                key={category.category}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">
                    {category.category}
                  </span>
                  <span className="text-sm text-gray-600">
                    ₹{category.amount.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`${category.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 text-right">
                  {category.percentage}%
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Site Details Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Detailed Site Financial Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sites.map((site, index) => (
              <motion.div 
                key={site.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-200 hover:shadow-md transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {site.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">
                      📍 {site.location}
                    </p>
                    <p className="text-sm text-gray-600">
                      👨‍💼 Manager: {site.manager}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      (site.profit - site.expenses) > 0 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {(site.profit - site.expenses) > 0 ? '📈' : '📉'} 
                      ₹{Math.abs(site.profit - site.expenses).toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Budget</p>
                    <p className="text-lg font-semibold text-gray-900">
                      ₹{site.budget.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Expenses</p>
                    <p className="text-lg font-semibold text-red-600">
                      ₹{site.expenses.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Revenue</p>
                    <p className="text-lg font-semibold text-green-600">
                      ₹{site.profit.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Progress</p>
                    <p className="text-lg font-semibold text-purple-600">
                      {site.completionPercentage}%
                    </p>
                  </div>
                </div>

                {/* Progress Bars */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Budget Utilization</span>
                      <span>{((site.expenses / site.budget) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-1000 ease-out" 
                        style={{ width: `${(site.expenses / site.budget) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Project Completion</span>
                      <span>{site.completionPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-1000 ease-out" 
                        style={{ width: `${site.completionPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="outline" className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline" className="flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    Export Report
                  </Button>
                  {site.completionPercentage < 50 && (
                    <Button size="sm" variant="outline" className="flex items-center gap-1 text-orange-600 border-orange-200">
                      <AlertTriangle className="w-3 h-3" />
                      Review Progress
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Trends */}
      {/* <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Monthly Financial Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between gap-8 px-4">
            {monthlyTrends.map((month, index) => (
              <div key={month.month} className="flex-1 flex flex-col items-center">
                <div className="relative w-full max-w-16 flex gap-2 mb-4">
                  <div className="flex-1 bg-gray-200 rounded-t-lg overflow-hidden">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${(month.profit / 1400000) * 200}px` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className="bg-gradient-to-t from-green-500 to-green-300 rounded-t-lg"
                    />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-t-lg overflow-hidden">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${(month.expenses / 1400000) * 200}px` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className="bg-gradient-to-t from-red-500 to-red-300 rounded-t-lg"
                    />
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-700">{month.month}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
}