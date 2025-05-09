import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Bell, ClipboardList, FileText, Truck, CheckCircle, Archive, ClipboardCheck, Warehouse } from "lucide-react";
import Nav from "../Nav";

export default function PurchaseOfficer() {

  const quotationRequests = [
    { id: 1, vendor: "Steel Corp", items: "Steel Beams", status: "draft" },
    { id: 2, vendor: "Builders Ltd", items: "Electrical Wiring", status: "sent" }
  ];

  const purchaseOrders = [
    { id: 1, poNumber: "PO-001", vendor: "Steel Corp", amount: "$15,000", status: "approved" },
    { id: 2, poNumber: "PO-002", vendor: "Concrete Co", amount: "$8,500", status: "pending" }
  ];

  const goodsReceived = [
    { id: 1, grnNumber: "GRN-1001", items: "500 Steel Beams", qualityStatus: "pending" },
    { id: 2, grnNumber: "GRN-1002", items: "2000 Wiring Sets", qualityStatus: "approved" }
  ];

  const purchaseRegister = [
    { id: 1, orderNumber: "PO-001", vendor: "Steel Corp", amount: "$15,000", status: "closed" },
    { id: 2, orderNumber: "PO-002", vendor: "Concrete Co", amount: "$8,500", status: "open" }
  ];

  return (
    <div className="min-h-screen bg-black lg:ml-64">
     
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-gray-900 to-black"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-600/10 to-transparent"></div>
      </div>

      <div className="relative z-10 flex">
        <Nav />

      
        <div className="flex-1 p-8 mt-16 md:mt-0">
          
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">Procurement Dashboard</h2>
              <p className="text-gray-400">Material procurement management</p>
            </div>
            <Button variant="ghost" size="icon" className="text-gray-300 hover:bg-gray-900/50">
              <Bell className="w-5 h-5" />
            </Button>
          </div>

         

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            
            <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Quotation Requests</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {quotationRequests.map((request) => (
                  <motion.div 
                    key={request.id}
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-300">{request.vendor}</p>
                      <p className="text-xs text-gray-500">{request.items}</p>
                    </div>
                    <div className="flex gap-2">
                      {request.status === 'draft' ? (
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          Send RFQ
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline">View Details</Button>
                      )}
                    </div>
                  </motion.div>
                ))}
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  + New Quotation Request
                </Button>
              </CardContent>
            </Card>

          
            <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Purchase Orders</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {purchaseOrders.map((order) => (
                  <motion.div 
                    key={order.id}
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-300">{order.poNumber}</p>
                      <p className="text-xs text-gray-500">{order.vendor} - {order.amount}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Generate PO
                      </Button>
                      <Button size="sm" variant="outline">Track</Button>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>

          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Goods Received Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {goodsReceived.map((grn) => (
                  <motion.div 
                    key={grn.id}
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-300">{grn.grnNumber}</p>
                      <p className="text-xs text-gray-500">{grn.items}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {grn.qualityStatus === 'approved' ? (
                        <CheckCircle className="text-green-400 w-5 h-5" />
                      ) : (
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">Approve</Button>
                          <Button size="sm" variant="destructive">Reject</Button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            
            <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Purchase Register</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {purchaseRegister.map((entry) => (
                  <motion.div 
                    key={entry.id}
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-300">{entry.orderNumber}</p>
                      <p className="text-xs text-gray-500">{entry.vendor} - {entry.amount}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Update</Button>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  </motion.div>
                ))}
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <Archive className="w-4 h-4 mr-2" /> Export Register
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}