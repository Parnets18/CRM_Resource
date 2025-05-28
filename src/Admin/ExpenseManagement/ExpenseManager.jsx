// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { motion } from "framer-motion";
// import { CheckCircle2, Clock, XCircle, Building, Wallet, AlertCircle, Landmark } from "lucide-react";
// import Nav from "../Nav";


// export default function ExpenseManager() {
  
//   const pendingExpenses = [
//     { id: 1, site: "Site A", amount: 1500, category: "Materials", date: "2024-03-15", requestedBy: "John Doe" },
//     { id: 2, site: "Site B", amount: 800, category: "Equipment", date: "2024-03-14", requestedBy: "Jane Smith" }
//   ];

//   const siteBudgets = [
//     { id: 1, site: "Site A", totalBudget: 50000, remaining: 24500, startDate: "2024-01-01", endDate: "2024-12-31" },
//     { id: 2, site: "Site B", totalBudget: 75000, remaining: 38200, startDate: "2024-01-01", endDate: "2024-12-31" }
//   ];

//   return (
//     <div className="min-h-screen bg-white lg:ml-64">
    
//       <div className="absolute inset-0 z-0">
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-gray-100 to-white"></div>
//         <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-600/10 to-transparent"></div>
//       </div>

//       <div className="relative z-10 flex">
//         <Nav/>

//         <div className="flex-1 p-8">
         
//           <div className="flex justify-between items-center mb-8">
//             <div>
//               <h2 className="text-2xl font-bold text-black">Project Management Dashboard</h2>
//               <p className="text-gray-700">Multi-site oversight portal</p>
//             </div>
//             <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-200">
//               <AlertCircle className="w-5 h-5" />
//             </Button>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           
//             <Card className="border border-purple-500/20 bg-white backdrop-blur-sm">
//               <CardHeader>
//                 <CardTitle className="text-black">Pending Expense Approvals</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {pendingExpenses.map((expense) => (
//                   <motion.div 
//                     key={expense.id}
//                     whileHover={{ x: 5 }}
//                     className="flex items-center justify-between p-3 rounded-lg bg-gray-100"
//                   >
//                     <div className="flex-1">
//                       <div className="flex items-center gap-2 mb-1">
//                         <Building className="w-4 h-4 text-purple-400" />
//                         <span className="font-medium text-black">{expense.site}</span>
//                       </div>
//                       <div className="grid grid-cols-2 gap-2 text-sm">
//                         <div>
//                           <p className="text-gray-700">Amount: ₹{expense.amount}</p>
//                           <p className="text-gray-700">Category: {expense.category}</p>
//                         </div>
//                         <div>
//                           <p className="text-gray-700">{expense.date}</p>
//                           <p className="text-gray-700">Requested by: {expense.requestedBy}</p>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex gap-2 ml-4">
//                       <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
//                         <CheckCircle2 className="w-4 h-4 mr-2" /> Approve
//                       </Button>
//                       <Button size="sm" variant="destructive">
//                         <XCircle className="w-4 h-4 mr-2" /> Reject
//                       </Button>
//                     </div>
//                   </motion.div>
//                 ))}
//               </CardContent>
//             </Card>

//             <div className="space-y-6">
//               <Card className="border border-purple-500/20 bg-white backdrop-blur-sm">
//                 <CardHeader>
//                   <CardTitle className="text-black">Set Site Budget</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <form className="space-y-4">
//                     <div className="grid grid-cols-2 gap-4">
//                       <select 
//                         className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-black"
//                       >
//                         <option value="">Select Site</option>
//                         <option>Site A</option>
//                         <option>Site B</option>
//                         <option>Site C</option>
//                       </select>
//                       <input 
//                         type="number" 
//                         placeholder="Budget Amount" 
//                         className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-black"
//                       />
//                     </div>
                    
//                     <div className="grid grid-cols-2 gap-4">
//                       <input 
//                         type="date" 
//                         placeholder="Start Date" 
//                         className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-black"
//                       />
//                       <input 
//                         type="date" 
//                         placeholder="End Date" 
//                         className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-black"
//                       />
//                     </div>

//                     <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
//                       Set Budget Limit
//                     </Button>
//                   </form>
//                 </CardContent>
//               </Card>
//               <Card className="border border-purple-500/20 bg-white backdrop-blur-sm">
//                 <CardHeader>
//                   <CardTitle className="text-black">Current Site Budgets</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   {siteBudgets.map((budget) => (
//                     <div key={budget.id} className="p-3 rounded-lg bg-gray-100">
//                       <div className="flex items-center justify-between mb-2">
//                         <div className="flex items-center gap-2">
//                           <Building className="w-4 h-4 text-purple-400" />
//                           <span className="font-medium text-black">{budget.site}</span>
//                         </div>
//                         <span className="text-sm text-gray-700">
//                           {budget.startDate} - {budget.endDate}
//                         </span>
//                       </div>
//                       <div className="space-y-2">
//                         <div className="flex justify-between text-sm">
//                           <span className="text-gray-700">Total: ₹{budget.totalBudget.toLocaleString()}</span>
//                           <span className="text-green-700">Remaining: ₹{budget.remaining.toLocaleString()}</span>
//                         </div>
//                         <div className="w-full bg-gray-200 rounded-full h-2">
//                           <div 
//                             className="bg-purple-600 h-2 rounded-full" 
//                             style={{ width: `${((budget.totalBudget - budget.remaining) / budget.totalBudget) * 100}%` }}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import { CheckCircle2, Clock, XCircle, Building, Wallet, AlertCircle, Landmark, Plus, Eye, Edit, Trash2, DollarSign } from "lucide-react";
import Nav from "../Nav";

export default function ExpenseManager() {
  const [pendingExpenses, setPendingExpenses] = useState([
    { 
      id: 1, 
      site: "Site A", 
      amount: 1500, 
      category: "Materials", 
      date: "2024-03-15", 
      requestedBy: "John Doe",
      description: "Construction materials for foundation",
      status: "pending"
    },
    { 
      id: 2, 
      site: "Site B", 
      amount: 800, 
      category: "Equipment", 
      date: "2024-03-14", 
      requestedBy: "Jane Smith",
      description: "Heavy machinery rental",
      status: "pending"
    },
    { 
      id: 3, 
      site: "Site C", 
      amount: 450, 
      category: "Labor", 
      date: "2024-03-13", 
      requestedBy: "Mike Johnson",
      description: "Overtime wages for weekend work",
      status: "pending"
    },
    { 
      id: 4, 
      site: "Site A", 
      amount: 320, 
      category: "Transportation", 
      date: "2024-03-12", 
      requestedBy: "Sarah Wilson",
      description: "Material delivery charges",
      status: "pending"
    }
  ]);

  const [siteBudgets, setSiteBudgets] = useState([
    { 
      id: 1, 
      site: "Site A", 
      totalBudget: 50000, 
      remaining: 24500, 
      startDate: "2024-01-01", 
      endDate: "2024-12-31",
      approved: 25500
    },
    { 
      id: 2, 
      site: "Site B", 
      totalBudget: 75000, 
      remaining: 38200, 
      startDate: "2024-01-01", 
      endDate: "2024-12-31",
      approved: 36800
    },
    { 
      id: 3, 
      site: "Site C", 
      totalBudget: 45000, 
      remaining: 31200, 
      startDate: "2024-01-01", 
      endDate: "2024-12-31",
      approved: 13800
    }
  ]);

  const [budgetForm, setBudgetForm] = useState({
    site: '',
    amount: '',
    startDate: '',
    endDate: ''
  });

  const [approvedExpenses, setApprovedExpenses] = useState([]);
  const [rejectedExpenses, setRejectedExpenses] = useState([]);

  const handleApprove = (expenseId) => {
    const expense = pendingExpenses.find(e => e.id === expenseId);
    if (expense) {
      setApprovedExpenses(prev => [...prev, { ...expense, status: 'approved', approvedDate: new Date().toISOString().split('T')[0] }]);
      setPendingExpenses(prev => prev.filter(e => e.id !== expenseId));
      
      // Update site budget
      setSiteBudgets(prev => prev.map(budget => 
        budget.site === expense.site 
          ? { ...budget, remaining: budget.remaining - expense.amount, approved: budget.approved + expense.amount }
          : budget
      ));
    }
  };

  const handleReject = (expenseId) => {
    const expense = pendingExpenses.find(e => e.id === expenseId);
    if (expense) {
      setRejectedExpenses(prev => [...prev, { ...expense, status: 'rejected', rejectedDate: new Date().toISOString().split('T')[0] }]);
      setPendingExpenses(prev => prev.filter(e => e.id !== expenseId));
    }
  };

  const handleBudgetFormChange = (e) => {
    const { name, value } = e.target;
    setBudgetForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSetBudget = () => {
    if (budgetForm.site && budgetForm.amount && budgetForm.startDate && budgetForm.endDate) {
      const existingBudgetIndex = siteBudgets.findIndex(b => b.site === budgetForm.site);
      
      if (existingBudgetIndex >= 0) {
        // Update existing budget
        setSiteBudgets(prev => prev.map((budget, index) => 
          index === existingBudgetIndex 
            ? { ...budget, totalBudget: parseFloat(budgetForm.amount), startDate: budgetForm.startDate, endDate: budgetForm.endDate }
            : budget
        ));
      } else {
        // Add new budget
        const newBudget = {
          id: siteBudgets.length + 1,
          site: budgetForm.site,
          totalBudget: parseFloat(budgetForm.amount),
          remaining: parseFloat(budgetForm.amount),
          startDate: budgetForm.startDate,
          endDate: budgetForm.endDate,
          approved: 0
        };
        setSiteBudgets(prev => [...prev, newBudget]);
      }
      
      setBudgetForm({ site: '', amount: '', startDate: '', endDate: '' });
      alert('Budget updated successfully!');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBudgetUsageColor = (percentage) => {
    if (percentage > 80) return 'bg-red-500';
    if (percentage > 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="min-h-screen bg-gray-50 ml-64">
      <Nav/>
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-radial from-purple-900/10 via-gray-100 to-white"></div>
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-purple-600/10 to-transparent"></div>
      </div>

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Project Management Dashboard</h2>
            <p className="text-gray-600">Multi-site oversight portal</p>
          </div>
          <button className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
            <AlertCircle className="w-6 h-6" />
          </button>
        </div>

        {/* Summary Cards */}
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/90 backdrop-blur-sm border border-yellow-200 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending Approvals</p>
                <p className="text-2xl font-bold text-gray-900">{pendingExpenses.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm border border-green-200 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">{approvedExpenses.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm border border-red-200 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-100 rounded-lg">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-gray-900">{rejectedExpenses.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm border border-purple-200 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Budget</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{siteBudgets.reduce((sum, b) => sum + b.totalBudget, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div> */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Pending Expenses Table */}
          <div className="xl:col-span-2">
            <div className="bg-white/90 backdrop-blur-sm border border-purple-200 rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Pending Expense Approvals</h3>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Site</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested By</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pendingExpenses.map((expense) => (
                      <tr key={expense.id} className="hover:bg-purple-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Building className="w-4 h-4 text-purple-400" />
                            <span className="font-medium text-gray-900">{expense.site}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div className="max-w-xs truncate">{expense.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            {expense.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                          ₹{expense.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {expense.requestedBy}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(expense.date).toLocaleDateString('en-IN')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleApprove(expense.id)}
                              className="inline-flex items-center px-3 py-1 text-xs font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors"
                            >
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Approve
                            </button>
                            <button 
                              onClick={() => handleReject(expense.id)}
                              className="inline-flex items-center px-3 py-1 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
                            >
                              <XCircle className="w-3 h-3 mr-1" />
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Budget Management */}
          <div className="space-y-6">
            {/* Set Budget Form */}
            <div className="bg-white/90 backdrop-blur-sm border border-purple-200 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <Plus className="w-5 h-5 text-purple-600" />
                <h3 className="text-xl font-semibold text-gray-900">Set Site Budget</h3>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <select 
                    name="site"
                    value={budgetForm.site}
                    onChange={handleBudgetFormChange}
                    className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  >
                    <option value="">Select Site</option>
                    <option value="Site A">Site A</option>
                    <option value="Site B">Site B</option>
                    <option value="Site C">Site C</option>
                    <option value="Site D">Site D</option>
                  </select>
                  <input 
                    type="number" 
                    name="amount"
                    placeholder="Budget Amount (₹)" 
                    value={budgetForm.amount}
                    onChange={handleBudgetFormChange}
                    className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="date" 
                    name="startDate"
                    value={budgetForm.startDate}
                    onChange={handleBudgetFormChange}
                    className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  />
                  <input 
                    type="date" 
                    name="endDate"
                    value={budgetForm.endDate}
                    onChange={handleBudgetFormChange}
                    className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  />
                </div>

                <button 
                  onClick={handleSetBudget}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg"
                >
                  Set Budget Limit
                </button>
              </div>
            </div>

            {/* Current Site Budgets */}
            <div className="bg-white/90 backdrop-blur-sm border border-purple-200 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <Wallet className="w-5 h-5 text-purple-600" />
                <h3 className="text-xl font-semibold text-gray-900">Current Site Budgets</h3>
              </div>
              
              <div className="space-y-4">
                {siteBudgets.map((budget) => {
                  const usedPercentage = ((budget.totalBudget - budget.remaining) / budget.totalBudget) * 100;
                  return (
                    <div key={budget.id} className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-purple-400" />
                          <span className="font-semibold text-gray-900">{budget.site}</span>
                        </div>
                        <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                          {budget.startDate} - {budget.endDate}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                        <div>
                          <p className="text-gray-600">Total Budget</p>
                          <p className="font-semibold text-gray-900">₹{budget.totalBudget.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Approved</p>
                          <p className="font-semibold text-orange-600">₹{budget.approved.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Remaining</p>
                          <p className="font-semibold text-green-600">₹{budget.remaining.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>Budget Usage</span>
                          <span>{usedPercentage.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all ${getBudgetUsageColor(usedPercentage)}`}
                            style={{ width: `${usedPercentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Actions Table */}
        {(approvedExpenses.length > 0 || rejectedExpenses.length > 0) && (
          <div className="mt-8">
            <div className="bg-white/90 backdrop-blur-sm border border-purple-200 rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">Recent Actions</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Site</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[...approvedExpenses, ...rejectedExpenses].map((expense) => (
                      <tr key={`${expense.status}-${expense.id}`} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Building className="w-4 h-4 text-purple-400" />
                            <span className="font-medium text-gray-900">{expense.site}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div className="max-w-xs truncate">{expense.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                          ₹{expense.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(expense.status)}`}>
                            {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(expense.approvedDate || expense.rejectedDate).toLocaleDateString('en-IN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}