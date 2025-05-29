import { useState } from "react"
import { Building2, Plus, Eye, Edit2, Trash2, X, DollarSign, Calendar, Clock } from "lucide-react"
import Nav from "@/Admin/Nav"
const HRConfigurationSystem = () => {
  const [configurations, setConfigurations] = useState([
    {
      id: "SAL-001",
      name: "Senior Engineer Salary",
      type: "salary",
      details: "Base: $75,000 | Bonus: 15% | HRA: $12,000",
      createdBy: "HR Manager",
      lastUpdated: "2024-05-20",
      data: {
        baseSalary: "75000",
        bonusPercentage: "15",
        taxRegime: "new",
        hra: "12000",
        travelAllowance: "5000",
        medicalAllowance: "3000"
      }
    },
    {
      id: "LEV-001",
      name: "Standard Leave Policy",
      type: "leave",
      details: "Annual: 24 days | Sick: 12 days | Accrual: Monthly",
      createdBy: "Project Manager",
      lastUpdated: "2024-05-18",
      data: {
        annualLeave: "24",
        sickLeave: "12",
        accrualRate: "monthly",
        carryForward: true,
        maxCarryForward: "5"
      }
    },
    {
      id: "ATT-001",
      name: "Site Worker Attendance",
      type: "attendance",
      details: "8 hrs/day | Late penalty: $20 | Remote: Not allowed",
      createdBy: "Site Supervisor",
      lastUpdated: "2024-05-22",
      data: {
        workingHours: "8",
        latePenalty: "20",
        remoteWork: false,
        overtimeRate: "1.5",
        flexibleHours: false
      }
    },
  ])
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("salary")
  const [editingConfig, setEditingConfig] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  
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
        return `Base: $${parseInt(data.baseSalary || 0).toLocaleString()} | Bonus: ${data.bonusPercentage || 0}% | HRA: $${parseInt(data.hra || 0).toLocaleString()}`
      case "leave":
        return `Annual: ${data.annualLeave || 0} days | Sick: ${data.sickLeave || 0} days | Accrual: ${data.accrualRate || 'monthly'}`
      case "attendance":
        return `${data.workingHours || 0} hrs/day | Late penalty: $${data.latePenalty || 0} | Remote: ${data.remoteWork ? "Allowed" : "Not allowed"}`
      default:
        return ""
    }
  }

  const resetForm = () => {
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
    setEditingConfig(null)
    setIsEditing(false)
  }

  const handleEdit = (config) => {
    setEditingConfig(config)
    setIsEditing(true)
    setActiveTab(config.type)
    
    // Populate form with existing data
    setFormData({
      name: config.name,
      baseSalary: config.data?.baseSalary || "",
      bonusPercentage: config.data?.bonusPercentage || "",
      taxRegime: config.data?.taxRegime || "new",
      hra: config.data?.hra || "",
      travelAllowance: config.data?.travelAllowance || "",
      medicalAllowance: config.data?.medicalAllowance || "",
      annualLeave: config.data?.annualLeave || "",
      sickLeave: config.data?.sickLeave || "",
      accrualRate: config.data?.accrualRate || "monthly",
      carryForward: config.data?.carryForward || true,
      maxCarryForward: config.data?.maxCarryForward || "",
      workingHours: config.data?.workingHours || "",
      latePenalty: config.data?.latePenalty || "",
      remoteWork: config.data?.remoteWork || false,
      overtimeRate: config.data?.overtimeRate || "",
      flexibleHours: config.data?.flexibleHours || false,
    })
    
    setIsModalOpen(true)
  }

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      alert("Please enter a configuration name")
      return
    }

    const configData = {
      baseSalary: formData.baseSalary,
      bonusPercentage: formData.bonusPercentage,
      taxRegime: formData.taxRegime,
      hra: formData.hra,
      travelAllowance: formData.travelAllowance,
      medicalAllowance: formData.medicalAllowance,
      annualLeave: formData.annualLeave,
      sickLeave: formData.sickLeave,
      accrualRate: formData.accrualRate,
      carryForward: formData.carryForward,
      maxCarryForward: formData.maxCarryForward,
      workingHours: formData.workingHours,
      latePenalty: formData.latePenalty,
      remoteWork: formData.remoteWork,
      overtimeRate: formData.overtimeRate,
      flexibleHours: formData.flexibleHours,
    }

    if (isEditing && editingConfig) {
      // Update existing configuration
      const updatedConfig = {
        ...editingConfig,
        name: formData.name,
        details: getDetailsString(activeTab, configData),
        lastUpdated: new Date().toISOString().split("T")[0],
        data: configData
      }

      setConfigurations((prev) => 
        prev.map((config) => 
          config.id === editingConfig.id ? updatedConfig : config
        )
      )
    } else {
      // Create new configuration
      const newConfig = {
        id: generateId(activeTab),
        name: formData.name,
        type: activeTab,
        details: getDetailsString(activeTab, configData),
        createdBy: "Current User",
        lastUpdated: new Date().toISOString().split("T")[0],
        data: configData
      }

      setConfigurations((prev) => [...prev, newConfig])
    }

    resetForm()
    setIsModalOpen(false)
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this configuration?")) {
      setConfigurations((prev) => prev.filter((config) => config.id !== id))
    }
  }

  const handleModalClose = () => {
    resetForm()
    setIsModalOpen(false)
  }

  const handleAddNew = () => {
    resetForm()
    setActiveTab("salary")
    setIsModalOpen(true)
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
    <div className="min-h-screen bg-gray-50 p-6 ml-64">
      <Nav/>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Building2 className="w-8 h-8 text-blue-600" />
              HR Configuration Management
            </h1>
            <p className="text-gray-600 mt-2">Manage salary structures, leave policies, and attendance configurations</p>
          </div>
          <button
            onClick={handleAddNew}
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
                        <button 
                          onClick={() => handleEdit(config)}
                          className="text-green-600 hover:text-green-800 p-1 rounded transition-colors"
                          title="Edit Configuration"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(config.id)}
                          className="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
                          title="Delete Configuration"
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

        {/* Professional Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Subtle backdrop */}
            <div 
              className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm transition-opacity"
              onClick={handleModalClose}
            />
            
            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden transform transition-all scale-100">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {isEditing ? `Edit Configuration` : "Add New Configuration"}
                  </h2>
                  {isEditing && (
                    <p className="text-sm text-gray-600 mt-1">
                      Editing: {editingConfig?.name}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleModalClose}
                  className="text-gray-400 hover:text-gray-600 hover:bg-white p-2 rounded-lg transition-all duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
                {/* Tab Navigation */}
                <div className="px-6 pt-6 pb-4 bg-gray-50 border-b border-gray-100">
                  <div className="flex space-x-1 bg-white p-1 rounded-xl shadow-sm">
                    {[
                      { id: "salary", label: "Salary Structure", icon: DollarSign, color: "text-green-600" },
                      { id: "leave", label: "Leave Policy", icon: Calendar, color: "text-blue-600" },
                      { id: "attendance", label: "Attendance Policy", icon: Clock, color: "text-purple-600" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => !isEditing && setActiveTab(tab.id)}
                        disabled={isEditing}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                          activeTab === tab.id 
                            ? `bg-gradient-to-r from-${tab.color.split('-')[1]}-50 to-${tab.color.split('-')[1]}-100 ${tab.color} shadow-sm border border-${tab.color.split('-')[1]}-200` 
                            : isEditing 
                            ? "text-gray-400 cursor-not-allowed" 
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        }`}
                      >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    ))}
                  </div>
                  {isEditing && (
                    <p className="text-sm text-amber-600 mt-3 flex items-center gap-2 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                      Configuration type cannot be changed during edit mode
                    </p>
                  )}
                </div>

                {/* Form Content */}
                <div className="p-6">
                  {renderTabContent()}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                >
                  {isEditing ? "Update Configuration" : "Create Configuration"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HRConfigurationSystem