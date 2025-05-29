import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Package, AlertCircle, ClipboardList, Warehouse, BarChart, ArrowDownUp, Eye, Download, CheckCircle, Plus, Minus } from "lucide-react";
import Nav from '../Nav';
export default function ProcurementDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [inventory, setInventory] = useState([
    { id: 1, item: "Steel Beams", stock: 450, minRequired: 200, value: 225000, unit: "pcs" },
    { id: 2, item: "Concrete Mix", stock: 50, minRequired: 200, value: 25000, unit: "bags" },
    { id: 3, item: "PVC Pipes", stock: 75, minRequired: 150, value: 15000, unit: "meters" },
    { id: 4, item: "Electrical Wiring", stock: 1800, minRequired: 500, value: 90000, unit: "meters" }
  ]);

  const [indents, setIndents] = useState([
    { id: 1, item: "Steel Beams", quantity: 100, department: "Construction", date: "2024-03-15", status: "approved", priority: "high", requestedBy: "John Doe" },
    { id: 2, item: "Electrical Wiring", quantity: 200, department: "MEP", date: "2024-03-14", status: "approved", priority: "medium", requestedBy: "Jane Smith" },
    { id: 3, item: "Concrete Mix", quantity: 150, department: "Foundation", date: "2024-03-16", status: "approved", priority: "high", requestedBy: "Mike Johnson" }
  ]);

  const [stockMovements, setStockMovements] = useState([
    { id: 1, item: "Steel Beams", type: "out", quantity: 50, date: "2024-03-14", reason: "Issued to Construction", department: "Construction" }
  ]);
  
  const [alerts, setAlerts] = useState([]);
  const [formData, setFormData] = useState({ itemId: '', quantity: '', type: 'in', reason: '', department: '' });
  const [selectedIndent, setSelectedIndent] = useState(null);

  // Calculations
  const totalStockValue = inventory.reduce((sum, item) => sum + item.value, 0);
  const lowStockItems = inventory.filter(item => item.stock < item.minRequired);
  const pendingIndents = indents.filter(indent => indent.status === 'approved');
  const todayMovements = stockMovements.filter(m => m.date === new Date().toISOString().split('T')[0]);

  const addAlert = (message, type) => {
    const newAlert = { 
      id: Date.now(), 
      message, 
      type, 
      timestamp: new Date().toLocaleString() 
    };
    setAlerts(prev => [newAlert, ...prev.slice(0, 9)]);
  };

  const issueItem = (indentId) => {
    const indent = indents.find(i => i.id === indentId);
    const inventoryItem = inventory.find(i => i.item === indent.item);
    
    if (!inventoryItem) {
      addAlert(`Item ${indent.item} not found in inventory`, 'error');
      return;
    }

    if (inventoryItem.stock < indent.quantity) {
      addAlert(`Insufficient stock for ${indent.item}. Available: ${inventoryItem.stock}, Required: ${indent.quantity}`, 'error');
      return;
    }

    // Update inventory
    setInventory(prev => prev.map(item => 
      item.item === indent.item 
        ? { ...item, stock: item.stock - indent.quantity }
        : item
    ));

    // Update indent status
    setIndents(prev => prev.map(indent => 
      indent.id === indentId 
        ? { ...indent, status: 'issued', issuedDate: new Date().toISOString().split('T')[0] }
        : indent
    ));

    // Add stock movement
    const movement = {
      id: Date.now(),
      item: indent.item,
      type: 'out',
      quantity: indent.quantity,
      department: indent.department,
      date: new Date().toISOString().split('T')[0],
      reason: `Issued to ${indent.department} - ${indent.requestedBy}`
    };
    setStockMovements(prev => [movement, ...prev]);

    addAlert(`Successfully issued ${indent.quantity} ${indent.item} to ${indent.department}`, 'success');
    setSelectedIndent(null);
  };

  const recordStockMovement = () => {
    const item = inventory.find(i => i.id.toString() === formData.itemId);
    
    if (!item || !formData.quantity || !formData.reason) {
      addAlert('Please fill all required fields', 'error');
      return;
    }

    const quantity = parseInt(formData.quantity);
    if (quantity <= 0) {
      addAlert('Quantity must be greater than 0', 'error');
      return;
    }

    if (formData.type === 'out' && item.stock < quantity) {
      addAlert(`Insufficient stock. Available: ${item.stock}`, 'error');
      return;
    }

    const movement = {
      id: Date.now(),
      item: item.item,
      type: formData.type,
      quantity: quantity,
      date: new Date().toISOString().split('T')[0],
      reason: formData.reason,
      department: formData.department || 'Direct Entry'
    };

    setStockMovements(prev => [movement, ...prev]);
    
    // Update inventory
    setInventory(prev => prev.map(invItem => 
      invItem.id.toString() === formData.itemId
        ? { 
            ...invItem, 
            stock: formData.type === 'in' 
              ? invItem.stock + quantity 
              : invItem.stock - quantity 
          }
        : invItem
    ));

    addAlert(`Stock ${formData.type === 'in' ? 'received' : 'issued'}: ${quantity} ${item.item}`, 'success');
    setFormData({ itemId: '', quantity: '', type: 'in', reason: '', department: '' });
  };

  const generateReport = (type) => {
    // Simulate report generation
    setTimeout(() => {
      addAlert(`${type} report generated and downloaded successfully`, 'success');
    }, 1000);
    addAlert(`Generating ${type} report...`, 'info');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 ml-64">
     <Nav/>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Procurement Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage inventory and material requests</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-900" />
            {alerts.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {alerts.length > 9 ? '9+' : alerts.length}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 mb-8 bg-white p-1 rounded-lg shadow-sm">
        {[
          { key: 'dashboard', label: 'Dashboard', icon: BarChart },
          { key: 'indents', label: 'Approved Indents', icon: ClipboardList },
          { key: 'inventory', label: 'Inventory Management', icon: Warehouse },
          { key: 'reports', label: 'Reports', icon: Download }
        ].map(({ key, label, icon: Icon }) => (
          <Button
            key={key}
            variant={activeTab === key ? "default" : "ghost"}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 ${
              activeTab === key 
                ? "bg-blue-600 hover:bg-blue-700 text-white" 
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Button>
        ))}
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white shadow-sm border-l-4 border-l-blue-500">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Stock Value</CardTitle>
                  <Warehouse className="h-5 w-5 text-blue-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  ${(totalStockValue/1000).toFixed(0)}K
                </div>
                <p className="text-xs text-green-600 mt-1">Active inventory</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border-l-4 border-l-orange-500">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">Pending Indents</CardTitle>
                  <ClipboardList className="h-5 w-5 text-orange-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{pendingIndents.length}</div>
                <p className="text-xs text-red-600 mt-1">
                  {pendingIndents.filter(i => i.priority === 'high').length} high priority
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border-l-4 border-l-red-500">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">Low Stock Items</CardTitle>
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{lowStockItems.length}</div>
                <p className="text-xs text-red-600 mt-1">Need replenishment</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border-l-4 border-l-green-500">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">Today's Movements</CardTitle>
                  <Package className="h-5 w-5 text-green-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{todayMovements.length}</div>
                <p className="text-xs text-green-600 mt-1">Transactions logged</p>
              </CardContent>
            </Card>
          </div>

          {/* Alerts Section */}
          {alerts.length > 0 && (
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {alerts.slice(0, 5).map(alert => (
                    <div
                      key={alert.id}
                      className={`p-3 rounded-lg border-l-4 ${
                        alert.type === 'success' 
                          ? 'bg-green-50 border-l-green-500 text-green-800' :
                        alert.type === 'error' 
                          ? 'bg-red-50 border-l-red-500 text-red-800' : 
                          'bg-blue-50 border-l-blue-500 text-blue-800'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium">{alert.message}</span>
                        <span className="text-xs opacity-70">{alert.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Low Stock Alert */}
          {lowStockItems.length > 0 && (
            <Card className="bg-red-50 border-red-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-red-800 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Low Stock Alert
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {lowStockItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center p-2 bg-white rounded border">
                      <span className="font-medium text-gray-900">{item.item}</span>
                      <span className="text-red-600 text-sm">
                        Stock: {item.stock} / Min: {item.minRequired}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Indents Tab */}
      {activeTab === 'indents' && (
        <div className="space-y-6">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900">Approved Material Requests</CardTitle>
              <p className="text-gray-600 text-sm">Review and issue materials to departments</p>
            </CardHeader>
            <CardContent>
              {pendingIndents.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
                  <p>No pending indents to process</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingIndents.map((indent) => {
                    const availableStock = inventory.find(i => i.item === indent.item)?.stock || 0;
                    const canIssue = availableStock >= indent.quantity;
                    
                    return (
                      <div key={indent.id} className="border rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-gray-900">{indent.item}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                indent.priority === 'high' 
                                  ? 'bg-red-100 text-red-700' 
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                {indent.priority.toUpperCase()}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                              <div>
                                <span className="font-medium">Quantity:</span> {indent.quantity}
                              </div>
                              <div>
                                <span className="font-medium">Department:</span> {indent.department}
                              </div>
                              <div>
                                <span className="font-medium">Requested by:</span> {indent.requestedBy}
                              </div>
                              <div>
                                <span className="font-medium">Date:</span> {indent.date}
                              </div>
                            </div>
                            <div className="mt-2">
                              <span className={`text-sm font-medium ${
                                canIssue ? 'text-green-600' : 'text-red-600'
                              }`}>
                                Available Stock: {availableStock}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedIndent(selectedIndent === indent.id ? null : indent.id)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              {selectedIndent === indent.id ? 'Hide' : 'Details'}
                            </Button>
                            <Button
                              size="sm"
                              disabled={!canIssue}
                              onClick={() => issueItem(indent.id)}
                              className={`${
                                canIssue 
                                  ? 'bg-blue-600 hover:bg-blue-700' 
                                  : 'bg-gray-400 cursor-not-allowed'
                              }`}
                            >
                              <Package className="w-4 h-4 mr-1" />
                              Issue Materials
                            </Button>
                          </div>
                        </div>
                        
                        {selectedIndent === indent.id && (
                          <div className="mt-4 p-3 bg-white rounded border">
                            <h4 className="font-medium text-gray-900 mb-2">Request Details</h4>
                            <div className="text-sm text-gray-600 space-y-1">
                              <p><span className="font-medium">Request ID:</span> #{indent.id}</p>
                              <p><span className="font-medium">Status:</span> {indent.status}</p>
                              <p><span className="font-medium">Priority Level:</span> {indent.priority}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Inventory Tab */}
      {activeTab === 'inventory' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Stock Movement Form */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <ArrowDownUp className="w-5 h-5" />
                Record Stock Movement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Item</label>
                <select
                  value={formData.itemId}
                  onChange={(e) => setFormData({...formData, itemId: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Choose an item...</option>
                  {inventory.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.item} (Current Stock: {item.stock} {item.unit})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                    placeholder="Enter quantity"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Movement Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="in">Stock In (+)</option>
                    <option value="out">Stock Out (-)</option>
                  </select>
                </div>
              </div>

              {formData.type === 'out' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                    placeholder="Enter department name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason/Notes</label>
                <input
                  type="text"
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  placeholder="Enter reason for stock movement"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <Button
                onClick={recordStockMovement}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
              >
                {formData.type === 'in' ? <Plus className="w-4 h-4 mr-2" /> : <Minus className="w-4 h-4 mr-2" />}
                Record {formData.type === 'in' ? 'Stock In' : 'Stock Out'}
              </Button>
            </CardContent>
          </Card>

          {/* Current Inventory */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900">Current Inventory Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {inventory.map(item => (
                  <div key={item.id} className="flex justify-between items-center p-3 border rounded-lg bg-gray-50">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.item}</h4>
                      <p className="text-sm text-gray-600">
                        Stock: {item.stock} {item.unit} | Min Required: {item.minRequired} {item.unit}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">${item.value.toLocaleString()}</p>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        item.stock < item.minRequired 
                          ? 'bg-red-100 text-red-700' 
                          : item.stock < item.minRequired * 1.5 
                          ? 'bg-yellow-100 text-yellow-700' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {item.stock < item.minRequired ? 'Critical' : 
                         item.stock < item.minRequired * 1.5 ? 'Low' : 'Good'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Report Generation */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <BarChart className="w-5 h-5" />
                Generate Reports
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={() => generateReport('Monthly Inventory')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
              >
                <Download className="w-4 h-4 mr-2" />
                Monthly Inventory Report
              </Button>
              
              <Button
                onClick={() => generateReport('Stock Movement')}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
              >
                <Package className="w-4 h-4 mr-2" />
                Stock Movement Report
              </Button>
              
              <Button
                onClick={() => generateReport('Low Stock Alert')}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3"
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                Low Stock Alert Report
              </Button>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Custom Date Range Report</h4>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">From Date</label>
                    <input type="date" className="w-full p-2 border border-gray-300 rounded" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">To Date</label>
                    <input type="date" className="w-full p-2 border border-gray-300 rounded" />
                  </div>
                </div>
                <Button
                  onClick={() => generateReport('Custom Range')}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Generate Custom Report
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Stock Movements */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900">Recent Stock Movements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {stockMovements.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No stock movements recorded yet</p>
                  </div>
                ) : (
                  stockMovements.slice(0, 10).map(movement => (
                    <div key={movement.id} className="flex justify-between items-center p-3 border rounded-lg bg-gray-50">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{movement.item}</h4>
                        <p className="text-sm text-gray-600">{movement.reason}</p>
                        {movement.department && (
                          <p className="text-xs text-gray-500">Dept: {movement.department}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                          movement.type === 'in' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {movement.type === 'in' ? '+' : '-'}{movement.quantity}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">{movement.date}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}