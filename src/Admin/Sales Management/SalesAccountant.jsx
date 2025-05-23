import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Bell, Receipt, Currency, PieChart, Wallet, Mail, BadgeCheck, User, Clock, BarChart } from "lucide-react";
import Nav from "../Nav";


export default function SalesAccountant() {
  
  const outstandingBalances = [
    { id: 1, client: "Acme Corp", amount: 45200, dueDate: "2024-04-15" },
    { id: 2, client: "Global Tech", amount: 28750, dueDate: "2024-04-20" }
  ];

  const recentPayments = [
    { id: 1, client: "Skyline Ltd", amount: 150000, date: "2024-04-10" },
    { id: 2, client: "NextGen Inc", amount: 75500, date: "2024-04-08" }
  ];

  return (
    <div className="min-h-screen bg-white lg:ml-64">

      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-gray-100 to-white"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-600/10 to-transparent"></div>
      </div>

      <div className="relative z-10 flex">
        <Nav/>

        <div className="flex-1 p-8 mt-16 md:mt-0">
        
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-black">Sales Management Dashboard</h2>
              <p className="text-gray-700">Financial tracking and reporting</p>
            </div>
            <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-200">
              <Bell className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="border border-purple-500/20 bg-white backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-black">Create Sales Invoice</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="Client Name" 
                      className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-black"
                    />
                    <input 
                      type="text" 
                      placeholder="Invoice Number" 
                      className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-black"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="date" 
                      className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-black"
                    />
                    <input 
                      type="number" 
                      placeholder="GST Percentage" 
                      className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-black"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Item Description" 
                        className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-black"
                      />
                      <input 
                        type="number" 
                        placeholder="Qty" 
                        className="w-20 p-2 rounded bg-gray-100 border border-gray-300 text-black"
                      />
                      <input 
                        type="number" 
                        placeholder="Price" 
                        className="w-32 p-2 rounded bg-gray-100 border border-gray-300 text-black"
                      />
                    </div>
                    <Button variant="outline" className="w-full text-purple-700 border-purple-500/50">
                      Add Item
                    </Button>
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    <Receipt className="w-4 h-4 mr-2" /> Generate Invoice
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="border border-purple-500/20 bg-white backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-black">Record Payment Received</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <select className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-black">
                    <option value="">Select Client</option>
                    <option value="1">Acme Corp</option>
                    <option value="2">Global Tech</option>
                  </select>
                  <input 
                    type="number" 
                    placeholder="Amount Received" 
                    className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-black"
                  />
                  <input 
                    type="date" 
                    className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-black"
                  />
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    <Currency className="w-4 h-4 mr-2" /> Record Payment
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border border-purple-500/20 bg-white backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-black">Outstanding Balances</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {outstandingBalances.map((balance) => (
                  <motion.div 
                    key={balance.id}
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-100"
                  >
                    <div>
                      <p className="text-sm font-medium text-black">{balance.client}</p>
                      <p className="text-xs text-gray-500">Due {balance.dueDate} - ₹{balance.amount.toLocaleString()}</p>
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      Mark Paid
                    </Button>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
        
            <Card className="border border-purple-500/20 bg-white backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-black">Generate Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <PieChart className="w-4 h-4 mr-2" /> GST Report
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <User className="w-4 h-4 mr-2" /> Client-wise Report
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input 
                      type="date" 
                      className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-black"
                    />
                    <input 
                      type="date" 
                      className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-black"
                    />
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    <BarChart className="w-4 h-4 mr-2" /> Generate Custom Report
                  </Button>
                </div>
                <div className="mt-4 space-y-2">
                  {recentPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-100">
                      <div>
                        <p className="text-sm font-medium text-black">{payment.client}</p>
                        <p className="text-xs text-gray-500">₹{payment.amount.toLocaleString()} • {payment.date}</p>
                      </div>
                      <Mail className="w-4 h-4 text-green-600" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}