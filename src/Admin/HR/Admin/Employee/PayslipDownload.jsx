
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Nav from "@/Admin/Nav"
import {
  Download,
  Eye,
  Calendar,
  DollarSign,
  Search,
  FileText,
  Clock,
  Building,
  CreditCard,
  Printer,
  HardHat,
} from "lucide-react"

export default function ConstructionPayslipDownload() {
  const [payslips, setPayslips] = useState([])
  const [filteredPayslips, setFilteredPayslips] = useState([])
  const [selectedPayslip, setSelectedPayslip] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterYear, setFilterYear] = useState("all")
  const [loading, setLoading] = useState(false)

  // Construction Company Details
  const companyDetails = {
    name: "BuildTech Construction Pvt Ltd",
    address: "Plot No. 45, Industrial Area, Sector 18, Gurgaon, Haryana - 122015",
    phone: "+91-124-4567-890",
    email: "hr@buildtechconstruction.com",
    website: "www.buildtechconstruction.com",
    cin: "U45200HR2018PTC075432",
    pan: "AABCT5678D",
    logo: "🏗️",
  }

  // Current Employee Data - Construction Worker
  const currentEmployee = {
    id: "EMP001",
    name: "Rajesh Kumar Singh",
    position: "Site Supervisor",
    department: "Site Operations",
    employeeId: "BTC-2023-001",
    panNumber: "ABCDE1234F",
    aadhaarNumber: "1234-5678-9012",
    uanNumber: "123456789012",
    esiNumber: "1234567890",
    bankAccount: "1234567890123456",
    bankName: "State Bank of India",
    ifscCode: "SBIN0001234",
    joinDate: "2023-01-15",
    ctc: 480000,
  }

  // Initialize comprehensive payslips data for construction
  useEffect(() => {
    const mockPayslips = [
      {
        id: 1,
        month: "December",
        year: 2024,
        period: "Dec 01 - Dec 31, 2024",
        payDate: "2024-12-31",
        workingDays: 31,
        presentDays: 30,
        leavesTaken: 1,
        overtimeHours: 20,
        siteLocation: "Cyber City Phase 2",
        earnings: {
          basicSalary: 25000,
          hra: 10000,
          da: 1250,
          conveyanceAllowance: 1600,
          medicalAllowance: 1250,
          siteAllowance: 3000,
          overtimePay: 2500,
          safetyBonus: 1500,
          attendanceBonus: 1000,
          totalEarnings: 47100,
        },
        deductions: {
          pf: 3000,
          professionalTax: 200,
          esi: 354,
          incomeTax: 2500,
          loanEmi: 3000,
          uniformCharges: 200,
          safetyEquipmentCharges: 150,
          otherDeductions: 100,
          totalDeductions: 9504,
        },
        netSalary: 37596,
        status: "Generated",
        generatedDate: "2024-12-31",
        downloadCount: 2,
      },
      {
        id: 2,
        month: "November",
        year: 2024,
        period: "Nov 01 - Nov 30, 2024",
        payDate: "2024-11-30",
        workingDays: 30,
        presentDays: 29,
        leavesTaken: 1,
        overtimeHours: 25,
        siteLocation: "Cyber City Phase 2",
        earnings: {
          basicSalary: 25000,
          hra: 10000,
          da: 1250,
          conveyanceAllowance: 1600,
          medicalAllowance: 1250,
          siteAllowance: 3000,
          overtimePay: 3125,
          safetyBonus: 2000,
          attendanceBonus: 800,
          totalEarnings: 48025,
        },
        deductions: {
          pf: 3000,
          professionalTax: 200,
          esi: 360,
          incomeTax: 2800,
          loanEmi: 3000,
          uniformCharges: 0,
          safetyEquipmentCharges: 0,
          otherDeductions: 50,
          totalDeductions: 9410,
        },
        netSalary: 38615,
        status: "Generated",
        generatedDate: "2024-11-30",
        downloadCount: 3,
      },
      {
        id: 3,
        month: "October",
        year: 2024,
        period: "Oct 01 - Oct 31, 2024",
        payDate: "2024-10-31",
        workingDays: 31,
        presentDays: 31,
        leavesTaken: 0,
        overtimeHours: 15,
        siteLocation: "Cyber City Phase 2",
        earnings: {
          basicSalary: 25000,
          hra: 10000,
          da: 1250,
          conveyanceAllowance: 1600,
          medicalAllowance: 1250,
          siteAllowance: 3000,
          overtimePay: 1875,
          safetyBonus: 2500,
          attendanceBonus: 1200,
          totalEarnings: 47675,
        },
        deductions: {
          pf: 3000,
          professionalTax: 200,
          esi: 358,
          incomeTax: 2600,
          loanEmi: 3000,
          uniformCharges: 500,
          safetyEquipmentCharges: 300,
          otherDeductions: 75,
          totalDeductions: 10033,
        },
        netSalary: 37642,
        status: "Generated",
        generatedDate: "2024-10-31",
        downloadCount: 1,
      },
    ]

    setPayslips(mockPayslips)
    setFilteredPayslips(mockPayslips)
  }, [])

  // Filter payslips
  useEffect(() => {
    let filtered = payslips

    if (searchTerm) {
      filtered = filtered.filter(
        (payslip) =>
          payslip.month.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payslip.year.toString().includes(searchTerm) ||
          payslip.siteLocation.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (filterYear !== "all") {
      filtered = filtered.filter((payslip) => payslip.year.toString() === filterYear)
    }

    setFilteredPayslips(filtered)
  }, [searchTerm, filterYear, payslips])

  // Generate comprehensive construction payslip content
  const generatePayslipContent = (payslip) => {
    return `
═══════════════════════════════════════════════════════════════
                    CONSTRUCTION SALARY SLIP
═══════════════════════════════════════════════════════════════

COMPANY DETAILS:
${companyDetails.name}
${companyDetails.address}
Phone: ${companyDetails.phone} | Email: ${companyDetails.email}
CIN: ${companyDetails.cin} | PAN: ${companyDetails.pan}

EMPLOYEE DETAILS:
Name: ${currentEmployee.name}
Employee ID: ${currentEmployee.employeeId}
Designation: ${currentEmployee.position}
Department: ${currentEmployee.department}
Site Location: ${payslip.siteLocation}
PAN: ${currentEmployee.panNumber}
UAN: ${currentEmployee.uanNumber}
ESI No: ${currentEmployee.esiNumber}

SALARY PERIOD: ${payslip.period}
PAY DATE: ${payslip.payDate}
WORKING DAYS: ${payslip.workingDays}
PRESENT DAYS: ${payslip.presentDays}
OVERTIME HOURS: ${payslip.overtimeHours}

EARNINGS:                                    DEDUCTIONS:
Basic Salary      ₹${payslip.earnings.basicSalary.toLocaleString().padStart(10)}    Provident Fund    ₹${payslip.deductions.pf.toLocaleString().padStart(10)}
HRA              ₹${payslip.earnings.hra.toLocaleString().padStart(10)}    Professional Tax  ₹${payslip.deductions.professionalTax.toLocaleString().padStart(10)}
Dearness Allow.  ₹${payslip.earnings.da.toLocaleString().padStart(10)}    ESI              ₹${payslip.deductions.esi.toLocaleString().padStart(10)}
Conveyance       ₹${payslip.earnings.conveyanceAllowance.toLocaleString().padStart(10)}    Income Tax       ₹${payslip.deductions.incomeTax.toLocaleString().padStart(10)}
Medical Allow.   ₹${payslip.earnings.medicalAllowance.toLocaleString().padStart(10)}    Loan EMI         ₹${payslip.deductions.loanEmi.toLocaleString().padStart(10)}
Site Allowance   ₹${payslip.earnings.siteAllowance.toLocaleString().padStart(10)}    Uniform Charges  ₹${payslip.deductions.uniformCharges.toLocaleString().padStart(10)}
Overtime Pay     ₹${payslip.earnings.overtimePay.toLocaleString().padStart(10)}    Safety Equipment ₹${payslip.deductions.safetyEquipmentCharges.toLocaleString().padStart(10)}
Safety Bonus     ₹${payslip.earnings.safetyBonus.toLocaleString().padStart(10)}    Other Deductions ₹${payslip.deductions.otherDeductions.toLocaleString().padStart(10)}
Attendance Bonus ₹${payslip.earnings.attendanceBonus.toLocaleString().padStart(10)}

TOTAL EARNINGS   ₹${payslip.earnings.totalEarnings.toLocaleString().padStart(10)}    TOTAL DEDUCTIONS ₹${payslip.deductions.totalDeductions.toLocaleString().padStart(10)}

NET SALARY: ₹${payslip.netSalary.toLocaleString()}

BANK DETAILS:
Bank: ${currentEmployee.bankName}
Account: ${currentEmployee.bankAccount}
IFSC: ${currentEmployee.ifscCode}

This is a computer-generated payslip and does not require signature.
Generated on: ${new Date().toLocaleDateString()}
    `
  }

  // Handle download
  const handleDownload = async (payslip) => {
    setLoading(true)

    setTimeout(() => {
      const updatedPayslips = payslips.map((p) =>
        p.id === payslip.id ? { ...p, downloadCount: p.downloadCount + 1 } : p,
      )
      setPayslips(updatedPayslips)

      const element = document.createElement("a")
      const fileContent = generatePayslipContent(payslip)
      const file = new Blob([fileContent], { type: "text/plain" })
      element.href = URL.createObjectURL(file)
      element.download = `Payslip_${payslip.month}_${payslip.year}_${currentEmployee.employeeId}.txt`
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)

      setLoading(false)
    }, 1500)
  }

  const handlePreview = (payslip) => {
    setSelectedPayslip(payslip)
  }

  const closePreview = () => {
    setSelectedPayslip(null)
  }

  const getUniqueYears = () => {
    const years = [...new Set(payslips.map((p) => p.year))]
    return years.sort((a, b) => b - a)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 p-6 ml-64">
      <Nav />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl">{companyDetails.logo}</div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Construction Payslip Management</h1>
              <p className="text-gray-600">{companyDetails.name}</p>
            </div>
          </div>
        </div>

        {/* Employee Info Card */}
        <Card className="mb-6 border-blue-200 bg-white/90 backdrop-blur-sm shadow-lg">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <HardHat className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{currentEmployee.name}</h2>
                  <p className="text-gray-600">{currentEmployee.position}</p>
                  <p className="text-sm text-gray-500">{currentEmployee.employeeId}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{currentEmployee.department}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">PAN: {currentEmployee.panNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">UAN: {currentEmployee.uanNumber}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Annual CTC</p>
                  <p className="text-2xl font-bold text-blue-600">₹{currentEmployee.ctc.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Joined</p>
                  <p className="font-medium">{new Date(currentEmployee.joinDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by month, year, or site location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterYear} onValueChange={setFilterYear}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {getUniqueYears().map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Payslips Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPayslips.map((payslip) => (
            <Card
              key={payslip.id}
              className="border-blue-200 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span className="text-lg">
                      {payslip.month} {payslip.year}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {payslip.downloadCount} downloads
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Period: {payslip.period}</p>
                  <p>Site: {payslip.siteLocation}</p>
                  <p>Pay Date: {new Date(payslip.payDate).toLocaleDateString()}</p>
                  <p>
                    Working Days: {payslip.presentDays}/{payslip.workingDays}
                  </p>
                  <p>Overtime Hours: {payslip.overtimeHours}</p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Net Salary</span>
                    <DollarSign className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-blue-600">₹{payslip.netSalary.toLocaleString()}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-xs text-green-600 font-medium">Total Earnings</p>
                    <p className="text-lg font-bold text-green-700">
                      ₹{payslip.earnings.totalEarnings.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg">
                    <p className="text-xs text-red-600 font-medium">Total Deductions</p>
                    <p className="text-lg font-bold text-red-700">
                      ₹{payslip.deductions.totalDeductions.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={() => handlePreview(payslip)}
                    variant="outline"
                    size="sm"
                    className="flex-1 border-blue-200 hover:bg-blue-50"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Preview
                  </Button>
                  <Button
                    onClick={() => handleDownload(payslip)}
                    disabled={loading}
                    size="sm"
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    {loading ? "Downloading..." : "Download"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPayslips.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-500 mb-2">No payslips found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Enhanced Preview Modal */}
        {selectedPayslip && (
          <Dialog open={!!selectedPayslip} onOpenChange={closePreview}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Payslip - {selectedPayslip.month} {selectedPayslip.year}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Company Header */}
                <div className="text-center border-b pb-4">
                  <h2 className="text-2xl font-bold text-gray-800">{companyDetails.name}</h2>
                  <p className="text-gray-600">{companyDetails.address}</p>
                  <p className="text-sm text-gray-500">
                    Phone: {companyDetails.phone} | Email: {companyDetails.email}
                  </p>
                </div>

                {/* Employee & Period Info */}
                <div className="grid grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Employee Details</h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Name:</span> {currentEmployee.name}
                      </p>
                      <p>
                        <span className="font-medium">Employee ID:</span> {currentEmployee.employeeId}
                      </p>
                      <p>
                        <span className="font-medium">Designation:</span> {currentEmployee.position}
                      </p>
                      <p>
                        <span className="font-medium">Department:</span> {currentEmployee.department}
                      </p>
                      <p>
                        <span className="font-medium">Site Location:</span> {selectedPayslip.siteLocation}
                      </p>
                      <p>
                        <span className="font-medium">PAN:</span> {currentEmployee.panNumber}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Pay Period</h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Period:</span> {selectedPayslip.period}
                      </p>
                      <p>
                        <span className="font-medium">Pay Date:</span> {selectedPayslip.payDate}
                      </p>
                      <p>
                        <span className="font-medium">Working Days:</span> {selectedPayslip.workingDays}
                      </p>
                      <p>
                        <span className="font-medium">Present Days:</span> {selectedPayslip.presentDays}
                      </p>
                      <p>
                        <span className="font-medium">Leaves Taken:</span> {selectedPayslip.leavesTaken}
                      </p>
                      <p>
                        <span className="font-medium">Overtime Hours:</span> {selectedPayslip.overtimeHours}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Earnings & Deductions */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-3">Earnings</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Basic Salary</span>
                        <span>₹{selectedPayslip.earnings.basicSalary.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>House Rent Allowance</span>
                        <span>₹{selectedPayslip.earnings.hra.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Dearness Allowance</span>
                        <span>₹{selectedPayslip.earnings.da.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Conveyance Allowance</span>
                        <span>₹{selectedPayslip.earnings.conveyanceAllowance.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Medical Allowance</span>
                        <span>₹{selectedPayslip.earnings.medicalAllowance.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Site Allowance</span>
                        <span>₹{selectedPayslip.earnings.siteAllowance.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Overtime Pay</span>
                        <span>₹{selectedPayslip.earnings.overtimePay.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Safety Bonus</span>
                        <span>₹{selectedPayslip.earnings.safetyBonus.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Attendance Bonus</span>
                        <span>₹{selectedPayslip.earnings.attendanceBonus.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-semibold border-t pt-2 text-green-700">
                        <span>Total Earnings</span>
                        <span>₹{selectedPayslip.earnings.totalEarnings.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-3">Deductions</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Provident Fund</span>
                        <span>₹{selectedPayslip.deductions.pf.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Professional Tax</span>
                        <span>₹{selectedPayslip.deductions.professionalTax.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ESI</span>
                        <span>₹{selectedPayslip.deductions.esi.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Income Tax (TDS)</span>
                        <span>₹{selectedPayslip.deductions.incomeTax.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Loan EMI</span>
                        <span>₹{selectedPayslip.deductions.loanEmi.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Uniform Charges</span>
                        <span>₹{selectedPayslip.deductions.uniformCharges.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Safety Equipment</span>
                        <span>₹{selectedPayslip.deductions.safetyEquipmentCharges.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Other Deductions</span>
                        <span>₹{selectedPayslip.deductions.otherDeductions.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-semibold border-t pt-2 text-red-700">
                        <span>Total Deductions</span>
                        <span>₹{selectedPayslip.deductions.totalDeductions.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Net Salary */}
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <h4 className="font-semibold text-blue-800 mb-2">Net Salary (Take Home)</h4>
                  <p className="text-3xl font-bold text-blue-600">₹{selectedPayslip.netSalary.toLocaleString()}</p>
                </div>

                {/* Bank Details */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Bank Details</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Bank:</span> {currentEmployee.bankName}
                    </div>
                    <div>
                      <span className="font-medium">Account:</span> {currentEmployee.bankAccount}
                    </div>
                    <div>
                      <span className="font-medium">IFSC:</span> {currentEmployee.ifscCode}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    onClick={() => handleDownload(selectedPayslip)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Payslip
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Printer className="w-4 h-4 mr-2" />
                    Print
                  </Button>
                  <Button onClick={closePreview} variant="outline" className="flex-1">
                    Close
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}
