// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { motion } from "framer-motion";
// import Nav from "../../Nav";

// // ...existing code...
// export default function ConfigPage() {
//   return (
//     <div className="min-h-screen  lg:ml-64">
//       <div className="absolute inset-0 z-0">
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-gray-900 to-black"></div>
//         <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-600/10 to-transparent"></div>
//       </div>

//       <div className="relative z-10 flex">
//         <Nav />

//         <div className="flex-1 p-8 mt-16 md:mt-0">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//             className="space-y-8 max-w-4xl mx-auto"
//           >
//             {/* Salary Structure Card */}
//             <Card className=" bg-white backdrop-blur-sm">
//               <CardHeader>
//                 <CardTitle className="text-white"> {/* keep white for title for contrast */}
//                   Salary Structure Configuration
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <form className="space-y-6">
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     <div className="space-y-2">
//                       <Label className="text-black">Base Salary</Label>
//                       <Input
//                         type="number"
//                         className=" text-black"
//                         placeholder="Enter base salary"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label className="text-black">Bonus Percentage</Label>
//                       <Input
//                         type="number"
//                         className=" text-black"
//                         placeholder="Enter bonus %"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label className="text-black">Tax Deduction</Label>
//                       <Select>
//                         <SelectTrigger className=" text-black">
//                           <SelectValue placeholder="Select tax regime" />
//                         </SelectTrigger>
//                         <SelectContent className=" text-black">
//                           <SelectItem value="new">New Tax Regime</SelectItem>
//                           <SelectItem value="old">Old Tax Regime</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <Label className="text-black">Allowances</Label>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                       {["HRA", "Travel", "Medical"].map((allowance, index) => (
//                         <div
//                           key={index}
//                           className="flex items-center space-x-2 bg-gray-100 p-3 rounded-lg"
//                         >
//                           <Input
//                             type="number"
//                             className=" text-black flex-1"
//                             placeholder={`${allowance} Amount`}
//                           />
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </form>
//               </CardContent>
//             </Card>

//             {/* Leave Policy Card */}
//             <Card className=" bg-white backdrop-blur-sm">
//               <CardHeader>
//                 <CardTitle className="text-white">
//                   Leave Policy Configuration
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-2">
//                       <Label className="text-black">Annual Leave Days</Label>
//                       <Input
//                         type="number"
//                         className=" text-black"
//                         placeholder="Enter days"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label className="text-black">Sick Leave Days</Label>
//                       <Input
//                         type="number"
//                         className=" text-black"
//                         placeholder="Enter days"
//                       />
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <Label className="text-black">Leave Accrual Rate</Label>
//                     <div className="flex items-center space-x-2">
//                       <Input
//                         type="number"
//                         className=" text-black"
//                         placeholder="Accrual rate"
//                       />
//                       <span className="text-gray-400">days per month</span>
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <Label className="text-black">Leave Carry Forward</Label>
//                     <Select>
//                       <SelectTrigger className=" text-black">
//                         <SelectValue placeholder="Select carry forward policy" />
//                       </SelectTrigger>
//                       <SelectContent className=" text-black">
//                         <SelectItem value="unlimited">Unlimited</SelectItem>
//                         <SelectItem value="limited">
//                           Limited Carry Forward
//                         </SelectItem>
//                         <SelectItem value="none">No Carry Forward</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Attendance Policy Card */}
//             <Card className=" bg-white backdrop-blur-sm">
//               <CardHeader>
//                 <CardTitle className="text-white">Attendance Policy</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-2">
//                       <Label className="text-black">Working Hours</Label>
//                       <div className="flex gap-2">
//                         <Input
//                           type="time"
//                           className=" text-black"
//                         />
//                         <Input
//                           type="time"
//                           className=" text-black"
//                         />
//                       </div>
//                     </div>
//                     <div className="space-y-2">
//                       <Label className="text-black">Late Penalty</Label>
//                       <div className="flex items-center space-x-2">
//                         <Input
//                           type="number"
//                           className=" text-black"
//                           placeholder="Grace period (mins)"
//                         />
//                         <Input
//                           type="number"
//                           className=" text-black"
//                           placeholder="Penalty amount"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <Label className="text-black">Remote Work Policy</Label>
//                     <div className="flex items-center space-x-4">
//                       <div className="flex items-center space-x-2">
//                         <input
//                           type="checkbox"
//                           className="form-checkbox text-purple-500   cursor-pointer"
//                         />
//                         <span className="text-black">Allow Remote Work</span>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <input
//                           type="checkbox"
//                           className="form-checkbox text-purple-500   cursor-pointer"
//                         />
//                         <span className="text-black">Hybrid Model</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <Label className="text-black">Overtime Policy</Label>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                       <Input
//                         type="number"
//                         className=" text-black"
//                         placeholder="Overtime rate multiplier"
//                       />
//                       <Select>
//                         <SelectTrigger className=" text-black">
//                           <SelectValue placeholder="Overtime calculation basis" />
//                         </SelectTrigger>
//                         <SelectContent className=" text-black">
//                           <SelectItem value="daily">Daily Basis</SelectItem>
//                           <SelectItem value="weekly">Weekly Basis</SelectItem>
//                           <SelectItem value="monthly">Monthly Basis</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Button
//               type="submit"
//               className="w-full bg-purple-600 hover:bg-purple-700"
//             >
//               Save Configuration
//             </Button>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }
// // ...existing code...


import Nav from "@/Admin/Nav"
import { useState } from "react"
import { Building2, Plus, Eye, Edit2, Trash2, X, DollarSign, Calendar, Clock } from "lucide-react"

const HRConfigurationSystem = () => {
  const [configurations, setConfigurations] = useState([
    {
      id: "SAL-001",
      name: "Senior Engineer Salary",
      type: "salary",
      details: "Base: $75,000 | Bonus: 15% | HRA: $12,000",
      createdBy: "HR Manager",
      lastUpdated: "2024-05-20",
    },
    {
      id: "LEV-001",
      name: "Standard Leave Policy",
      type: "leave",
      details: "Annual: 24 days | Sick: 12 days | Accrual: Monthly",
      createdBy: "Project Manager",
      lastUpdated: "2024-05-18",
    },
    {
      id: "ATT-001",
      name: "Site Worker Attendance",
      type: "attendance",
      details: "8 hrs/day | Late penalty: $20 | Remote: Not allowed",
      createdBy: "Site Supervisor",
      lastUpdated: "2024-05-22",
    },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("salary")
  const [formData, setFormData] = useState({
    name: "",
    baseSalary: "",
    bonusPercentage: "",
    taxRegime: "new",
    hra: "",
    travelAllowance: "",
    medicalAllowance: "",
    annualLeave: "",
    sickLeave: "",
    accrualRate: "monthly",
    carryForward: true,
    maxCarryForward: "",
    workingHours: "",
    latePenalty: "",
    remoteWork: false,
    overtimeRate: "",
    flexibleHours: false,
  })

  const getTypeIcon = (type) => {
    const icons = {
      salary: <DollarSign className="w-4 h-4" />,
      leave: <Calendar className="w-4 h-4" />,
      attendance: <Clock className="w-4 h-4" />,
    }
    return icons[type] || <Building2 className="w-4 h-4" />
  }

  const getTypeBadge = (type) => {
    const badges = {
      salary: "bg-green-100 text-green-800 border-green-200",
      leave: "bg-blue-100 text-blue-800 border-blue-200",
      attendance: "bg-purple-100 text-purple-800 border-purple-200",
    }
    const labels = { salary: "Salary Structure", leave: "Leave Policy", attendance: "Attendance Policy" }

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${badges[type]} flex items-center gap-1`}>
        {getTypeIcon(type)}
        {labels[type]}
      </span>
    )
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const generateId = (type) => {
    const prefix = type === "salary" ? "SAL" : type === "leave" ? "LEV" : "ATT"
    const count = configurations.filter((c) => c.type === type).length + 1
    return `${prefix}-${count.toString().padStart(3, "0")}`
  }

  const getDetailsString = (type, data) => {
    switch (type) {
      case "salary":
        return `Base: $${data.baseSalary?.toLocaleString()} | Bonus: ${data.bonusPercentage}% | HRA: $${data.hra?.toLocaleString()}`
      case "leave":
        return `Annual: ${data.annualLeave} days | Sick: ${data.sickLeave} days | Accrual: ${data.accrualRate}`
      case "attendance":
        return `${data.workingHours} hrs/day | Late penalty: $${data.latePenalty} | Remote: ${data.remoteWork ? "Allowed" : "Not allowed"}`
      default:
        return ""
    }
  }

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      alert("Please enter a configuration name")
      return
    }

    const newConfig = {
      id: generateId(activeTab),
      name: formData.name,
      type: activeTab,
      details: getDetailsString(activeTab, formData),
      createdBy: "Current User",
      lastUpdated: new Date().toISOString().split("T")[0],
    }

    setConfigurations((prev) => [...prev, newConfig])
    setFormData({
      name: "",
      baseSalary: "",
      bonusPercentage: "",
      taxRegime: "new",
      hra: "",
      travelAllowance: "",
      medicalAllowance: "",
      annualLeave: "",
      sickLeave: "",
      accrualRate: "monthly",
      carryForward: true,
      maxCarryForward: "",
      workingHours: "",
      latePenalty: "",
      remoteWork: false,
      overtimeRate: "",
      flexibleHours: false,
    })
    setIsModalOpen(false)
  }

  const handleDelete = (id) => {
    setConfigurations((prev) => prev.filter((config) => config.id !== id))
  }

  const renderTabContent = () => {
    const inputClass =
      "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"

    switch (activeTab) {
      case "salary":
        return (
          <div className="space-y-4">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={inputClass}
              placeholder="Configuration Name (e.g., Senior Engineer Salary)"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                value={formData.baseSalary}
                onChange={(e) => handleInputChange("baseSalary", e.target.value)}
                className={inputClass}
                placeholder="Base Salary ($)"
              />
              <input
                type="number"
                value={formData.bonusPercentage}
                onChange={(e) => handleInputChange("bonusPercentage", e.target.value)}
                className={inputClass}
                placeholder="Bonus Percentage (%)"
              />
            </div>

            <select
              value={formData.taxRegime}
              onChange={(e) => handleInputChange("taxRegime", e.target.value)}
              className={inputClass}
            >
              <option value="new">New Tax Regime</option>
              <option value="old">Old Tax Regime</option>
            </select>

            <div className="grid grid-cols-3 gap-4">
              <input
                type="number"
                value={formData.hra}
                onChange={(e) => handleInputChange("hra", e.target.value)}
                className={inputClass}
                placeholder="HRA ($)"
              />
              <input
                type="number"
                value={formData.travelAllowance}
                onChange={(e) => handleInputChange("travelAllowance", e.target.value)}
                className={inputClass}
                placeholder="Travel Allowance ($)"
              />
              <input
                type="number"
                value={formData.medicalAllowance}
                onChange={(e) => handleInputChange("medicalAllowance", e.target.value)}
                className={inputClass}
                placeholder="Medical Allowance ($)"
              />
            </div>
          </div>
        )

      case "leave":
        return (
          <div className="space-y-4">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={inputClass}
              placeholder="Configuration Name (e.g., Standard Leave Policy)"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                value={formData.annualLeave}
                onChange={(e) => handleInputChange("annualLeave", e.target.value)}
                className={inputClass}
                placeholder="Annual Leave (Days)"
              />
              <input
                type="number"
                value={formData.sickLeave}
                onChange={(e) => handleInputChange("sickLeave", e.target.value)}
                className={inputClass}
                placeholder="Sick Leave (Days)"
              />
            </div>

            <select
              value={formData.accrualRate}
              onChange={(e) => handleInputChange("accrualRate", e.target.value)}
              className={inputClass}
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="annually">Annually</option>
            </select>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.carryForward}
                  onChange={(e) => handleInputChange("carryForward", e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Allow Carry Forward</span>
              </label>

              {formData.carryForward && (
                <input
                  type="number"
                  value={formData.maxCarryForward}
                  onChange={(e) => handleInputChange("maxCarryForward", e.target.value)}
                  className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Max days"
                />
              )}
            </div>
          </div>
        )

      case "attendance":
        return (
          <div className="space-y-4">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={inputClass}
              placeholder="Configuration Name (e.g., Site Worker Attendance)"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                value={formData.workingHours}
                onChange={(e) => handleInputChange("workingHours", e.target.value)}
                className={inputClass}
                placeholder="Working Hours per Day"
              />
              <input
                type="number"
                value={formData.latePenalty}
                onChange={(e) => handleInputChange("latePenalty", e.target.value)}
                className={inputClass}
                placeholder="Late Penalty ($)"
              />
            </div>

            <input
              type="number"
              step="0.1"
              value={formData.overtimeRate}
              onChange={(e) => handleInputChange("overtimeRate", e.target.value)}
              className={inputClass}
              placeholder="Overtime Rate (Multiplier)"
            />

            <div className="space-y-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.remoteWork}
                  onChange={(e) => handleInputChange("remoteWork", e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Allow Remote Work</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.flexibleHours}
                  onChange={(e) => handleInputChange("flexibleHours", e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Flexible Working Hours</span>
              </label>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div >
      <Nav />
          <div className="min-h-screen ml-64 bg-gray-50 p-6">
     
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Building2 className="w-8 h-8 text-blue-600" />
            HR Configuration Management
          </h1>
          <p className="text-gray-600 mt-2">Manage salary structures, leave policies, and attendance configurations</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Configuration
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {["salary", "leave", "attendance"].map((type) => {
          const count = configurations.filter((c) => c.type === type).length
          const labels = { salary: "Salary Structures", leave: "Leave Policies", attendance: "Attendance Policies" }
          const colors = {
            salary: "from-green-500 to-green-600",
            leave: "from-blue-500 to-blue-600",
            attendance: "from-purple-500 to-purple-600",
          }

          return (
            <div key={type} className={`bg-gradient-to-r ${colors[type]} p-6 rounded-xl text-white`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium">{labels[type]}</p>
                  <p className="text-3xl font-bold mt-1">{count}</p>
                </div>
                <div className="bg-white/20 p-3 rounded-lg">{getTypeIcon(type)}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Configurations Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">All Configurations</h2>
          <p className="text-sm text-gray-600 mt-1">Manage and view all HR configuration policies</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Configuration
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Key Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created By
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {configurations.map((config) => (
                <tr key={config.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{config.name}</div>
                      <div className="text-sm text-gray-500">ID: {config.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{getTypeBadge(config.type)}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs">{config.details}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{config.createdBy}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{config.lastUpdated}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800 p-1 rounded transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-800 p-1 rounded transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(config.id)}
                        className="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Add New Configuration</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="px-6 pt-6">
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                {[
                  { id: "salary", label: "Salary Structure", icon: DollarSign },
                  { id: "leave", label: "Leave Policy", icon: Calendar },
                  { id: "attendance", label: "Attendance Policy", icon: Clock },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                      activeTab === tab.id ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6">
              {renderTabContent()}

              {/* Form Actions */}
              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Configuration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>

  )
}

export default HRConfigurationSystem
