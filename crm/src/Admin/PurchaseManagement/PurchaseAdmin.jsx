import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Bell, Truck, ClipboardList, Factory, Scale, CheckCircle, UserPlus, Pencil, Wallet, Clock, BadgeCheck } from "lucide-react";

import Nav from "../Nav";

export default function PurchaseAdmin() {
 
  const vendors = [
    { id: 1, name: "ABC Suppliers", contact: "suppliers@abc.com", category: "Electronics" },
    { id: 2, name: "XYZ Materials", contact: "purchasing@xyz.com", category: "Raw Materials" }
  ];

  const pendingPOs = [
    { id: 1, poNumber: "PO-2024-050", vendor: "ABC Corp", amount: 125000 },
    { id: 2, poNumber: "PO-2024-051", vendor: "XYZ Ltd", amount: 89000 },
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
              <h2 className="text-2xl font-bold text-white">Purchase Administration</h2>
              <p className="text-gray-400">Vendor and procurement management</p>
            </div>
            <Button variant="ghost" size="icon" className="text-gray-300 hover:bg-gray-900/50">
              <Bell className="w-5 h-5" />
            </Button>
          </div>

{/*          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
         
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">
                    Total Vendors
                  </CardTitle>
                  <Factory className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">42</div>
                  <p className="text-xs text-green-400">+3 this quarter</p>
                </CardContent>
              </Card>
            </motion.div>

         
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">
                    Pending Approvals
                  </CardTitle>
                  <Scale className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">8</div>
                  <p className="text-xs text-red-400">₹5.8M total value</p>
                </CardContent>
              </Card>
            </motion.div>

           
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">
                    Monthly Spend
                  </CardTitle>
                  <Wallet className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">₹2.1M</div>
                  <p className="text-xs text-green-400">12% under budget</p>
                </CardContent>
              </Card>
            </motion.div>

          
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">
                    Avg Processing Time
                  </CardTitle>
                  <Clock className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">3.2 Days</div>
                  <p className="text-xs text-green-400">-0.8 days from last month</p>
                </CardContent>
              </Card>
            </motion.div>
          </div> */}

          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            
            <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Vendor Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {vendors.map((vendor) => (
                  <motion.div 
                    key={vendor.id}
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-300">{vendor.name}</p>
                      <p className="text-xs text-gray-500">{vendor.category} • {vendor.contact}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-purple-400 border-purple-500/50">
                        <Pencil className="w-4 h-4 mr-2" /> Edit
                      </Button>
                    </div>
                  </motion.div>
                ))}
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <UserPlus className="w-4 h-4 mr-2" /> Add New Vendor
                </Button>
              </CardContent>
            </Card>

           
            <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Vendor Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Vendor Name" 
                    className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="email" 
                      placeholder="Contact Email" 
                      className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white"
                    />
                    <input 
                      type="text" 
                      placeholder="Category" 
                      className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white"
                    />
                  </div>
                  <textarea 
                    placeholder="Address & Details" 
                    className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white"
                    rows={3}
                  />
                  <div className="flex gap-4">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">Save Vendor</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">High-Value PO Approvals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingPOs.map((po) => (
              <motion.div
                key={po.id}
                whileHover={{ x: 5 }}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50"
              >
                <div>
                  <p className="text-sm font-medium text-gray-300">{po.poNumber}</p>
                  <p className="text-xs text-gray-500">
                    {po.vendor} • ₹{po.amount.toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="w-4 h-4 mr-2" /> Approve
                  </Button>
                  <Button size="sm" variant="destructive">Reject</Button>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Recent Purchases</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50">
              <div>
                <p className="text-sm font-medium text-gray-300">PO-2024-044</p>
                <p className="text-xs text-gray-500">Office Supplies • ₹45,800</p>
              </div>
              <BadgeCheck className="text-green-400 w-6 h-6" />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50">
              <div>
                <p className="text-sm font-medium text-gray-300">PO-2024-043</p>
                <p className="text-xs text-gray-500">IT Equipment • ₹2,15,000</p>
              </div>
              <Clock className="text-yellow-400 w-6 h-6" />
            </div>
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              <ClipboardList className="w-4 h-4 mr-2" /> View All POs
            </Button>
          </CardContent>
        </Card>
      </div>
        </div>
      </div>
    </div>
  );
}