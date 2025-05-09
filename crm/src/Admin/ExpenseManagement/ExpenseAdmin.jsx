import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BarChart, DollarSign, Landmark, Building, TrendingUp } from "lucide-react";
import Nav from "../Nav";

export default function ExpenseAdmin() {
  
  const sites = [
    { id: 1, name: "Site A", expenses: 245000, profit: 420000, budget: 800000 },
    { id: 2, name: "Site B", expenses: 178000, profit: 310000, budget: 600000 },
    { id: 3, name: "Site C", expenses: 392000, profit: 580000, budget: 1000000 }
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
              <h2 className="text-2xl font-bold text-white">Administrative Dashboard</h2>
              <p className="text-gray-400">Financial overview across all projects</p>
            </div>
            <Button variant="ghost" size="icon" className="text-gray-300 hover:bg-gray-900/50">
              <BarChart className="w-5 h-5" />
            </Button>
          </div>

        

          
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
            <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Financial Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 p-4">
                 
                  <div className="relative w-full h-full">
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end h-3/4 gap-2">
                      {sites.map((site) => (
                        <div key={site.id} className="flex-1">
                          <div 
                            className="bg-purple-600 rounded-t-lg mx-1" 
                            style={{ height: `${(site.profit / 600000) * 70}%` }}
                          />
                          <div 
                            className="bg-gray-700 rounded-t-lg mx-1" 
                            style={{ height: `${(site.expenses / 600000) * 70}%` }}
                          />
                          <p className="text-center text-xs text-gray-400 mt-2">{site.name}</p>
                        </div>
                      ))}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 border-t border-gray-700" />
                    <div className="absolute left-0 top-0 flex flex-col justify-between h-3/4 text-xs text-gray-500">
                      {[600, 400, 200, 0].map((value) => (
                        <div key={value} className="flex items-center gap-2">
                          <span>${value}k</span>
                          <div className="flex-1 border-b border-gray-800" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4 justify-center mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-600 rounded-sm" />
                      <span className="text-xs text-gray-400">Profit</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-700 rounded-sm" />
                      <span className="text-xs text-gray-400">Expenses</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Site Financial Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {sites.map((site) => (
                  <motion.div 
                    key={site.id}
                    whileHover={{ x: 5 }}
                    className="p-4 rounded-lg bg-gray-900/50"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-gray-300">{site.name}</h3>
                        <p className="text-xs text-gray-500">Budget: ${site.budget.toLocaleString()}</p>
                      </div>
                      <span className={`text-sm ${
                        (site.profit - site.expenses) > 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        ${(site.profit - site.expenses).toLocaleString()}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Expenses: ${site.expenses.toLocaleString()}</span>
                        <span className="text-gray-500">Profit: ${site.profit.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full" 
                          style={{ width: `${(site.expenses / site.budget) * 100}%` }}
                        />
                        <div 
                          className="bg-green-600 h-2 rounded-full -mt-2" 
                          style={{ width: `${(site.profit / site.budget) * 100}%` }}
                        />
                      </div>
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