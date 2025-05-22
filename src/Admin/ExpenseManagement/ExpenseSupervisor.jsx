import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Upload, Receipt, Clock, Wallet, AlertCircle, CheckCircle2 } from "lucide-react";

import Nav from "../Nav";

export default function ExpenseSupervisor() {
 
  const recentExpenses = [
    { id: 1, amount: 250, description: "Construction materials", category: "Materials", date: "2024-03-15", status: "pending" },
    { id: 2, amount: 120, description: "Team lunch meeting", category: "Food", date: "2024-03-14", status: "approved" }
  ];

  return (
    <div className="min-h-screen bg-white lg:ml-64">
      
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-gray-100 to-white"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-600/10 to-transparent"></div>
      </div>

      <div className="relative z-10 flex">
        <Nav/>

        <div className="flex-1 p-8">
        
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-black">Expense Management</h2>
              <p className="text-gray-700">Site Supervisor Portal</p>
            </div>
            <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-200">
              <AlertCircle className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
            <Card className="border border-purple-500/20 bg-white backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-black">Submit New Expense</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="number" 
                      placeholder="Amount" 
                      className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-black"
                      step="0.01"
                    />
                    <select 
                      className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-black"
                    >
                      <option value="">Select Category</option>
                      <option>Materials</option>
                      <option>Labor</option>
                      <option>Equipment</option>
                      <option>Food</option>
                      <option>Transportation</option>
                    </select>
                  </div>
                  
                  <input 
                    type="text" 
                    placeholder="Description" 
                    className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-black"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="date" 
                      className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-black"
                    />
                    <input 
                      type="text" 
                      placeholder="Vendor Name" 
                      className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-black"
                    />
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <label className="cursor-pointer">
                      <Upload className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                      <p className="text-gray-700">Drag & drop receipts or click to upload</p>
                      <p className="text-xs text-gray-500 mt-2">Supported formats: JPG, PNG, PDF (max 5MB)</p>
                      <input 
                        type="file" 
                        className="hidden" 
                        multiple 
                        accept="image/*,application/pdf"
                      />
                    </label>
                  </div>

                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    Submit Expense
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="border border-purple-500/20 bg-white backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-black">Recent Expenses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentExpenses.map((expense) => (
                  <motion.div 
                    key={expense.id}
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-100"
                  >
                    <div>
                      <p className="text-sm font-medium text-black">₹{expense.amount}</p>
                      <p className="text-xs text-gray-500">{expense.category} - {expense.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{expense.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {expense.status === 'approved' ? (
                        <CheckCircle2 className="text-green-600 w-5 h-5" />
                      ) : (
                        <Clock className="text-yellow-500 w-5 h-5" />
                      )}
                      <Button variant="ghost" size="sm" className="text-purple-600">
                        View Receipt
                      </Button>
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