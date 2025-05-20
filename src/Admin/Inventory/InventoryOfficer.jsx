import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Bell, Package, AlertCircle, ClipboardList, Warehouse, BarChart, ArrowDownUp, ClipboardCheck } from "lucide-react";
import Nav from "../Nav";

export default function InventoryOfficer() {
  
  const approvedIndents = [
    { id: 1, item: "Steel Beams", quantity: 500, department: "Construction", date: "2024-03-15" },
    { id: 2, item: "Electrical Wiring", quantity: 2000, department: "MEP", date: "2024-03-14" }
  ];

  const lowStockAlerts = [
    { id: 1, item: "Concrete Mix", currentStock: 50, minRequired: 200 },
    { id: 2, item: "PVC Pipes", currentStock: 75, minRequired: 150 }
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
              <h2 className="text-2xl font-bold text-black">Procurement Dashboard</h2>
              <p className="text-gray-600">Inventory management system</p>
            </div>
            <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-100/50">
              <Bell className="w-5 h-5" />
            </Button>
          </div>

         
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">
                    Total Stock Value
                  </CardTitle>
                  <Warehouse className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-black">$2.4M</div>
                  <p className="text-xs text-green-600">+12% this month</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">
                    Pending Indents
                  </CardTitle>
                  <ClipboardList className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-black">15</div>
                  <p className="text-xs text-red-600">3 high priority</p>
                </CardContent>
              </Card>
            </motion.div>

           
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">
                    Low Stock Alerts
                  </CardTitle>
                  <AlertCircle className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-black">8</div>
                  <p className="text-xs text-yellow-600">2 critical</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">
                    Recent Issues
                  </CardTitle>
                  <Package className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-black">42</div>
                  <p className="text-xs text-green-600">Today</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

         
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            
            <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-black">Approved Indents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {approvedIndents.map((indent) => (
                  <motion.div 
                    key={indent.id}
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-100/50"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-700">{indent.item}</p>
                      <p className="text-xs text-gray-500">
                        {indent.quantity} units - {indent.department}
                      </p>
                    </div>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      Issue Materials
                    </Button>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

           
            <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-black">Inventory Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <ArrowDownUp className="w-4 h-4 mr-2" /> Record Stock In/Out
                  </Button>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <ClipboardCheck className="w-4 h-4 mr-2" /> Update Inventory
                  </Button>
                </div>
                <div className="p-3 rounded-lg bg-gray-100/50">
                  <p className="text-sm font-medium text-gray-700 mb-2">Quick Update</p>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Item ID"
                      className="w-full p-2 rounded bg-gray-200 border border-gray-300 text-black"
                    />
                    <input
                      type="number"
                      placeholder="Quantity"
                      className="w-full p-2 rounded bg-gray-200 border border-gray-300 text-black"
                    />
                  </div>
                  <Button className="mt-4 w-full bg-green-600 hover:bg-green-700">
                    Apply Adjustment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
            <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-black">Low Stock Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {lowStockAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-100/50">
                    <div>
                      <p className="text-sm font-medium text-gray-700">{alert.item}</p>
                      <p className="text-xs text-red-600">
                        Current: {alert.currentStock} (Min: {alert.minRequired})
                      </p>
                    </div>
                    <Button size="sm" variant="destructive">
                      Reorder
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            
            <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-black">Stock Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <BarChart className="w-4 h-4 mr-2" /> Generate Monthly Report
                </Button>
                <div className="p-3 rounded-lg bg-gray-100/50">
                  <p className="text-sm font-medium text-gray-700 mb-2">Custom Report</p>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="date"
                      className="w-full p-2 rounded bg-gray-200 border border-gray-300 text-black"
                    />
                    <input
                      type="date"
                      className="w-full p-2 rounded bg-gray-200 border border-gray-300 text-black"
                    />
                  </div>
                  <Button className="mt-4 w-full bg-green-600 hover:bg-green-700">
                    Generate Custom Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}