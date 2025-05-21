import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Bell, FileText, DollarSign, Calendar, CheckCircle, Clock, AlertCircle } from "lucide-react";
import Nav from "../Nav";

export default function PurchaseAccountant() {
  const invoices = [
    { id: 1, vendor: "Steel Corp", amount: "$15,000", dueDate: "2024-06-10", status: "pending" },
    { id: 2, vendor: "Concrete Co", amount: "$8,500", dueDate: "2024-06-15", status: "overdue" },
    { id: 3, vendor: "Builders Ltd", amount: "$5,200", dueDate: "2024-06-20", status: "paid" }
  ];

  const paymentStatus = [
    { id: 1, invoice: "INV-001", vendor: "Steel Corp", amount: "$15,000", status: "paid" },
    { id: 2, invoice: "INV-002", vendor: "Concrete Co", amount: "$8,500", status: "pending" },
    { id: 3, invoice: "INV-003", vendor: "Builders Ltd", amount: "$5,200", status: "pending" }
  ];

  return (
    <div className="min-h-screen bg-white lg:ml-64">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-gray-900 to-black"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-600/10 to-transparent"></div>
      </div>

      <div className="relative z-10 flex">
        <Nav />

        <div className="flex-1 p-8 mt-16 md:mt-0">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-black">Accounting Dashboard</h2>
              <p className="text-black">Financial management portal</p>
            </div>
            <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-200">
              <Bell className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="border border-purple-500/20 bg-white backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-black">Enter Vendor Invoice</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Vendor Name"
                    className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-black"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Invoice Number"
                      className="p-2 rounded bg-gray-100 border border-gray-300 text-black"
                    />
                    <input
                      type="number"
                      placeholder="Amount"
                      className="p-2 rounded bg-gray-100 border border-gray-300 text-black"
                    />
                  </div>
                  <input
                    type="date"
                    className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-black"
                  />
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <FileText className="w-4 h-4 mr-2" /> Save Invoice
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="border border-purple-500/20 bg-white backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-black">Payment Tracking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentStatus.map((payment) => (
                  <motion.div 
                    key={payment.id}
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-100"
                  >
                    <div>
                      <p className="text-sm font-medium text-black">{payment.invoice}</p>
                      <p className="text-xs text-gray-500">{payment.vendor} - {payment.amount}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs ${
                        payment.status === 'paid' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {payment.status}
                      </span>
                      {payment.status !== 'paid' && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Mark Paid
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border border-purple-500/20 bg-white backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-black">Schedule Payments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {invoices.map((invoice) => (
                  <motion.div 
                    key={invoice.id}
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-100"
                  >
                    <div>
                      <p className="text-sm font-medium text-black">{invoice.vendor}</p>
                      <p className="text-xs text-gray-500">
                        Due: {invoice.dueDate} - {invoice.amount}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs ${
                        invoice.status === 'paid' ? 'text-green-600' :
                        invoice.status === 'overdue' ? 'text-red-600' : 'text-yellow-600'
                      }`}>
                        {invoice.status}
                      </span>
                      {invoice.status !== 'paid' && (
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          <Calendar className="w-4 h-4 mr-2" /> Schedule
                        </Button>
                      )}
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