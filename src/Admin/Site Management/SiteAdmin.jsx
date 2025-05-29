import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, Users, Plus, Edit3, Trash2, Search, MapPin, User, DollarSign, Calendar, X, CheckCircle, AlertTriangle } from "lucide-react";
import Nav from '../Nav';

export default function SiteManagementCRUD() {
  const [sites, setSites] = useState([
    { id: 1, name: "Downtown Complex", location: "New York", manager: "Sarah Johnson", budget: "₹2.5M", workers: 45, status: "Active", startDate: "2024-01-15" },
    { id: 2, name: "Tech Hub", location: "San Francisco", manager: "Michael Chen", budget: "₹3.8M", workers: 32, status: "Active", startDate: "2024-03-01" },
    { id: 3, name: "Residential Tower", location: "Chicago", manager: "Emily Rodriguez", budget: "₹4.2M", workers: 12, status: "Planning", startDate: "2024-06-01" }
  ]);
  
  const [showForm, setShowForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [editingSite, setEditingSite] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "", location: "", manager: "", budget: "", workers: "", status: "Active", startDate: ""
  });

  // Handle escape key to close modals
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (showDeleteConfirm) setShowDeleteConfirm(null);
        if (showForm) resetForm();
      }
    };
    
    if (showForm || showDeleteConfirm) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [showForm, showDeleteConfirm]);

  const filteredSites = sites.filter(site => 
    site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    site.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Site name is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.manager.trim()) newErrors.manager = "Project manager is required";
    if (!formData.budget.trim()) newErrors.budget = "Budget is required";
    if (!formData.workers || formData.workers < 1) newErrors.workers = "Number of workers must be at least 1";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (editingSite) {
      setSites(prev => prev.map(site => 
        site.id === editingSite.id ? { ...formData, id: editingSite.id } : site
      ));
    } else {
      setSites(prev => [...prev, { ...formData, id: Date.now() }]);
    }
    
    setIsSubmitting(false);
    resetForm();
  };

  const handleEdit = (site) => {
    setEditingSite(site);
    setFormData(site);
    setErrors({});
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setSites(prev => prev.filter(site => site.id !== id));
    setShowDeleteConfirm(null);
    setIsSubmitting(false);
  };

  const resetForm = () => {
    setFormData({ name: "", location: "", manager: "", budget: "", workers: "", status: "Active", startDate: "" });
    setEditingSite(null);
    setShowForm(false);
    setErrors({});
    setIsSubmitting(false);
  };

  const getStatusColor = (status) => {
    return status === "Active" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : 
           status === "Planning" ? "bg-blue-100 text-blue-700 border-blue-200" : 
           "bg-gray-100 text-gray-700 border-gray-200";
  };

  const Modal = ({ children, onClose, className = "" }) => (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0, 0, 0, 0.6)' }}
      onClick={onClose}
    >
      <div 
        className={`bg-white rounded-xl shadow-2xl transform transition-all duration-200 ${className}`}
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: 'modalSlideIn 0.2s ease-out',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        {children}
      </div>
      <style jsx>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6 ml-64">
      <div className="max-w-7xl mx-auto">
      <Nav/>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-xl">
                <Building className="w-8 h-8 text-white" />
              </div>
              Site Management
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Manage your construction sites with precision</p>
          </div>
          <div className="bg-white rounded-xl px-6 py-4 shadow-lg border border-gray-100">
            <div className="text-center">
              <span className="text-3xl font-bold text-blue-600 block">{sites.length}</span>
              <span className="text-gray-600 text-sm font-medium">Active Sites</span>
            </div>
          </div>
        </div>

        {/* Search & Add Button */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search sites by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
            />
          </div>
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 shadow-lg rounded-xl text-lg font-semibold transition-all duration-200 hover:shadow-xl"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Site
          </Button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <Modal onClose={resetForm} className="w-full max-w-lg">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingSite ? "Edit Site" : "Add New Site"}
                </h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={resetForm}
                  className="rounded-full p-2 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Site Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                      errors.name ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'
                    }`}
                    placeholder="Enter site name"
                  />
                  {errors.name && <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" /> {errors.name}
                  </p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Location *</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                        errors.location ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'
                      }`}
                      placeholder="City"
                    />
                    {errors.location && <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> {errors.location}
                    </p>}
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Workers *</label>
                    <input
                      type="number"
                      value={formData.workers}
                      onChange={(e) => setFormData({...formData, workers: parseInt(e.target.value) || ''})}
                      className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                        errors.workers ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'
                      }`}
                      placeholder="0"
                      min="1"
                    />
                    {errors.workers && <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> {errors.workers}
                    </p>}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Project Manager *</label>
                  <input
                    type="text"
                    value={formData.manager}
                    onChange={(e) => setFormData({...formData, manager: e.target.value})}
                    className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                      errors.manager ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'
                    }`}
                    placeholder="Manager name"
                  />
                  {errors.manager && <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" /> {errors.manager}
                  </p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Budget *</label>
                    <input
                      type="text"
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                        errors.budget ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'
                      }`}
                      placeholder="₹0.00"
                    />
                    {errors.budget && <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> {errors.budget}
                    </p>}
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    >
                      <option value="Active">Active</option>
                      <option value="Planning">Planning</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Start Date *</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                      errors.startDate ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'
                    }`}
                  />
                  {errors.startDate && <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" /> {errors.startDate}
                  </p>}
                </div>

                <div className="flex gap-3 pt-6 border-t">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={resetForm} 
                    className="flex-1 py-3 rounded-lg"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="button" 
                    onClick={handleSubmit} 
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        {editingSite ? "Updating..." : "Creating..."}
                      </div>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {editingSite ? "Update Site" : "Create Site"}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </Modal>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <Modal onClose={() => setShowDeleteConfirm(null)} className="w-full max-w-md">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Site</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "{sites.find(s => s.id === showDeleteConfirm)?.name}"? 
                This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Deleting...
                    </div>
                  ) : (
                    "Delete"
                  )}
                </Button>
              </div>
            </div>
          </Modal>
        )}

        {/* Sites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSites.map(site => (
            <Card key={site.id} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-xl overflow-hidden group">
              <CardHeader className="pb-4 bg-gradient-to-r from-gray-50 to-blue-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {site.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium">{site.location}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(site.status)}`}>
                    {site.status}
                  </span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-5 p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="text-xl font-bold text-gray-900">{site.workers}</div>
                      <div className="text-xs text-gray-600 font-medium">Workers</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="text-xl font-bold text-gray-900">{site.budget}</div>
                      <div className="text-xs text-gray-600 font-medium">Budget</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <User className="w-4 h-4 text-gray-500" />
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{site.manager}</div>
                      <div className="text-xs text-gray-500">Project Manager</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{site.startDate}</div>
                      <div className="text-xs text-gray-500">Start Date</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleEdit(site)}
                    className="flex-1 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-200"
                  >
                    <Edit3 className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setShowDeleteConfirm(site.id)}
                    className="flex-1 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-200"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSites.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No sites found</h3>
            <p className="text-gray-500 text-lg">
              {searchTerm ? "Try adjusting your search terms" : "Get started by adding your first construction site"}
            </p>
            {!searchTerm && (
              <Button 
                onClick={() => setShowForm(true)}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Your First Site
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}