import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Nav from "../Nav";

import {
  Bell,
  Truck,
  ClipboardList,
  Factory,
  Scale,
  CheckCircle,
  UserPlus,
  Pencil,
  Wallet,
  Clock,
  BadgeCheck,
  Trash2,
  Eye,
  X,
  Plus,
} from "lucide-react";

export default function PurchaseAdmin() {
  const [vendors, setVendors] = useState([
    { id: 1, name: "ABC Suppliers", contact: "suppliers@abc.com", category: "Electronics", address: "123 Tech Street, Mumbai" },
    { id: 2, name: "XYZ Materials", contact: "purchasing@xyz.com", category: "Raw Materials", address: "456 Industrial Area, Delhi" },
    { id: 3, name: "Smart Solutions", contact: "info@smartsol.com", category: "Software", address: "789 IT Park, Bangalore" },
  ]);

  const [pendingPOs, setPendingPOs] = useState([
    { id: 1, poNumber: "PO-2024-050", vendor: "ABC Corp", amount: 125000, date: "2024-03-15", status: "pending" },
    { id: 2, poNumber: "PO-2024-051", vendor: "XYZ Ltd", amount: 89000, date: "2024-03-14", status: "pending" },
    { id: 3, poNumber: "PO-2024-052", vendor: "Smart Solutions", amount: 156000, date: "2024-03-13", status: "pending" },
  ]);

  const [recentPurchases, setRecentPurchases] = useState([
    { id: 1, poNumber: "PO-2024-044", description: "Office Supplies", amount: 45800, vendor: "Office Mart", status: "completed", date: "2024-03-10" },
    { id: 2, poNumber: "PO-2024-043", description: "IT Equipment", amount: 215000, vendor: "Tech World", status: "in-transit", date: "2024-03-08" },
    { id: 3, poNumber: "PO-2024-042", description: "Raw Materials", amount: 89500, vendor: "Material Hub", status: "completed", date: "2024-03-05" },
  ]);

  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editVendor, setEditVendor] = useState(null);
  const [viewData, setViewData] = useState(null);
  const [newVendor, setNewVendor] = useState({
    name: "",
    contact: "",
    category: "",
    address: ""
  });

  // Handle edit vendor
  const handleEditVendor = (vendor) => {
    setEditVendor({ ...vendor });
    setIsEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditVendor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveVendor = (e) => {
    e.preventDefault();
    setVendors((prev) =>
      prev.map((v) => (v.id === editVendor.id ? editVendor : v))
    );
    setIsEditModalOpen(false);
  };

  // Handle add vendor
  const handleAddVendor = (e) => {
    e.preventDefault();
    const id = Math.max(...vendors.map(v => v.id)) + 1;
    setVendors(prev => [...prev, { ...newVendor, id }]);
    setNewVendor({ name: "", contact: "", category: "", address: "" });
    setIsAddModalOpen(false);
  };

  const handleNewVendorChange = (e) => {
    const { name, value } = e.target;
    setNewVendor(prev => ({ ...prev, [name]: value }));
  };

  // Handle delete vendor
  const handleDeleteVendor = (id) => {
    setVendors(prev => prev.filter(v => v.id !== id));
  };

  // Handle PO approval/rejection
  const handleApprovePO = (id) => {
    setPendingPOs(prev => prev.filter(po => po.id !== id));
  };

  const handleRejectPO = (id) => {
    setPendingPOs(prev => prev.filter(po => po.id !== id));
  };

  // Handle view details
  const handleViewDetails = (data, type) => {
    setViewData({ ...data, type });
    setIsViewModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
    

      <div className="relative z-10 p-8 ml-64" >
        <Nav/>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-black">Purchase Administration</h2>
            <p className="text-gray-700">Vendor and procurement management</p>
          </div>
          <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-200">
            <Bell className="w-5 h-5" />
          </Button>
        </div>

        {/* Vendor Management Table */}
        <Card className="border border-purple-500/20 bg-white backdrop-blur-sm mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-black">Vendor Management</CardTitle>
            <Button 
              className="bg-purple-600 hover:bg-purple-700 text-white"
              onClick={() => setIsAddModalOpen(true)}
            >
              <UserPlus className="w-4 h-4 mr-2" /> Add New Vendor
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-3 font-semibold text-black">Vendor Name</th>
                    <th className="text-left p-3 font-semibold text-black">Contact</th>
                    <th className="text-left p-3 font-semibold text-black">Category</th>
                    <th className="text-left p-3 font-semibold text-black">Address</th>
                    <th className="text-left p-3 font-semibold text-black">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.map((vendor) => (
                    <tr
                      key={vendor.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="p-3 text-black font-medium">{vendor.name}</td>
                      <td className="p-3 text-gray-600">{vendor.contact}</td>
                      <td className="p-3 text-gray-600">{vendor.category}</td>
                      <td className="p-3 text-gray-600">{vendor.address}</td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-purple-700 border-purple-500/50"
                            onClick={() => handleEditVendor(vendor)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-blue-700 border-blue-500/50"
                            onClick={() => handleViewDetails(vendor, 'vendor')}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-700 border-red-500/50"
                            onClick={() => handleDeleteVendor(vendor.id)}
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

        {/* High-Value PO Approvals Table */}
        <Card className="border border-purple-500/20 bg-white backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-black">High-Value PO Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-3 font-semibold text-black">PO Number</th>
                    <th className="text-left p-3 font-semibold text-black">Vendor</th>
                    <th className="text-left p-3 font-semibold text-black">Amount</th>
                    <th className="text-left p-3 font-semibold text-black">Date</th>
                    <th className="text-left p-3 font-semibold text-black">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingPOs.map((po) => (
                    <tr
                      key={po.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="p-3 text-black font-medium">{po.poNumber}</td>
                      <td className="p-3 text-gray-600">{po.vendor}</td>
                      <td className="p-3 text-gray-600">₹{po.amount.toLocaleString()}</td>
                      <td className="p-3 text-gray-600">{po.date}</td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => handleApprovePO(po.id)}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" /> Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleRejectPO(po.id)}
                          >
                            Reject
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-blue-700 border-blue-500/50"
                            onClick={() => handleViewDetails(po, 'po')}
                          >
                            <Eye className="w-4 h-4" />
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

        {/* Recent Purchases Table */}
        <Card className="border border-purple-500/20 bg-white backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-black">Recent Purchases</CardTitle>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <ClipboardList className="w-4 h-4 mr-2" /> View All POs
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-3 font-semibold text-black">PO Number</th>
                    <th className="text-left p-3 font-semibold text-black">Description</th>
                    <th className="text-left p-3 font-semibold text-black">Vendor</th>
                    <th className="text-left p-3 font-semibold text-black">Amount</th>
                    <th className="text-left p-3 font-semibold text-black">Date</th>
                    <th className="text-left p-3 font-semibold text-black">Status</th>
                    <th className="text-left p-3 font-semibold text-black">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPurchases.map((purchase) => (
                    <tr
                      key={purchase.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="p-3 text-black font-medium">{purchase.poNumber}</td>
                      <td className="p-3 text-gray-600">{purchase.description}</td>
                      <td className="p-3 text-gray-600">{purchase.vendor}</td>
                      <td className="p-3 text-gray-600">₹{purchase.amount.toLocaleString()}</td>
                      <td className="p-3 text-gray-600">{purchase.date}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          purchase.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {purchase.status === 'completed' ? 'Completed' : 'In Transit'}
                        </span>
                      </td>
                      <td className="p-3">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-blue-700 border-blue-500/50"
                          onClick={() => handleViewDetails(purchase, 'purchase')}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Vendor Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Vendor</h2>
              <Button variant="ghost" size="sm" onClick={() => setIsAddModalOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div onSubmit={handleAddVendor}>
              <div>
                <label className="block text-sm font-medium mb-1">Vendor Name</label>
                <input
                  type="text"
                  name="name"
                  value={newVendor.name}
                  onChange={handleNewVendorChange}
                  className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Contact Email</label>
                <input
                  type="email"
                  name="contact"
                  value={newVendor.contact}
                  onChange={handleNewVendorChange}
                  className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <input
                  type="text"
                  name="category"
                  value={newVendor.category}
                  onChange={handleNewVendorChange}
                  className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <textarea
                  name="address"
                  value={newVendor.address}
                  onChange={handleNewVendorChange}
                  className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-black"
                  rows={3}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="button" className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleAddVendor}>
                  <Plus className="w-4 h-4 mr-2" /> Add Vendor
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Vendor Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Vendor</h2>
              <Button variant="ghost" size="sm" onClick={() => setIsEditModalOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div onSubmit={handleSaveVendor} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Vendor Name</label>
                <input
                  type="text"
                  name="name"
                  value={editVendor.name}
                  onChange={handleEditChange}
                  className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Contact Email</label>
                <input
                  type="email"
                  name="contact"
                  value={editVendor.contact}
                  onChange={handleEditChange}
                  className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <input
                  type="text"
                  name="category"
                  value={editVendor.category}
                  onChange={handleEditChange}
                  className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <textarea
                  name="address"
                  value={editVendor.address}
                  onChange={handleEditChange}
                  className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-black"
                  rows={3}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="button" className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleSaveVendor}>
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {isViewModalOpen && viewData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {viewData.type === 'vendor' ? 'Vendor Details' : 
                 viewData.type === 'po' ? 'Purchase Order Details' : 'Purchase Details'}
              </h2>
              <Button variant="ghost" size="sm" onClick={() => setIsViewModalOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-3">
              {viewData.type === 'vendor' && (
                <>
                  <div><strong>Name:</strong> {viewData.name}</div>
                  <div><strong>Contact:</strong> {viewData.contact}</div>
                  <div><strong>Category:</strong> {viewData.category}</div>
                  <div><strong>Address:</strong> {viewData.address}</div>
                </>
              )}
              {viewData.type === 'po' && (
                <>
                  <div><strong>PO Number:</strong> {viewData.poNumber}</div>
                  <div><strong>Vendor:</strong> {viewData.vendor}</div>
                  <div><strong>Amount:</strong> ₹{viewData.amount.toLocaleString()}</div>
                  <div><strong>Date:</strong> {viewData.date}</div>
                  <div><strong>Status:</strong> {viewData.status}</div>
                </>
              )}
              {viewData.type === 'purchase' && (
                <>
                  <div><strong>PO Number:</strong> {viewData.poNumber}</div>
                  <div><strong>Description:</strong> {viewData.description}</div>
                  <div><strong>Vendor:</strong> {viewData.vendor}</div>
                  <div><strong>Amount:</strong> ₹{viewData.amount.toLocaleString()}</div>
                  <div><strong>Date:</strong> {viewData.date}</div>
                  <div><strong>Status:</strong> {viewData.status}</div>
                </>
              )}
            </div>
            <div className="flex justify-end mt-6">
              <Button onClick={() => setIsViewModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}