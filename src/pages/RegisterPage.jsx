import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Building2,
  ShoppingCart,
  ClipboardList,
  DollarSign,
  Receipt,
  HardHat,
  Warehouse,
} from "lucide-react"; 
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    phone: "",
    address: "",
    selectedModules: [],
    roleConfiguration: {},
  });
  const [selectedRoles, setSelectedRoles] = useState({});
  const navigate = useNavigate(); 

  const modules = [
    {
      id: "hr-payroll",
      name: "HR & Payroll",
      icon: Users,
      color: "from-blue-500 to-indigo-600",
      description: "Complete HR management with payroll processing",
      roles: ["HR Admin", "HR Manager", "Employee"],
      features: [
        "Employee Management",
        "Attendance Tracking",
        "Leave Management",
        "Payroll Processing",
        "Performance Management",
      ],
    },
    {
      id: "site-management",
      name: "Site Management",
      icon: HardHat,
      color: "from-amber-500 to-orange-600",
      description: "Project site and workforce management",
      roles: ["Site Admin", "Project Manager", "Site Supervisor"],
      features: [
        "Site Planning",
        "Task Management",
        "Resource Allocation",
        "Progress Tracking",
        "Issue Management",
      ],
    },
    {
      id: "inventory",
      name: "Indent & Inventory",
      icon: Warehouse,
      color: "from-green-500 to-emerald-600",
      description: "Material management and stock control",
      roles: ["Inventory Admin", "Procurement Officer", "Site Supervisor"],
      features: [
        "Stock Management",
        "Purchase Requisition",
        "Vendor Management",
        "Stock Reports",
        "Material Tracking",
      ],
    },
    {
      id: "purchase",
      name: "Purchase Management",
      icon: ShoppingCart,
      color: "from-purple-500 to-pink-600",
      description: "End-to-end procurement process",
      roles: ["Purchase Admin", "Procurement Officer", "Accountant"],
      features: [
        "Purchase Orders",
        "Vendor Management",
        "Invoice Processing",
        "Payment Tracking",
        "Purchase Reports",
      ],
    },
    {
      id: "sales",
      name: "Sales Management",
      icon: DollarSign,
      color: "from-cyan-500 to-blue-600",
      description: "Sales and client management",
      roles: ["Sales Admin", "Sales Manager", "Accountant"],
      features: [
        "Client Management",
        "Quotation Generation",
        "Invoice Management",
        "Payment Tracking",
        "Sales Reports",
      ],
    },
    {
      id: "expense",
      name: "Expense Management",
      icon: Receipt,
      color: "from-red-500 to-pink-600",
      description: "Track and manage all expenses",
      roles: ["Finance Admin", "Project Manager", "Accountant"],
      features: [
        "Expense Tracking",
        "Bill Processing",
        "Budget Management",
        "Reimbursements",
        "Expense Reports",
      ],
    },
  ]

  const handleModuleClick = (moduleId) => {
    if (moduleId === "hr-payroll") {
      localStorage.setItem('selectedModule', 'hr-payroll');
      navigate('/dashboard/hr/setup'); 
    }
  };

  return (
    <div className="min-h-screen text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black">
            Get Started with CRM
          </h1>
          <p className="text-gray-400 mt-2">
            {step === 1 && "Enter your company details"}
            {step === 2 && "Select the modules that suit your business needs"}
            {step === 3 && "Configure roles for your organization"}
          </p>
        </div>

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="border-gray-800 bg-gray-900/50">
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Enter your company details to get started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      placeholder="Enter company name"
                      className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400"
                      value={formData.companyName}
                      onChange={(e) =>
                        setFormData({ ...formData, companyName: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Business Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter business email"
                      className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="Enter phone number"
                      className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Business Address</Label>
                    <Input
                      id="address"
                      placeholder="Enter business address"
                      className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                    />
                  </div>
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  onClick={() => setStep(2)}
                >
                  Continue to Module Selection
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

      
      {step === 2 && (
        <motion.div
          key="hr-payroll"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {modules.map((module) => (
            <div
              key={module.id}
              onClick={() => {
                handleModuleClick(module.id); // Updated navigation handler
                setFormData({
                  ...formData,
                  selectedModules: formData.selectedModules.includes(module.id)
                    ? formData.selectedModules.filter((id) => id !== module.id)
                    : [...formData.selectedModules, module.id],
                });
              }}
              className="cursor-pointer"
            >
            <Card className="border-gray-800 bg-gray-900/50 hover:bg-gray-900/70 transition-all">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${module.color} flex items-center justify-center`}>
                        <module.icon className="h-6 w-6 text-white" />
                      </div>
                      <Checkbox
                        checked={formData.selectedModules.includes(module.id)}
                        onCheckedChange={(checked) => {
                          setFormData({
                            ...formData,
                            selectedModules: checked
                              ? [...formData.selectedModules, module.id]
                              : formData.selectedModules.filter((id) => id !== module.id),
                          })
                        }}
                      />
                    </div>
                    <CardTitle className="text-lg text-white">{module.name}</CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-300">Key Features:</p>
                      <ul className="text-sm text-gray-400 space-y-1">
                        {module.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-gray-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-300">Available Roles:</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {module.roles.map((role, index) => (
                          <span
                            key={index}
                            className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-300"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </motion.div>
        )}

        {step === 2 && (
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setStep(1)}
              className="border-gray-800 hover:bg-gray-800"
            >
              Back to Company Details
            </Button>
            <Button
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              onClick={() => setStep(3)}
              disabled={formData.selectedModules.length === 0}
            >
              Configure Roles
            </Button>
          </div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="border-gray-800 bg-gray-900/50">
              <CardHeader>
                <CardTitle className="text-white">Role Configuration</CardTitle>
                <CardDescription>Set up roles for your selected modules</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {formData.selectedModules.map((moduleId) => {
                  const module = modules.find((m) => m.id === moduleId)
                  return (
                    <div key={moduleId} className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${module.color} flex items-center justify-center`}>
                          <module.icon className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">{module.name}</h3>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {module.roles.map((role) => (
                          <Card key={role} className="border-gray-800 bg-gray-800/50">
                            <CardHeader className="pb-3">
                              <CardTitle className="text-sm text-white">{role}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                <div className="space-y-1">
                                  <Label className="text-xs text-gray-400">Number of Users</Label>
                                  <Input
                                    type="number"
                                    min="0"
                                    className="bg-gray-900/50 border-gray-700"
                                    placeholder="0"
                                    value={selectedRoles[`${moduleId}-${role}`] || ""}
                                    onChange={(e) => {
                                      setSelectedRoles({
                                        ...selectedRoles,
                                        [`${moduleId}-${role}`]: e.target.value,
                                      })
                                    }}
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )
                })}
                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="border-gray-800 hover:bg-gray-800"
                  >
                    Back to Module Selection
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    onClick={() => {
                    
                      const finalData = {
                        ...formData,
                        roleConfiguration: selectedRoles,
                      }
                      console.log("Final Configuration:", finalData)
                    }}
                  >
                    Complete Setup
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}