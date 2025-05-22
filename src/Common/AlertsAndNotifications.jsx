import React, { useState } from 'react';
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  X, 
  Plus, 
  Settings, 
  Filter, 
  Search,
  Send,
  Edit,
  Trash,
  MoreHorizontal
} from 'lucide-react';

const AlertsAndNotifications = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Sample notification templates
  const notificationTemplates = [
    { 
      id: 1, 
      name: "Low Inventory Alert", 
      type: "system", 
      channels: ["email", "sms", "app"], 
      message: "Inventory for {item} is below threshold ({quantity} remaining). Please reorder soon.",
      module: "inventory"
    },
    { 
      id: 2, 
      name: "Payment Reminder", 
      type: "scheduled", 
      channels: ["email", "sms"], 
      message: "Reminder: Payment of {amount} for {invoice} is due on {date}.",
      module: "sales"
    },
    { 
      id: 3, 
      name: "Reservation Confirmation", 
      type: "trigger", 
      channels: ["email", "sms", "whatsapp"], 
      message: "Your reservation for {guests} guests on {date} at {time} is confirmed. Reservation ID: {id}",
      module: "crm"
    },
    { 
      id: 4, 
      name: "Staff Attendance Alert", 
      type: "system", 
      channels: ["email", "app"], 
      message: "{employee} has been absent for {days} consecutive days.",
      module: "hr"
    },
    { 
      id: 5, 
      name: "Purchase Order Approval", 
      type: "approval", 
      channels: ["email", "app"], 
      message: "New purchase order #{po_number} requires your approval. Total amount: {amount}",
      module: "purchase"
    }
  ];

  // Sample recent notifications
  const recentNotifications = [
    { 
      id: 1, 
      template: "Low Inventory Alert", 
      recipient: "Kitchen Staff", 
      channel: "app", 
      status: "sent", 
      timestamp: "2023-05-15 10:30:22",
      content: "Inventory for Chicken is below threshold (2.5kg remaining). Please reorder soon."
    },
    { 
      id: 2, 
      template: "Payment Reminder", 
      recipient: "john.doe@example.com", 
      channel: "email", 
      status: "sent", 
      timestamp: "2023-05-15 09:15:10",
      content: "Reminder: Payment of $1,250.00 for INV-2023-042 is due on May 20, 2023."
    },
    { 
      id: 3, 
      template: "Reservation Confirmation", 
      recipient: "+1234567890", 
      channel: "sms", 
      status: "failed", 
      timestamp: "2023-05-14 18:45:33",
      content: "Your reservation for 4 guests on May 18, 2023 at 7:30 PM is confirmed. Reservation ID: RES-2023-089"
    }
  ];

  // Filter notifications based on active tab and search term
  const filteredTemplates = notificationTemplates.filter(template => {
    if (activeTab !== "all" && template.type !== activeTab) return false;
    if (searchTerm && !template.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 p-6">
      <header className="mb-8">
        <h1 className="text-gray-800 text-3xl font-bold mb-2">Alerts & Notifications</h1>
        <p className="text-gray-600">Manage automated alerts and notifications across all channels</p>
      </header>

      {/* Tabs Navigation */}
      <div className="flex mb-6 border-b border-gray-200">
        <button
          className={`px-4 py-2 font-medium text-sm transition-colors duration-200 ${
            activeTab === "all"
              ? "text-purple-700 border-b-2 border-purple-600"
              : "text-gray-600 hover:text-purple-600"
          }`}
          onClick={() => setActiveTab("all")}
        >
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            <span>All Templates</span>
          </div>
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm transition-colors duration-200 ${
            activeTab === "system"
              ? "text-purple-700 border-b-2 border-purple-600"
              : "text-gray-600 hover:text-purple-600"
          }`}
          onClick={() => setActiveTab("system")}
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            <span>System Alerts</span>
          </div>
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm transition-colors duration-200 ${
            activeTab === "scheduled"
              ? "text-purple-700 border-b-2 border-purple-600"
              : "text-gray-600 hover:text-purple-600"
          }`}
          onClick={() => setActiveTab("scheduled")}
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Scheduled</span>
          </div>
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm transition-colors duration-200 ${
            activeTab === "trigger"
              ? "text-purple-700 border-b-2 border-purple-600"
              : "text-gray-600 hover:text-purple-600"
          }`}
          onClick={() => setActiveTab("trigger")}
        >
          <div className="flex items-center gap-2">
            <Send className="w-4 h-4" />
            <span>Event Triggered</span>
          </div>
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm transition-colors duration-200 ${
            activeTab === "approval"
              ? "text-purple-700 border-b-2 border-purple-600"
              : "text-gray-600 hover:text-purple-600"
          }`}
          onClick={() => setActiveTab("approval")}
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>Approvals</span>
          </div>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notification Templates */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="font-bold text-gray-800">Notification Templates</h2>
              <button 
                className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm flex items-center gap-1"
                onClick={() => setShowAddModal(true)}
              >
                <Plus className="w-4 h-4" />
                <span>Create Template</span>
              </button>
            </div>
            <div className="p-4">
              <div className="flex justify-between mb-4">
                <div className="relative w-64">
                  <input
                    type="text"
                    placeholder="Search templates..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                </div>
                <div className="flex gap-2">
                  <select className="px-3 py-2 border border-gray-300 rounded-md text-gray-700">
                    <option value="all">All Modules</option>
                    <option value="inventory">Inventory</option>
                    <option value="sales">Sales</option>
                    <option value="crm">CRM</option>
                    <option value="hr">HR</option>
                    <option value="purchase">Purchase</option>
                    <option value="menu">Menu</option>
                  </select>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Template Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Channels</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Module</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredTemplates.map(template => (
                      <tr key={template.id}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{template.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            template.type === "system" 
                              ? "bg-red-100 text-red-800" 
                              : template.type === "scheduled"
                              ? "bg-blue-100 text-blue-800"
                              : template.type === "trigger"
                              ? "bg-green-100 text-green-800"
                              : "bg-purple-100 text-purple-800"
                          }`}>
                            {template.type.charAt(0).toUpperCase() + template.type.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <div className="flex space-x-1">
                            {template.channels.includes("email") && (
                              <Mail className="w-4 h-4 text-gray-600" />
                            )}
                            {template.channels.includes("sms") && (
                              <MessageSquare className="w-4 h-4 text-gray-600" />
                            )}
                            {template.channels.includes("app") && (
                              <Bell className="w-4 h-4 text-gray-600" />
                            )}
                            {template.channels.includes("whatsapp") && (
                              <MessageSquare className="w-4 h-4 text-green-600" />
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 capitalize">{template.module}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <button className="p-1 text-gray-500 hover:text-purple-600">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-500 hover:text-red-600">
                              <Trash className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-500 hover:text-gray-700">
                              <MoreHorizontal className="w-4 h-4" />
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
        </div>
        
        {/* Recent Notifications */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-bold text-gray-800">Recent Notifications</h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {recentNotifications.map(notification => (
                  <div key={notification.id} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-full ${
                          notification.channel === "email" 
                            ? "bg-blue-100" 
                            : notification.channel === "sms"
                            ? "bg-green-100"
                            : "bg-purple-100"
                        }`}>
                          {notification.channel === "email" ? (
                            <Mail className="w-4 h-4 text-blue-600" />
                          ) : notification.channel === "sms" ? (
                            <MessageSquare className="w-4 h-4 text-green-600" />
                          ) : (
                            <Bell className="w-4 h-4 text-purple-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">{notification.template}</h3>
                          <p className="text-xs text-gray-500">To: {notification.recipient}</p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        notification.status === "sent" 
                          ? "bg-green-100 text-green-800" 
                          : notification.status === "failed"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{notification.content}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-xs text-gray-500">{notification.timestamp}</span>
                      <button className="text-xs text-purple-600 hover:text-purple-800">Resend</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Channel Settings */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm mt-6">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-bold text-gray-800">Notification Channels</h2>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <div>
                      <h3 className="font-medium text-gray-800">Email</h3>
                      <p className="text-xs text-gray-500">SMTP configured</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                    <span className="text-sm text-gray-600">Active</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-green-600" />
                    <div>
                      <h3 className="font-medium text-gray-800">SMS</h3>
                      <p className="text-xs text-gray-500">API connected</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                    <span className="text-sm text-gray-600">Active</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-green-600" />
                    <div>
                      <h3 className="font-medium text-gray-800">WhatsApp</h3>
                      <p className="text-xs text-gray-500">API connected</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                    <span className="text-sm text-gray-600">Active</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-purple-600" />
                    <div>
                      <h3 className="font-medium text-gray-800">In-App</h3>
                      <p className="text-xs text-gray-500">Push notifications</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                    <span className="text-sm text-gray-600">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Template Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">Create Notification Template</h3>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowAddModal(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Template Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="e.g. Order Confirmation"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option value="system">System Alert</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="trigger">Event Triggered</option>
                  <option value="approval">Approval</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Module</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option value="inventory">Inventory</option>
                  <option value="sales">Sales</option>
                  <option value="crm">CRM</option>
                  <option value="hr">HR</option>
                  <option value="purchase">Purchase</option>
                  <option value="menu">Menu</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Channels</label>
                <div className="flex gap-3">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded text-purple-600" />
                    <span className="text-sm text-gray-700">Email</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded text-purple-600" />
                    <span className="text-sm text-gray-700">SMS</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded text-purple-600" />
                    <span className="text-sm text-gray-700">In-App</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded text-purple-600" />
                    <span className="text-sm text-gray-700">WhatsApp</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message Template</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md h-24"
                  placeholder="Enter message with placeholders like {variable_name}"
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">Use curly braces for variables, e.g. {'{customer_name}'}</p>
              </div>
              
              <div className="flex justify-end gap-2 pt-2">
                <button 
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button"
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Create Template
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertsAndNotifications;

