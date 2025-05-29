import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Package, Truck, Clock, CheckCircle2, AlertCircle, ClipboardList, X, Search, Filter } from "lucide-react";
import Nav from '../Nav';
// Mock Nav component


export default function InventorySite() {
  const [indentRequests, setIndentRequests] = useState([
    { id: 1, material: "Cement", quantity: 100, unit: "bags", status: "pending", urgency: "normal", phase: "foundation", requested: "2024-03-15", requestedBy: "John Doe" },
    { id: 2, material: "Steel Bars", quantity: 500, unit: "kg", status: "approved", urgency: "urgent", phase: "structure", requested: "2024-03-14", requestedBy: "Jane Smith" },
    { id: 3, material: "Electrical Wiring", quantity: 200, unit: "meters", status: "delivered", urgency: "normal", phase: "mep", requested: "2024-03-10", requestedBy: "Mike Johnson" }
  ]);

  const [newRequest, setNewRequest] = useState({
    material: '',
    quantity: '',
    unit: '',
    urgency: '',
    phase: '',
    notes: ''
  });

  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showRequestForm, setShowRequestForm] = useState(false);

  const handleCreateRequest = () => {
    if (!newRequest.material || !newRequest.quantity || !newRequest.urgency || !newRequest.phase) {
      alert('Please fill in all required fields');
      return;
    }

    const request = {
      id: Date.now(),
      ...newRequest,
      quantity: parseInt(newRequest.quantity),
      status: 'pending',
      requested: new Date().toISOString().split('T')[0],
      requestedBy: 'Current User'
    };

    setIndentRequests(prev => [request, ...prev]);
    setNewRequest({
      material: '',
      quantity: '',
      unit: '',
      urgency: '',
      phase: '',
      notes: ''
    });
    setShowRequestForm(false);
  };

  const updateRequestStatus = (id, newStatus) => {
    setIndentRequests(prev => 
      prev.map(req => 
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
  };

  const deleteRequest = (id) => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      setIndentRequests(prev => prev.filter(req => req.id !== id));
    }
  };

  const filteredRequests = indentRequests.filter(request => {
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    const matchesSearch = request.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.phase.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statusCounts = {
    total: indentRequests.length,
    pending: indentRequests.filter(r => r.status === 'pending').length,
    approved: indentRequests.filter(r => r.status === 'approved').length,
    delivered: indentRequests.filter(r => r.status === 'delivered').length
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'approved': return 'text-blue-600 bg-blue-100';
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical': return 'text-red-600';
      case 'urgent': return 'text-orange-600';
      case 'normal': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-purple-200 lg:ml-64">
      <div className="relative z-10 flex">
        <Nav />

        <div className="flex-1 p-8 mt-16 md:mt-0">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Site Supervisor Dashboard</h2>
              <p className="text-gray-600">Construction Site Material Management</p>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => setShowRequestForm(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Package className="w-4 h-4 mr-2" />
                New Request
              </Button>
              <Button variant="ghost" size="icon" className="text-purple-700 hover:bg-purple-100">
                <Bell className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border border-purple-200 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">Total Indents</CardTitle>
                <ClipboardList className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{statusCounts.total}</div>
                <p className="text-xs text-green-600">Active requests</p>
              </CardContent>
            </Card>

            <Card className="border border-purple-200 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">Pending</CardTitle>
                <Clock className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{statusCounts.pending}</div>
                <p className="text-xs text-yellow-600">Awaiting approval</p>
              </CardContent>
            </Card>

            <Card className="border border-purple-200 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">Approved</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{statusCounts.approved}</div>
                <p className="text-xs text-blue-600">Ready for delivery</p>
              </CardContent>
            </Card>

            <Card className="border border-purple-200 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">Delivered</CardTitle>
                <Package className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{statusCounts.delivered}</div>
                <p className="text-xs text-green-600">Completed</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <Card className="border border-purple-200 bg-white/80 backdrop-blur-sm mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search materials or project phase..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Indent Requests List */}
          <Card className="border border-purple-200 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <ClipboardList className="w-5 h-5" />
                Indent Requests ({filteredRequests.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredRequests.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No requests found matching your criteria
                  </div>
                ) : (
                  filteredRequests.map((request) => (
                    <div 
                      key={request.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{request.material}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                            {request.status}
                          </span>
                          <span className={`text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                            {request.urgency}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Quantity:</span> {request.quantity} {request.unit}
                          </div>
                          <div>
                            <span className="font-medium">Phase:</span> {request.phase}
                          </div>
                          <div>
                            <span className="font-medium">Requested:</span> {request.requested}
                          </div>
                          <div>
                            <span className="font-medium">By:</span> {request.requestedBy}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        {request.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateRequestStatus(request.id, 'approved')}
                              className="text-blue-600 border-blue-200 hover:bg-blue-50"
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateRequestStatus(request.id, 'rejected')}
                              className="text-red-600 border-red-200 hover:bg-red-50"
                            >
                              Reject
                            </Button>
                          </>
                        )}
                        {request.status === 'approved' && (
                          <Button
                            size="sm"
                            onClick={() => updateRequestStatus(request.id, 'delivered')}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            Mark Delivered
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteRequest(request.id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* New Request Modal */}
      {showRequestForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-gray-900">Create New Indent Request</CardTitle>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowRequestForm(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Material Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={newRequest.material}
                      onChange={(e) => setNewRequest(prev => ({ ...prev, material: e.target.value }))}
                      placeholder="e.g., Cement, Steel Bars"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={newRequest.quantity}
                      onChange={(e) => setNewRequest(prev => ({ ...prev, quantity: e.target.value }))}
                      placeholder="Enter quantity"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Unit
                    </label>
                    <select
                      value={newRequest.unit}
                      onChange={(e) => setNewRequest(prev => ({ ...prev, unit: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select Unit</option>
                      <option value="pieces">Pieces</option>
                      <option value="kg">Kilograms</option>
                      <option value="bags">Bags</option>
                      <option value="meters">Meters</option>
                      <option value="liters">Liters</option>
                      <option value="boxes">Boxes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Urgency *
                    </label>
                    <select
                      required
                      value={newRequest.urgency}
                      onChange={(e) => setNewRequest(prev => ({ ...prev, urgency: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select Urgency</option>
                      <option value="normal">Normal</option>
                      <option value="urgent">Urgent</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Phase *
                  </label>
                  <select
                    required
                    value={newRequest.phase}
                    onChange={(e) => setNewRequest(prev => ({ ...prev, phase: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select Project Phase</option>
                    <option value="foundation">Foundation</option>
                    <option value="structure">Structure</option>
                    <option value="mep">MEP (Mechanical, Electrical, Plumbing)</option>
                    <option value="finishing">Finishing</option>
                    <option value="landscaping">Landscaping</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    value={newRequest.notes}
                    onChange={(e) => setNewRequest(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Additional notes or specifications..."
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    onClick={handleCreateRequest}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    <Truck className="w-4 h-4 mr-2" />
                    Create Indent Request
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setShowRequestForm(false)}
                    className="px-6"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}