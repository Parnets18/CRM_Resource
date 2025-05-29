import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Warehouse, Truck, Box, Settings, AlertCircle, Plus, X, Check, Save } from "lucide-react";
import Nav from "../Nav";

export default function Admin() {
  const [warehouses, setWarehouses] = useState([
    { id: 1, name: "Main Storage", location: "New York", capacity: "5000 sqft" },
    { id: 2, name: "West Facility", location: "Los Angeles", capacity: "3000 sqft" }
  ]);

  const [suppliers, setSuppliers] = useState([
    { id: 1, name: "Steel Corp", contact: "supply@steel.com", items: "Metal Products" },
    { id: 2, name: "Builders Ltd", contact: "sales@builders.com", items: "Construction Materials" }
  ]);

  const [inventoryItems, setInventoryItems] = useState([
    { id: 1, name: "Steel Beams", currentStock: 1500, reorderLevel: 1000 },
    { id: 2, name: "Concrete Mix", currentStock: 800, reorderLevel: 500 }
  ]);

  const [warehouseForm, setWarehouseForm] = useState({
    name: "",
    location: "",
    capacity: ""
  });

  const [supplierForm, setSupplierForm] = useState({
    name: "",
    contact: "",
    items: ""
  });

  const [notifications, setNotifications] = useState(2);
  const [actionLog, setActionLog] = useState([]);
  const [systemLocked, setSystemLocked] = useState(false);

  // Inventory reorder level management
  const updateReorderLevel = (itemId, newLevel) => {
    setInventoryItems(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, reorderLevel: parseInt(newLevel) || 0 }
        : item
    ));
    
    const item = inventoryItems.find(i => i.id === itemId);
    addToLog(`Updated reorder level for ${item.name} to ${newLevel}`);
  };

  // Warehouse management
  const addWarehouse = () => {
    if (warehouseForm.name.trim()) {
      const newWarehouse = {
        id: Date.now(),
        name: warehouseForm.name,
        location: warehouseForm.location || "Not specified",
        capacity: warehouseForm.capacity || "Not specified"
      };
      
      setWarehouses(prev => [...prev, newWarehouse]);
      setWarehouseForm({ name: "", location: "", capacity: "" });
      addToLog(`Added warehouse: ${newWarehouse.name}`);
    }
  };

  const removeWarehouse = (warehouseId) => {
    const warehouse = warehouses.find(w => w.id === warehouseId);
    setWarehouses(prev => prev.filter(w => w.id !== warehouseId));
    addToLog(`Removed warehouse: ${warehouse.name}`);
  };

  // Supplier management
  const addSupplier = () => {
    if (supplierForm.name.trim() && supplierForm.contact.trim()) {
      const newSupplier = {
        id: Date.now(),
        name: supplierForm.name,
        contact: supplierForm.contact,
        items: supplierForm.items || "General supplies"
      };
      
      setSuppliers(prev => [...prev, newSupplier]);
      setSupplierForm({ name: "", contact: "", items: "" });
      addToLog(`Added supplier: ${newSupplier.name}`);
    }
  };

  const removeSupplier = (supplierId) => {
    const supplier = suppliers.find(s => s.id === supplierId);
    setSuppliers(prev => prev.filter(s => s.id !== supplierId));
    addToLog(`Removed supplier: ${supplier.name}`);
  };

  // System functions
  const handleAdvancedConfig = () => {
    addToLog("Accessed advanced configuration panel");
    alert("Advanced Configuration Panel\n\n• System Preferences\n• User Management\n• Security Settings\n• Backup Configuration\n\nConfiguration panel opened successfully!");
  };

  const handleStorageAnalytics = () => {
    addToLog("Viewed storage analytics");
    const totalCapacity = warehouses.reduce((sum, w) => sum + parseInt(w.capacity.replace(/\D/g, '') || 0), 0);
    const totalItems = inventoryItems.reduce((sum, item) => sum + item.currentStock, 0);
    
    alert(`Storage Analytics Report\n\n• Total Warehouse Capacity: ${totalCapacity} sqft\n• Total Items in Stock: ${totalItems} units\n• Active Warehouses: ${warehouses.length}\n• Registered Suppliers: ${suppliers.length}\n• Low Stock Alerts: ${inventoryItems.filter(item => item.currentStock <= item.reorderLevel).length}`);
  };

  const handleEmergencyLockdown = () => {
    if (systemLocked) {
      setSystemLocked(false);
      addToLog("Emergency lockdown DEACTIVATED");
      alert("🔓 EMERGENCY LOCKDOWN DEACTIVATED\n\nSystem access has been restored.\nAll operations are now available.");
    } else {
      setSystemLocked(true);
      addToLog("EMERGENCY LOCKDOWN ACTIVATED");
      alert("🚨 EMERGENCY LOCKDOWN ACTIVATED\n\nAll warehouse operations suspended.\nOnly administrative access available.\nContact security immediately.");
    }
  };

  // Utility functions
  const addToLog = (action) => {
    setActionLog(prev => [...prev, {
      id: Date.now(),
      action,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  return (
    <div className="min-h-screen bg-white ml-64" >
       <Nav/>
      {systemLocked && (
        <div className="fixed top-0 left-0 right-0 bg-red-600 text-white p-2 text-center font-bold z-50">
          🚨 EMERGENCY LOCKDOWN ACTIVE - ADMINISTRATIVE ACCESS ONLY 🚨
        </div>
      )}
      
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-200/30 via-gray-100 to-white"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-300/10 to-transparent"></div>
      </div>

      <div className="relative z-10 p-8" style={{ marginTop: systemLocked ? '2rem' : '0' }}>
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-black">Inventory Administration</h2>
            <p className="text-gray-600">Manage warehouses, suppliers, and stock</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              {warehouses.length} warehouses • {suppliers.length} suppliers
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-700 hover:bg-gray-100/50 relative"
            >
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-black">Inventory Reorder Levels</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {inventoryItems.map((item) => (
                <div 
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-100/50 hover:bg-gray-200/50 transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-700">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      Current Stock: {item.currentStock}
                      {item.currentStock <= item.reorderLevel && (
                        <span className="ml-2 text-red-600 font-medium">⚠️ Low Stock</span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      defaultValue={item.reorderLevel}
                      className="w-20 p-1 rounded bg-gray-200 border border-gray-300 text-black text-center"
                      onChange={(e) => {
                        // Update in real-time for immediate feedback
                        const newLevel = parseInt(e.target.value) || 0;
                        setInventoryItems(prev => prev.map(i => 
                          i.id === item.id ? { ...i, reorderLevel: newLevel } : i
                        ));
                      }}
                    />
                    <Button 
                      size="sm" 
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() => updateReorderLevel(item.id, document.querySelector(`input[defaultValue="${item.reorderLevel}"]`).value)}
                    >
                      <Save className="w-3 h-3 mr-1" />
                      Save
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-black">Warehouse Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Warehouse Name"
                  value={warehouseForm.name}
                  onChange={(e) => setWarehouseForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-2 rounded bg-gray-100/50 border border-gray-300 text-black"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={warehouseForm.location}
                  onChange={(e) => setWarehouseForm(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full p-2 rounded bg-gray-100/50 border border-gray-300 text-black"
                />
                <input
                  type="text"
                  placeholder="Capacity (e.g., 5000 sqft)"
                  value={warehouseForm.capacity}
                  onChange={(e) => setWarehouseForm(prev => ({ ...prev, capacity: e.target.value }))}
                  className="w-full p-2 rounded bg-gray-100/50 border border-gray-300 text-black"
                />
                <Button onClick={addWarehouse} className="w-full bg-purple-600 hover:bg-purple-700">
                  <Plus className="w-4 h-4 mr-2" /> Add Warehouse
                </Button>
              </div>
              
              <div className="space-y-3">
                {warehouses.map((warehouse) => (
                  <div key={warehouse.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-100/50">
                    <div>
                      <p className="text-sm font-medium text-gray-700">{warehouse.name}</p>
                      <p className="text-xs text-gray-500">{warehouse.location} | {warehouse.capacity}</p>
                    </div>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => removeWarehouse(warehouse.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-black">Supplier Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Supplier Name"
                  value={supplierForm.name}
                  onChange={(e) => setSupplierForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-2 rounded bg-gray-100/50 border border-gray-300 text-black"
                />
                <input
                  type="email"
                  placeholder="Contact Email"
                  value={supplierForm.contact}
                  onChange={(e) => setSupplierForm(prev => ({ ...prev, contact: e.target.value }))}
                  className="w-full p-2 rounded bg-gray-100/50 border border-gray-300 text-black"
                />
                <input
                  type="text"
                  placeholder="Items Supplied"
                  value={supplierForm.items}
                  onChange={(e) => setSupplierForm(prev => ({ ...prev, items: e.target.value }))}
                  className="w-full p-2 rounded bg-gray-100/50 border border-gray-300 text-black"
                />
                <Button onClick={addSupplier} className="bg-purple-600 hover:bg-purple-700 md:col-span-3">
                  <Plus className="w-4 h-4 mr-2" /> Add Supplier
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {suppliers.map((supplier) => (
                  <div key={supplier.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-100/50">
                    <div>
                      <p className="text-sm font-medium text-gray-700">{supplier.name}</p>
                      <p className="text-xs text-gray-500">{supplier.contact}</p>
                      <p className="text-xs text-gray-400">{supplier.items}</p>
                    </div>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => removeSupplier(supplier.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-black">System Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={handleAdvancedConfig}
                  disabled={systemLocked}
                >
                  <Settings className="w-4 h-4 mr-2" /> Advanced Configuration
                </Button>
                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={handleStorageAnalytics}
                  disabled={systemLocked}
                >
                  <Warehouse className="w-4 h-4 mr-2" /> Storage Analytics
                </Button>
                <Button 
                  className={`w-full ${systemLocked ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
                  onClick={handleEmergencyLockdown}
                >
                  <AlertCircle className="w-4 h-4 mr-2" /> 
                  {systemLocked ? 'Deactivate Lockdown' : 'Emergency Lockdown'}
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-black text-sm">Activity Log</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {actionLog.length === 0 ? (
                    <p className="text-xs text-gray-500">No recent activity</p>
                  ) : (
                    actionLog.slice(-6).reverse().map((log) => (
                      <div key={log.id} className="text-xs p-2 bg-gray-50 rounded">
                        <div className="font-medium">{log.action}</div>
                        <div className="text-gray-500">{log.timestamp}</div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}