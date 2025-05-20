import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Bell, Warehouse, Truck, Box, Settings, AlertCircle, Plus, X } from "lucide-react";
import Nav from "../Nav";

export default function Admin() {
  
  const warehouses = [
    { id: 1, name: "Main Storage", location: "New York", capacity: "5000 sqft" },
    { id: 2, name: "West Facility", location: "Los Angeles", capacity: "3000 sqft" }
  ];

  const suppliers = [
    { id: 1, name: "Steel Corp", contact: "supply@steel.com", items: "Metal Products" },
    { id: 2, name: "Builders Ltd", contact: "sales@builders.com", items: "Construction Materials" }
  ];

  const inventoryItems = [
    { id: 1, name: "Steel Beams", currentStock: 1500, reorderLevel: 1000 },
    { id: 2, name: "Concrete Mix", currentStock: 800, reorderLevel: 500 }
  ];

  return (
    <div className="min-h-screen bg-white lg:ml-64">
 
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-200/30 via-gray-100 to-white"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-300/10 to-transparent"></div>
      </div>

      <div className="relative z-10 flex">
        <Nav />

        <div className="flex-1 p-8 mt-16 md:mt-0">
          
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-black">Inventory Administration</h2>
              <p className="text-gray-600">Manage warehouses, suppliers, and stock</p>
            </div>
            <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-100/50">
              <Bell className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-black">Inventory Reorder Levels</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {inventoryItems.map((item) => (
                  <motion.div 
                    key={item.id}
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-100/50"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-700">{item.name}</p>
                      <p className="text-xs text-gray-500">Current Stock: {item.currentStock}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        defaultValue={item.reorderLevel}
                        className="w-20 p-1 rounded bg-gray-200 border border-gray-300 text-black text-center"
                      />
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        Save
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-black">Warehouse Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <form className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Warehouse Name"
                      className="flex-1 p-2 rounded bg-gray-100/50 border border-gray-300 text-black"
                    />
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Plus className="w-4 h-4 mr-2" /> Add
                    </Button>
                  </form>
                  
                  {warehouses.map((warehouse) => (
                    <div key={warehouse.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-100/50">
                      <div>
                        <p className="text-sm font-medium text-gray-700">{warehouse.name}</p>
                        <p className="text-xs text-gray-500">{warehouse.location} | {warehouse.capacity}</p>
                      </div>
                      <Button size="sm" variant="destructive">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-black">Supplier Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <form className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Supplier Name"
                    className="w-full p-2 rounded bg-gray-100/50 border border-gray-300 text-black"
                  />
                  <input
                    type="email"
                    placeholder="Contact Email"
                    className="w-full p-2 rounded bg-gray-100/50 border border-gray-300 text-black"
                  />
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="w-4 h-4 mr-2" /> Add Supplier
                  </Button>
                </form>

                <div className="space-y-3">
                  {suppliers.map((supplier) => (
                    <div key={supplier.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-100/50">
                      <div>
                        <p className="text-sm font-medium text-gray-700">{supplier.name}</p>
                        <p className="text-xs text-gray-500">{supplier.contact}</p>
                      </div>
                      <Button size="sm" variant="destructive">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-black">System Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <Settings className="w-4 h-4 mr-2" /> Advanced Configuration
                </Button>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <Warehouse className="w-4 h-4 mr-2" /> Storage Analytics
                </Button>
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  <AlertCircle className="w-4 h-4 mr-2" /> Emergency Lockdown
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}