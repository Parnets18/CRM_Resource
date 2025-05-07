import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Bell, Package, Truck, Clock, CheckCircle2, AlertCircle, ClipboardList } from "lucide-react";
import Nav from "../Nav";

export default function InventorySite() {
  // Sample data
  const indentRequests = [
    { id: 1, material: "Cement", quantity: 100, status: "pending", requested: "2024-03-15" },
    { id: 2, material: "Steel Bars", quantity: 500, status: "approved", requested: "2024-03-14" },
    { id: 3, material: "Electrical Wiring", quantity: 200, status: "delivered", requested: "2024-03-10" }
  ];

  return (
    <div className="min-h-screen bg-black lg:ml-64">
      
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-gray-900 to-black"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-600/10 to-transparent"></div>
      </div>

      <div className="relative z-10 flex">
        <Nav />

        <div className="flex-1 p-8">
         
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">Site Supervisor Dashboard</h2>
              <p className="text-gray-400">Construction Site Management</p>
            </div>
            <Button variant="ghost" size="icon" className="text-gray-300 hover:bg-gray-900/50">
              <Bell className="w-5 h-5" />
            </Button>
          </div>

       
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">
                    Total Indents
                  </CardTitle>
                  <ClipboardList className="h-4 w-4 text-amber-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">23</div>
                  <p className="text-xs text-green-400">+5 this week</p>
                </CardContent>
              </Card>
            </motion.div>

         
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">
                    Pending Requests
                  </CardTitle>
                  <Clock className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">8</div>
                  <p className="text-xs text-red-400">2 overdue</p>
                </CardContent>
              </Card>
            </motion.div>

            
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">
                    Completed
                  </CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-amber-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">15</div>
                  <p className="text-xs text-green-400">Last: 2h ago</p>
                </CardContent>
              </Card>
            </motion.div>

           
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">
                    Materials Available
                  </CardTitle>
                  <Package className="h-4 w-4 text-amber-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">42</div>
                  <p className="text-xs text-red-400">5 low stock</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Raise New Indent</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Material Name"
                    className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="Quantity"
                      className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white"
                    />
                    <select className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white">
                      <option value="">Select Urgency</option>
                      <option value="normal">Normal</option>
                      <option value="urgent">Urgent</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                  <select className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white">
                    <option value="">Select Project Phase</option>
                    <option value="foundation">Foundation</option>
                    <option value="structure">Structure</option>
                    <option value="mep">MEP</option>
                    <option value="finishing">Finishing</option>
                  </select>
                  <Button className="w-full bg-purple-600 hover:bg-amber-700">
                    <Truck className="w-4 h-4 mr-2" /> Create Indent Request
                  </Button>
                </form>
              </CardContent>
            </Card>

            
            <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Indent Status Tracking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {indentRequests.map((request) => (
                  <motion.div 
                    key={request.id}
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-300">{request.material}</p>
                      <p className="text-xs text-gray-500">Qty: {request.quantity} | {request.requested}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium ${
                        request.status === 'pending' ? 'text-purple-400' :
                        request.status === 'approved' ? 'text-blue-400' :
                        'text-green-400'
                      }`}>
                        {request.status}
                      </span>
                      {request.status === 'pending' && <Clock className="w-4 h-4 text-amber-400" />}
                      {request.status === 'approved' && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
                      {request.status === 'delivered' && <Package className="w-4 h-4 text-green-400" />}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}