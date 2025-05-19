import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { PlusIcon, ArrowDownIcon, ArrowUpIcon, DocumentTextIcon, CurrencyDollarIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const AccountsFinance = () => {
  const [activeTab, setActiveTab] = useState("chart-of-accounts");

  // Sample data for demonstration
  const chartOfAccounts = [
    { id: 1, code: "1000", name: "Assets", type: "Asset", balance: 250000 },
    { id: 2, code: "1100", name: "Cash in Hand", type: "Asset", balance: 15000 },
    { id: 3, code: "1200", name: "Bank Accounts", type: "Asset", balance: 125000 },
    { id: 4, code: "2000", name: "Liabilities", type: "Liability", balance: 75000 },
    { id: 5, code: "3000", name: "Equity", type: "Equity", balance: 100000 },
    { id: 6, code: "4000", name: "Revenue", type: "Revenue", balance: 200000 },
    { id: 7, code: "5000", name: "Expenses", type: "Expense", balance: 150000 },
  ];

  const journalEntries = [
    { id: 1, date: "2025-05-10", description: "Office Rent Payment", debit: "Rent Expense", credit: "Bank Account", amount: 5000 },
    { id: 2, date: "2025-05-08", description: "Sales Invoice #1234", debit: "Accounts Receivable", credit: "Sales Revenue", amount: 12500 },
    { id: 3, date: "2025-05-05", description: "Purchase Invoice #789", debit: "Inventory", credit: "Accounts Payable", amount: 8750 },
    { id: 4, date: "2025-05-01", description: "Salary Payment", debit: "Salary Expense", credit: "Bank Account", amount: 25000 },
  ];

  const receivables = [
    { id: 1, customer: "ABC Corp", invoice: "INV-2025-001", date: "2025-04-15", amount: 12500, due: "2025-05-15", status: "Outstanding", aging: "Current" },
    { id: 2, customer: "XYZ Ltd", invoice: "INV-2025-002", date: "2025-04-01", amount: 8750, due: "2025-05-01", status: "Overdue", aging: "1-30 days" },
    { id: 3, customer: "123 Industries", invoice: "INV-2025-003", date: "2025-03-15", amount: 15000, due: "2025-04-15", status: "Overdue", aging: "31-60 days" },
  ];

  const payables = [
    { id: 1, vendor: "Supplier Co", invoice: "S-1234", date: "2025-04-20", amount: 7500, due: "2025-05-20", status: "Outstanding", aging: "Current" },
    { id: 2, vendor: "Office Supplies Inc", invoice: "OS-5678", date: "2025-04-10", amount: 2500, due: "2025-05-10", status: "Outstanding", aging: "Current" },
    { id: 3, vendor: "Tech Solutions", invoice: "TS-9012", date: "2025-03-25", amount: 12000, due: "2025-04-25", status: "Overdue", aging: "1-30 days" },
  ];

  const bankTransactions = [
    { id: 1, date: "2025-05-10", description: "Office Rent Payment", type: "Withdrawal", amount: 5000, balance: 125000 },
    { id: 2, date: "2025-05-07", description: "Customer Payment - ABC Corp", type: "Deposit", amount: 12500, balance: 130000 },
    { id: 3, date: "2025-05-05", description: "Utility Bills", type: "Withdrawal", amount: 1500, balance: 117500 },
    { id: 4, date: "2025-05-01", description: "Salary Payments", type: "Withdrawal", amount: 25000, balance: 119000 },
  ];

  return (
    <div className="bg-black/90 border-r border-purple-700/30 backdrop-blur-md min-h-screen p-6 text-white">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Accounts & Finance</h1>
        <p className="text-gray-400">Manage your financial operations and reporting</p>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex mb-8 border-b border-purple-700/30 overflow-x-auto">
          <TabsTrigger value="chart-of-accounts" className="px-4 py-2 text-gray-400 hover:text-white">
            Chart of Accounts
          </TabsTrigger>
          <TabsTrigger value="general-ledger" className="px-4 py-2 text-gray-400 hover:text-white">
            General Ledger
          </TabsTrigger>
          <TabsTrigger value="cash-bank" className="px-4 py-2 text-gray-400 hover:text-white">
            Cash & Bank Book
          </TabsTrigger>
          <TabsTrigger value="journal-entries" className="px-4 py-2 text-gray-400 hover:text-white">
            Journal Entries
          </TabsTrigger>
          <TabsTrigger value="receivables-payables" className="px-4 py-2 text-gray-400 hover:text-white">
            Receivables & Payables
          </TabsTrigger>
          <TabsTrigger value="financial-statements" className="px-4 py-2 text-gray-400 hover:text-white">
            Financial Statements
          </TabsTrigger>
          <TabsTrigger value="aging-reports" className="px-4 py-2 text-gray-400 hover:text-white">
            Aging Reports
          </TabsTrigger>
          <TabsTrigger value="taxation" className="px-4 py-2 text-gray-400 hover:text-white">
            Taxation Reports
          </TabsTrigger>
        </TabsList>

        {/* Chart of Accounts */}
        <TabsContent value="chart-of-accounts" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Chart of Accounts</h2>
            <button className="flex items-center gap-2 bg-purple-700 hover:bg-purple-600 px-4 py-2 rounded-md">
              <PlusIcon className="w-5 h-5" />
              <span>Add Account</span>
            </button>
          </div>
          
          <div className="bg-black/50 border border-purple-700/30 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-purple-700/30">
                  <th className="px-4 py-3 text-left">Code</th>
                  <th className="px-4 py-3 text-left">Account Name</th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3 text-right">Balance</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {chartOfAccounts.map(account => (
                  <tr key={account.id} className="border-b border-purple-700/20 hover:bg-purple-900/10">
                    <td className="px-4 py-3">{account.code}</td>
                    <td className="px-4 py-3">{account.name}</td>
                    <td className="px-4 py-3">{account.type}</td>
                    <td className="px-4 py-3 text-right">${account.balance.toLocaleString()}</td>
                    <td className="px-4 py-3 text-center">
                      <button className="text-purple-400 hover:text-purple-300 mx-1">Edit</button>
                      <button className="text-purple-400 hover:text-purple-300 mx-1">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* General Ledger */}
        <TabsContent value="general-ledger" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">General Ledger</h2>
            <div className="flex gap-2">
              <select className="bg-black/70 border border-purple-700/30 rounded-md px-3 py-2">
                <option>All Accounts</option>
                <option>Assets</option>
                <option>Liabilities</option>
                <option>Equity</option>
                <option>Revenue</option>
                <option>Expenses</option>
              </select>
              <button className="bg-purple-700 hover:bg-purple-600 px-4 py-2 rounded-md">
                Generate Report
              </button>
            </div>
          </div>
          
          <div className="bg-black/50 border border-purple-700/30 rounded-lg p-6">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-black/30 border border-purple-700/20 rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2">Period</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">From Date</label>
                    <input type="date" className="w-full bg-black/70 border border-purple-700/30 rounded-md px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">To Date</label>
                    <input type="date" className="w-full bg-black/70 border border-purple-700/30 rounded-md px-3 py-2" />
                  </div>
                </div>
              </div>
              <div className="bg-black/30 border border-purple-700/20 rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2">Account Summary</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Opening Balance</p>
                    <p className="text-xl">$145,000.00</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Closing Balance</p>
                    <p className="text-xl">$175,000.00</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-purple-700/30">
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Description</th>
                    <th className="px-4 py-3 text-left">Reference</th>
                    <th className="px-4 py-3 text-right">Debit</th>
                    <th className="px-4 py-3 text-right">Credit</th>
                    <th className="px-4 py-3 text-right">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-purple-700/20 hover:bg-purple-900/10">
                    <td className="px-4 py-3">2025-05-01</td>
                    <td className="px-4 py-3">Opening Balance</td>
                    <td className="px-4 py-3">OB-2025</td>
                    <td className="px-4 py-3 text-right">$145,000.00</td>
                    <td className="px-4 py-3 text-right">$0.00</td>
                    <td className="px-4 py-3 text-right">$145,000.00</td>
                  </tr>
                  <tr className="border-b border-purple-700/20 hover:bg-purple-900/10">
                    <td className="px-4 py-3">2025-05-05</td>
                    <td className="px-4 py-3">Sales Revenue</td>
                    <td className="px-4 py-3">INV-1234</td>
                    <td className="px-4 py-3 text-right">$12,500.00</td>
                    <td className="px-4 py-3 text-right">$0.00</td>
                    <td className="px-4 py-3 text-right">$157,500.00</td>
                  </tr>
                  <tr className="border-b border-purple-700/20 hover:bg-purple-900/10">
                    <td className="px-4 py-3">2025-05-10</td>
                    <td className="px-4 py-3">Office Rent Payment</td>
                    <td className="px-4 py-3">EXP-001</td>
                    <td className="px-4 py-3 text-right">$0.00</td>
                    <td className="px-4 py-3 text-right">$5,000.00</td>
                    <td className="px-4 py-3 text-right">$152,500.00</td>
                  </tr>
                  <tr className="border-b border-purple-700/20 hover:bg-purple-900/10">
                    <td className="px-4 py-3">2025-05-15</td>
                    <td className="px-4 py-3">Customer Payment</td>
                    <td className="px-4 py-3">REC-456</td>
                    <td className="px-4 py-3 text-right">$22,500.00</td>
                    <td className="px-4 py-3 text-right">$0.00</td>
                    <td className="px-4 py-3 text-right">$175,000.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Cash & Bank Book */}
        <TabsContent value="cash-bank" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Cash & Bank Book</h2>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 bg-green-600 hover:bg-green-500 px-4 py-2 rounded-md">
                <ArrowDownIcon className="w-5 h-5" />
                <span>Deposit</span>
              </button>
              <button className="flex items-center gap-2 bg-red-600 hover:bg-red-500 px-4 py-2 rounded-md">
                <ArrowUpIcon className="w-5 h-5" />
                <span>Withdraw</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-black/30 border border-purple-700/20 rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2">Cash in Hand</h3>
              <p className="text-3xl font-semibold">$15,000.00</p>
              <div className="flex items-center mt-2">
                <span className="text-green-400 text-sm">+$2,500.00 today</span>
              </div>
            </div>
            <div className="bg-black/30 border border-purple-700/20 rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2">Bank Balance</h3>
              <p className="text-3xl font-semibold">$125,000.00</p>
              <div className="flex items-center mt-2">
                <span className="text-red-400 text-sm">-$5,000.00 today</span>
              </div>
            </div>
            <div className="bg-black/30 border border-purple-700/20 rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2">Total Liquid Assets</h3>
              <p className="text-3xl font-semibold">$140,000.00</p>
              <div className="flex items-center mt-2">
                <span className="text-red-400 text-sm">-$2,500.00 today</span>
              </div>
            </div>
          </div>
          
          <div className="bg-black/50 border border-purple-700/30 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-purple-700/30 flex justify-between items-center">
              <h3 className="font-medium">Recent Bank Transactions</h3>
              <select className="bg-black/70 border border-purple-700/30 rounded-md px-3 py-1">
                <option>All Accounts</option>
                <option>Main Account</option>
                <option>Savings Account</option>
              </select>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-purple-700/30">
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Description</th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3 text-right">Amount</th>
                  <th className="px-4 py-3 text-right">Balance</th>
                </tr>
              </thead>
              <tbody>
                {bankTransactions.map(transaction => (
                  <tr key={transaction.id} className="border-b border-purple-700/20 hover:bg-purple-900/10">
                    <td className="px-4 py-3">{transaction.date}</td>
                    <td className="px-4 py-3">{transaction.description}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${transaction.type === 'Deposit' ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={transaction.type === 'Deposit' ? 'text-green-400' : 'text-red-400'}>
                        {transaction.type === 'Deposit' ? '+' : '-'}${transaction.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">${transaction.balance.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Journal Entries */}
        <TabsContent value="journal-entries" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Journal Entries</h2>
            <button className="flex items-center gap-2 bg-purple-700 hover:bg-purple-600 px-4 py-2 rounded-md">
              <PlusIcon className="w-5 h-5" />
              <span>New Journal Entry</span>
            </button>
          </div>
          
          <div className="bg-black/50 border border-purple-700/30 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-purple-700/30 flex flex-wrap gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">From Date</label>
                <input type="date" className="bg-black/70 border border-purple-700/30 rounded-md px-3 py-1" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">To Date</label>
                <input type="date" className="bg-black/70 border border-purple-700/30 rounded-md px-3 py-1" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Entry Type</label>
                <select className="bg-black/70 border border-purple-700/30 rounded-md px-3 py-1">
                  <option>All Entries</option>
                  <option>Sales</option>
                  <option>Purchases</option>
                  <option>Expenses</option>
                  <option>Adjustments</option>
                </select>
              </div>
              <div className="flex items-end">
                <button className="bg-purple-700/50 hover:bg-purple-700 px-4 py-1 rounded-md">
                  Filter
                </button>
              </div>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-purple-700/30">
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Description</th>
                  <th className="px-4 py-3 text-left">Debit Account</th>
                  <th className="px-4 py-3 text-left">Credit Account</th>
                  <th className="px-4 py-3 text-right">Amount</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {journalEntries.map(entry => (
                  <tr key={entry.id} className="border-b border-purple-700/20 hover:bg-purple-900/10">
                    <td className="px-4 py-3">{entry.date}</td>
                    <td className="px-4 py-3">{entry.description}</td>
                    <td className="px-4 py-3">{entry.debit}</td>
                    <td className="px-4 py-3">{entry.credit}</td>
                    <td className="px-4 py-3 text-right">${entry.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-center">
                      <button className="text-purple-400 hover:text-purple-300 mx-1">Edit</button>
                      <button className="text-purple-400 hover:text-purple-300 mx-1">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Receivables & Payables */}
        <TabsContent value="receivables-payables" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Receivables & Payables</h2>
            <div className="flex gap-2">
              <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md">
                Send Reminders
              </button>
              <button className="bg-purple-700 hover:bg-purple-600 px-4 py-2 rounded-md">
                Generate Report
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black/50 border border-purple-700/30 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-purple-700/30 flex justify-between items-center">
                <h3 className="font-medium">Accounts Receivable</h3>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Total Outstanding</p>
                  <p className="text-xl font-semibold">$36,250.00</p>
                </div>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-purple-700/30">
                    <th className="px-4 py-3 text-left">Customer</th>
                    <th className="px-4 py-3 text-left">Invoice</th>
                    <th className="px-4 py-3 text-right">Amount</th>
                    <th className="px-4 py-3 text-left">Due Date</th>
                    <th className="px-4 py-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {receivables.map(receivable => (
                    <tr key={receivable.id} className="border-b border-purple-700/20 hover:bg-purple-900/10">
                      <td className="px-4 py-3">{receivable.customer}</td>
                      <td className="px-4 py-3">{receivable.invoice}</td>
                      <td className="px-4 py-3 text-right">${receivable.amount.toLocaleString()}</td>
                      <td className="px-4 py-3">{receivable.due}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${receivable.status === 'Outstanding' ? 'bg-blue-900/30 text-blue-400' : 'bg-red-900/30 text-red-400'}`}>
                          {receivable.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="bg-black/50 border border-purple-700/30 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-purple-700/30 flex justify-between items-center">
                <h3 className="font-medium">Accounts Payable</h3>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Total Outstanding</p>
                  <p className="text-xl font-semibold">$22,000.00</p>
                </div>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-purple-700/30">
                    <th className="px-4 py-3 text-left">Vendor</th>
                    <th className="px-4 py-3 text-left">Invoice</th>
                    <th className="px-4 py-3 text-right">Amount</th>
                    <th className="px-4 py-3 text-left">Due Date</th>
                    <th className="px-4 py-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payables.map(payable => (
                    <tr key={payable.id} className="border-b border-purple-700/20 hover:bg-purple-900/10">
                      <td className="px-4 py-3">{payable.vendor}</td>
                      <td className="px-4 py-3">{payable.invoice}</td>
                      <td className="px-4 py-3 text-right">${payable.amount.toLocaleString()}</td>
                      <td className="px-4 py-3">{payable.due}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${payable.status === 'Outstanding' ? 'bg-blue-900/30 text-blue-400' : 'bg-red-900/30 text-red-400'}`}>
                          {payable.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Financial Statements */}
        <TabsContent value="financial-statements" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Financial Statements</h2>
            <div className="flex gap-2">
              <select className="bg-black/70 border border-purple-700/30 rounded-md px-3 py-2">
                <option>Current Period</option>
                <option>Previous Period</option>
                <option>Year to Date</option>
                <option>Last Financial Year</option>
              </select>
              <button className="flex items-center gap-2 bg-purple-700 hover:bg-purple-600 px-4 py-2 rounded-md">
                <DocumentTextIcon className="w-5 h-5" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-black/30 border border-purple-700/20 rounded-lg p-4 flex flex-col items-center">
              <DocumentTextIcon className="w-12 h-12 text-purple-400 mb-2" />
              <h3 className="text-lg font-medium">Trial Balance</h3>
              <p className="text-sm text-gray-400 text-center mt-1 mb-4">Verify accounting equation balance</p>
              <button className="bg-purple-700/50 hover:bg-purple-700 px-4 py-2 rounded-md w-full">
                Generate Trial Balance
              </button>
            </div>
            <div className="bg-black/30 border border-purple-700/20 rounded-lg p-4 flex flex-col items-center">
              <ChartBarIcon className="w-12 h-12 text-purple-400 mb-2" />
              <h3 className="text-lg font-medium">Profit & Loss</h3>
              <p className="text-sm text-gray-400 text-center mt-1 mb-4">View income and expenses summary</p>
              <button className="bg-purple-700/50 hover:bg-purple-700 px-4 py-2 rounded-md w-full">
                Generate P&L Statement
              </button>
            </div>
            <div className="bg-black/30 border border-purple-700/20 rounded-lg p-4 flex flex-col items-center">
              <CurrencyDollarIcon className="w-12 h-12 text-purple-400 mb-2" />
              <h3 className="text-lg font-medium">Balance Sheet</h3>
              <p className="text-sm text-gray-400 text-center mt-1 mb-4">View assets, liabilities and equity</p>
              <button className="bg-purple-700/50 hover:bg-purple-700 px-4 py-2 rounded-md w-full">
                Generate Balance Sheet
              </button>
            </div>
          </div>
          
          <div className="bg-black/50 border border-purple-700/30 rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Financial Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-md font-medium mb-3 text-purple-400">Revenue vs Expenses</h4>
                <div className="h-64 bg-black/30 border border-purple-700/20 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Chart Visualization Placeholder</p>
                </div>
              </div>
              <div>
                <h4 className="text-md font-medium mb-3 text-purple-400">Key Financial Metrics</h4>
                <div className="bg-black/30 border border-purple-700/20 rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-purple-700/20">
                    <span>Gross Profit Margin</span>
                    <span className="font-medium">42.5%</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-purple-700/20">
                    <span>Net Profit Margin</span>
                    <span className="font-medium">18.3%</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-purple-700/20">
                    <span>Current Ratio</span>
                    <span className="font-medium">2.4</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-purple-700/20">
                    <span>Debt to Equity</span>
                    <span className="font-medium">0.75</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Return on Assets</span>
                    <span className="font-medium">12.8%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Aging Reports */}
        <TabsContent value="aging-reports" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Aging Reports</h2>
            <div className="flex gap-2">
              <button className="bg-purple-700 hover:bg-purple-600 px-4 py-2 rounded-md">
                Export Report
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black/50 border border-purple-700/30 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-purple-700/30">
                <h3 className="font-medium">Accounts Receivable Aging</h3>
                <p className="text-sm text-gray-400 mt-1">Analysis of outstanding customer invoices by age</p>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-5 gap-2 mb-4">
                  <div className="bg-black/30 border border-purple-700/20 rounded-lg p-3 text-center">
                    <p className="text-sm text-gray-400">Current</p>
                    <p className="text-lg font-medium">$12,500</p>
                  </div>
                  <div className="bg-black/30 border border-purple-700/20 rounded-lg p-3 text-center">
                    <p className="text-sm text-gray-400">1-30 Days</p>
                    <p className="text-lg font-medium">$8,750</p>
                  </div>
                  <div className="bg-black/30 border border-purple-700/20 rounded-lg p-3 text-center">
                    <p className="text-sm text-gray-400">31-60 Days</p>
                    <p className="text-lg font-medium">$15,000</p>
                  </div>
                  <div className="bg-black/30 border border-purple-700/20 rounded-lg p-3 text-center">
                    <p className="text-sm text-gray-400">61-90 Days</p>
                    <p className="text-lg font-medium">$0</p>
                  </div>
                  <div className="bg-black/30 border border-purple-700/20 rounded-lg p-3 text-center">
                    <p className="text-sm text-gray-400">90+ Days</p>
                    <p className="text-lg font-medium">$0</p>
                  </div>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-purple-700/30">
                      <th className="px-4 py-3 text-left">Customer</th>
                      <th className="px-4 py-3 text-left">Invoice</th>
                      <th className="px-4 py-3 text-right">Amount</th>
                      <th className="px-4 py-3 text-left">Due Date</th>
                      <th className="px-4 py-3 text-left">Aging</th>
                    </tr>
                  </thead>
                  <tbody>
                    {receivables.map(receivable => (
                      <tr key={receivable.id} className="border-b border-purple-700/20 hover:bg-purple-900/10">
                        <td className="px-4 py-3">{receivable.customer}</td>
                        <td className="px-4 py-3">{receivable.invoice}</td>
                        <td className="px-4 py-3 text-right">${receivable.amount.toLocaleString()}</td>
                        <td className="px-4 py-3">{receivable.due}</td>
                        <td className="px-4 py-3">{receivable.aging}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="bg-black/50 border border-purple-700/30 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-purple-700/30">
                <h3 className="font-medium">Accounts Payable Aging</h3>
                <p className="text-sm text-gray-400 mt-1">Analysis of outstanding vendor invoices by age</p>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-5 gap-2 mb-4">
                  <div className="bg-black/30 border border-purple-700/20 rounded-lg p-3 text-center">
                    <p className="text-sm text-gray-400">Current</p>
                    <p className="text-lg font-medium">$10,000</p>
                  </div>
                  <div className="bg-black/30 border border-purple-700/20 rounded-lg p-3 text-center">
                    <p className="text-sm text-gray-400">1-30 Days</p>
                    <p className="text-lg font-medium">$12,000</p>
                  </div>
                  <div className="bg-black/30 border border-purple-700/20 rounded-lg p-3 text-center">
                    <p className="text-sm text-gray-400">31-60 Days</p>
                    <p className="text-lg font-medium">$0</p>
                  </div>
                  <div className="bg-black/30 border border-purple-700/20 rounded-lg p-3 text-center">
                    <p className="text-sm text-gray-400">61-90 Days</p>
                    <p className="text-lg font-medium">$0</p>
                  </div>
                  <div className="bg-black/30 border border-purple-700/20 rounded-lg p-3 text-center">
                    <p className="text-sm text-gray-400">90+ Days</p>
                    <p className="text-lg font-medium">$0</p>
                  </div>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-purple-700/30">
                      <th className="px-4 py-3 text-left">Vendor</th>
                      <th className="px-4 py-3 text-left">Invoice</th>
                      <th className="px-4 py-3 text-right">Amount</th>
                      <th className="px-4 py-3 text-left">Due Date</th>
                      <th className="px-4 py-3 text-left">Aging</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payables.map(payable => (
                      <tr key={payable.id} className="border-b border-purple-700/20 hover:bg-purple-900/10">
                        <td className="px-4 py-3">{payable.vendor}</td>
                        <td className="px-4 py-3">{payable.invoice}</td>
                        <td className="px-4 py-3 text-right">${payable.amount.toLocaleString()}</td>
                        <td className="px-4 py-3">{payable.due}</td>
                        <td className="px-4 py-3">{payable.aging}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Taxation Reports */}
        <TabsContent value="taxation" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Taxation Reports</h2>
            <div className="flex gap-2">
              <select className="bg-black/70 border border-purple-700/30 rounded-md px-3 py-2">
                <option>Current Quarter</option>
                <option>Previous Quarter</option>
                <option>Current Financial Year</option>
                <option>Previous Financial Year</option>
              </select>
              <button className="bg-purple-700 hover:bg-purple-600 px-4 py-2 rounded-md">
                Generate Reports
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-black/30 border border-purple-700/20 rounded-lg p-4 flex flex-col items-center">
              <h3 className="text-lg font-medium">GST Reports</h3>
              <p className="text-sm text-gray-400 text-center mt-1 mb-4">Goods and Services Tax filing reports</p>
              <div className="space-y-2 w-full">
                <button className="bg-purple-700/50 hover:bg-purple-700 px-4 py-2 rounded-md w-full">
                  GSTR-1 (Outward Supplies)
                </button>
                <button className="bg-purple-700/50 hover:bg-purple-700 px-4 py-2 rounded-md w-full">
                  GSTR-2 (Inward Supplies)
                </button>
                <button className="bg-purple-700/50 hover:bg-purple-700 px-4 py-2 rounded-md w-full">
                  GSTR-3B (Summary Return)
                </button>
              </div>
            </div>
            <div className="bg-black/30 border border-purple-700/20 rounded-lg p-4 flex flex-col items-center">
              <h3 className="text-lg font-medium">TDS Reports</h3>
              <p className="text-sm text-gray-400 text-center mt-1 mb-4">Tax Deducted at Source reports</p>
              <div className="space-y-2 w-full">
                <button className="bg-purple-700/50 hover:bg-purple-700 px-4 py-2 rounded-md w-full">
                  Form 26Q (Non-Salary)
                </button>
                <button className="bg-purple-700/50 hover:bg-purple-700 px-4 py-2 rounded-md w-full">
                  Form 24Q (Salary)
                </button>
                <button className="bg-purple-700/50 hover:bg-purple-700 px-4 py-2 rounded-md w-full">
                  TDS Certificates
                </button>
              </div>
            </div>
            <div className="bg-black/30 border border-purple-700/20 rounded-lg p-4 flex flex-col items-center">
              <h3 className="text-lg font-medium">VAT Reports</h3>
              <p className="text-sm text-gray-400 text-center mt-1 mb-4">Value Added Tax reports</p>
              <div className="space-y-2 w-full">
                <button className="bg-purple-700/50 hover:bg-purple-700 px-4 py-2 rounded-md w-full">
                  VAT Return
                </button>
                <button className="bg-purple-700/50 hover:bg-purple-700 px-4 py-2 rounded-md w-full">
                  Input Tax Credit
                </button>
                <button className="bg-purple-700/50 hover:bg-purple-700 px-4 py-2 rounded-md w-full">
                  VAT Assessment
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-black/50 border border-purple-700/30 rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Tax Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-md font-medium mb-3 text-purple-400">Tax Liability</h4>
                <div className="bg-black/30 border border-purple-700/20 rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-purple-700/20">
                    <span>GST Payable</span>
                    <span className="font-medium">$12,500.00</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-purple-700/20">
                    <span>TDS Payable</span>
                    <span className="font-medium">$3,750.00</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-purple-700/20">
                    <span>VAT Payable</span>
                    <span className="font-medium">$0.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Tax Liability</span>
                    <span className="font-medium">$16,250.00</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-md font-medium mb-3 text-purple-400">Filing Calendar</h4>
                <div className="bg-black/30 border border-purple-700/20 rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-purple-700/20">
                    <span>GSTR-1</span>
                    <span className="font-medium text-red-400">Due: May 11, 2025</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-purple-700/20">
                    <span>GSTR-3B</span>
                    <span className="font-medium text-red-400">Due: May 20, 2025</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-purple-700/20">
                    <span>TDS Return (Q1)</span>
                    <span className="font-medium">Due: Jul 31, 2025</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Annual GST Return</span>
                    <span className="font-medium">Due: Dec 31, 2025</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountsFinance;