

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs"
import {
  DocumentTextIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  PlusIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline"

const AccountFinance = () => {
  const [activeTab, setActiveTab] = useState("chart-of-accounts")
  const [showReportModal, setShowReportModal] = useState(false)
  const [reportType, setReportType] = useState("general-ledger")
  const [dateRange, setDateRange] = useState("current-month")
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [accountFilter, setAccountFilter] = useState("all")
  const [entryType, setEntryType] = useState("all")
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)
  const [generatedReport, setGeneratedReport] = useState(null)
  const [showExportOptions, setShowExportOptions] = useState(false)
  const [showAddAccountForm, setShowAddAccountForm] = useState(false)

  // Sample data for demonstration
  const chartOfAccounts = [
    { id: 1, code: "1000", name: "Assets", type: "Asset", balance: 250000 },
    { id: 2, code: "1100", name: "Cash in Hand", type: "Asset", balance: 15000 },
    { id: 3, code: "1200", name: "Bank Accounts", type: "Asset", balance: 125000 },
    { id: 4, code: "2000", name: "Liabilities", type: "Liability", balance: 75000 },
    { id: 5, code: "3000", name: "Equity", type: "Equity", balance: 100000 },
    { id: 6, code: "4000", name: "Revenue", type: "Revenue", balance: 200000 },
    { id: 7, code: "5000", name: "Expenses", type: "Expense", balance: 150000 },
  ]

  const journalEntries = [
    {
      id: 1,
      date: "2025-05-10",
      description: "Office Rent Payment",
      debit: "Rent Expense",
      credit: "Bank Account",
      amount: 5000,
    },
    {
      id: 2,
      date: "2025-05-08",
      description: "Sales Invoice #1234",
      debit: "Accounts Receivable",
      credit: "Sales Revenue",
      amount: 12500,
    },
    {
      id: 3,
      date: "2025-05-05",
      description: "Purchase Invoice #789",
      debit: "Inventory",
      credit: "Accounts Payable",
      amount: 8750,
    },
    {
      id: 4,
      date: "2025-05-01",
      description: "Salary Payment",
      debit: "Salary Expense",
      credit: "Bank Account",
      amount: 25000,
    },
  ]

  // Added missing bankTransactions data
  const bankTransactions = [
    {
      id: 1,
      date: "2025-05-15",
      description: "Customer Payment - ABC Corp",
      type: "Deposit",
      amount: 12500,
      balance: 137500,
    },
    {
      id: 2,
      date: "2025-05-14",
      description: "Office Rent Payment",
      type: "Withdrawal",
      amount: 5000,
      balance: 125000,
    },
    {
      id: 3,
      date: "2025-05-12",
      description: "Supplier Payment - XYZ Ltd",
      type: "Withdrawal",
      amount: 8750,
      balance: 130000,
    },
    {
      id: 4,
      date: "2025-05-10",
      description: "Sales Revenue Deposit",
      type: "Deposit",
      amount: 15000,
      balance: 138750,
    },
    {
      id: 5,
      date: "2025-05-08",
      description: "Utility Bill Payment",
      type: "Withdrawal",
      amount: 2500,
      balance: 123750,
    },
  ]

  const receivables = [
    {
      id: 1,
      customer: "ABC Corp",
      invoice: "INV-2025-001",
      date: "2025-04-15",
      amount: 12500,
      due: "2025-05-15",
      status: "Outstanding",
      aging: "Current",
    },
    {
      id: 2,
      customer: "XYZ Ltd",
      invoice: "INV-2025-002",
      date: "2025-04-01",
      amount: 8750,
      due: "2025-05-01",
      status: "Overdue",
      aging: "1-30 days",
    },
    {
      id: 3,
      customer: "123 Industries",
      invoice: "INV-2025-003",
      date: "2025-03-15",
      amount: 15000,
      due: "2025-04-15",
      status: "Overdue",
      aging: "31-60 days",
    },
  ]

  const payables = [
    {
      id: 1,
      vendor: "Supplier Co",
      invoice: "S-1234",
      date: "2025-04-20",
      amount: 7500,
      due: "2025-05-20",
      status: "Outstanding",
      aging: "Current",
    },
    {
      id: 2,
      vendor: "Office Supplies Inc",
      invoice: "OS-5678",
      date: "2025-04-10",
      amount: 2500,
      due: "2025-05-10",
      status: "Outstanding",
      aging: "Current",
    },
    {
      id: 3,
      vendor: "Tech Solutions",
      invoice: "TS-9012",
      date: "2025-03-25",
      amount: 12000,
      due: "2025-04-25",
      status: "Overdue",
      aging: "1-30 days",
    },
  ]

  // Handle generate report
  const handleGenerateReport = () => {
    setIsGeneratingReport(true)

    // Simulate API call with setTimeout
    setTimeout(() => {
      // Create a report object based on the selected options
      const report = {
        type: reportType,
        dateRange: dateRange,
        fromDate: fromDate,
        toDate: toDate,
        accountFilter: accountFilter,
        entryType: entryType,
        generatedAt: new Date().toISOString(),
        data: getReportData(),
      }

      setGeneratedReport(report)
      setIsGeneratingReport(false)
    }, 1500)
  }

  // Get report data based on selected options
  const getReportData = () => {
    switch (reportType) {
      case "general-ledger":
        return journalEntries
      case "trial-balance":
        return chartOfAccounts
      case "profit-loss":
        return {
          revenue: 200000,
          expenses: 150000,
          grossProfit: 50000,
          taxAmount: 7500,
          netProfit: 42500,
        }
      case "balance-sheet":
        return {
          assets: 390000,
          liabilities: 75000,
          equity: 315000,
        }
      case "receivables":
        return receivables
      case "payables":
        return payables
      default:
        return []
    }
  }

  // Handle export report
  const handleExportReport = (format) => {
    if (!generatedReport) return

    // Create report title
    const reportTitle = reportType
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

    // Create report content
    let content = `${reportTitle} Report\n`
    content += `Generated on: ${new Date(generatedReport.generatedAt).toLocaleString()}\n`
    content += `Period: ${
      dateRange === "current-month"
        ? "Current Month"
        : dateRange === "last-month"
          ? "Last Month"
          : dateRange === "current-quarter"
            ? "Current Quarter"
            : dateRange === "custom"
              ? `${fromDate} to ${toDate}`
              : "All Time"
    }\n\n`

    // Add report data
    if (Array.isArray(generatedReport.data)) {
      generatedReport.data.forEach((item, index) => {
        content += `Item ${index + 1}:\n`
        Object.entries(item).forEach(([key, value]) => {
          if (key !== "id") {
            content += `  ${key}: ${value}\n`
          }
        })
        content += "\n"
      })
    } else {
      Object.entries(generatedReport.data).forEach(([key, value]) => {
        content += `${key}: ${value}\n`
      })
    }

    // Create and download file
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${reportTitle.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.${format === "csv" ? "csv" : "txt"}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    setShowExportOptions(false)
  }

  // Handle filter journal entries
  const handleFilterJournalEntries = () => {
    // In a real app, you would filter the journal entries based on the form values
    // For this demo, we'll just show an alert
    alert("Journal entries filtered!")
  }

  // Handle generate financial statement
  const handleGenerateFinancialStatement = (statementType) => {
    setReportType(statementType)
    setShowReportModal(true)
  }

  return (
    <div className="p-6 max-w-full bg-white min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-black">Accounts & Finance</h1>
        <p className="text-gray-700 mt-2">Manage your financial accounts, transactions, and reports</p>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex mb-8 border-b border-gray-200 overflow-x-auto bg-white">
          {[
            "chart-of-accounts",
            "general-ledger",
            "cash-bank",
            "journal-entries",
            "receivables-payables",
            "financial-statements",
            "aging-reports",
            "taxation",
          ].map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className={`px-4 py-2 font-medium text-sm transition-colors duration-200
                ${
                  activeTab === tab
                    ? "text-purple-700 border-b-2 border-purple-600 bg-white"
                    : "text-gray-600 hover:text-purple-600 bg-white"
                }`}
            >
              {tab
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Chart of Accounts */}
        <TabsContent value="chart-of-accounts" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-black">Chart of Accounts</h2>
            <button
              onClick={() => setShowAddAccountForm(true)}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
            >
              <PlusIcon className="w-5 h-5" />
              <span>Add Account</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-medium text-black mb-2">Cash in Hand</h3>
              <p className="text-3xl font-semibold text-black">$15,000.00</p>
              <div className="flex items-center mt-2">
                <span className="text-green-600 text-sm">+$2,500.00 today</span>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-medium text-black mb-2">Bank Balance</h3>
              <p className="text-3xl font-semibold text-black">$125,000.00</p>
              <div className="flex items-center mt-2">
                <span className="text-red-600 text-sm">-$5,000.00 today</span>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-medium text-black mb-2">Total Liquid Assets</h3>
              <p className="text-3xl font-semibold text-black">$140,000.00</p>
              <div className="flex items-center mt-2">
                <span className="text-red-600 text-sm">-$2,500.00 today</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-black">Code</th>
                  <th className="px-4 py-3 text-left text-black">Account Name</th>
                  <th className="px-4 py-3 text-left text-black">Type</th>
                  <th className="px-4 py-3 text-right text-black">Balance</th>
                  <th className="px-4 py-3 text-center text-black">Actions</th>
                </tr>
              </thead>
              <tbody>
                {chartOfAccounts.map((account) => (
                  <tr
                    key={account.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-4 py-3 text-black">{account.code}</td>
                    <td className="px-4 py-3 text-black">{account.name}</td>
                    <td className="px-4 py-3 text-black">{account.type}</td>
                    <td className="px-4 py-3 text-right text-black">${account.balance.toLocaleString()}</td>
                    <td className="px-4 py-3 text-center">
                      <button className="text-purple-600 hover:text-purple-800 mx-1 transition-colors duration-150">
                        Edit
                      </button>
                      <button className="text-purple-600 hover:text-purple-800 mx-1 transition-colors duration-150">
                        View
                      </button>
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
            <h2 className="text-xl font-semibold text-black">General Ledger</h2>
            <div className="flex gap-2">
              <select
                className="bg-white border border-gray-200 rounded-md px-3 py-2 text-black"
                value={accountFilter}
                onChange={(e) => setAccountFilter(e.target.value)}
              >
                <option value="all">All Accounts</option>
                <option value="assets">Assets</option>
                <option value="liabilities">Liabilities</option>
                <option value="equity">Equity</option>
                <option value="revenue">Revenue</option>
                <option value="expenses">Expenses</option>
              </select>
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                onClick={() => {
                  setReportType("general-ledger")
                  setShowReportModal(true)
                }}
              >
                Generate Report
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h3 className="font-medium text-black">Account: Cash in Hand (1100)</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-4 py-3 text-left text-black">Date</th>
                    <th className="px-4 py-3 text-left text-black">Description</th>
                    <th className="px-4 py-3 text-left text-black">Reference</th>
                    <th className="px-4 py-3 text-right text-black">Debit</th>
                    <th className="px-4 py-3 text-right text-black">Credit</th>
                    <th className="px-4 py-3 text-right text-black">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-4 py-3 text-black">2025-05-01</td>
                    <td className="px-4 py-3 text-black">Opening Balance</td>
                    <td className="px-4 py-3 text-black">OB-2025</td>
                    <td className="px-4 py-3 text-right text-black">$145,000.00</td>
                    <td className="px-4 py-3 text-right text-black">$0.00</td>
                    <td className="px-4 py-3 text-right text-black">$145,000.00</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-4 py-3 text-black">2025-05-05</td>
                    <td className="px-4 py-3 text-black">Sales Revenue</td>
                    <td className="px-4 py-3 text-black">INV-1234</td>
                    <td className="px-4 py-3 text-right text-black">$12,500.00</td>
                    <td className="px-4 py-3 text-right text-black">$0.00</td>
                    <td className="px-4 py-3 text-right text-black">$157,500.00</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-4 py-3 text-black">2025-05-10</td>
                    <td className="px-4 py-3 text-black">Office Rent Payment</td>
                    <td className="px-4 py-3 text-black">EXP-001</td>
                    <td className="px-4 py-3 text-right text-black">$0.00</td>
                    <td className="px-4 py-3 text-right text-black">$5,000.00</td>
                    <td className="px-4 py-3 text-right text-black">$152,500.00</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-4 py-3 text-black">2025-05-15</td>
                    <td className="px-4 py-3 text-black">Customer Payment</td>
                    <td className="px-4 py-3 text-black">REC-456</td>
                    <td className="px-4 py-3 text-right text-black">$22,500.00</td>
                    <td className="px-4 py-3 text-right text-black">$0.00</td>
                    <td className="px-4 py-3 text-right text-black">$175,000.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Cash & Bank Book */}
        <TabsContent value="cash-bank" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-black">Cash & Bank Book</h2>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md">
                <ArrowDownIcon className="w-5 h-5" />
                <span>Deposit</span>
              </button>
              <button className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md">
                <ArrowUpIcon className="w-5 h-5" />
                <span>Withdraw</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-medium text-black mb-2">Cash in Hand</h3>
              <p className="text-3xl font-semibold text-black">$15,000.00</p>
              <div className="flex items-center mt-2">
                <span className="text-green-600 text-sm">+$2,500.00 today</span>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-medium text-black mb-2">Bank Balance</h3>
              <p className="text-3xl font-semibold text-black">$125,000.00</p>
              <div className="flex items-center mt-2">
                <span className="text-red-600 text-sm">-$5,000.00 today</span>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-medium text-black mb-2">Total Liquid Assets</h3>
              <p className="text-3xl font-semibold text-black">$140,000.00</p>
              <div className="flex items-center mt-2">
                <span className="text-red-600 text-sm">-$2,500.00 today</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-medium text-black">Recent Bank Transactions</h3>
              <select className="bg-white border border-gray-200 rounded-md px-3 py-1 text-black">
                <option>All Accounts</option>
                <option>Main Account</option>
                <option>Savings Account</option>
              </select>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-black">Date</th>
                  <th className="px-4 py-3 text-left text-black">Description</th>
                  <th className="px-4 py-3 text-left text-black">Type</th>
                  <th className="px-4 py-3 text-right text-black">Amount</th>
                  <th className="px-4 py-3 text-right text-black">Balance</th>
                </tr>
              </thead>
              <tbody>
                {bankTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-black">{transaction.date}</td>
                    <td className="px-4 py-3 text-black">{transaction.description}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${transaction.type === "Deposit" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                      >
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={transaction.type === "Deposit" ? "text-green-600" : "text-red-600"}>
                        {transaction.type === "Deposit" ? "+" : "-"}${transaction.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-black">${transaction.balance.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Journal Entries */}
        <TabsContent value="journal-entries" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-black">Journal Entries</h2>
            <div className="flex gap-2">
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
                onClick={() => setShowReportModal(true)}
              >
                Generate Report
              </button>
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
                onClick={() => setShowReportModal(true)}
              >
                Filter
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="p-4 border-b border-gray-200 flex flex-wrap gap-4">
              <div>
                <label className="block text-sm text-black mb-1">From Date</label>
                <input
                  type="date"
                  className="bg-white border border-gray-200 rounded-md px-3 py-1 text-black"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm text-black mb-1">To Date</label>
                <input
                  type="date"
                  className="bg-white border border-gray-200 rounded-md px-3 py-1 text-black"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm text-black mb-1">Entry Type</label>
                <select
                  className="bg-white border border-gray-200 rounded-md px-3 py-1 text-black"
                  value={entryType}
                  onChange={(e) => setEntryType(e.target.value)}
                >
                  <option value="all">All Entries</option>
                  <option value="sales">Sales</option>
                  <option value="purchases">Purchases</option>
                  <option value="expenses">Expenses</option>
                  <option value="adjustments">Adjustments</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded-md"
                  onClick={handleFilterJournalEntries}
                >
                  Filter
                </button>
              </div>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-black">Date</th>
                  <th className="px-4 py-3 text-left text-black">Description</th>
                  <th className="px-4 py-3 text-left text-black">Debit Account</th>
                  <th className="px-4 py-3 text-left text-black">Credit Account</th>
                  <th className="px-4 py-3 text-right text-black">Amount</th>
                  <th className="px-4 py-3 text-center text-black">Actions</th>
                </tr>
              </thead>
              <tbody>
                {journalEntries.map((entry) => (
                  <tr key={entry.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-black">{entry.date}</td>
                    <td className="px-4 py-3 text-black">{entry.description}</td>
                    <td className="px-4 py-3 text-black">{entry.debit}</td>
                    <td className="px-4 py-3 text-black">{entry.credit}</td>
                    <td className="px-4 py-3 text-right text-black">${entry.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-center">
                      <button className="text-purple-600 hover:text-purple-700 mx-1">Edit</button>
                      <button className="text-purple-600 hover:text-purple-700 mx-1">View</button>
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
            <h2 className="text-xl font-semibold text-black">Receivables & Payables</h2>
            <div className="flex gap-2">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors duration-200">
                New Invoice
              </button>
              <button className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-md transition-colors duration-200">
                New Bill
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h3 className="font-medium text-black">Accounts Receivable</h3>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-4 py-3 text-left text-black">Customer</th>
                    <th className="px-4 py-3 text-left text-black">Invoice</th>
                    <th className="px-4 py-3 text-right text-black">Amount</th>
                    <th className="px-4 py-3 text-left text-black">Due Date</th>
                    <th className="px-4 py-3 text-left text-black">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {receivables.map((receivable) => (
                    <tr
                      key={receivable.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-4 py-3 text-black">{receivable.customer}</td>
                      <td className="px-4 py-3 text-black">{receivable.invoice}</td>
                      <td className="px-4 py-3 text-right text-black">${receivable.amount.toLocaleString()}</td>
                      <td className="px-4 py-3 text-black">{receivable.due}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            receivable.status === "Outstanding"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {receivable.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h3 className="font-medium text-black">Accounts Payable</h3>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-4 py-3 text-left text-black">Vendor</th>
                    <th className="px-4 py-3 text-left text-black">Invoice</th>
                    <th className="px-4 py-3 text-right text-black">Amount</th>
                    <th className="px-4 py-3 text-left text-black">Due Date</th>
                    <th className="px-4 py-3 text-left text-black">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payables.map((payable) => (
                    <tr
                      key={payable.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-4 py-3 text-black">{payable.vendor}</td>
                      <td className="px-4 py-3 text-black">{payable.invoice}</td>
                      <td className="px-4 py-3 text-right text-black">${payable.amount.toLocaleString()}</td>
                      <td className="px-4 py-3 text-black">{payable.due}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            payable.status === "Outstanding" ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"
                          }`}
                        >
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
            <h2 className="text-xl font-semibold text-black">Financial Statements</h2>
            <div className="flex gap-2">
              <select
                className="bg-white border border-gray-200 rounded-md px-3 py-2 text-black"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="current-month">Current Month</option>
                <option value="last-month">Last Month</option>
                <option value="last-quarter">Last Quarter</option>
                <option value="year-to-date">Year to Date</option>
                <option value="custom">Custom Period</option>
              </select>
              <div className="relative">
                <button
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center"
                  onClick={() => setShowExportOptions(!showExportOptions)}
                >
                  Export Reports
                  <ChevronDownIcon className="w-4 h-4 ml-1" />
                </button>
                {showExportOptions && (
                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                    <div className="py-1">
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100"
                        onClick={() => handleExportReport("pdf")}
                      >
                        Export as PDF
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100"
                        onClick={() => handleExportReport("csv")}
                      >
                        Export as CSV
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100"
                        onClick={() => handleExportReport("excel")}
                      >
                        Export as Excel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center shadow-sm">
              <DocumentTextIcon className="w-12 h-12 text-purple-600 mb-2" />
              <h3 className="text-lg font-medium text-black">Trial Balance</h3>
              <p className="text-sm text-gray-600 text-center mt-1 mb-4">Verify accounting equation balance</p>
              <button
                className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-md w-full transition-colors duration-200"
                onClick={() => handleGenerateFinancialStatement("trial-balance")}
              >
                Generate Trial Balance
              </button>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center shadow-sm">
              <ChartBarIcon className="w-12 h-12 text-purple-600 mb-2" />
              <h3 className="text-lg font-medium text-black">Profit & Loss</h3>
              <p className="text-sm text-gray-600 text-center mt-1 mb-4">View income and expenses summary</p>
              <button
                className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-md w-full transition-colors duration-200"
                onClick={() => handleGenerateFinancialStatement("profit-loss")}
              >
                Generate P&L Statement
              </button>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center shadow-sm">
              <CurrencyDollarIcon className="w-12 h-12 text-purple-600 mb-2" />
              <h3 className="text-lg font-medium text-black">Balance Sheet</h3>
              <p className="text-sm text-gray-600 text-center mt-1 mb-4">View assets, liabilities and equity</p>
              <button
                className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-md w-full transition-colors duration-200"
                onClick={() => handleGenerateFinancialStatement("balance-sheet")}
              >
                Generate Balance Sheet
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-medium text-black mb-4">Financial Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-md font-medium mb-3 text-black">Revenue vs Expenses</h4>
                <div className="h-64 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Chart Visualization Placeholder</p>
                </div>
              </div>
              <div>
                <h4 className="text-md font-medium mb-3 text-black">Key Financial Metrics</h4>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-black">Gross Profit Margin</span>
                    <span className="font-medium text-black">42.5%</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-black">Net Profit Margin</span>
                    <span className="font-medium text-black">18.3%</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-black">Current Ratio</span>
                    <span className="font-medium text-black">2.4</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-black">Debt to Equity</span>
                    <span className="font-medium text-black">0.75</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-black">Return on Assets</span>
                    <span className="font-medium text-black">12.8%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Aging Reports */}
        <TabsContent value="aging-reports" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-black">Aging Reports</h2>
            <div className="flex gap-2">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md">
                Export Report
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-medium text-black">Accounts Receivable Aging</h3>
                <p className="text-sm text-gray-600 mt-1">Analysis of outstanding customer invoices by age</p>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-5 gap-2 mb-4">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
                    <p className="text-sm text-black">Current</p>
                    <p className="text-lg font-medium text-black">$12,500</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
                    <p className="text-sm text-black">1-30 Days</p>
                    <p className="text-lg font-medium text-black">$8,750</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
                    <p className="text-sm text-black">31-60 Days</p>
                    <p className="text-lg font-medium text-black">$15,000</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
                    <p className="text-sm text-black">61-90 Days</p>
                    <p className="text-lg font-medium text-black">$0</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
                    <p className="text-sm text-black">90+ Days</p>
                    <p className="text-lg font-medium text-black">$0</p>
                  </div>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-black">Customer</th>
                      <th className="px-4 py-3 text-left text-black">Invoice</th>
                      <th className="px-4 py-3 text-right text-black">Amount</th>
                      <th className="px-4 py-3 text-left text-black">Due Date</th>
                      <th className="px-4 py-3 text-left text-black">Aging</th>
                    </tr>
                  </thead>
                  <tbody>
                    {receivables.map((receivable) => (
                      <tr key={receivable.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3 text-black">{receivable.customer}</td>
                        <td className="px-4 py-3 text-black">{receivable.invoice}</td>
                        <td className="px-4 py-3 text-right text-black">${receivable.amount.toLocaleString()}</td>
                        <td className="px-4 py-3 text-black">{receivable.due}</td>
                        <td className="px-4 py-3 text-black">{receivable.aging}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-medium text-black">Accounts Payable Aging</h3>
                <p className="text-sm text-gray-600 mt-1">Analysis of outstanding vendor invoices by age</p>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-5 gap-2 mb-4">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
                    <p className="text-sm text-black">Current</p>
                    <p className="text-lg font-medium text-black">$10,000</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
                    <p className="text-sm text-black">1-30 Days</p>
                    <p className="text-lg font-medium text-black">$12,000</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
                    <p className="text-sm text-black">31-60 Days</p>
                    <p className="text-lg font-medium text-black">$0</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
                    <p className="text-sm text-black">61-90 Days</p>
                    <p className="text-lg font-medium text-black">$0</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
                    <p className="text-sm text-black">90+ Days</p>
                    <p className="text-lg font-medium text-black">$0</p>
                  </div>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-black">Vendor</th>
                      <th className="px-4 py-3 text-left text-black">Invoice</th>
                      <th className="px-4 py-3 text-right text-black">Amount</th>
                      <th className="px-4 py-3 text-left text-black">Due Date</th>
                      <th className="px-4 py-3 text-left text-black">Aging</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payables.map((payable) => (
                      <tr key={payable.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3 text-black">{payable.vendor}</td>
                        <td className="px-4 py-3 text-black">{payable.invoice}</td>
                        <td className="px-4 py-3 text-right text-black">${payable.amount.toLocaleString()}</td>
                        <td className="px-4 py-3 text-black">{payable.due}</td>
                        <td className="px-4 py-3 text-black">{payable.aging}</td>
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
            <h2 className="text-xl font-semibold text-black">Taxation Reports</h2>
            <div className="flex gap-2">
              <select className="bg-white border border-gray-200 rounded-md px-3 py-2 text-black">
                <option>Current Quarter</option>
                <option>Previous Quarter</option>
                <option>Current Financial Year</option>
                <option>Previous Financial Year</option>
              </select>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md">
                Generate Reports
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center shadow-sm">
              <h3 className="text-lg font-medium text-black">GST Reports</h3>
              <p className="text-sm text-gray-600 text-center mt-1 mb-4">Goods and Services Tax filing reports</p>
              <div className="space-y-2 w-full">
                <button className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-md w-full">
                  GSTR-1 (Outward Supplies)
                </button>
                <button className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-md w-full">
                  GSTR-2 (Inward Supplies)
                </button>
                <button className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-md w-full">
                  GSTR-3B (Summary Return)
                </button>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center shadow-sm">
              <h3 className="text-lg font-medium text-black">TDS Reports</h3>
              <p className="text-sm text-gray-600 text-center mt-1 mb-4">Tax Deducted at Source reports</p>
              <div className="space-y-2 w-full">
                <button className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-md w-full">
                  Form 26Q (Non-Salary)
                </button>
                <button className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-md w-full">
                  Form 24Q (Salary)
                </button>
                <button className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-md w-full">
                  TDS Certificates
                </button>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center shadow-sm">
              <h3 className="text-lg font-medium text-black">VAT Reports</h3>
              <p className="text-sm text-gray-600 text-center mt-1 mb-4">Value Added Tax reports</p>
              <div className="space-y-2 w-full">
                <button className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-md w-full">
                  VAT Return
                </button>
                <button className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-md w-full">
                  Input Tax Credit
                </button>
                <button className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-md w-full">
                  VAT Assessment
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-medium text-black mb-4">Tax Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-md font-medium mb-3 text-black">Tax Liability</h4>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-black">GST Payable</span>
                    <span className="font-medium text-black">$12,500.00</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-black">TDS Payable</span>
                    <span className="font-medium text-black">$3,750.00</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-black">VAT Payable</span>
                    <span className="font-medium text-black">$0.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-black">Total Tax Liability</span>
                    <span className="font-medium text-black">$16,250.00</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-md font-medium mb-3 text-black">Filing Calendar</h4>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-black">GSTR-1</span>
                    <span className="font-medium text-red-600">Due: May 11, 2025</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-black">GSTR-3B</span>
                    <span className="font-medium text-red-600">Due: May 20, 2025</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-black">TDS Return (Q1)</span>
                    <span className="font-medium text-black">Due: Jul 31, 2025</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-black">Annual GST Return</span>
                    <span className="font-medium text-black">Due: Dec 31, 2025</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AccountFinance
