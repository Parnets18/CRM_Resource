import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, XCircle, Building, Wallet, AlertCircle, Landmark } from "lucide-react";
import Nav from "../Nav";


export default function ExpenseManager() {
  
  const pendingExpenses = [
    { id: 1, site: "Site A", amount: 1500, category: "Materials", date: "2024-03-15", requestedBy: "John Doe" },
    { id: 2, site: "Site B", amount: 800, category: "Equipment", date: "2024-03-14", requestedBy: "Jane Smith" }
  ];

  const siteBudgets = [
    { id: 1, site: "Site A", totalBudget: 50000, remaining: 24500, startDate: "2024-01-01", endDate: "2024-12-31" },
    { id: 2, site: "Site B", totalBudget: 75000, remaining: 38200, startDate: "2024-01-01", endDate: "2024-12-31" }
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
              <h2 className="text-2xl font-bold text-black">Project Management Dashboard</h2>
              <p className="text-gray-700">Multi-site oversight portal</p>
            </div>
            <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-200">
              <AlertCircle className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           
            <Card className="border border-purple-500/20 bg-white backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-black">Pending Expense Approvals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingExpenses.map((expense) => (
                  <motion.div 
                    key={expense.id}
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-100"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Building className="w-4 h-4 text-purple-400" />
                        <span className="font-medium text-black">{expense.site}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-gray-700">Amount: ₹{expense.amount}</p>
                          <p className="text-gray-700">Category: {expense.category}</p>
                        </div>
                        <div>
                          <p className="text-gray-700">{expense.date}</p>
                          <p className="text-gray-700">Requested by: {expense.requestedBy}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        <CheckCircle2 className="w-4 h-4 mr-2" /> Approve
                      </Button>
                      <Button size="sm" variant="destructive">
                        <XCircle className="w-4 h-4 mr-2" /> Reject
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border border-purple-500/20 bg-white backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-black">Set Site Budget</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <select 
                        className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-black"
                      >
                        <option value="">Select Site</option>
                        <option>Site A</option>
                        <option>Site B</option>
                        <option>Site C</option>
                      </select>
                      <input 
                        type="number" 
                        placeholder="Budget Amount" 
                        className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-black"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        type="date" 
                        placeholder="Start Date" 
                        className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-black"
                      />
                      <input 
                        type="date" 
                        placeholder="End Date" 
                        className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-black"
                      />
                    </div>

                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                      Set Budget Limit
                    </Button>
                  </form>
                </CardContent>
              </Card>
              <Card className="border border-purple-500/20 bg-white backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-black">Current Site Budgets</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {siteBudgets.map((budget) => (
                    <div key={budget.id} className="p-3 rounded-lg bg-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-purple-400" />
                          <span className="font-medium text-black">{budget.site}</span>
                        </div>
                        <span className="text-sm text-gray-700">
                          {budget.startDate} - {budget.endDate}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700">Total: ₹{budget.totalBudget.toLocaleString()}</span>
                          <span className="text-green-700">Remaining: ₹{budget.remaining.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full" 
                            style={{ width: `${((budget.totalBudget - budget.remaining) / budget.totalBudget) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
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