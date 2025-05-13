"use client"

import { useState, useEffect } from "react"

// Mock data for demonstration
const mockEmployees = [
  { id: 1, name: "John Doe", designation: "Software Engineer", department: "Engineering" },
  { id: 2, name: "Jane Smith", designation: "UI/UX Designer", department: "Design" },
  { id: 3, name: "Robert Johnson", designation: "Project Manager", department: "Management" },
  { id: 4, name: "Emily Davis", designation: "HR Executive", department: "Human Resources" },
  { id: 5, name: "Michael Wilson", designation: "Marketing Specialist", department: "Marketing" },
]

const mockSalaryStructures = [
  {
    employeeId: 1,
    basicPay: 50000,
    hra: 20000,
    conveyanceAllowance: 3000,
    medicalAllowance: 1500,
    specialAllowance: 10000,
    professionalTax: 200,
    incomeTax: 5000,
    providentFund: 6000,
    loanDeduction: 2000,
    totalEarnings: 84500,
    totalDeductions: 13200,
    netSalary: 71300,
  },
  {
    employeeId: 2,
    basicPay: 45000,
    hra: 18000,
    conveyanceAllowance: 3000,
    medicalAllowance: 1500,
    specialAllowance: 8000,
    professionalTax: 200,
    incomeTax: 4000,
    providentFund: 5400,
    loanDeduction: 0,
    totalEarnings: 75500,
    totalDeductions: 9600,
    netSalary: 65900,
  },
]

const mockLoans = [
  {
    employeeId: 1,
    loanId: 101,
    loanType: "Personal Loan",
    amount: 100000,
    interestRate: 10,
    tenure: 24,
    emiAmount: 4600,
    startDate: "2025-01-15",
    endDate: "2027-01-15",
    remainingAmount: 78400,
    paidAmount: 21600,
    status: "Active",
  },
  {
    employeeId: 3,
    loanId: 102,
    loanType: "Education Loan",
    amount: 200000,
    interestRate: 8,
    tenure: 36,
    emiAmount: 6300,
    startDate: "2024-08-10",
    endDate: "2027-08-10",
    remainingAmount: 170100,
    paidAmount: 29900,
    status: "Active",
  },
]

const mockPayslips = [
  {
    id: 1001,
    employeeId: 1,
    month: "April",
    year: 2025,
    generatedOn: "2025-04-28",
    status: "Generated",
    emailSent: true,
  },
  {
    id: 1002,
    employeeId: 2,
    month: "April",
    year: 2025,
    generatedOn: "2025-04-28",
    status: "Generated",
    emailSent: true,
  },
  {
    id: 1003,
    employeeId: 3,
    month: "April",
    year: 2025,
    generatedOn: "2025-04-28",
    status: "Generated",
    emailSent: false,
  },
]

const mockStatutorySettings = {
  pf: {
    employeeContribution: 12,
    employerContribution: 13.61,
    wageLimit: 15000,
  },
  esi: {
    employeeContribution: 0.75,
    employerContribution: 3.25,
    wageLimit: 21000,
  },
  tds: {
    slabs: [
      { limit: 250000, rate: 0 },
      { limit: 500000, rate: 5 },
      { limit: 750000, rate: 10 },
      { limit: 1000000, rate: 15 },
      { limit: 1250000, rate: 20 },
      { limit: 1500000, rate: 25 },
      { limit: Number.POSITIVE_INFINITY, rate: 30 },
    ],
  },
  professionalTax: {
    slabs: [
      { limit: 10000, amount: 0 },
      { limit: 15000, amount: 150 },
      { limit: 20000, amount: 200 },
      { limit: Number.POSITIVE_INFINITY, amount: 300 },
    ],
  },
}

const mockIncentives = [
  {
    id: 501,
    employeeId: 1,
    type: "Performance Bonus",
    amount: 10000,
    month: "March",
    year: 2025,
    status: "Approved",
    description: "Quarterly performance bonus",
  },
  {
    id: 502,
    employeeId: 2,
    type: "Project Completion",
    amount: 5000,
    month: "April",
    year: 2025,
    status: "Pending",
    description: "Website redesign project completion bonus",
  },
]

export default function PayrollModule() {
  const [activeTab, setActiveTab] = useState("salary-structure")
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [salaryStructure, setSalaryStructure] = useState(null)
  const [employeeLoans, setEmployeeLoans] = useState([])
  const [employeeIncentives, setEmployeeIncentives] = useState([])
  const [currentMonth, setCurrentMonth] = useState("May")
  const [currentYear, setCurrentYear] = useState(2025)
  const [showPayslipPreview, setShowPayslipPreview] = useState(false)
  const [showAddLoanForm, setShowAddLoanForm] = useState(false)
  const [showAddIncentiveForm, setShowAddIncentiveForm] = useState(false)
  const [newLoan, setNewLoan] = useState({
    loanType: "Personal Loan",
    amount: "",
    interestRate: "",
    tenure: "",
    startDate: "",
  })
  const [newIncentive, setNewIncentive] = useState({
    type: "Performance Bonus",
    amount: "",
    description: "",
  })

  // Load employee data when selected
  useEffect(() => {
    if (selectedEmployee) {
      // Find salary structure for selected employee
      const structure = mockSalaryStructures.find((s) => s.employeeId === selectedEmployee.id)
      setSalaryStructure(structure || null)

      // Find loans for selected employee
      const loans = mockLoans.filter((loan) => loan.employeeId === selectedEmployee.id)
      setEmployeeLoans(loans)

      // Find incentives for selected employee
      const incentives = mockIncentives.filter((inc) => inc.employeeId === selectedEmployee.id)
      setEmployeeIncentives(incentives)
    } else {
      setSalaryStructure(null)
      setEmployeeLoans([])
      setEmployeeIncentives([])
    }
  }, [selectedEmployee])

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee)
  }

  const handleAddLoan = (e) => {
    e.preventDefault()
    // In a real app, you would send this data to your backend
    console.log("Adding new loan:", newLoan)
    setShowAddLoanForm(false)
    // Reset form
    setNewLoan({
      loanType: "Personal Loan",
      amount: "",
      interestRate: "",
      tenure: "",
      startDate: "",
    })
  }

  const handleAddIncentive = (e) => {
    e.preventDefault()
    // In a real app, you would send this data to your backend
    console.log("Adding new incentive:", newIncentive)
    setShowAddIncentiveForm(false)
    // Reset form
    setNewIncentive({
      type: "Performance Bonus",
      amount: "",
      description: "",
    })
  }

  const generatePayslip = () => {
    // In a real app, you would generate the payslip here
    console.log("Generating payslip for:", selectedEmployee)
    setShowPayslipPreview(true)
  }

  const sendPayslipEmail = () => {
    // In a real app, you would send the email here
    console.log("Sending payslip email to:", selectedEmployee)
    alert(`Payslip email sent to ${selectedEmployee.name}`)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="p-4 max-w-7xl mx-auto bg-black/90 border-r border-purple-700/30 backdrop-blur-md rounded-lg shadow-md text-white">
      <h1 className="text-2xl font-bold mb-6 text-white">Payroll Management</h1>

      {/* Employee Selection */}
      <div className="mb-6 bg-black/60 p-4 rounded-lg border border-purple-700/30">
        <h2 className="text-lg font-medium mb-3">Select Employee</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="employee-select" className="block mb-2 text-sm text-gray-400">
              Employee
            </label>
            <select
              id="employee-select"
              className="w-full p-2 rounded bg-black/60 border border-purple-700/50 text-white"
              onChange={(e) => {
                const empId = Number.parseInt(e.target.value)
                const employee = mockEmployees.find((emp) => emp.id === empId)
                handleEmployeeSelect(employee)
              }}
              value={selectedEmployee?.id || ""}
            >
              <option value="">Select an employee</option>
              {mockEmployees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name} - {emp.designation}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="payroll-period" className="block mb-2 text-sm text-gray-400">
              Payroll Period
            </label>
            <div className="flex gap-2">
              <select
                id="payroll-month"
                className="w-full p-2 rounded bg-black/60 border border-purple-700/50 text-white"
                value={currentMonth}
                onChange={(e) => setCurrentMonth(e.target.value)}
              >
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                id="payroll-year"
                className="w-full p-2 rounded bg-black/60 border border-purple-700/50 text-white"
                value={currentYear}
                onChange={(e) => setCurrentYear(Number.parseInt(e.target.value))}
              >
                {[2023, 2024, 2025, 2026, 2027].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <ul className="flex flex-wrap text-sm font-medium text-center border-b border-purple-700/30">
          <li className="mr-2">
            <a
              href="#"
              className={`inline-block p-4 rounded-t-lg ${activeTab === "salary-structure" ? "bg-purple-900/40 text-white border-b-2 border-purple-500" : "text-gray-400 hover:text-white hover:bg-purple-900/20"}`}
              onClick={(e) => {
                e.preventDefault()
                setActiveTab("salary-structure")
              }}
            >
              Salary Structure
            </a>
          </li>
          <li className="mr-2">
            <a
              href="#"
              className={`inline-block p-4 rounded-t-lg ${activeTab === "loans-advances" ? "bg-purple-900/40 text-white border-b-2 border-purple-500" : "text-gray-400 hover:text-white hover:bg-purple-900/20"}`}
              onClick={(e) => {
                e.preventDefault()
                setActiveTab("loans-advances")
              }}
            >
              Loans & Advances
            </a>
          </li>
          <li className="mr-2">
            <a
              href="#"
              className={`inline-block p-4 rounded-t-lg ${activeTab === "incentives" ? "bg-purple-900/40 text-white border-b-2 border-purple-500" : "text-gray-400 hover:text-white hover:bg-purple-900/20"}`}
              onClick={(e) => {
                e.preventDefault()
                setActiveTab("incentives")
              }}
            >
              Incentives
            </a>
          </li>
          <li className="mr-2">
            <a
              href="#"
              className={`inline-block p-4 rounded-t-lg ${activeTab === "payslip" ? "bg-purple-900/40 text-white border-b-2 border-purple-500" : "text-gray-400 hover:text-white hover:bg-purple-900/20"}`}
              onClick={(e) => {
                e.preventDefault()
                setActiveTab("payslip")
              }}
            >
              Payslip
            </a>
          </li>
          <li className="mr-2">
            <a
              href="#"
              className={`inline-block p-4 rounded-t-lg ${activeTab === "statutory" ? "bg-purple-900/40 text-white border-b-2 border-purple-500" : "text-gray-400 hover:text-white hover:bg-purple-900/20"}`}
              onClick={(e) => {
                e.preventDefault()
                setActiveTab("statutory")
              }}
            >
              Statutory Compliance
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`inline-block p-4 rounded-t-lg ${activeTab === "bank-advice" ? "bg-purple-900/40 text-white border-b-2 border-purple-500" : "text-gray-400 hover:text-white hover:bg-purple-900/20"}`}
              onClick={(e) => {
                e.preventDefault()
                setActiveTab("bank-advice")
              }}
            >
              Bank Advice
            </a>
          </li>
        </ul>
      </div>

      {/* Tab Content */}
      <div className="bg-black/60 p-4 rounded-lg border border-purple-700/30">
        {/* Salary Structure Tab */}
        {activeTab === "salary-structure" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Salary Structure</h2>
              {selectedEmployee && (
                <button
                  className="px-4 py-2 bg-purple-800 text-white rounded-md hover:bg-purple-700"
                  onClick={() => alert("Edit functionality would be implemented here")}
                >
                  Edit Structure
                </button>
              )}
            </div>

            {selectedEmployee ? (
              salaryStructure ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-md font-medium mb-3 border-b border-purple-700/30 pb-2">Earnings</h3>
                    <table className="w-full">
                      <tbody>
                        <tr>
                          <td className="py-2 text-gray-400">Basic Pay</td>
                          <td className="py-2 text-right">{formatCurrency(salaryStructure.basicPay)}</td>
                        </tr>
                        <tr>
                          <td className="py-2 text-gray-400">HRA</td>
                          <td className="py-2 text-right">{formatCurrency(salaryStructure.hra)}</td>
                        </tr>
                        <tr>
                          <td className="py-2 text-gray-400">Conveyance Allowance</td>
                          <td className="py-2 text-right">{formatCurrency(salaryStructure.conveyanceAllowance)}</td>
                        </tr>
                        <tr>
                          <td className="py-2 text-gray-400">Medical Allowance</td>
                          <td className="py-2 text-right">{formatCurrency(salaryStructure.medicalAllowance)}</td>
                        </tr>
                        <tr>
                          <td className="py-2 text-gray-400">Special Allowance</td>
                          <td className="py-2 text-right">{formatCurrency(salaryStructure.specialAllowance)}</td>
                        </tr>
                        <tr className="border-t border-purple-700/30">
                          <td className="py-2 font-medium">Total Earnings</td>
                          <td className="py-2 text-right font-medium">
                            {formatCurrency(salaryStructure.totalEarnings)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <h3 className="text-md font-medium mb-3 border-b border-purple-700/30 pb-2">Deductions</h3>
                    <table className="w-full">
                      <tbody>
                        <tr>
                          <td className="py-2 text-gray-400">Professional Tax</td>
                          <td className="py-2 text-right">{formatCurrency(salaryStructure.professionalTax)}</td>
                        </tr>
                        <tr>
                          <td className="py-2 text-gray-400">Income Tax (TDS)</td>
                          <td className="py-2 text-right">{formatCurrency(salaryStructure.incomeTax)}</td>
                        </tr>
                        <tr>
                          <td className="py-2 text-gray-400">Provident Fund</td>
                          <td className="py-2 text-right">{formatCurrency(salaryStructure.providentFund)}</td>
                        </tr>
                        <tr>
                          <td className="py-2 text-gray-400">Loan Deduction</td>
                          <td className="py-2 text-right">{formatCurrency(salaryStructure.loanDeduction)}</td>
                        </tr>
                        <tr className="border-t border-purple-700/30">
                          <td className="py-2 font-medium">Total Deductions</td>
                          <td className="py-2 text-right font-medium">
                            {formatCurrency(salaryStructure.totalDeductions)}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="mt-6 p-3 bg-purple-900/20 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-medium">Net Salary</span>
                        <span className="text-lg font-bold">{formatCurrency(salaryStructure.netSalary)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">No salary structure defined for this employee</p>
                  <button
                    className="mt-4 px-4 py-2 bg-purple-800 text-white rounded-md hover:bg-purple-700"
                    onClick={() => alert("Create structure functionality would be implemented here")}
                  >
                    Create Structure
                  </button>
                </div>
              )
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400">Please select an employee to view salary structure</p>
              </div>
            )}
          </div>
        )}

        {/* Loans & Advances Tab */}
        {activeTab === "loans-advances" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Loans & Advances</h2>
              {selectedEmployee && (
                <button
                  className="px-4 py-2 bg-purple-800 text-white rounded-md hover:bg-purple-700"
                  onClick={() => setShowAddLoanForm(true)}
                >
                  Add New Loan
                </button>
              )}
            </div>

            {selectedEmployee ? (
              employeeLoans.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-black/60 border border-purple-700/30">
                    <thead>
                      <tr className="bg-purple-900/20">
                        <th className="py-2 px-4 border-b border-purple-700/30 text-left">Loan Type</th>
                        <th className="py-2 px-4 border-b border-purple-700/30 text-left">Amount</th>
                        <th className="py-2 px-4 border-b border-purple-700/30 text-left">Interest</th>
                        <th className="py-2 px-4 border-b border-purple-700/30 text-left">EMI</th>
                        <th className="py-2 px-4 border-b border-purple-700/30 text-left">Start Date</th>
                        <th className="py-2 px-4 border-b border-purple-700/30 text-left">End Date</th>
                        <th className="py-2 px-4 border-b border-purple-700/30 text-left">Status</th>
                        <th className="py-2 px-4 border-b border-purple-700/30 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeeLoans.map((loan, index) => (
                        <tr key={loan.loanId} className={index % 2 === 0 ? "bg-purple-900/10" : "bg-black/60"}>
                          <td className="py-2 px-4 border-b border-purple-700/30">{loan.loanType}</td>
                          <td className="py-2 px-4 border-b border-purple-700/30">{formatCurrency(loan.amount)}</td>
                          <td className="py-2 px-4 border-b border-purple-700/30">{loan.interestRate}%</td>
                          <td className="py-2 px-4 border-b border-purple-700/30">{formatCurrency(loan.emiAmount)}</td>
                          <td className="py-2 px-4 border-b border-purple-700/30">{formatDate(loan.startDate)}</td>
                          <td className="py-2 px-4 border-b border-purple-700/30">{formatDate(loan.endDate)}</td>
                          <td className="py-2 px-4 border-b border-purple-700/30">
                            <span className="inline-block px-2 py-1 rounded-full text-xs bg-green-900/30 text-green-400">
                              {loan.status}
                            </span>
                          </td>
                          <td className="py-2 px-4 border-b border-purple-700/30">
                            <button
                              className="text-purple-400 hover:text-purple-300 mr-2"
                              onClick={() => alert(`View details for loan ${loan.loanId}`)}
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Loan Summary */}
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {employeeLoans.map((loan) => (
                      <div
                        key={`summary-${loan.loanId}`}
                        className="bg-black/60 p-4 rounded-lg border border-purple-700/30"
                      >
                        <h3 className="font-medium mb-2">{loan.loanType}</h3>
                        <div className="mb-4">
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-400">Paid</span>
                            <span>{formatCurrency(loan.paidAmount)}</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div
                              className="bg-purple-600 h-2.5 rounded-full"
                              style={{ width: `${(loan.paidAmount / loan.amount) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Remaining</span>
                          <span>{formatCurrency(loan.remainingAmount)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Monthly EMI</span>
                          <span>{formatCurrency(loan.emiAmount)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">No loans or advances for this employee</p>
                </div>
              )
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400">Please select an employee to view loans and advances</p>
              </div>
            )}

            {/* Add Loan Form Modal */}
            {showAddLoanForm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-black/90 border border-purple-700/30 p-6 rounded-lg max-w-md w-full">
                  <h3 className="text-xl font-bold mb-4">Add New Loan</h3>
                  <form onSubmit={handleAddLoan} className="space-y-4">
                    <div>
                      <label htmlFor="loan-type" className="block mb-2 text-sm text-gray-400">
                        Loan Type
                      </label>
                      <select
                        id="loan-type"
                        className="w-full p-2 rounded bg-black/60 border border-purple-700/50 text-white"
                        value={newLoan.loanType}
                        onChange={(e) => setNewLoan({ ...newLoan, loanType: e.target.value })}
                      >
                        <option value="Personal Loan">Personal Loan</option>
                        <option value="Home Loan">Home Loan</option>
                        <option value="Education Loan">Education Loan</option>
                        <option value="Vehicle Loan">Vehicle Loan</option>
                        <option value="Advance Salary">Advance Salary</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="loan-amount" className="block mb-2 text-sm text-gray-400">
                        Loan Amount
                      </label>
                      <input
                        type="number"
                        id="loan-amount"
                        className="w-full p-2 rounded bg-black/60 border border-purple-700/50 text-white"
                        value={newLoan.amount}
                        onChange={(e) => setNewLoan({ ...newLoan, amount: e.target.value })}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="interest-rate" className="block mb-2 text-sm text-gray-400">
                          Interest Rate (%)
                        </label>
                        <input
                          type="number"
                          id="interest-rate"
                          className="w-full p-2 rounded bg-black/60 border border-purple-700/50 text-white"
                          value={newLoan.interestRate}
                          onChange={(e) => setNewLoan({ ...newLoan, interestRate: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="tenure" className="block mb-2 text-sm text-gray-400">
                          Tenure (months)
                        </label>
                        <input
                          type="number"
                          id="tenure"
                          className="w-full p-2 rounded bg-black/60 border border-purple-700/50 text-white"
                          value={newLoan.tenure}
                          onChange={(e) => setNewLoan({ ...newLoan, tenure: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="start-date" className="block mb-2 text-sm text-gray-400">
                        Start Date
                      </label>
                      <input
                        type="date"
                        id="start-date"
                        className="w-full p-2 rounded bg-black/60 border border-purple-700/50 text-white"
                        value={newLoan.startDate}
                        onChange={(e) => setNewLoan({ ...newLoan, startDate: e.target.value })}
                        required
                      />
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        type="button"
                        className="px-4 py-2 border border-purple-700/50 rounded-lg text-white"
                        onClick={() => setShowAddLoanForm(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-600"
                      >
                        Add Loan
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Incentives Tab */}
        {activeTab === "incentives" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Incentives & Bonuses</h2>
              {selectedEmployee && (
                <button
                  className="px-4 py-2 bg-purple-800 text-white rounded-md hover:bg-purple-700"
                  onClick={() => setShowAddIncentiveForm(true)}
                >
                  Add Incentive
                </button>
              )}
            </div>

            {selectedEmployee ? (
              employeeIncentives.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-black/60 border border-purple-700/30">
                    <thead>
                      <tr className="bg-purple-900/20">
                        <th className="py-2 px-4 border-b border-purple-700/30 text-left">Type</th>
                        <th className="py-2 px-4 border-b border-purple-700/30 text-left">Amount</th>
                        <th className="py-2 px-4 border-b border-purple-700/30 text-left">Month/Year</th>
                        <th className="py-2 px-4 border-b border-purple-700/30 text-left">Description</th>
                        <th className="py-2 px-4 border-b border-purple-700/30 text-left">Status</th>
                        <th className="py-2 px-4 border-b border-purple-700/30 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeeIncentives.map((incentive, index) => (
                        <tr key={incentive.id} className={index % 2 === 0 ? "bg-purple-900/10" : "bg-black/60"}>
                          <td className="py-2 px-4 border-b border-purple-700/30">{incentive.type}</td>
                          <td className="py-2 px-4 border-b border-purple-700/30">
                            {formatCurrency(incentive.amount)}
                          </td>
                          <td className="py-2 px-4 border-b border-purple-700/30">
                            {incentive.month} {incentive.year}
                          </td>
                          <td className="py-2 px-4 border-b border-purple-700/30">{incentive.description}</td>
                          <td className="py-2 px-4 border-b border-purple-700/30">
                            <span
                              className={`inline-block px-2 py-1 rounded-full text-xs ${
                                incentive.status === "Approved"
                                  ? "bg-green-900/30 text-green-400"
                                  : incentive.status === "Rejected"
                                    ? "bg-red-900/30 text-red-400"
                                    : "bg-yellow-900/30 text-yellow-400"
                              }`}
                            >
                              {incentive.status}
                            </span>
                          </td>
                          <td className="py-2 px-4 border-b border-purple-700/30">
                            <button
                              className="text-purple-400 hover:text-purple-300 mr-2"
                              onClick={() => alert(`Edit incentive ${incentive.id}`)}
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">No incentives or bonuses for this employee</p>
                </div>
              )
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400">Please select an employee to view incentives</p>
              </div>
            )}

            {/* Add Incentive Form Modal */}
            {showAddIncentiveForm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-black/90 border border-purple-700/30 p-6 rounded-lg max-w-md w-full">
                  <h3 className="text-xl font-bold mb-4">Add New Incentive</h3>
                  <form onSubmit={handleAddIncentive} className="space-y-4">
                    <div>
                      <label htmlFor="incentive-type" className="block mb-2 text-sm text-gray-400">
                        Incentive Type
                      </label>
                      <select
                        id="incentive-type"
                        className="w-full p-2 rounded bg-black/60 border border-purple-700/50 text-white"
                        value={newIncentive.type}
                        onChange={(e) => setNewIncentive({ ...newIncentive, type: e.target.value })}
                      >
                        <option value="Performance Bonus">Performance Bonus</option>
                        <option value="Project Completion">Project Completion</option>
                        <option value="Quarterly Bonus">Quarterly Bonus</option>
                        <option value="Annual Bonus">Annual Bonus</option>
                        <option value="Referral Bonus">Referral Bonus</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="incentive-amount" className="block mb-2 text-sm text-gray-400">
                        Amount
                      </label>
                      <input
                        type="number"
                        id="incentive-amount"
                        className="w-full p-2 rounded bg-black/60 border border-purple-700/50 text-white"
                        value={newIncentive.amount}
                        onChange={(e) => setNewIncentive({ ...newIncentive, amount: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="incentive-description" className="block mb-2 text-sm text-gray-400">
                        Description
                      </label>
                      <textarea
                        id="incentive-description"
                        className="w-full p-2 rounded bg-black/60 border border-purple-700/50 text-white min-h-[80px]"
                        value={newIncentive.description}
                        onChange={(e) => setNewIncentive({ ...newIncentive, description: e.target.value })}
                        required
                      ></textarea>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        type="button"
                        className="px-4 py-2 border border-purple-700/50 rounded-lg text-white"
                        onClick={() => setShowAddIncentiveForm(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-600"
                      >
                        Add Incentive
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Payslip Tab */}
        {activeTab === "payslip" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Payslip Generation</h2>
              {selectedEmployee && (
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 bg-purple-800 text-white rounded-md hover:bg-purple-700"
                    onClick={generatePayslip}
                  >
                    Generate Payslip
                  </button>
                  <button
                    className="px-4 py-2 bg-black/60 border border-purple-700/50 text-white rounded-md hover:bg-black/80"
                    onClick={() => alert("Bulk generation would be implemented here")}
                  >
                    Bulk Generate
                  </button>
                </div>
              )}
            </div>

            {selectedEmployee ? (
              <div>
                <div className="mb-6">
                  <h3 className="text-md font-medium mb-3">Recent Payslips</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-black/60 border border-purple-700/30">
                      <thead>
                        <tr className="bg-purple-900/20">
                          <th className="py-2 px-4 border-b border-purple-700/30 text-left">Month/Year</th>
                          <th className="py-2 px-4 border-b border-purple-700/30 text-left">Generated On</th>
                          <th className="py-2 px-4 border-b border-purple-700/30 text-left">Status</th>
                          <th className="py-2 px-4 border-b border-purple-700/30 text-left">Email Sent</th>
                          <th className="py-2 px-4 border-b border-purple-700/30 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockPayslips
                          .filter((payslip) => payslip.employeeId === selectedEmployee.id)
                          .map((payslip, index) => (
                            <tr key={payslip.id} className={index % 2 === 0 ? "bg-purple-900/10" : "bg-black/60"}>
                              <td className="py-2 px-4 border-b border-purple-700/30">
                                {payslip.month} {payslip.year}
                              </td>
                              <td className="py-2 px-4 border-b border-purple-700/30">
                                {formatDate(payslip.generatedOn)}
                              </td>
                              <td className="py-2 px-4 border-b border-purple-700/30">
                                <span className="inline-block px-2 py-1 rounded-full text-xs bg-green-900/30 text-green-400">
                                  {payslip.status}
                                </span>
                              </td>
                              <td className="py-2 px-4 border-b border-purple-700/30">
                                {payslip.emailSent ? (
                                  <span className="inline-block px-2 py-1 rounded-full text-xs bg-green-900/30 text-green-400">
                                    Sent
                                  </span>
                                ) : (
                                  <span className="inline-block px-2 py-1 rounded-full text-xs bg-yellow-900/30 text-yellow-400">
                                    Not Sent
                                  </span>
                                )}
                              </td>
                              <td className="py-2 px-4 border-b border-purple-700/30">
                                <button
                                  className="text-purple-400 hover:text-purple-300 mr-2"
                                  onClick={() => setShowPayslipPreview(true)}
                                >
                                  View
                                </button>
                                <button
                                  className="text-purple-400 hover:text-purple-300 mr-2"
                                  onClick={() => alert("Download functionality would be implemented here")}
                                >
                                  Download
                                </button>
                                {!payslip.emailSent && (
                                  <button className="text-purple-400 hover:text-purple-300" onClick={sendPayslipEmail}>
                                    Send Email
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Payslip Preview */}
                {showPayslipPreview && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">Payslip</h3>
                          <p className="text-gray-600">
                            {currentMonth} {currentYear}
                          </p>
                        </div>
                        <button
                          className="text-gray-500 hover:text-gray-700"
                          onClick={() => setShowPayslipPreview(false)}
                        >
                          ✕
                        </button>
                      </div>

                      <div className="border-t border-b border-gray-200 py-4 mb-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-gray-800">Employee Details</h4>
                            <p className="text-gray-600">Name: {selectedEmployee.name}</p>
                            <p className="text-gray-600">Designation: {selectedEmployee.designation}</p>
                            <p className="text-gray-600">Department: {selectedEmployee.department}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">Company Details</h4>
                            <p className="text-gray-600">ABC Corporation</p>
                            <p className="text-gray-600">123 Business Park</p>
                            <p className="text-gray-600">contact@abccorp.com</p>
                          </div>
                        </div>
                      </div>

                      {salaryStructure && (
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-gray-800 mb-2">Earnings</h4>
                            <table className="w-full text-gray-800">
                              <tbody>
                                <tr className="border-b border-gray-200">
                                  <td className="py-2">Basic Pay</td>
                                  <td className="py-2 text-right">{formatCurrency(salaryStructure.basicPay)}</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                  <td className="py-2">HRA</td>
                                  <td className="py-2 text-right">{formatCurrency(salaryStructure.hra)}</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                  <td className="py-2">Conveyance Allowance</td>
                                  <td className="py-2 text-right">
                                    {formatCurrency(salaryStructure.conveyanceAllowance)}
                                  </td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                  <td className="py-2">Medical Allowance</td>
                                  <td className="py-2 text-right">
                                    {formatCurrency(salaryStructure.medicalAllowance)}
                                  </td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                  <td className="py-2">Special Allowance</td>
                                  <td className="py-2 text-right">
                                    {formatCurrency(salaryStructure.specialAllowance)}
                                  </td>
                                </tr>
                                <tr className="font-medium">
                                  <td className="py-2">Total Earnings</td>
                                  <td className="py-2 text-right">{formatCurrency(salaryStructure.totalEarnings)}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800 mb-2">Deductions</h4>
                            <table className="w-full text-gray-800">
                              <tbody>
                                <tr className="border-b border-gray-200">
                                  <td className="py-2">Professional Tax</td>
                                  <td className="py-2 text-right">{formatCurrency(salaryStructure.professionalTax)}</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                  <td className="py-2">Income Tax (TDS)</td>
                                  <td className="py-2 text-right">{formatCurrency(salaryStructure.incomeTax)}</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                  <td className="py-2">Provident Fund</td>
                                  <td className="py-2 text-right">{formatCurrency(salaryStructure.providentFund)}</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                  <td className="py-2">Loan Deduction</td>
                                  <td className="py-2 text-right">{formatCurrency(salaryStructure.loanDeduction)}</td>
                                </tr>
                                <tr className="font-medium">
                                  <td className="py-2">Total Deductions</td>
                                  <td className="py-2 text-right">{formatCurrency(salaryStructure.totalDeductions)}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-medium text-gray-800">Net Salary</span>
                          <span className="text-lg font-bold text-gray-800">
                            {salaryStructure ? formatCurrency(salaryStructure.netSalary) : "N/A"}
                          </span>
                        </div>
                      </div>

                      <div className="mt-6 flex justify-end gap-2">
                        <button
                          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                          onClick={() => setShowPayslipPreview(false)}
                        >
                          Close
                        </button>
                        <button
                          className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-600"
                          onClick={() => alert("Download functionality would be implemented here")}
                        >
                          Download PDF
                        </button>
                        <button
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                          onClick={sendPayslipEmail}
                        >
                          Send Email
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400">Please select an employee to manage payslips</p>
              </div>
            )}
          </div>
        )}

        {/* Statutory Compliance Tab */}
        {activeTab === "statutory" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Statutory Compliance</h2>
              <button
                className="px-4 py-2 bg-purple-800 text-white rounded-md hover:bg-purple-700"
                onClick={() => alert("Generate reports functionality would be implemented here")}
              >
                Generate Reports
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black/60 p-4 rounded-lg border border-purple-700/30">
                <h3 className="text-md font-medium mb-3 border-b border-purple-700/30 pb-2">Provident Fund (PF)</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Employee Contribution</span>
                    <span>{mockStatutorySettings.pf.employeeContribution}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Employer Contribution</span>
                    <span>{mockStatutorySettings.pf.employerContribution}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Wage Limit</span>
                    <span>{formatCurrency(mockStatutorySettings.pf.wageLimit)}</span>
                  </div>
                  <div className="mt-4">
                    <button
                      className="w-full px-4 py-2 bg-purple-800 text-white rounded-md hover:bg-purple-700"
                      onClick={() => alert("PF report generation would be implemented here")}
                    >
                      Generate PF Report
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-black/60 p-4 rounded-lg border border-purple-700/30">
                <h3 className="text-md font-medium mb-3 border-b border-purple-700/30 pb-2">
                  Employee State Insurance (ESI)
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Employee Contribution</span>
                    <span>{mockStatutorySettings.esi.employeeContribution}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Employer Contribution</span>
                    <span>{mockStatutorySettings.esi.employerContribution}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Wage Limit</span>
                    <span>{formatCurrency(mockStatutorySettings.esi.wageLimit)}</span>
                  </div>
                  <div className="mt-4">
                    <button
                      className="w-full px-4 py-2 bg-purple-800 text-white rounded-md hover:bg-purple-700"
                      onClick={() => alert("ESI report generation would be implemented here")}
                    >
                      Generate ESI Report
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-black/60 p-4 rounded-lg border border-purple-700/30">
                <h3 className="text-md font-medium mb-3 border-b border-purple-700/30 pb-2">
                  Tax Deducted at Source (TDS)
                </h3>
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Tax Slabs</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-purple-900/20">
                          <th className="py-2 px-4 border-b border-purple-700/30 text-left">Income Limit</th>
                          <th className="py-2 px-4 border-b border-purple-700/30 text-left">Tax Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockStatutorySettings.tds.slabs.map((slab, index) => (
                          <tr key={index} className={index % 2 === 0 ? "bg-purple-900/10" : "bg-black/60"}>
                            <td className="py-2 px-4 border-b border-purple-700/30">
                              {slab.limit === Number.POSITIVE_INFINITY
                                ? `Above ${formatCurrency(mockStatutorySettings.tds.slabs[index - 1].limit)}`
                                : index === 0
                                  ? `Up to ${formatCurrency(slab.limit)}`
                                  : `${formatCurrency(mockStatutorySettings.tds.slabs[index - 1].limit)} to ${formatCurrency(slab.limit)}`}
                            </td>
                            <td className="py-2 px-4 border-b border-purple-700/30">{slab.rate}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4">
                    <button
                      className="w-full px-4 py-2 bg-purple-800 text-white rounded-md hover:bg-purple-700"
                      onClick={() => alert("TDS report generation would be implemented here")}
                    >
                      Generate TDS Report
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-black/60 p-4 rounded-lg border border-purple-700/30">
                <h3 className="text-md font-medium mb-3 border-b border-purple-700/30 pb-2">Professional Tax (PT)</h3>
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">PT Slabs</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-purple-900/20">
                          <th className="py-2 px-4 border-b border-purple-700/30 text-left">Salary Range</th>
                          <th className="py-2 px-4 border-b border-purple-700/30 text-left">Tax Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockStatutorySettings.professionalTax.slabs.map((slab, index) => (
                          <tr key={index} className={index % 2 === 0 ? "bg-purple-900/10" : "bg-black/60"}>
                            <td className="py-2 px-4 border-b border-purple-700/30">
                              {slab.limit === Number.POSITIVE_INFINITY
                                ? `Above ${formatCurrency(mockStatutorySettings.professionalTax.slabs[index - 1].limit)}`
                                : index === 0
                                  ? `Up to ${formatCurrency(slab.limit)}`
                                  : `${formatCurrency(mockStatutorySettings.professionalTax.slabs[index - 1].limit)} to ${formatCurrency(slab.limit)}`}
                            </td>
                            <td className="py-2 px-4 border-b border-purple-700/30">{formatCurrency(slab.amount)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4">
                    <button
                      className="w-full px-4 py-2 bg-purple-800 text-white rounded-md hover:bg-purple-700"
                      onClick={() => alert("PT report generation would be implemented here")}
                    >
                      Generate PT Report
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-md font-medium mb-3">Compliance Calendar</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-black/60 border border-purple-700/30">
                  <thead>
                    <tr className="bg-purple-900/20">
                      <th className="py-2 px-4 border-b border-purple-700/30 text-left">Compliance Type</th>
                      <th className="py-2 px-4 border-b border-purple-700/30 text-left">Due Date</th>
                      <th className="py-2 px-4 border-b border-purple-700/30 text-left">Status</th>
                      <th className="py-2 px-4 border-b border-purple-700/30 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-purple-900/10">
                      <td className="py-2 px-4 border-b border-purple-700/30">PF Monthly Return</td>
                      <td className="py-2 px-4 border-b border-purple-700/30">15th May, 2025</td>
                      <td className="py-2 px-4 border-b border-purple-700/30">
                        <span className="inline-block px-2 py-1 rounded-full text-xs bg-yellow-900/30 text-yellow-400">
                          Pending
                        </span>
                      </td>
                      <td className="py-2 px-4 border-b border-purple-700/30">
                        <button className="text-purple-400 hover:text-purple-300">File Return</button>
                      </td>
                    </tr>
                    <tr className="bg-black/60">
                      <td className="py-2 px-4 border-b border-purple-700/30">ESI Monthly Return</td>
                      <td className="py-2 px-4 border-b border-purple-700/30">15th May, 2025</td>
                      <td className="py-2 px-4 border-b border-purple-700/30">
                        <span className="inline-block px-2 py-1 rounded-full text-xs bg-yellow-900/30 text-yellow-400">
                          Pending
                        </span>
                      </td>
                      <td className="py-2 px-4 border-b border-purple-700/30">
                        <button className="text-purple-400 hover:text-purple-300">File Return</button>
                      </td>
                    </tr>
                    <tr className="bg-purple-900/10">
                      <td className="py-2 px-4 border-b border-purple-700/30">TDS Quarterly Return</td>
                      <td className="py-2 px-4 border-b border-purple-700/30">30th June, 2025</td>
                      <td className="py-2 px-4 border-b border-purple-700/30">
                        <span className="inline-block px-2 py-1 rounded-full text-xs bg-green-900/30 text-green-400">
                          Completed
                        </span>
                      </td>
                      <td className="py-2 px-4 border-b border-purple-700/30">
                        <button className="text-purple-400 hover:text-purple-300">View Details</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Bank Advice Tab */}
        {activeTab === "bank-advice" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Bank Advice</h2>
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 bg-purple-800 text-white rounded-md hover:bg-purple-700"
                  onClick={() => alert("Generate bank advice functionality would be implemented here")}
                >
                  Generate Bank Advice
                </button>
                <button
                  className="px-4 py-2 bg-black/60 border border-purple-700/50 text-white rounded-md hover:bg-black/80"
                  onClick={() => alert("Export functionality would be implemented here")}
                >
                  Export
                </button>
              </div>
            </div>

            <div className="mb-6 bg-black/60 p-4 rounded-lg border border-purple-700/30">
              <h3 className="text-md font-medium mb-3">Bank Advice Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="bank-name" className="block mb-2 text-sm text-gray-400">
                    Bank Name
                  </label>
                  <select
                    id="bank-name"
                    className="w-full p-2 rounded bg-black/60 border border-purple-700/50 text-white"
                  >
                    <option value="">Select Bank</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="sbi">State Bank of India</option>
                    <option value="axis">Axis Bank</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="advice-date" className="block mb-2 text-sm text-gray-400">
                    Advice Date
                  </label>
                  <input
                    type="date"
                    id="advice-date"
                    className="w-full p-2 rounded bg-black/60 border border-purple-700/50 text-white"
                    defaultValue="2025-05-25"
                  />
                </div>
                <div>
                  <label htmlFor="advice-format" className="block mb-2 text-sm text-gray-400">
                    Format
                  </label>
                  <select
                    id="advice-format"
                    className="w-full p-2 rounded bg-black/60 border border-purple-700/50 text-white"
                  >
                    <option value="excel">Excel</option>
                    <option value="csv">CSV</option>
                    <option value="pdf">PDF</option>
                    <option value="txt">Text File</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-md font-medium mb-3">Salary Disbursement Summary</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-black/60 border border-purple-700/30">
                  <thead>
                    <tr className="bg-purple-900/20">
                      <th className="py-2 px-4 border-b border-purple-700/30 text-left">Employee</th>
                      <th className="py-2 px-4 border-b border-purple-700/30 text-left">Bank</th>
                      <th className="py-2 px-4 border-b border-purple-700/30 text-left">Account Number</th>
                      <th className="py-2 px-4 border-b border-purple-700/30 text-left">IFSC Code</th>
                      <th className="py-2 px-4 border-b border-purple-700/30 text-left">Net Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-purple-900/10">
                      <td className="py-2 px-4 border-b border-purple-700/30">John Doe</td>
                      <td className="py-2 px-4 border-b border-purple-700/30">HDFC Bank</td>
                      <td className="py-2 px-4 border-b border-purple-700/30">XXXX1234</td>
                      <td className="py-2 px-4 border-b border-purple-700/30">HDFC0001234</td>
                      <td className="py-2 px-4 border-b border-purple-700/30">{formatCurrency(71300)}</td>
                    </tr>
                    <tr className="bg-black/60">
                      <td className="py-2 px-4 border-b border-purple-700/30">Jane Smith</td>
                      <td className="py-2 px-4 border-b border-purple-700/30">ICICI Bank</td>
                      <td className="py-2 px-4 border-b border-purple-700/30">XXXX5678</td>
                      <td className="py-2 px-4 border-b border-purple-700/30">ICIC0005678</td>
                      <td className="py-2 px-4 border-b border-purple-700/30">{formatCurrency(65900)}</td>
                    </tr>
                    <tr className="bg-purple-900/10">
                      <td className="py-2 px-4 border-b border-purple-700/30">Robert Johnson</td>
                      <td className="py-2 px-4 border-b border-purple-700/30">SBI</td>
                      <td className="py-2 px-4 border-b border-purple-700/30">XXXX9012</td>
                      <td className="py-2 px-4 border-b border-purple-700/30">SBIN0009012</td>
                      <td className="py-2 px-4 border-b border-purple-700/30">{formatCurrency(82500)}</td>
                    </tr>
                    <tr className="bg-black/60">
                      <td className="py-2 px-4 border-b border-purple-700/30">Emily Davis</td>
                      <td className="py-2 px-4 border-b border-purple-700/30">Axis Bank</td>
                      <td className="py-2 px-4 border-b border-purple-700/30">XXXX3456</td>
                      <td className="py-2 px-4 border-b border-purple-700/30">UTIB0003456</td>
                      <td className="py-2 px-4 border-b border-purple-700/30">{formatCurrency(58700)}</td>
                    </tr>
                    <tr className="bg-purple-900/10">
                      <td className="py-2 px-4 border-b border-purple-700/30">Michael Wilson</td>
                      <td className="py-2 px-4 border-b border-purple-700/30">HDFC Bank</td>
                      <td className="py-2 px-4 border-b border-purple-700/30">XXXX7890</td>
                      <td className="py-2 px-4 border-b border-purple-700/30">HDFC0007890</td>
                      <td className="py-2 px-4 border-b border-purple-700/30">{formatCurrency(69200)}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="bg-purple-900/30">
                      <td className="py-2 px-4 border-b border-purple-700/30 font-medium" colSpan="4">
                        Total
                      </td>
                      <td className="py-2 px-4 border-b border-purple-700/30 font-medium">{formatCurrency(347600)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-black/60 p-4 rounded-lg border border-purple-700/30">
                  <h4 className="font-medium mb-2">Bank Transfer Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Employees</span>
                      <span>5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Amount</span>
                      <span>{formatCurrency(347600)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Transfer Date</span>
                      <span>30th May, 2025</span>
                    </div>
                  </div>
                </div>

                <div className="bg-black/60 p-4 rounded-lg border border-purple-700/30">
                  <h4 className="font-medium mb-2">Bank-wise Distribution</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">HDFC Bank</span>
                      <span>{formatCurrency(140500)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">ICICI Bank</span>
                      <span>{formatCurrency(65900)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">SBI</span>
                      <span>{formatCurrency(82500)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Axis Bank</span>
                      <span>{formatCurrency(58700)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-black/60 p-4 rounded-lg border border-purple-700/30">
                  <h4 className="font-medium mb-2">Actions</h4>
                  <div className="space-y-2">
                    <button className="w-full px-4 py-2 bg-purple-800 text-white rounded-md hover:bg-purple-700 mb-2">
                      Download Bank Advice
                    </button>
                    <button className="w-full px-4 py-2 bg-black/60 border border-purple-700/50 text-white rounded-md hover:bg-black/80">
                      Email to Finance
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
