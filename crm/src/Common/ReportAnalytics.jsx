import React, { useState } from 'react';
import { BarChart3, PieChart, LineChart, TrendingUp, ShoppingCart, Package, Users, Calendar, DollarSign, FileText, Download, Filter } from 'lucide-react';

const ReportAnalytics = () => {
  const [activeTab, setActiveTab] = useState('sales');
  const [selectedReport, setSelectedReport] = useState(null);

  const reportTypes = [
    { id: 'sales', name: 'Sales', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'purchase', name: 'Purchase', icon: <ShoppingCart className="w-4 h-4" /> },
    { id: 'inventory', name: 'Inventory', icon: <Package className="w-4 h-4" /> },
    { id: 'hr', name: 'HR', icon: <Users className="w-4 h-4" /> },
    { id: 'attendance', name: 'Attendance', icon: <Calendar className="w-4 h-4" /> },
    { id: 'payroll', name: 'Payroll', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'finance', name: 'Finance', icon: <FileText className="w-4 h-4" /> }
  ];

  const reportContent = {
    sales: [
      { id: 'sales-product', name: 'Product-wise Sales', description: 'Analyze sales by product categories' },
      { id: 'sales-region', name: 'Regional Sales', description: 'View sales across different regions' },
      { id: 'sales-executive', name: 'Executive Performance', description: 'Track sales executive achievements' }
    ],
    purchase: [
      { id: 'purchase-vendor', name: 'Vendor Analysis', description: 'Track purchases from different vendors' },
      { id: 'purchase-item', name: 'Item-wise Purchase', description: 'Analyze purchases by item categories' }
    ],
    inventory: [
      { id: 'inventory-stock', name: 'Current Stock', description: 'Real-time view of inventory levels' },
      { id: 'inventory-movement', name: 'Stock Movement', description: 'Track inventory inflow and outflow' },
      { id: 'inventory-valuation', name: 'Inventory Valuation', description: 'Financial valuation of inventory' }
    ],
    hr: [
      { id: 'hr-headcount', name: 'Headcount Analysis', description: 'Employee headcount by department' },
      { id: 'hr-attrition', name: 'Attrition Rate', description: 'Employee turnover analysis' }
    ],
    attendance: [
      { id: 'attendance-pattern', name: 'Attendance Patterns', description: 'Analyze attendance trends' },
      { id: 'attendance-leave', name: 'Leave Balance', description: 'Track remaining leave balances' }
    ],
    payroll: [
      { id: 'payroll-salary', name: 'Salary Sheet', description: 'Comprehensive salary sheets' },
      { id: 'payroll-deduction', name: 'Deduction Analysis', description: 'Report on salary deductions' }
    ],
    finance: [
      { id: 'finance-trial', name: 'Trial Balance', description: 'Period-end trial balance' },
      { id: 'finance-pl', name: 'Profit & Loss', description: 'P&L statements with analysis' },
      { id: 'finance-ledger', name: 'General Ledger', description: 'Detailed general ledger' }
    ]
  };

  // Sample data for the chart
  const chartData = [65, 59, 80, 81, 56, 55, 70];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  const maxValue = Math.max(...chartData);

  return (
    <div className="bg-black/90 border-r border-purple-700/30 backdrop-blur-md">
      <div className="max-w-full px-4 py-5">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-white flex items-center">
            <TrendingUp className="mr-2" /> REPORTS & ANALYTICS
          </h1>
          <div className="flex space-x-2">
            <button className="bg-purple-800 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm flex items-center">
              <Filter className="w-3 h-3 mr-1" /> Filter
            </button>
            <button className="bg-purple-800 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm flex items-center">
              <Download className="w-3 h-3 mr-1" /> Export
            </button>
          </div>
        </div>

        {/* Horizontal Tabs */}
        <div className="mb-5 border-b border-purple-700/30">
          <div className="flex flex-wrap">
            {reportTypes.map(type => (
              <button
                key={type.id}
                onClick={() => {
                  setActiveTab(type.id);
                  setSelectedReport(null);
                }}
                className={`px-4 py-2 flex items-center mr-1 transition-colors text-sm ${
                  activeTab === type.id 
                    ? 'bg-purple-800 text-white rounded-t border-b-2 border-purple-500' 
                    : 'text-purple-300 hover:text-white hover:bg-purple-900/30'
                }`}
              >
                <span className="mr-1">{type.icon}</span>
                {type.name}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-black/50 rounded-lg p-4 border border-purple-700/30">
          {!selectedReport ? (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-3 gap-4 mb-5">
                <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-3">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-purple-800/50 text-white">
                      <BarChart3 className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-purple-300 text-xs">Total Reports</h3>
                      <span className="text-white text-lg font-semibold">{reportContent[activeTab].length}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-3">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-purple-800/50 text-white">
                      <PieChart className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-purple-300 text-xs">Generated</h3>
                      <span className="text-white text-lg font-semibold">Today</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-3">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-purple-800/50 text-white">
                      <LineChart className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-purple-300 text-xs">Scheduled</h3>
                      <span className="text-white text-lg font-semibold">5</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Simple Chart */}
              <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-4 mb-5">
                <h2 className="text-white text-sm font-semibold mb-3">Performance Overview</h2>
                <div className="h-40 flex items-end space-x-1">
                  {chartData.map((value, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div 
                        className="w-full bg-purple-600 rounded-t" 
                        style={{ height: `${(value / maxValue) * 120}px` }}
                      ></div>
                      <div className="text-xs mt-1 text-purple-300">{months[index]}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Available Reports */}
              <div>
                <h2 className="text-white text-sm font-semibold mb-3">Available Reports</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {reportContent[activeTab].map(report => (
                    <div 
                      key={report.id} 
                      className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-3 hover:bg-purple-800/30 transition-colors cursor-pointer"
                      onClick={() => setSelectedReport(report)}
                    >
                      <h3 className="text-white font-medium text-sm mb-1">{report.name}</h3>
                      <p className="text-purple-300 text-xs mb-2">{report.description}</p>
                      <button className="w-full px-2 py-1 bg-purple-700 hover:bg-purple-600 text-white rounded text-xs">
                        Generate
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Selected Report View */
            <div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <button 
                    onClick={() => setSelectedReport(null)}
                    className="text-purple-400 hover:text-white text-sm mb-1"
                  >
                    ← Back to reports
                  </button>
                  <h2 className="text-white font-semibold">{selectedReport.name}</h2>
                </div>
                <button className="bg-purple-700 hover:bg-purple-600 text-white px-3 py-1 rounded text-xs">
                  Generate Report
                </button>
              </div>

              {/* Report Parameters */}
              <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-3 mb-4">
                <h3 className="text-white text-sm font-medium mb-2">Report Parameters</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-purple-300 text-xs mb-1">Date Range</label>
                    <select className="w-full bg-black/50 border border-purple-700/50 rounded px-2 py-1 text-white text-xs">
                      <option>Last 30 days</option>
                      <option>This month</option>
                      <option>Last quarter</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-purple-300 text-xs mb-1">Format</label>
                    <select className="w-full bg-black/50 border border-purple-700/50 rounded px-2 py-1 text-white text-xs">
                      <option>Tabular</option>
                      <option>Summary</option>
                      <option>Detailed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-purple-300 text-xs mb-1">Group By</label>
                    <select className="w-full bg-black/50 border border-purple-700/50 rounded px-2 py-1 text-white text-xs">
                      <option>None</option>
                      <option>Category</option>
                      <option>Date</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Sample Report Preview */}
              <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-3">
                <h3 className="text-white text-sm font-medium mb-2">Report Preview</h3>
                <div className="overflow-x-auto">
                  <table className="w-full bg-black/30 text-white text-xs">
                    <thead>
                      <tr className="bg-purple-900/50">
                        <th className="px-3 py-2 text-left">ID</th>
                        <th className="px-3 py-2 text-left">Name</th>
                        <th className="px-3 py-2 text-left">Category</th>
                        <th className="px-3 py-2 text-right">Value</th>
                        <th className="px-3 py-2 text-right">Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3, 4].map(i => (
                        <tr key={i} className="border-b border-purple-700/20">
                          <td className="px-3 py-2 text-left">#00{i}</td>
                          <td className="px-3 py-2 text-left">Item {i}</td>
                          <td className="px-3 py-2 text-left">Cat {Math.ceil(i/2)}</td>
                          <td className="px-3 py-2 text-right">${(Math.random() * 1000).toFixed(2)}</td>
                          <td className={`px-3 py-2 text-right ${i % 2 === 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {i % 2 === 0 ? '+' : '-'}{(Math.random() * 10).toFixed(2)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-2 text-center text-purple-400 text-xs">
                  Showing 4 of 120 records
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportAnalytics;