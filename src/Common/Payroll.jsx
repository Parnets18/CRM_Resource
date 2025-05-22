"use client"

import React, { useState, useEffect } from "react";
import { 
  DollarSign, 
  Calendar, 
  Download, 
  Search, 
  Filter, 
  ChevronDown, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Users
} from "lucide-react";

// Mock data for payroll
const payrollData = [
  { id: 1, employee: "Rahul Sharma", department: "Engineering", salary: 85000, bonus: 5000, deductions: 12500, netPay: 77500, status: "Paid", date: "2023-05-31" },
  { id: 2, employee: "Priya Patel", department: "HR", salary: 75000, bonus: 3000, deductions: 10000, netPay: 68000, status: "Paid", date: "2023-05-31" },
  { id: 3, employee: "Amit Kumar", department: "Finance", salary: 90000, bonus: 7000, deductions: 15000, netPay: 82000, status: "Paid", date: "2023-05-31" },
  { id: 4, employee: "Sneha Reddy", department: "Marketing", salary: 70000, bonus: 4000, deductions: 11000, netPay: 63000, status: "Paid", date: "2023-05-31" },
  { id: 5, employee: "Rajesh Kumar", department: "IT", salary: 80000, bonus: 6000, deductions: 13000, netPay: 73000, status: "Paid", date: "2023-05-31" },
  { id: 6, employee: "Nisha Sharma", department: "Admin", salary: 65000, bonus: 2000, deductions: 8000, netPay: 59000, status: "Paid", date: "2023-05-31" },
  { id: 7, employee: "Vikram Singh", department: "Sales", salary: 78000, bonus: 4500, deductions: 10500, netPay: 67500, status: "Paid", date: "2023-05-31" },
  { id: 8, employee: "Kavita Patel", department: "Operations", salary: 68000, bonus: 3500, deductions: 9500, netPay: 58500, status: "Paid", date: "2023-05-31" },
  { id: 9, employee: "Rohit Verma", department: "Product", salary: 82000, bonus: 6500, deductions: 14000, netPay: 74000, status: "Paid", date: "2023-05-31" },
  { id: 10, employee: "Sunita Sharma", department: "Customer Support", salary: 60000, bonus: 2500, deductions: 7500, netPay: 54500, status: "Paid", date: "2023-05-31" },
];

// Add payrollStats data
const payrollStats = [
  { title: "Total Salary", value: "₹7,53,000", period: "May 2025", icon: DollarSign },
  { title: "Total Employees", value: "45", period: "Active", icon: Users },
  { title: "Payroll Date", value: "30th", period: "May 2025", icon: Calendar },
  { title: "Payslips", value: "45", period: "Generated", icon: FileText },
];

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
    <div className="bg-white min-h-screen p-6 text-black">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Payroll Management</h1>
        <p className="text-gray-600">Manage employee salaries, deductions, and payments</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {payrollStats.map((stat, index) => (
          <div key={index} className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
            <div className="flex items-center mb-2">
              <div className="p-2 bg-gray-100 rounded-full mr-3">
                <stat.icon className="h-5 w-5 text-gray-600" />
              </div>
              <span className="text-black font-medium">{stat.title}</span>
            </div>
            <div className="text-2xl font-bold text-black">{stat.value}</div>
            <div className="text-sm text-gray-600 mt-1">{stat.period}</div>
          </div>
        ))}
      </div>

      {/* Bank details section */}
      <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm mb-8">
        <h3 className="font-medium mb-3 text-black">Bank Disbursements</h3>
        <div className="space-y-2">
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

      {/* Actions section */}
      <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
        <h4 className="font-medium mb-2 text-black">Actions</h4>
        <div className="space-y-2">
          <button className="w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 mb-2">
            Download Bank Advice
          </button>
          <button className="w-full px-4 py-2 bg-white border border-gray-300 text-black rounded-md hover:bg-gray-50">
            Email to Finance
          </button>
        </div>
      </div>
    </div>
  )
}
