import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, Users, Plus, Edit3, Trash2, Search, MapPin, User, DollarSign, Calendar, X, CheckCircle } from "lucide-react";
import Nav from '../Nav';
export default function SiteManagementCRUD() {
  const [sites, setSites] = useState([
    { id: 1, name: "Downtown Complex", location: "New York", manager: "Sarah Johnson", budget: "$2.5M", workers: 45, status: "Active", startDate: "2024-01-15" },
    { id: 2, name: "Tech Hub", location: "San Francisco", manager: "Michael Chen", budget: "$3.8M", workers: 32, status: "Active", startDate: "2024-03-01" },
    { id: 3, name: "Residential Tower", location: "Chicago", manager: "Emily Rodriguez", budget: "$4.2M", workers: 12, status: "Planning", startDate: "2024-06-01" }
  ]);
  
  const [showForm, setShowForm] = useState(false);
  const [editingSite, setEditingSite] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "", location: "", manager: "", budget: "", workers: "", status: "Active", startDate: ""
  });

  const filteredSites = sites.filter(site => 
    site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    site.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = () => {
    if (!formData.name || !formData.location || !formData.manager || !formData.budget || !formData.workers || !formData.startDate) {
      alert("Please fill in all required fields");
      return;
    }
    if (editingSite) {
      setSites(prev => prev.map(site => 
        site.id === editingSite.id ? { ...formData, id: editingSite.id } : site
      ));
    } else {
      setSites(prev => [...prev, { ...formData, id: Date.now() }]);
    }
    resetForm();
  };

  const handleEdit = (site) => {
    setEditingSite(site);
    setFormData(site);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this site?")) {
      setSites(prev => prev.filter(site => site.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({ name: "", location: "", manager: "", budget: "", workers: "", status: "Active", startDate: "" });
    setEditingSite(null);
    setShowForm(false);
  };

  const getStatusColor = (status) => {
    return status === "Active" ? "bg-green-100 text-green-700" : 
           status === "Planning" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 ml-64" >
      <Nav/>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Building className="w-8 h-8 text-blue-600" />
              Site Management
            </h1>
            <p className="text-gray-600 mt-1">Manage your construction sites efficiently</p>
          </div>
          <div className="bg-white rounded-lg px-4 py-2 shadow-sm border">
            <span className="text-2xl font-bold text-blue-600">{sites.length}</span>
            <span className="text-gray-600 ml-2">Total Sites</span>
          </div>
        </div>

        {/* Search & Add Button */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search sites by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Site
          </Button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md bg-white shadow-2xl">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-gray-900">
                    {editingSite ? "Edit Site" : "Add New Site"}
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={resetForm}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Site Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter site name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Location</label>
                      <input
                        type="text"
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Workers</label>
                      <input
                        type="number"
                        required
                        value={formData.workers}
                        onChange={(e) => setFormData({...formData, workers: parseInt(e.target.value)})}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Project Manager</label>
                    <input
                      type="text"
                      required
                      value={formData.manager}
                      onChange={(e) => setFormData({...formData, manager: e.target.value})}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Manager name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Budget</label>
                      <input
                        type="text"
                        required
                        value={formData.budget}
                        onChange={(e) => setFormData({...formData, budget: e.target.value})}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="$0.00"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Active">Active</option>
                        <option value="Planning">Planning</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Start Date</label>
                    <input
                      type="date"
                      required
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button type="button" variant="outline" onClick={resetForm} className="flex-1">
                      Cancel
                    </Button>
                    <Button type="button" onClick={handleSubmit} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {editingSite ? "Update" : "Create"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Sites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSites.map(site => (
            <Card key={site.id} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                      {site.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{site.location}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(site.status)}`}>
                    {site.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-500" />
                    <div>
                      <div className="text-lg font-semibold text-gray-900">{site.workers}</div>
                      <div className="text-xs text-gray-500">Workers</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <div>
                      <div className="text-lg font-semibold text-gray-900">{site.budget}</div>
                      <div className="text-xs text-gray-500">Budget</div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <User className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{site.manager}</div>
                      <div className="text-xs text-gray-500">Project Manager</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Started: {site.startDate}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleEdit(site)}
                      className="flex-1 hover:bg-blue-50 hover:border-blue-300"
                    >
                      <Edit3 className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleDelete(site.id)}
                      className="flex-1 hover:bg-red-50 hover:border-red-300 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSites.length === 0 && (
          <div className="text-center py-12">
            <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No sites found</h3>
            <p className="text-gray-500">
              {searchTerm ? "Try adjusting your search terms" : "Get started by adding your first construction site"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}