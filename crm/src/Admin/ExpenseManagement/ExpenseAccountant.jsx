import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {  Banknote, Landmark, FileText, Calendar, Clock, Download, ArrowUpDown , CheckCircle2} from "lucide-react";
import Nav from "../Nav";
import RestoNav from "@/Restaurant/RestoNav";
import CommonLayout from "@/Common/CommonLayout";

export default function ExpenseAccountant() {
 
  const recentExpenses = [
    { id: 1, type: "Fuel", amount: 2500, date: "2024-03-15", vendor: "Shell", paymentMethod: "Bank" },
    { id: 2, type: "Rent", amount: 15000, date: "2024-03-10", vendor: "Office Space Ltd", paymentMethod: "Bank" }
  ];

  const recentPayments = [
    { id: 1, amount: 45000, method: "Bank", date: "2024-03-18", recipient: "Construction Co", status: "processed" },
    { id: 2, amount: 12000, method: "Cash", date: "2024-03-17", recipient: "Material Supplier", status: "pending" }
  ];

  return (
    <div className="min-h-screen bg-black lg:ml-64 ">
   
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-gray-900 to-black"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-600/10 to-transparent"></div>
      </div>

      <div className="relative z-10 flex">
        <RestoNav/>

       
        <div className="flex-1 p-8">
        
          <div className="flex justify-between items-center mb-8 ">
            <div>
              <h2 className="text-2xl font-bold text-white">Expense Management</h2>
              <p className="text-gray-400">Accountant Portal</p>
            </div>
            <Button variant="ghost" size="icon" className="text-gray-300 hover:bg-gray-900/50">
              <Calendar className="w-5 h-5" />
            </Button>
          </div>


          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
       
            <div className="space-y-6">
              <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Record Major Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <select 
                        className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white"
                      >
                        <option value="">Expense Type</option>
                        <option>Fuel</option>
                        <option>Vehicle</option>
                        <option>Rent</option>
                        <option>Utilities</option>
                      </select>
                      <input 
                        type="number" 
                        placeholder="Amount" 
                        className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        type="date" 
                        className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white"
                      />
                      <input 
                        type="text" 
                        placeholder="Vendor" 
                        className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <select 
                        className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white"
                      >
                        <option value="">Payment Method</option>
                        <option>Bank Transfer</option>
                        <option>Cash</option>
                        <option>Cheque</option>
                      </select>
                      <input 
                        type="text" 
                        placeholder="Reference Number" 
                        className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white"
                      />
                    </div>

                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Record Expense
                    </Button>
                  </form>
                </CardContent>
              </Card>

            
              <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Recent Payments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentPayments.map((payment) => (
                    <motion.div 
                      key={payment.id}
                      whileHover={{ x: 5 }}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-300">${payment.amount.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">{payment.method} - {payment.recipient}</p>
                        <p className="text-xs text-gray-500 mt-1">{payment.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {payment.status === 'processed' ? (
                          <CheckCircle2 className="text-green-400 w-5 h-5" />
                        ) : (
                          <Clock className="text-yellow-400 w-5 h-5" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </div>

          
            <div className="space-y-6">
              <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Financial Reports</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <select 
                        className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white"
                      >
                        <option value="">Select Month</option>
                        <option>March 2024</option>
                        <option>February 2024</option>
                        <option>January 2024</option>
                      </select>
                      <select 
                        className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white"
                      >
                        <option value="">Report Type</option>
                        <option>Expense Summary</option>
                        <option>Cash Flow</option>
                        <option>Tax Summary</option>
                      </select>
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      <FileText className="w-4 h-4 mr-2" /> Generate Report
                    </Button>
                  </div>

                
                  <div className="border border-dashed border-gray-700 rounded-lg p-4">
                    <div className="text-center text-gray-400 mb-4">
                      <Download className="w-8 h-8 mx-auto" />
                      <p className="mt-2">Report preview will appear here</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="p-3 rounded-lg bg-gray-900/50">
                        <p className="text-gray-500">Total Expenses</p>
                        <p className="text-white">$245,000</p>
                      </div>
                      <div className="p-3 rounded-lg bg-gray-900/50">
                        <p className="text-gray-500">Tax Liability</p>
                        <p className="text-white">$78,400</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

           
              <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Recent Major Expenses</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentExpenses.map((expense) => (
                    <motion.div 
                      key={expense.id}
                      whileHover={{ x: 5 }}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-300">${expense.amount.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">{expense.type} - {expense.vendor}</p>
                        <p className="text-xs text-gray-500 mt-1">{expense.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {expense.paymentMethod === 'Bank' ? (
                          <Landmark className="text-purple-400 w-5 h-5" />
                        ) : (
                          <Banknote className="text-green-400 w-5 h-5" />
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
    </div>
  );
}