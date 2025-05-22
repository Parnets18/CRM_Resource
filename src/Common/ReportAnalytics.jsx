import React, { useState } from 'react';
import { BarChart3, PieChart, LineChart, TrendingUp, ShoppingCart, Package, Users, Calendar, DollarSign, FileText, Download, Filter, X } from 'lucide-react';

const ReportAnalytics = () => {
  const [activeTab, setActiveTab] = useState('sales');
  const [selectedReport, setSelectedReport] = useState(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    dateRange: 'last30days',
    category: 'all',
    status: 'all'
  });

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

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterOptions({
      ...filterOptions,
      [name]: value
    });
  };

  // Handle filter apply
  const handleApplyFilter = () => {
    // In a real app, you would filter the data based on filterOptions
    // For now, we'll just close the modal
    setShowFilterModal(false);
  };

  // Handle export report
  const handleExportReport = () => {
    // Determine what to export based on the active tab and selected report
    const reportName = selectedReport 
      ? selectedReport.name 
      : `${reportTypes.find(type => type.id === activeTab).name} Overview`;
    
    // Create a simple text content for demonstration
    const content = `
${reportName} Report
Generated on: ${new Date().toLocaleDateString()}
Period: ${filterOptions.dateRange === 'last30days' ? 'Last 30 Days' : 
         filterOptions.dateRange === 'thisMonth' ? 'This Month' : 
         filterOptions.dateRange === 'lastQuarter' ? 'Last Quarter' : 'Custom Period'}

Summary:
- Category: ${filterOptions.category === 'all' ? 'All Categories' : filterOptions.category}
- Status: ${filterOptions.status === 'all' ? 'All Statuses' : filterOptions.status}
- Data points: ${chartData.length}
- Average value: ${(chartData.reduce((a, b) => a + b, 0) / chartData.length).toFixed(2)}
- Maximum value: ${maxValue}
    `;
    
    // Create a blob and download it
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${reportName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white border-r border-gray-300 backdrop-blur-md">
      <div className="max-w-full px-4 py-5">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-black flex items-center">
            <TrendingUp className="mr-2" /> REPORTS & ANALYTICS
          </h1>
          <div className="flex space-x-2">
            <button 
              className="bg-purple-800 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm flex items-center"
              onClick={() => setShowFilterModal(true)}
            >
              <Filter className="w-3 h-3 mr-1" /> Filter
            </button>
            <button 
              className="bg-purple-800 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm flex items-center"
              onClick={handleExportReport}
            >
              <Download className="w-3 h-3 mr-1" /> Export
            </button>
          </div>
        </div>

        {/* Horizontal Tabs */}
        <div className="mb-5 border-b border-gray-300">
          <div className="flex flex-wrap">
            {reportTypes.map(type => (
              <button
                key={type.id}
                onClick={() => {
                  setActiveTab(type.id);
                  setSelectedReport(null);
                }}
                className={`px-4 py-2 flex items-center mr-1 transition-colors text-sm ${activeTab === type.id
                    ? 'bg-purple-800 text-white rounded-t border-b-2 border-purple-500'
                    : 'text-gray-600 hover:text-black hover:bg-gray-100'
                  }`}
              >
                <span className="mr-1">{type.icon}</span>
                {type.name}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg p-4 border border-gray-300">
          {!selectedReport ? (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-3 gap-4 mb-5">
                <div className="bg-gray-100 border border-gray-300 rounded-lg p-3">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-purple-800/50 text-white">
                      <BarChart3 className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-gray-600 text-xs">Total Reports</h3>
                      <span className="text-black text-lg font-semibold">{reportContent[activeTab].length}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-100 border border-gray-300 rounded-lg p-3">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-purple-800/50 text-white">
                      <PieChart className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-gray-600 text-xs">Generated</h3>
                      <span className="text-black text-lg font-semibold">Today</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-100 border border-gray-300 rounded-lg p-3">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-purple-800/50 text-white">
                      <LineChart className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-gray-600 text-xs">Scheduled</h3>
                      <span className="text-black text-lg font-semibold">5</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Simple Chart */}
              <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-5">
                <h2 className="text-black text-sm font-semibold mb-3">Performance Overview</h2>
                <div className="h-40 flex items-end space-x-1">
                  {chartData.map((value, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div
                        className="w-full bg-purple-600 rounded-t"
                        style={{ height: `${(value / maxValue) * 120}px` }}
                      ></div>
                      <div className="text-xs mt-1 text-gray-600">{months[index]}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Available Reports */}
              <div>
                <h2 className="text-black text-sm font-semibold mb-3">Available Reports</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {reportContent[activeTab].map(report => (
                    <div
                      key={report.id}
                      className="bg-gray-100 border border-gray-300 rounded-lg p-3 hover:bg-gray-200 transition-colors cursor-pointer"
                      onClick={() => setSelectedReport(report)}
                    >
                      <h3 className="text-black font-medium text-sm mb-1">{report.name}</h3>
                      <p className="text-gray-600 text-xs mb-2">{report.description}</p>
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
                    className="text-purple-600 hover:text-black text-sm mb-1"
                  >
                    ← Back to reports
                  </button>
                  <h2 className="text-black font-semibold">{selectedReport.name}</h2>
                </div>
                <button className="bg-purple-700 hover:bg-purple-600 text-white px-3 py-1 rounded text-xs">
                  Generate Report
                </button>
              </div>

              {/* Report Parameters */}
              <div className="bg-gray-100 border border-gray-300 rounded-lg p-3 mb-4">
                <h3 className="text-black text-sm font-medium mb-2">Report Parameters</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-gray-600 text-xs mb-1">Date Range</label>
                    <select className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-black text-xs">
                      <option>Last 30 days</option>
                      <option>This month</option>
                      <option>Last quarter</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-600 text-xs mb-1">Format</label>
                    <select className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-black text-xs">
                      <option>Tabular</option>
                      <option>Summary</option>
                      <option>Detailed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-600 text-xs mb-1">Group By</label>
                    <select className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-black text-xs">
                      <option>None</option>
                      <option>Category</option>
                      <option>Date</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Sample Report Preview */}
              <div className="bg-gray-100 border border-gray-300 rounded-lg p-3">
                <h3 className="text-black text-sm font-medium mb-2">Report Preview</h3>
                <div className="overflow-x-auto">
                  <table className="w-full bg-white text-black text-xs">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="px-3 py-2 text-left">ID</th>
                        <th className="px-3 py-2 text-left">Name</th>
                        <th className="px-3 py-2 text-left">Category</th>
                        <th className="px-3 py-2 text-right">Value</th>
                        <th className="px-3 py-2 text-right">Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3, 4].map(i => (
                        <tr key={i} className="border-b border-gray-300">
                          <td className="px-3 py-2 text-left">#00{i}</td>
                          <td className="px-3 py-2 text-left">Item {i}</td>
                          <td className="px-3 py-2 text-left">Cat {Math.ceil(i / 2)}</td>
                          <td className="px-3 py-2 text-right">${(Math.random() * 1000).toFixed(2)}</td>
                          <td className={`px-3 py-2 text-right ${i % 2 === 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {i % 2 === 0 ? '+' : '-'}{(Math.random() * 10).toFixed(2)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-2 text-center text-gray-600 text-xs">
                  Showing 4 of 120 records
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-black">Filter Reports</h3>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowFilterModal(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                <select 
                  name="dateRange"
                  value={filterOptions.dateRange}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="last30days">Last 30 Days</option>
                  <option value="thisMonth">This Month</option>
                  <option value="lastQuarter">Last Quarter</option>
                  <option value="custom">Custom Period</option>
                </select>
              </div>
              
              {filterOptions.dateRange === 'custom' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                    <input 
                      type="date" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                    <input 
                      type="date" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select 
                  name="category"
                  value={filterOptions.category}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="all">All Categories</option>
                  <option value="product">Products</option>
                  <option value="service">Services</option>
                  <option value="region">Regions</option>
                  <option value="customer">Customers</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select 
                  name="status"
                  value={filterOptions.status}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="all">All Statuses</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              
              <div className="flex justify-end gap-2 pt-2">
                <button 
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  onClick={() => setShowFilterModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button"
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                  onClick={handleApplyFilter}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportAnalytics;
