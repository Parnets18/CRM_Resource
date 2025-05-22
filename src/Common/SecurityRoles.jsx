import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  Lock, 
  Key, 
  UserPlus, 
  Settings, 
  FileText, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Search,
  Plus,
  Edit,
  Trash,
  MoreHorizontal,
  Bell,
  X
} from 'lucide-react';

const SecurityRoles = () => {
  const [activeTab, setActiveTab] = useState("roles");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [newRoleData, setNewRoleData] = useState({
    name: "",
    description: "",
    permissions: {
      dashboard: false,
      sales: false,
      purchase: false,
      inventory: false,
      menu: false,
      tableManagement: false,
      customers: false,
      hr: false,
      attendance: false,
      payroll: false,
      finance: false,
      reports: false,
      security: false,
      alerts: false,
      kitchenDisplay: false
    }
  });
  const [newUserData, setNewUserData] = useState({
    name: "",
    email: "",
    role: "Restaurant Admin",
    status: "Active"
  });
  
  // Updated sample data to match restaurant workflow
  const roles = [
    { 
      id: 1, 
      name: "Restaurant Admin", 
      description: "Full system access with all permissions", 
      users: 2,
      permissions: {
        dashboard: true,
        sales: true,
        purchase: true,
        inventory: true,
        menu: true,
        tableManagement: true,
        customers: true,
        hr: true,
        attendance: true,
        payroll: true,
        finance: true,
        reports: true,
        security: true,
        alerts: true,
        kitchenDisplay: true
      }
    },
    { 
      id: 2, 
      name: "Restaurant Manager", 
      description: "Manage restaurant operations and customer data", 
      users: 3,
      permissions: {
        dashboard: true,
        sales: true,
        purchase: true,
        inventory: true,
        menu: true,
        tableManagement: true,
        customers: true,
        hr: false,
        attendance: true,
        payroll: false,
        finance: true,
        reports: true,
        security: false,
        alerts: true,
        kitchenDisplay: true
      }
    },
    { 
      id: 3, 
      name: "Chef", 
      description: "Manage kitchen operations and inventory", 
      users: 4,
      permissions: {
        dashboard: true,
        sales: false,
        purchase: false,
        inventory: true,
        menu: true,
        tableManagement: false,
        customers: false,
        hr: false,
        attendance: true,
        payroll: false,
        finance: false,
        reports: false,
        security: false,
        alerts: true,
        kitchenDisplay: true
      }
    },
    { 
      id: 4, 
      name: "Cashier", 
      description: "Manage billing and payments", 
      users: 3,
      permissions: {
        dashboard: true,
        sales: true,
        purchase: false,
        inventory: false,
        menu: true,
        tableManagement: true,
        customers: true,
        hr: false,
        attendance: false,
        payroll: false,
        finance: true,
        reports: false,
        security: false,
        alerts: false,
        kitchenDisplay: false
      }
    },
    { 
      id: 5, 
      name: "Waiter", 
      description: "Manage orders and table service", 
      users: 6,
      permissions: {
        dashboard: true,
        sales: true,
        purchase: false,
        inventory: false,
        menu: true,
        tableManagement: true,
        customers: true,
        hr: false,
        attendance: false,
        payroll: false,
        finance: false,
        reports: false,
        security: false,
        alerts: true,
        kitchenDisplay: true
      }
    }
  ];

  const users = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Restaurant Admin", status: "Active", lastLogin: "2023-05-15 09:30" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "Restaurant Manager", status: "Active", lastLogin: "2023-05-14 14:45" },
    { id: 3, name: "Robert Johnson", email: "robert.j@example.com", role: "Chef", status: "Active", lastLogin: "2023-05-15 11:20" },
    { id: 4, name: "Emily Davis", email: "emily.d@example.com", role: "Cashier", status: "Inactive", lastLogin: "2023-05-10 16:15" },
    { id: 5, name: "Michael Wilson", email: "michael.w@example.com", role: "Waiter", status: "Active", lastLogin: "2023-05-15 08:50" },
    { id: 6, name: "Sarah Brown", email: "sarah.b@example.com", role: "Restaurant Manager", status: "Active", lastLogin: "2023-05-14 17:30" },
    { id: 7, name: "David Miller", email: "david.m@example.com", role: "Cashier", status: "Active", lastLogin: "2023-05-15 10:10" }
  ];

  // Updated audit logs to match restaurant workflow
  const auditLogs = [
    { id: 1, user: "John Doe", action: "User Login", details: "Successful login", timestamp: "2023-05-15 09:30:15", ipAddress: "192.168.1.100" },
    { id: 2, user: "Jane Smith", action: "Menu Modified", details: "Updated menu item prices", timestamp: "2023-05-14 14:45:22", ipAddress: "192.168.1.101" },
    { id: 3, user: "Robert Johnson", action: "Inventory Alert", details: "Low stock alert for Chicken", timestamp: "2023-05-14 11:20:45", ipAddress: "192.168.1.102" },
    { id: 4, user: "Emily Davis", action: "Payment Processed", details: "Table #5 bill settled", timestamp: "2023-05-13 16:15:30", ipAddress: "192.168.1.103" },
    { id: 5, user: "John Doe", action: "Role Created", details: "Created new role: Waiter", timestamp: "2023-05-12 10:05:18", ipAddress: "192.168.1.100" },
    { id: 6, user: "System", action: "Backup Created", details: "Automatic system backup", timestamp: "2023-05-12 00:00:05", ipAddress: "localhost" },
    { id: 7, user: "Jane Smith", action: "User Deactivated", details: "Deactivated user: Emily Davis", timestamp: "2023-05-10 16:15:30", ipAddress: "192.168.1.101" }
  ];

  // Handle role selection
  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  // Handle new role form changes
  const handleRoleFormChange = (e) => {
    const { name, value } = e.target;
    setNewRoleData({
      ...newRoleData,
      [name]: value
    });
  };

  // Handle permission toggle
  const handlePermissionToggle = (permission) => {
    setNewRoleData({
      ...newRoleData,
      permissions: {
        ...newRoleData.permissions,
        [permission]: !newRoleData.permissions[permission]
      }
    });
  };

  // Handle new user form changes
  const handleUserFormChange = (e) => {
    const { name, value } = e.target;
    setNewUserData({
      ...newUserData,
      [name]: value
    });
  };

  // Add new role
  const handleAddRole = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to add the role
    // For now, we'll just close the modal
    setShowAddRoleModal(false);
    // Reset form
    setNewRoleData({
      name: "",
      description: "",
      permissions: {
        dashboard: false,
        sales: false,
        purchase: false,
        inventory: false,
        menu: false,
        tableManagement: false,
        customers: false,
        hr: false,
        attendance: false,
        payroll: false,
        finance: false,
        reports: false,
        security: false,
        alerts: false,
        kitchenDisplay: false
      }
    });
  };

  // Add new user
  const handleAddUser = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to add the user
    // For now, we'll just close the modal
    setShowAddUserModal(false);
    // Reset form
    setNewUserData({
      name: "",
      email: "",
      role: "Restaurant Admin",
      status: "Active"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 p-6">
      <header className="mb-8">
        <h1 className="text-gray-800 text-3xl font-bold mb-2">Security & Roles Management</h1>
        <p className="text-gray-600">Manage user roles, permissions, and security settings for restaurant operations</p>
      </header>

      {/* Tabs Navigation */}
      <div className="flex mb-6 border-b border-gray-200">
        <button
          className={`px-4 py-2 font-medium text-sm transition-colors duration-200 ${
            activeTab === "roles"
              ? "text-purple-700 border-b-2 border-purple-600"
              : "text-gray-600 hover:text-purple-600"
          }`}
          onClick={() => setActiveTab("roles")}
        >
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>Roles & Permissions</span>
          </div>
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm transition-colors duration-200 ${
            activeTab === "users"
              ? "text-purple-700 border-b-2 border-purple-600"
              : "text-gray-600 hover:text-purple-600"
          }`}
          onClick={() => setActiveTab("users")}
        >
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>User Access</span>
          </div>
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm transition-colors duration-200 ${
            activeTab === "audit"
              ? "text-purple-700 border-b-2 border-purple-600"
              : "text-gray-600 hover:text-purple-600"
          }`}
          onClick={() => setActiveTab("audit")}
        >
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span>Audit Logs</span>
          </div>
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm transition-colors duration-200 ${
            activeTab === "notifications"
              ? "text-purple-700 border-b-2 border-purple-600"
              : "text-gray-600 hover:text-purple-600"
          }`}
          onClick={() => setActiveTab("notifications")}
        >
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            <span>Notification Settings</span>
          </div>
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm transition-colors duration-200 ${
            activeTab === "settings"
              ? "text-purple-700 border-b-2 border-purple-600"
              : "text-gray-600 hover:text-purple-600"
          }`}
          onClick={() => setActiveTab("settings")}
        >
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            <span>Security Settings</span>
          </div>
        </button>
      </div>

      {/* Roles & Permissions Tab */}
      {activeTab === "roles" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="font-bold text-gray-800">Restaurant Role List</h2>
                <button 
                  className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm flex items-center gap-1"
                  onClick={() => setShowAddRoleModal(true)}
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Role</span>
                </button>
              </div>
              <div className="p-4">
                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="Search roles..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                </div>
                <div className="space-y-2">
                  {roles.map(role => (
                    <div 
                      key={role.id}
                      className={`p-3 border rounded-md cursor-pointer transition-colors ${
                        selectedRole && selectedRole.id === role.id
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-purple-300 hover:bg-purple-50"
                      }`}
                      onClick={() => handleRoleSelect(role)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-800">{role.name}</h3>
                          <p className="text-sm text-gray-600">{role.description}</p>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                            {role.users} users
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            {selectedRole ? (
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{selectedRole.name}</h2>
                    <p className="text-gray-600">{selectedRole.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm flex items-center gap-1">
                      <Edit className="w-4 h-4" />
                      <span>Edit Role</span>
                    </button>
                    <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm flex items-center gap-1">
                      <Trash className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
                
                <h3 className="font-medium text-gray-800 mb-4">Restaurant Permissions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(selectedRole.permissions).map(([key, value]) => (
                    <div key={key} className="flex items-center p-3 border border-gray-200 rounded-md">
                      {value ? (
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500 mr-2" />
                      )}
                      <span className="text-gray-800 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </div>
                  ))}
                </div>
                
                <h3 className="font-medium text-gray-800 mt-6 mb-4">Users with this role</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.filter(user => user.role === selectedRole.name).map(user => (
                        <tr key={user.id}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{user.name}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              user.status === "Active" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-red-100 text-red-800"
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{user.lastLogin}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 text-center">
                <Shield className="w-16 h-16 text-purple-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">Select a Role</h3>
                <p className="text-gray-600">Choose a role from the list to view and manage its permissions</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* User Access Tab */}
      {activeTab === "users" && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="font-bold text-gray-800">Restaurant Staff Access Management</h2>
            <button 
              className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm flex items-center gap-1"
              onClick={() => setShowAddUserModal(true)}
            >
              <UserPlus className="w-4 h-4" />
              <span>Add User</span>
            </button>
          </div>
          <div className="p-4">
            <div className="flex justify-between mb-4">
              <div className="relative w-64">
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              <div className="flex gap-2">
                <select className="px-3 py-2 border border-gray-300 rounded-md text-gray-700">
                  <option value="all">All Roles</option>
                  <option value="admin">Administrator</option>
                  <option value="sales">Sales Manager</option>
                  <option value="hr">HR Manager</option>
                  <option value="accountant">Accountant</option>
                  <option value="inventory">Inventory Manager</option>
                </select>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map(user => (
                    <tr key={user.id}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{user.name}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{user.role}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          user.status === "Active" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{user.lastLogin}</td>
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
      )}

      {/* Audit Logs Tab */}
      {activeTab === "audit" && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="font-bold text-gray-800">Audit Logs</h2>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search logs..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {auditLogs.map(log => (
                    <tr key={log.id}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{log.user}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{log.action}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{log.details}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{log.timestamp}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{log.ipAddress}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Security Settings Tab */}
      {activeTab === "settings" && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8">
          <h2 className="font-bold text-gray-800 mb-4">Security Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2">Two-Factor Authentication</h3>
              <p className="text-gray-600">Enable two-factor authentication for added security</p>
              <div className="flex items-center gap-2 mt-4">
                <input type="checkbox" className="form-checkbox" />
                <span className="text-gray-800">Enable 2FA</span>
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2">Password Policy</h3>
              <p className="text-gray-600">Set password requirements for user accounts</p>
              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="text-gray-800">Require minimum length</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="text-gray-800">Require uppercase letters</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="text-gray-800">Require lowercase letters</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="text-gray-800">Require numbers</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="text-gray-800">Require special characters</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Role Modal */}
      {showAddRoleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">Add New Role</h3>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowAddRoleModal(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddRole} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={newRoleData.name}
                  onChange={handleRoleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="e.g. Kitchen Manager"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  name="description"
                  value={newRoleData.description}
                  onChange={handleRoleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md h-20"
                  placeholder="Describe the role's responsibilities"
                  required
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(newRoleData.permissions).map(permission => (
                    <label key={permission} className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        checked={newRoleData.permissions[permission]}
                        onChange={() => handlePermissionToggle(permission)}
                        className="rounded text-purple-600" 
                      />
                      <span className="text-sm text-gray-700 capitalize">
                        {permission.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-2">
                <button 
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  onClick={() => setShowAddRoleModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Add Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">Add New User</h3>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowAddUserModal(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={newUserData.name}
                  onChange={handleUserFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter full name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={newUserData.email}
                  onChange={handleUserFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="email@example.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select 
                  name="role"
                  value={newUserData.role}
                  onChange={handleUserFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Restaurant Admin">Restaurant Admin</option>
                  <option value="Restaurant Manager">Restaurant Manager</option>
                  <option value="Chef">Chef</option>
                  <option value="Cashier">Cashier</option>
                  <option value="Waiter">Waiter</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select 
                  name="status"
                  value={newUserData.status}
                  onChange={handleUserFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              
              <div className="flex justify-end gap-2 pt-2">
                <button 
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  onClick={() => setShowAddUserModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityRoles;



