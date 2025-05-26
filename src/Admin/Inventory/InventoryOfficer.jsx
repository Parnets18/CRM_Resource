import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Package, AlertCircle, ClipboardList, Warehouse, BarChart, ArrowDownUp, Eye, Download } from "lucide-react";
import Nav from '../Nav';
export default function ProcurementDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [inventory, setInventory] = useState([
    { id: 1, item: "Steel Beams", stock: 450, minRequired: 200, value: 225000 },
    { id: 2, item: "Concrete Mix", stock: 50, minRequired: 200, value: 25000 },
    { id: 3, item: "PVC Pipes", stock: 75, minRequired: 150, value: 15000 },
    { id: 4, item: "Electrical Wiring", stock: 1800, minRequired: 500, value: 90000 }
  ]);

  const [indents, setIndents] = useState([
    { id: 1, item: "Steel Beams", quantity: 500, department: "Construction", date: "2024-03-15", status: "approved", priority: "high" },
    { id: 2, item: "Electrical Wiring", quantity: 200, department: "MEP", date: "2024-03-14", status: "approved", priority: "medium" },
    { id: 3, item: "Concrete Mix", quantity: 300, department: "Foundation", date: "2024-03-16", status: "approved", priority: "high" }
  ]);

  const [stockMovements, setStockMovements] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [formData, setFormData] = useState({ itemId: '', quantity: '', type: 'in', reason: '' });

  const totalStockValue = inventory.reduce((sum, item) => sum + item.value, 0);
  const lowStockItems = inventory.filter(item => item.stock < item.minRequired);
  const pendingIndents = indents.filter(indent => indent.status === 'approved');

  const addAlert = (message, type) => {
    setAlerts(prev => [{ id: Date.now(), message, type, timestamp: new Date().toLocaleString() }, ...prev.slice(0, 4)]);
  };

  const issueItem = (indentId) => {
    const indent = indents.find(i => i.id === indentId);
    const inventoryItem = inventory.find(i => i.item === indent.item);
    
    if (inventoryItem && inventoryItem.stock >= indent.quantity) {
      setInventory(prev => prev.map(item => 
        item.item === indent.item ? { ...item, stock: item.stock - indent.quantity } : item
      ));
      setIndents(prev => prev.map(indent => 
        indent.id === indentId ? { ...indent, status: 'issued' } : indent
      ));
      const movement = {
        id: Date.now(), item: indent.item, type: 'out', quantity: indent.quantity,
        department: indent.department, date: new Date().toISOString().split('T')[0],
        reason: `Issued to ${indent.department}`
      };
      setStockMovements(prev => [movement, ...prev]);
      addAlert(`Issued ${indent.quantity} ${indent.item} to ${indent.department}`, 'success');
    } else {
      addAlert(`Insufficient stock for ${indent.item}. Available: ${inventoryItem?.stock || 0}, Required: ${indent.quantity}`, 'error');
    }
  };

  const recordStockMovement = () => {
    const item = inventory.find(i => i.id.toString() === formData.itemId);
    if (!item || !formData.quantity || !formData.reason) return;

    const movement = {
      id: Date.now(), item: item.item, type: formData.type, quantity: parseInt(formData.quantity),
      date: new Date().toISOString().split('T')[0], reason: formData.reason
    };

    setStockMovements(prev => [movement, ...prev]);
    setInventory(prev => prev.map(invItem => 
      invItem.id.toString() === formData.itemId
        ? { ...invItem, stock: formData.type === 'in' ? invItem.stock + parseInt(formData.quantity) : invItem.stock - parseInt(formData.quantity) }
        : invItem
    ));
    addAlert(`Stock ${formData.type}: ${formData.quantity} ${item.item} - ${formData.reason}`, 'info');
    setFormData({ itemId: '', quantity: '', type: 'in', reason: '' });
  };

  const generateReport = (type) => {
    addAlert(`${type === 'monthly' ? 'Monthly Stock Report' : 'Stock Movement Report'} generated successfully`, 'success');
  };

  return (
    <div className="min-h-screen bg-white p-8 ml-64">
      <Nav/>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-200/30 via-gray-100 to-white"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-black">Procurement Dashboard</h2>
            <p className="text-gray-600">Inventory management system</p>
          </div>
          <Button variant="ghost" size="icon"><Bell className="w-5 h-5" /></Button>
        </div>

        <div className="flex gap-4 mb-6">
          {['dashboard', 'indents', 'inventory', 'reports'].map((tab) => (
            <Button key={tab} variant={activeTab === tab ? "default" : "ghost"} onClick={() => setActiveTab(tab)}
              className={activeTab === tab ? "bg-purple-600 hover:bg-purple-700" : ""}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Button>
          ))}
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Total Stock Value</CardTitle>
                  <Warehouse className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-black">${(totalStockValue/1000).toFixed(1)}K</div>
                  <p className="text-xs text-green-600">Live tracking</p>
                </CardContent>
              </Card>

              <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Pending Indents</CardTitle>
                  <ClipboardList className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-black">{pendingIndents.length}</div>
                  <p className="text-xs text-red-600">{pendingIndents.filter(i => i.priority === 'high').length} high priority</p>
                </CardContent>
              </Card>

              <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Low Stock Alerts</CardTitle>
                  <AlertCircle className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-black">{lowStockItems.length}</div>
                  <p className="text-xs text-yellow-600">Immediate attention</p>
                </CardContent>
              </Card>

              <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Today's Movements</CardTitle>
                  <Package className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-black">{stockMovements.filter(m => m.date === new Date().toISOString().split('T')[0]).length}</div>
                  <p className="text-xs text-green-600">Tracked</p>
                </CardContent>
              </Card>
            </div>

            {alerts.length > 0 && (
              <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm">
                <CardHeader><CardTitle className="text-black">Recent Alerts</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {alerts.slice(0, 3).map(alert => (
                      <div key={alert.id} className={`p-2 rounded text-sm ${
                        alert.type === 'success' ? 'bg-green-100 text-green-800' :
                        alert.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        <div className="flex justify-between">
                          <span>{alert.message}</span>
                          <span className="text-xs opacity-70">{alert.timestamp}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'indents' && (
          <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm">
            <CardHeader><CardTitle className="text-black">Approved Indents - Ready for Issue</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {pendingIndents.map((indent) => (
                <div key={indent.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-100/50 border">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-800">{indent.item}</p>
                      <span className={`px-2 py-1 rounded text-xs ${
                        indent.priority === 'high' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
                      }`}>{indent.priority}</span>
                    </div>
                    <p className="text-sm text-gray-600">Qty: {indent.quantity} | Dept: {indent.department} | Date: {indent.date}</p>
                    <p className="text-xs text-gray-500">Available: {inventory.find(i => i.item === indent.item)?.stock || 0}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-purple-300">
                      <Eye className="w-4 h-4 mr-1" /> View
                    </Button>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700" onClick={() => issueItem(indent.id)}>
                      Issue Materials
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {activeTab === 'inventory' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm">
              <CardHeader><CardTitle className="text-black">Record Stock Movement</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <select value={formData.itemId} onChange={(e) => setFormData({...formData, itemId: e.target.value})}
                  className="w-full p-2 rounded bg-white border border-gray-300">
                  <option value="">Select Item</option>
                  {inventory.map(item => (
                    <option key={item.id} value={item.id}>{item.item} (Stock: {item.stock})</option>
                  ))}
                </select>
                <div className="grid grid-cols-2 gap-4">
                  <input value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                    type="number" placeholder="Quantity" className="p-2 rounded bg-white border border-gray-300" />
                  <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="p-2 rounded bg-white border border-gray-300">
                    <option value="in">Stock In</option>
                    <option value="out">Stock Out</option>
                  </select>
                </div>
                <input value={formData.reason} onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  type="text" placeholder="Reason/Note" className="w-full p-2 rounded bg-white border border-gray-300" />
                <Button onClick={recordStockMovement} className="w-full bg-green-600 hover:bg-green-700">
                  <ArrowDownUp className="w-4 h-4 mr-2" /> Record Movement
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm">
              <CardHeader><CardTitle className="text-black">Current Inventory</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {inventory.map(item => (
                    <div key={item.id} className="flex justify-between items-center p-3 rounded border bg-white/50">
                      <div>
                        <p className="font-medium text-gray-800">{item.item}</p>
                        <p className="text-sm text-gray-600">Stock: {item.stock} | Min: {item.minRequired}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${item.value.toLocaleString()}</p>
                        <span className={`text-xs px-2 py-1 rounded ${
                          item.stock < item.minRequired ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                        }`}>
                          {item.stock < item.minRequired ? 'Low Stock' : 'OK'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm">
              <CardHeader><CardTitle className="text-black">Generate Reports</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => generateReport('monthly')}>
                  <BarChart className="w-4 h-4 mr-2" /> Monthly Stock Report
                </Button>
                <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => generateReport('movements')}>
                  <Download className="w-4 h-4 mr-2" /> Stock Movement Report
                </Button>
                <div className="p-4 rounded-lg bg-gray-100/50">
                  <p className="font-medium text-gray-700 mb-3">Custom Date Range</p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <input type="date" className="p-2 rounded bg-white border border-gray-300" />
                    <input type="date" className="p-2 rounded bg-white border border-gray-300" />
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">Generate Custom Report</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm">
              <CardHeader><CardTitle className="text-black">Recent Stock Movements</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {stockMovements.slice(0, 8).map(movement => (
                    <div key={movement.id} className="flex justify-between items-center p-2 rounded bg-white/50 border">
                      <div>
                        <p className="text-sm font-medium">{movement.item}</p>
                        <p className="text-xs text-gray-600">{movement.reason}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded text-xs ${
                          movement.type === 'in' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                        }`}>
                          {movement.type === 'in' ? '+' : '-'}{movement.quantity}
                        </span>
                        <p className="text-xs text-gray-500">{movement.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}