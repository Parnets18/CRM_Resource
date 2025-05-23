import React, { useState, useMemo } from 'react';
import { Calendar, TrendingUp, AlertTriangle, Users, DollarSign, Package, BarChart3, PieChart } from 'lucide-react';
import RestoNav from '../RestoNav';

const RestaurantAnalytics = () => {
  const [activeTab, setActiveTab] = useState('sales');
  const [dateFilter, setDateFilter] = useState('today');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Mock data - replace with your actual data
  const mockSalesData = [
    { id: 1, date: '2025-05-23', item: 'Margherita Pizza', category: 'Pizza', table: 'T1', quantity: 2, price: 28.00, cost: 8.00 },
    { id: 2, date: '2025-05-23', item: 'Caesar Salad', category: 'Salads', table: 'T2', quantity: 1, price: 14.00, cost: 4.00 },
    { id: 3, date: '2025-05-23', item: 'Chicken Burger', category: 'Burgers', table: 'T3', quantity: 3, price: 45.00, cost: 15.00 },
    { id: 4, date: '2025-05-22', item: 'Pasta Carbonara', category: 'Pasta', table: 'T1', quantity: 1, price: 18.00, cost: 6.00 },
    { id: 5, date: '2025-05-22', item: 'Margherita Pizza', category: 'Pizza', table: 'T4', quantity: 2, price: 28.00, cost: 8.00 },
  ];

  const mockStockData = [
    { id: 1, item: 'Tomatoes', purchaseDate: '2025-05-20', shelfLife: 5, quantity: 50, unit: 'kg' },
    { id: 2, item: 'Mozzarella', purchaseDate: '2025-05-18', shelfLife: 7, quantity: 20, unit: 'kg' },
    { id: 3, item: 'Chicken Breast', purchaseDate: '2025-05-21', shelfLife: 3, quantity: 30, unit: 'kg' },
    { id: 4, item: 'Lettuce', purchaseDate: '2025-05-19', shelfLife: 4, quantity: 15, unit: 'heads' },
  ];

  const mockCustomerData = [
    { id: 1, name: 'John Doe', lastVisit: '2025-05-23', totalSpent: 450, visitCount: 12 },
    { id: 2, name: 'Jane Smith', lastVisit: '2025-05-22', totalSpent: 320, visitCount: 8 },
    { id: 3, name: 'Mike Johnson', lastVisit: '2025-05-20', totalSpent: 780, visitCount: 15 },
    { id: 4, name: 'Sarah Wilson', lastVisit: '2025-05-23', totalSpent: 220, visitCount: 5 },
  ];

  const mockExpenses = 1200; // Daily expenses

  // Calculate analytics
  const analytics = useMemo(() => {
    const filteredSales = mockSalesData.filter(sale => {
      const saleDate = new Date(sale.date);
      const today = new Date('2025-05-23');
      
      if (dateFilter === 'today') {
        return saleDate.toDateString() === today.toDateString();
      } else if (dateFilter === 'week') {
        const weekAgo = new Date(today);
        weekAgo.setDate(today.getDate() - 7);
        return saleDate >= weekAgo;
      }
      return true;
    }).filter(sale => categoryFilter === 'all' || sale.category === categoryFilter);

    const totalSales = filteredSales.reduce((sum, sale) => sum + sale.price, 0);
    const totalCost = filteredSales.reduce((sum, sale) => sum + sale.cost, 0);
    const profit = totalSales - totalCost - (dateFilter === 'today' ? mockExpenses : mockExpenses * 7);

    return { filteredSales, totalSales, totalCost, profit };
  }, [dateFilter, categoryFilter]);

  // Calculate expiry alerts
  const expiryAlerts = useMemo(() => {
    const today = new Date('2025-05-23');
    return mockStockData.map(item => {
      const purchaseDate = new Date(item.purchaseDate);
      const expiryDate = new Date(purchaseDate);
      expiryDate.setDate(purchaseDate.getDate() + item.shelfLife);
      const daysToExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
      
      return {
        ...item,
        expiryDate,
        daysToExpiry,
        status: daysToExpiry <= 1 ? 'critical' : daysToExpiry <= 2 ? 'warning' : 'good'
      };
    }).filter(item => item.daysToExpiry <= 3);
  }, []);

  // Calculate CRM metrics
  const crmMetrics = useMemo(() => {
    const today = new Date('2025-05-23');
    return mockCustomerData.map(customer => {
      const lastVisitDate = new Date(customer.lastVisit);
      const daysSinceVisit = Math.ceil((today - lastVisitDate) / (1000 * 60 * 60 * 24));
      
      // Frequency score (visits per month approximation)
      const frequencyScore = Math.min(customer.visitCount / 3, 10);
      
      // Recency score (inverse of days since last visit)
      const recencyScore = Math.max(10 - daysSinceVisit, 1);
      
      // Value score (based on total spent)
      const valueScore = Math.min(customer.totalSpent / 100, 10);
      
      const totalScore = (frequencyScore + recencyScore + valueScore) / 3;
      
      return {
        ...customer,
        daysSinceVisit,
        frequencyScore: frequencyScore.toFixed(1),
        recencyScore: recencyScore.toFixed(1),
        valueScore: valueScore.toFixed(1),
        totalScore: totalScore.toFixed(1),
        segment: totalScore >= 7 ? 'VIP' : totalScore >= 5 ? 'Regular' : 'Casual'
      };
    }).sort((a, b) => b.totalScore - a.totalScore);
  }, []);

  const categories = ['all', ...new Set(mockSalesData.map(sale => sale.category))];

  const StatCard = ({ title, value, icon: Icon, color = 'blue', subtitle }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <Icon className="h-8 w-8" style={{ color }} />
      </div>
    </div>
  );

  return (
    <div className="ml-64">
  <div className="min-h-screen bg-gray-50 p-6">
      <RestoNav/>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Restaurant Analytics Dashboard</h1>
          <p className="text-gray-600">Monitor sales, profits, inventory, and customer insights</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
              <select 
                value={dateFilter} 
                onChange={(e) => setDateFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="all">All Time</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select 
                value={categoryFilter} 
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Sales" 
            value={`$${analytics.totalSales.toFixed(2)}`} 
            icon={DollarSign} 
            color="#10B981"
            subtitle={`${analytics.filteredSales.length} orders`}
          />
          <StatCard 
            title="Profit" 
            value={`$${analytics.profit.toFixed(2)}`} 
            icon={TrendingUp} 
            color={analytics.profit > 0 ? "#10B981" : "#EF4444"}
            subtitle="After expenses"
          />
          <StatCard 
            title="Expiry Alerts" 
            value={expiryAlerts.length} 
            icon={AlertTriangle} 
            color="#F59E0B"
            subtitle="Items expiring soon"
          />
          <StatCard 
            title="Active Customers" 
            value={crmMetrics.length} 
            icon={Users} 
            color="#3B82F6"
            subtitle="In database"
          />
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'sales', label: 'Sales Analytics', icon: BarChart3 },
                { id: 'inventory', label: 'Inventory Alerts', icon: Package },
                { id: 'crm', label: 'Customer Analytics', icon: Users }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Sales Analytics Tab */}
            {activeTab === 'sales' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Sales by Category */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <PieChart className="h-5 w-5 mr-2" />
                      Sales by Category
                    </h3>
                    <div className="space-y-3">
                      {Object.entries(
                        analytics.filteredSales.reduce((acc, sale) => {
                          acc[sale.category] = (acc[sale.category] || 0) + sale.price;
                          return acc;
                        }, {})
                      ).map(([category, total]) => (
                        <div key={category} className="flex justify-between items-center">
                          <span className="text-sm font-medium">{category}</span>
                          <span className="text-sm text-gray-600">${total.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Items */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-4">Top Selling Items</h3>
                    <div className="space-y-3">
                      {Object.entries(
                        analytics.filteredSales.reduce((acc, sale) => {
                          acc[sale.item] = (acc[sale.item] || 0) + sale.quantity;
                          return acc;
                        }, {})
                      )
                        .sort(([,a], [,b]) => b - a)
                        .slice(0, 5)
                        .map(([item, quantity]) => (
                          <div key={item} className="flex justify-between items-center">
                            <span className="text-sm font-medium">{item}</span>
                            <span className="text-sm text-gray-600">{quantity} sold</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Recent Sales Table */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4">Recent Sales</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Table</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Profit</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {analytics.filteredSales.map(sale => (
                          <tr key={sale.id}>
                            <td className="px-4 py-3 text-sm text-gray-900">{sale.date}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">{sale.item}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{sale.category}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{sale.table}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{sale.quantity}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">${sale.price.toFixed(2)}</td>
                            <td className="px-4 py-3 text-sm text-green-600">${(sale.price - sale.cost).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Inventory Alerts Tab */}
            {activeTab === 'inventory' && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
                    Expiry Alerts
                  </h3>
                  {expiryAlerts.length === 0 ? (
                    <p className="text-gray-600">No items expiring soon!</p>
                  ) : (
                    <div className="space-y-3">
                      {expiryAlerts.map(item => (
                        <div 
                          key={item.id} 
                          className={`p-3 rounded-lg border-l-4 ${
                            item.status === 'critical' ? 'bg-red-50 border-red-400' :
                            item.status === 'warning' ? 'bg-yellow-50 border-yellow-400' :
                            'bg-green-50 border-green-400'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium text-gray-900">{item.item}</h4>
                              <p className="text-sm text-gray-600">
                                {item.quantity} {item.unit} • Purchased: {item.purchaseDate}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className={`text-sm font-medium ${
                                item.status === 'critical' ? 'text-red-600' :
                                item.status === 'warning' ? 'text-yellow-600' :
                                'text-green-600'
                              }`}>
                                {item.daysToExpiry === 0 ? 'Expires Today' :
                                 item.daysToExpiry === 1 ? 'Expires Tomorrow' :
                                 `${item.daysToExpiry} days left`}
                              </p>
                              <p className="text-xs text-gray-500">Expires: {item.expiryDate.toLocaleDateString()}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* All Stock Items */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4">All Stock Items</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Purchase Date</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expiry Date</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {mockStockData.map(item => {
                          const expiryDate = new Date(item.purchaseDate);
                          expiryDate.setDate(expiryDate.getDate() + item.shelfLife);
                          const daysToExpiry = Math.ceil((expiryDate - new Date('2025-05-23')) / (1000 * 60 * 60 * 24));
                          const status = daysToExpiry <= 1 ? 'critical' : daysToExpiry <= 2 ? 'warning' : 'good';
                          
                          return (
                            <tr key={item.id}>
                              <td className="px-4 py-3 text-sm text-gray-900">{item.item}</td>
                              <td className="px-4 py-3 text-sm text-gray-600">{item.quantity} {item.unit}</td>
                              <td className="px-4 py-3 text-sm text-gray-600">{item.purchaseDate}</td>
                              <td className="px-4 py-3 text-sm text-gray-600">{expiryDate.toLocaleDateString()}</td>
                              <td className="px-4 py-3">
                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                  status === 'critical' ? 'bg-red-100 text-red-800' :
                                  status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-green-100 text-green-800'
                                }`}>
                                  {status === 'critical' ? 'Critical' :
                                   status === 'warning' ? 'Warning' : 'Good'}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* CRM Analytics Tab */}
            {activeTab === 'crm' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Customer Segments */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-4">Customer Segments</h3>
                    <div className="space-y-3">
                      {Object.entries(
                        crmMetrics.reduce((acc, customer) => {
                          acc[customer.segment] = (acc[customer.segment] || 0) + 1;
                          return acc;
                        }, {})
                      ).map(([segment, count]) => (
                        <div key={segment} className="flex justify-between items-center">
                          <span className="text-sm font-medium">{segment}</span>
                          <span className={`text-sm px-2 py-1 rounded-full ${
                            segment === 'VIP' ? 'bg-purple-100 text-purple-800' :
                            segment === 'Regular' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Average Scores */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-4">Average Scores</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Frequency</span>
                        <span className="text-sm text-gray-600">
                          {(crmMetrics.reduce((sum, c) => sum + parseFloat(c.frequencyScore), 0) / crmMetrics.length).toFixed(1)}/10
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Recency</span>
                        <span className="text-sm text-gray-600">
                          {(crmMetrics.reduce((sum, c) => sum + parseFloat(c.recencyScore), 0) / crmMetrics.length).toFixed(1)}/10
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Value</span>
                        <span className="text-sm text-gray-600">
                          {(crmMetrics.reduce((sum, c) => sum + parseFloat(c.valueScore), 0) / crmMetrics.length).toFixed(1)}/10
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Top Customers */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-4">Top Customers</h3>
                    <div className="space-y-3">
                      {crmMetrics.slice(0, 3).map((customer, index) => (
                        <div key={customer.id} className="flex items-center space-x-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                            index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{customer.name}</p>
                            <p className="text-xs text-gray-600">Score: {customer.totalScore}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Customer Analytics Table */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4">Customer Analytics (RFV Scoring)</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Segment</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Frequency</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recency</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Score</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Visit</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Spent</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {crmMetrics.map(customer => (
                          <tr key={customer.id}>
                            <td className="px-4 py-3 text-sm text-gray-900">{customer.name}</td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                customer.segment === 'VIP' ? 'bg-purple-100 text-purple-800' :
                                customer.segment === 'Regular' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {customer.segment}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">{customer.frequencyScore}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{customer.recencyScore}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{customer.valueScore}</td>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{customer.totalScore}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{customer.lastVisit}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">${customer.totalSpent}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  
  );
};

export default RestaurantAnalytics;

