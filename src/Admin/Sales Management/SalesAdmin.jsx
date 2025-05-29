import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, UserPlus, Briefcase, FileText, Percent, DollarSign, ClipboardList, Edit, Trash2, Eye, X, Plus } from "lucide-react";
import Nav from "../Nav";

export default function SalesAdmin() {
  // State for clients/projects
  const [clients, setClients] = useState([
    { 
      id: 1, 
      clientName: "Acme Corp", 
      projectName: "Website Redesign", 
      budget: 15000, 
      startDate: "2024-01-15",
      status: "Active"
    },
    { 
      id: 2, 
      clientName: "Global Tech", 
      projectName: "Mobile App Development", 
      budget: 25000, 
      startDate: "2024-02-01",
      status: "In Progress"
    },
    { 
      id: 3, 
      clientName: "StartupXYZ", 
      projectName: "Brand Identity", 
      budget: 8000, 
      startDate: "2024-01-20",
      status: "Completed"
    }
  ]);

  // State for invoice settings
  const [invoiceSettings, setInvoiceSettings] = useState({
    prefix: "INV",
    nextNumber: 1045,
    taxRate: 15,
    taxId: "VAT-123456"
  });

  // State for invoice templates
  const [templates, setTemplates] = useState([
    { id: 1, name: "Default Template", status: "Active", lastModified: "2024-01-10" },
    { id: 2, name: "Modern Template", status: "Inactive", lastModified: "2024-01-05" },
    { id: 3, name: "Corporate Template", status: "Inactive", lastModified: "2023-12-20" }
  ]);

  // Modal states
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

  // Form states
  const [clientForm, setClientForm] = useState({
    clientName: "",
    projectName: "",
    budget: "",
    startDate: ""
  });

  const [templateForm, setTemplateForm] = useState({
    name: "",
    status: "Inactive"
  });

  // Handle client form submission
  const handleClientSubmit = () => {
    if (clientForm.clientName && clientForm.projectName && clientForm.budget && clientForm.startDate) {
      const newClient = {
        id: clients.length + 1,
        clientName: clientForm.clientName,
        projectName: clientForm.projectName,
        budget: parseFloat(clientForm.budget),
        startDate: clientForm.startDate,
        status: "Active"
      };
      setClients([...clients, newClient]);
      setClientForm({ clientName: "", projectName: "", budget: "", startDate: "" });
      setIsClientModalOpen(false);
    } else {
      alert("Please fill in all fields");
    }
  };

  // Handle invoice settings update
  const handleInvoiceSettingsSubmit = () => {
    alert("Invoice settings saved successfully!");
    setIsInvoiceModalOpen(false);
  };

  // Handle template form submission
  const handleTemplateSubmit = () => {
    if (templateForm.name) {
      const newTemplate = {
        id: templates.length + 1,
        name: templateForm.name,
        status: templateForm.status,
        lastModified: new Date().toISOString().split('T')[0]
      };
      setTemplates([...templates, newTemplate]);
      setTemplateForm({ name: "", status: "Inactive" });
      setIsTemplateModalOpen(false);
    } else {
      alert("Please enter a template name");
    }
  };

  // Handle template activation
  const handleTemplateActivate = (templateId) => {
    setTemplates(templates.map(template => ({
      ...template,
      status: template.id === templateId ? "Active" : "Inactive"
    })));
  };

  // Handle client deletion
  const handleDeleteClient = (clientId) => {
    setClients(clients.filter(client => client.id !== clientId));
  };

  // Handle template deletion
  const handleDeleteTemplate = (templateId) => {
    setTemplates(templates.filter(template => template.id !== templateId));
  };

  // Modern Modal Component with subtle backdrop
  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Subtle backdrop with blur effect */}
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity duration-200" 
          onClick={onClose}
        ></div>
        
        {/* Modal content with smooth animation */}
        <div className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto transform transition-all duration-200 scale-100 border border-gray-200">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Content */}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 ml-64">
      <Nav/>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-100/30 via-transparent to-transparent"></div>
      
      <div className="relative z-10 p-8 max-w-7xl mx-auto">
        {/* Header */}
  

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button 
            onClick={() => setIsClientModalOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Client/Project
          </Button>
          <Button 
            onClick={() => setIsInvoiceModalOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3"
          >
            <FileText className="w-4 h-4 mr-2" /> Invoice Settings
          </Button>
          <Button 
            onClick={() => setIsTemplateModalOpen(true)}
            className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3"
          >
            <ClipboardList className="w-4 h-4 mr-2" /> Add Template
          </Button>
        </div>

        {/* Tables Section */}
        <div className="space-y-8">
          
          {/* Clients Table */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-purple-50 to-white">
              <CardTitle className="text-gray-900 text-xl">Clients & Projects</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/50">
                    <tr>
                      <th className="text-left p-4 font-semibold text-gray-700 text-sm">ID</th>
                      <th className="text-left p-4 font-semibold text-gray-700 text-sm">Client Name</th>
                      <th className="text-left p-4 font-semibold text-gray-700 text-sm">Project</th>
                      <th className="text-left p-4 font-semibold text-gray-700 text-sm">Budget</th>
                      <th className="text-left p-4 font-semibold text-gray-700 text-sm">Start Date</th>
                      <th className="text-left p-4 font-semibold text-gray-700 text-sm">Status</th>
                      <th className="text-left p-4 font-semibold text-gray-700 text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client, index) => (
                      <tr 
                        key={client.id}
                        className={`border-b border-gray-100 hover:bg-purple-50/30 transition-colors ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                        }`}
                      >
                        <td className="p-4 text-gray-600 font-medium">{client.id}</td>
                        <td className="p-4 text-gray-900 font-semibold">{client.clientName}</td>
                        <td className="p-4 text-gray-700">{client.projectName}</td>
                        <td className="p-4 text-gray-900 font-semibold">${client.budget.toLocaleString()}</td>
                        <td className="p-4 text-gray-600">{client.startDate}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            client.status === 'Active' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                            client.status === 'In Progress' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                            'bg-gray-100 text-gray-700 border border-gray-200'
                          }`}>
                            {client.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" className="text-blue-600 hover:bg-blue-50 h-8 w-8 p-0">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-emerald-600 hover:bg-emerald-50 h-8 w-8 p-0">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="text-red-600 hover:bg-red-50 h-8 w-8 p-0"
                              onClick={() => handleDeleteClient(client.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Invoice Templates Table */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-white">
              <CardTitle className="text-gray-900 text-xl">Invoice Templates</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/50">
                    <tr>
                      <th className="text-left p-4 font-semibold text-gray-700 text-sm">ID</th>
                      <th className="text-left p-4 font-semibold text-gray-700 text-sm">Template Name</th>
                      <th className="text-left p-4 font-semibold text-gray-700 text-sm">Status</th>
                      <th className="text-left p-4 font-semibold text-gray-700 text-sm">Last Modified</th>
                      <th className="text-left p-4 font-semibold text-gray-700 text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {templates.map((template, index) => (
                      <tr 
                        key={template.id}
                        className={`border-b border-gray-100 hover:bg-emerald-50/30 transition-colors ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                        }`}
                      >
                        <td className="p-4 text-gray-600 font-medium">{template.id}</td>
                        <td className="p-4 text-gray-900 font-semibold">{template.name}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            template.status === 'Active' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-700 border border-gray-200'
                          }`}>
                            {template.status}
                          </span>
                        </td>
                        <td className="p-4 text-gray-600">{template.lastModified}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50 px-3 py-1 h-8 text-xs">
                              Preview
                            </Button>
                            {template.status === 'Inactive' && (
                              <Button 
                                size="sm" 
                                className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 h-8 text-xs"
                                onClick={() => handleTemplateActivate(template.id)}
                              >
                                Activate
                              </Button>
                            )}
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="text-red-600 hover:bg-red-50 h-8 w-8 p-0"
                              onClick={() => handleDeleteTemplate(template.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Invoice Settings Table */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white">
              <CardTitle className="text-gray-900 text-xl">Current Invoice Settings</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/50">
                    <tr>
                      <th className="text-left p-4 font-semibold text-gray-700 text-sm">Setting</th>
                      <th className="text-left p-4 font-semibold text-gray-700 text-sm">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors bg-white">
                      <td className="p-4 text-gray-900 font-semibold">Invoice Prefix</td>
                      <td className="p-4 text-gray-700 font-mono bg-gray-50 rounded m-2 px-3 py-1 inline-block">{invoiceSettings.prefix}</td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors bg-gray-50/30">
                      <td className="p-4 text-gray-900 font-semibold">Next Invoice Number</td>
                      <td className="p-4 text-gray-700 font-mono bg-gray-50 rounded m-2 px-3 py-1 inline-block">{invoiceSettings.nextNumber}</td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors bg-white">
                      <td className="p-4 text-gray-900 font-semibold">Tax Rate</td>
                      <td className="p-4 text-gray-700 font-mono bg-gray-50 rounded m-2 px-3 py-1 inline-block">{invoiceSettings.taxRate}%</td>
                    </tr>
                    <tr className="hover:bg-blue-50/30 transition-colors bg-gray-50/30">
                      <td className="p-4 text-gray-900 font-semibold">Tax ID</td>
                      <td className="p-4 text-gray-700 font-mono bg-gray-50 rounded m-2 px-3 py-1 inline-block">{invoiceSettings.taxId}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Modals */}
        
        {/* Add Client Modal */}
        <Modal isOpen={isClientModalOpen} onClose={() => setIsClientModalOpen(false)} title="Add New Client/Project">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
              <input 
                type="text" 
                placeholder="Enter client name" 
                value={clientForm.clientName}
                onChange={(e) => setClientForm({...clientForm, clientName: e.target.value})}
                className="w-full p-3 rounded-lg border border-gray-300 text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
              <input 
                type="text" 
                placeholder="Enter project name" 
                value={clientForm.projectName}
                onChange={(e) => setClientForm({...clientForm, projectName: e.target.value})}
                className="w-full p-3 rounded-lg border border-gray-300 text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
              <input 
                type="number" 
                placeholder="Enter budget amount" 
                value={clientForm.budget}
                onChange={(e) => setClientForm({...clientForm, budget: e.target.value})}
                className="w-full p-3 rounded-lg border border-gray-300 text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input 
                type="date" 
                value={clientForm.startDate}
                onChange={(e) => setClientForm({...clientForm, startDate: e.target.value})}
                className="w-full p-3 rounded-lg border border-gray-300 text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button 
                onClick={handleClientSubmit} 
                className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Briefcase className="w-4 h-4 mr-2" /> Add Project
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsClientModalOpen(false)} 
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 py-3"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>

        {/* Invoice Settings Modal */}
        <Modal isOpen={isInvoiceModalOpen} onClose={() => setIsInvoiceModalOpen(false)} title="Invoice Configuration">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Prefix</label>
              <input 
                type="text" 
                placeholder="e.g., INV" 
                value={invoiceSettings.prefix}
                onChange={(e) => setInvoiceSettings({...invoiceSettings, prefix: e.target.value})}
                className="w-full p-3 rounded-lg border border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Next Invoice Number</label>
              <input 
                type="number" 
                placeholder="e.g., 1001" 
                value={invoiceSettings.nextNumber}
                onChange={(e) => setInvoiceSettings({...invoiceSettings, nextNumber: parseInt(e.target.value)})}
                className="w-full p-3 rounded-lg border border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
              <input 
                type="number" 
                placeholder="e.g., 15" 
                value={invoiceSettings.taxRate}
                onChange={(e) => setInvoiceSettings({...invoiceSettings, taxRate: parseFloat(e.target.value)})}
                className="w-full p-3 rounded-lg border border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tax ID</label>
              <input 
                type="text" 
                placeholder="e.g., VAT-123456" 
                value={invoiceSettings.taxId}
                onChange={(e) => setInvoiceSettings({...invoiceSettings, taxId: e.target.value})}
                className="w-full p-3 rounded-lg border border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button 
                onClick={handleInvoiceSettingsSubmit} 
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <FileText className="w-4 h-4 mr-2" /> Save Settings
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsInvoiceModalOpen(false)} 
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 py-3"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>

        {/* Add Template Modal */}
        <Modal isOpen={isTemplateModalOpen} onClose={() => setIsTemplateModalOpen(false)} title="Add New Template">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Template Name</label>
              <input 
                type="text" 
                placeholder="Enter template name" 
                value={templateForm.name}
                onChange={(e) => setTemplateForm({...templateForm, name: e.target.value})}
                className="w-full p-3 rounded-lg border border-gray-300 text-gray-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Initial Status</label>
              <select 
                value={templateForm.status}
                onChange={(e) => setTemplateForm({...templateForm, status: e.target.value})}
                className="w-full p-3 rounded-lg border border-gray-300 text-gray-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all"
              >
                <option value="Inactive">Inactive</option>
                <option value="Active">Active</option>
              </select>
            </div>
            <div className="flex gap-3 pt-4">
              <Button 
                onClick={handleTemplateSubmit} 
                className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-3 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <ClipboardList className="w-4 h-4 mr-2" /> Add Template
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsTemplateModalOpen(false)} 
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 py-3"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}