import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Nav from '../Nav';
import { 
  Bell, 
  ClipboardList, 
  FileText, 
  Truck, 
  CheckCircle, 
  Archive, 
  ClipboardCheck, 
  Warehouse,
  X,
  Plus,
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  Eye,
  Send,
  Calendar,
  DollarSign,
  Package,
  User,
  Mail,
  Phone,
  MapPin,
  Building
} from "lucide-react";

export default function PurchaseOfficer() {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Sample data with more comprehensive information
  const quotationRequests = [
    { 
      id: 1, 
      vendor: "Steel Corp", 
      vendorEmail: "procurement@steelcorp.com",
      vendorPhone: "+1-555-0123",
      items: "Steel Beams", 
      quantity: 500,
      requestDate: "2024-01-15",
      expectedDelivery: "2024-02-15",
      status: "draft",
      priority: "high",
      description: "High-grade steel beams for construction project",
      estimatedValue: "$15,000"
    },
    { 
      id: 2, 
      vendor: "Builders Ltd", 
      vendorEmail: "orders@buildersltd.com",
      vendorPhone: "+1-555-0124",
      items: "Electrical Wiring", 
      quantity: 2000,
      requestDate: "2024-01-16",
      expectedDelivery: "2024-02-20",
      status: "sent",
      priority: "medium",
      description: "Premium electrical wiring for residential project",
      estimatedValue: "$8,500"
    },
    { 
      id: 3, 
      vendor: "Concrete Solutions", 
      vendorEmail: "sales@concretesol.com",
      vendorPhone: "+1-555-0125",
      items: "Ready Mix Concrete", 
      quantity: 100,
      requestDate: "2024-01-17",
      expectedDelivery: "2024-02-10",
      status: "approved",
      priority: "urgent",
      description: "High-strength concrete mix for foundation work",
      estimatedValue: "$12,000"
    }
  ];

  const purchaseOrders = [
    { 
      id: 1, 
      poNumber: "PO-001", 
      vendor: "Steel Corp", 
      vendorContact: "John Smith",
      vendorEmail: "john@steelcorp.com",
      amount: "$15,000", 
      status: "approved",
      orderDate: "2024-01-20",
      deliveryDate: "2024-02-15",
      items: "Steel Beams",
      quantity: 500,
      unitPrice: "$30",
      totalAmount: "$15,000",
      paymentTerms: "Net 30",
      shippingAddress: "123 Construction Site, City, State"
    },
    { 
      id: 2, 
      poNumber: "PO-002", 
      vendor: "Concrete Co", 
      vendorContact: "Jane Doe",
      vendorEmail: "jane@concreteco.com",
      amount: "$8,500", 
      status: "pending",
      orderDate: "2024-01-21",
      deliveryDate: "2024-02-18",
      items: "Ready Mix Concrete",
      quantity: 100,
      unitPrice: "$85",
      totalAmount: "$8,500",
      paymentTerms: "Net 15",
      shippingAddress: "456 Project Ave, City, State"
    }
  ];

  const goodsReceived = [
    { 
      id: 1, 
      grnNumber: "GRN-1001", 
      poNumber: "PO-001",
      vendor: "Steel Corp",
      items: "Steel Beams", 
      quantityOrdered: 500,
      quantityReceived: 500,
      receivedDate: "2024-02-15",
      inspectedBy: "Mike Johnson",
      qualityStatus: "pending",
      condition: "Good",
      remarks: "All items received in good condition",
      warehouseLocation: "Warehouse A-1"
    },
    { 
      id: 2, 
      grnNumber: "GRN-1002", 
      poNumber: "PO-003",
      vendor: "Electrical Suppliers",
      items: "Wiring Sets", 
      quantityOrdered: 2000,
      quantityReceived: 1950,
      receivedDate: "2024-02-16",
      inspectedBy: "Sarah Wilson",
      qualityStatus: "approved",
      condition: "Excellent",
      remarks: "50 units short, vendor to deliver balance",
      warehouseLocation: "Warehouse B-2"
    }
  ];

  const purchaseRegister = [
    { 
      id: 1, 
      orderNumber: "PO-001", 
      vendor: "Steel Corp", 
      amount: "$15,000", 
      status: "closed",
      orderDate: "2024-01-20",
      deliveryDate: "2024-02-15",
      paymentStatus: "Paid",
      paymentDate: "2024-02-20",
      category: "Raw Materials"
    },
    { 
      id: 2, 
      orderNumber: "PO-002", 
      vendor: "Concrete Co", 
      amount: "$8,500", 
      status: "open",
      orderDate: "2024-01-21",
      deliveryDate: "2024-02-18",
      paymentStatus: "Pending",
      paymentDate: null,
      category: "Construction Materials"
    }
  ];

  // Form states
  const [quotationForm, setQuotationForm] = useState({
    vendor: '',
    vendorEmail: '',
    vendorPhone: '',
    items: '',
    quantity: '',
    expectedDelivery: '',
    priority: 'medium',
    description: ''
  });

  const [purchaseOrderForm, setPurchaseOrderForm] = useState({
    vendor: '',
    vendorContact: '',
    vendorEmail: '',
    items: '',
    quantity: '',
    unitPrice: '',
    deliveryDate: '',
    paymentTerms: 'Net 30',
    shippingAddress: ''
  });

  const [grnForm, setGrnForm] = useState({
    poNumber: '',
    vendor: '',
    items: '',
    quantityOrdered: '',
    quantityReceived: '',
    inspectedBy: '',
    condition: 'Good',
    remarks: '',
    warehouseLocation: ''
  });

  const openModal = (modalType, item = null) => {
    setActiveModal(modalType);
    setSelectedItem(item);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedItem(null);
  };

  const handleSubmit = (formType) => {
    // Handle form submission logic here
    console.log(`Submitting ${formType} form`);
    closeModal();
  };

  const getStatusColor = (status) => {
    const colors = {
      draft: 'bg-yellow-100 text-yellow-800',
      sent: 'bg-blue-100 text-blue-800',
      approved: 'bg-green-100 text-green-800',
      pending: 'bg-orange-100 text-orange-800',
      closed: 'bg-gray-100 text-gray-800',
      open: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  const Modal = ({ title, children, size = 'max-w-4xl' }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-lg ${size} max-h-[90vh] overflow-y-auto`}>
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-semibold">{title}</h3>
          <Button variant="ghost" size="sm" onClick={closeModal}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );

  const TableModal = ({ title, data, columns }) => (
    <Modal title={title} size="max-w-6xl">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="px-4 py-2 border rounded-lg"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                {columns.map((col, index) => (
                  <th key={index} className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-900">
                    {col.header}
                  </th>
                ))}
                <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="border border-gray-200 px-4 py-3 text-sm text-gray-700">
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                  <td className="border border-gray-200 px-4 py-3 text-sm">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => openModal('details', row)}>
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );

  const FormModal = ({ title, fields, formData, setFormData, onSubmit }) => (
    <Modal title={title}>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field, index) => (
            <div key={index} className={field.fullWidth ? 'md:col-span-2' : ''}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
              {field.type === 'select' ? (
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={formData[field.key]}
                  onChange={(e) => setFormData({...formData, [field.key]: e.target.value})}
                  required={field.required}
                >
                  {field.options.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              ) : field.type === 'textarea' ? (
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows={3}
                  value={formData[field.key]}
                  onChange={(e) => setFormData({...formData, [field.key]: e.target.value})}
                  placeholder={field.placeholder}
                  required={field.required}
                />
              ) : (
                <input
                  type={field.type || 'text'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={formData[field.key]}
                  onChange={(e) => setFormData({...formData, [field.key]: e.target.value})}
                  placeholder={field.placeholder}
                  required={field.required}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={closeModal}>Cancel</Button>
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700">Submit</Button>
        </div>
      </form>
    </Modal>
  );

  // Column definitions for tables
  const quotationColumns = [
    { key: 'id', header: 'ID' },
    { key: 'vendor', header: 'Vendor' },
    { key: 'items', header: 'Items' },
    { key: 'quantity', header: 'Quantity' },
    { key: 'requestDate', header: 'Request Date' },
    { key: 'expectedDelivery', header: 'Expected Delivery' },
    { 
      key: 'status', 
      header: 'Status',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(value)}`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    },
    { 
      key: 'priority', 
      header: 'Priority',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(value)}`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    }
  ];

  const purchaseOrderColumns = [
    { key: 'poNumber', header: 'PO Number' },
    { key: 'vendor', header: 'Vendor' },
    { key: 'vendorContact', header: 'Contact Person' },
    { key: 'items', header: 'Items' },
    { key: 'quantity', header: 'Quantity' },
    { key: 'unitPrice', header: 'Unit Price' },
    { key: 'totalAmount', header: 'Total Amount' },
    { key: 'orderDate', header: 'Order Date' },
    { key: 'deliveryDate', header: 'Delivery Date' },
    { 
      key: 'status', 
      header: 'Status',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(value)}`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    }
  ];

  const grnColumns = [
    { key: 'grnNumber', header: 'GRN Number' },
    { key: 'poNumber', header: 'PO Number' },
    { key: 'vendor', header: 'Vendor' },
    { key: 'items', header: 'Items' },
    { key: 'quantityOrdered', header: 'Qty Ordered' },
    { key: 'quantityReceived', header: 'Qty Received' },
    { key: 'receivedDate', header: 'Received Date' },
    { key: 'inspectedBy', header: 'Inspected By' },
    { key: 'condition', header: 'Condition' },
    { 
      key: 'qualityStatus', 
      header: 'Quality Status',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(value)}`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    }
  ];

  const registerColumns = [
    { key: 'orderNumber', header: 'Order Number' },
    { key: 'vendor', header: 'Vendor' },
    { key: 'amount', header: 'Amount' },
    { key: 'orderDate', header: 'Order Date' },
    { key: 'deliveryDate', header: 'Delivery Date' },
    { key: 'category', header: 'Category' },
    { key: 'paymentStatus', header: 'Payment Status' },
    { 
      key: 'status', 
      header: 'Status',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(value)}`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    }
  ];

  // Form field definitions
  const quotationFields = [
    { key: 'vendor', label: 'Vendor Name', placeholder: 'Enter vendor name', required: true },
    { key: 'vendorEmail', label: 'Vendor Email', type: 'email', placeholder: 'vendor@company.com', required: true },
    { key: 'vendorPhone', label: 'Vendor Phone', type: 'tel', placeholder: '+1-555-0123', required: true },
    { key: 'items', label: 'Items Description', placeholder: 'Describe the items needed', required: true },
    { key: 'quantity', label: 'Quantity', type: 'number', placeholder: 'Enter quantity', required: true },
    { key: 'expectedDelivery', label: 'Expected Delivery Date', type: 'date', required: true },
    { 
      key: 'priority', 
      label: 'Priority Level', 
      type: 'select',
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
        { value: 'urgent', label: 'Urgent' }
      ],
      required: true 
    },
    { key: 'description', label: 'Additional Description', type: 'textarea', placeholder: 'Additional details...', fullWidth: true }
  ];

  const purchaseOrderFields = [
    { key: 'vendor', label: 'Vendor Name', placeholder: 'Enter vendor name', required: true },
    { key: 'vendorContact', label: 'Contact Person', placeholder: 'Contact person name', required: true },
    { key: 'vendorEmail', label: 'Vendor Email', type: 'email', placeholder: 'vendor@company.com', required: true },
    { key: 'items', label: 'Items Description', placeholder: 'Describe the items', required: true },
    { key: 'quantity', label: 'Quantity', type: 'number', placeholder: 'Enter quantity', required: true },
    { key: 'unitPrice', label: 'Unit Price', type: 'number', placeholder: '0.00', required: true },
    { key: 'deliveryDate', label: 'Delivery Date', type: 'date', required: true },
    { 
      key: 'paymentTerms', 
      label: 'Payment Terms', 
      type: 'select',
      options: [
        { value: 'Net 15', label: 'Net 15' },
        { value: 'Net 30', label: 'Net 30' },
        { value: 'Net 45', label: 'Net 45' },
        { value: 'COD', label: 'Cash on Delivery' }
      ],
      required: true 
    },
    { key: 'shippingAddress', label: 'Shipping Address', type: 'textarea', placeholder: 'Complete shipping address...', fullWidth: true, required: true }
  ];

  const grnFields = [
    { key: 'poNumber', label: 'PO Number', placeholder: 'Enter PO number', required: true },
    { key: 'vendor', label: 'Vendor Name', placeholder: 'Enter vendor name', required: true },
    { key: 'items', label: 'Items Description', placeholder: 'Describe the items', required: true },
    { key: 'quantityOrdered', label: 'Quantity Ordered', type: 'number', placeholder: 'Ordered quantity', required: true },
    { key: 'quantityReceived', label: 'Quantity Received', type: 'number', placeholder: 'Received quantity', required: true },
    { key: 'inspectedBy', label: 'Inspected By', placeholder: 'Inspector name', required: true },
    { 
      key: 'condition', 
      label: 'Item Condition', 
      type: 'select',
      options: [
        { value: 'Excellent', label: 'Excellent' },
        { value: 'Good', label: 'Good' },
        { value: 'Fair', label: 'Fair' },
        { value: 'Poor', label: 'Poor' },
        { value: 'Damaged', label: 'Damaged' }
      ],
      required: true 
    },
    { key: 'warehouseLocation', label: 'Warehouse Location', placeholder: 'Storage location', required: true },
    { key: 'remarks', label: 'Remarks', type: 'textarea', placeholder: 'Additional remarks...', fullWidth: true }
  ];

  return (
    <div className="min-h-screen bg-gray-50 ml-64">
      <div className="container mx-auto px-4 py-8">
         <Nav/>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Procurement Dashboard</h1>
            <p className="text-gray-600 mt-1">Material procurement management system</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Active RFQs</p>
                  <p className="text-2xl font-bold">{quotationRequests.length}</p>
                </div>
                <ClipboardList className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Purchase Orders</p>
                  <p className="text-2xl font-bold">{purchaseOrders.length}</p>
                </div>
                <FileText className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Goods Received</p>
                  <p className="text-2xl font-bold">{goodsReceived.length}</p>
                </div>
                <Truck className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Total Value</p>
                  <p className="text-2xl font-bold">$75K</p>
                </div>
                <DollarSign className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quotation Requests */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="w-5 h-5" />
                Quotation Requests
              </CardTitle>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => openModal('quotationTable')}
                >
                  View All
                </Button>
                <Button 
                  size="sm" 
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={() => openModal('quotationForm')}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  New RFQ
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quotationRequests.slice(0, 3).map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900">{request.vendor}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{request.items} (Qty: {request.quantity})</p>
                      <p className="text-xs text-gray-500">Expected: {request.expectedDelivery}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3" />
                      </Button>
                      {request.status === 'draft' && (
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <Send className="w-3 h-3 mr-1" />
                          Send
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Purchase Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Purchase Orders
              </CardTitle>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => openModal('purchaseOrderTable')}
                >
                  View All
                </Button>
                <Button 
                  size="sm" 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => openModal('purchaseOrderForm')}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  New PO
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {purchaseOrders.slice(0, 3).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900">{order.poNumber}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{order.vendor} - {order.amount}</p>
                      <p className="text-xs text-gray-500">Delivery: {order.deliveryDate}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        <Download className="w-3 h-3 mr-1" />
                        PDF
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Goods Received Notes */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Goods Received Notes
              </CardTitle>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => openModal('grnTable')}
                >
                  View All
                </Button>
                <Button 
                  size="sm" 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => openModal('grnForm')}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  New GRN
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {goodsReceived.slice(0, 3).map((grn) => (
                  <div key={grn.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900">{grn.grnNumber}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(grn.qualityStatus)}`}>
                          {grn.qualityStatus}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{grn.items}</p>
                      <p className="text-xs text-gray-500">
                        Received: {grn.quantityReceived}/{grn.quantityOrdered} | {grn.receivedDate}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3" />
                      </Button>
                      {grn.qualityStatus === 'pending' && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Approve
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Purchase Register */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Archive className="w-5 h-5" />
                Purchase Register
              </CardTitle>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => openModal('registerTable')}
                >
                  View All
                </Button>
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {purchaseRegister.slice(0, 3).map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900">{entry.orderNumber}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(entry.status)}`}>
                          {entry.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{entry.vendor} - {entry.amount}</p>
                      <p className="text-xs text-gray-500">
                        Payment: {entry.paymentStatus} | {entry.category}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">GRN-1002 approved for Electrical Wiring</p>
                  <p className="text-xs text-gray-500">2 hours ago by Sarah Wilson</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">PO-002 generated for Concrete Co</p>
                  <p className="text-xs text-gray-500">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">RFQ sent to Steel Corp for quotation</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Payment processed for PO-001</p>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      {activeModal === 'quotationTable' && (
        <TableModal
          title="All Quotation Requests"
          data={quotationRequests}
          columns={quotationColumns}
        />
      )}

      {activeModal === 'purchaseOrderTable' && (
        <TableModal
          title="All Purchase Orders"
          data={purchaseOrders}
          columns={purchaseOrderColumns}
        />
      )}

      {activeModal === 'grnTable' && (
        <TableModal
          title="All Goods Received Notes"
          data={goodsReceived}
          columns={grnColumns}
        />
      )}

      {activeModal === 'registerTable' && (
        <TableModal
          title="Purchase Register"
          data={purchaseRegister}
          columns={registerColumns}
        />
      )}

      {activeModal === 'quotationForm' && (
        <FormModal
          title="Create New Quotation Request"
          fields={quotationFields}
          formData={quotationForm}
          setFormData={setQuotationForm}
          onSubmit={() => handleSubmit('quotation')}
        />
      )}

      {activeModal === 'purchaseOrderForm' && (
        <FormModal
          title="Create New Purchase Order"
          fields={purchaseOrderFields}
          formData={purchaseOrderForm}
          setFormData={setPurchaseOrderForm}
          onSubmit={() => handleSubmit('purchaseOrder')}
        />
      )}

      {activeModal === 'grnForm' && (
        <FormModal
          title="Create New Goods Received Note"
          fields={grnFields}
          formData={grnForm}
          setFormData={setGrnForm}
          onSubmit={() => handleSubmit('grn')}
        />
      )}

      {activeModal === 'details' && selectedItem && (
        <Modal title="Item Details" size="max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Basic Information</h4>
                <div className="space-y-2">
                  {Object.entries(selectedItem).slice(0, Math.ceil(Object.entries(selectedItem).length / 2)).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {typeof value === 'string' && (key.includes('status') || key.includes('priority')) ? (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${key.includes('priority') ? getPriorityColor(value) : getStatusColor(value)}`}>
                            {value.charAt(0).toUpperCase() + value.slice(1)}
                          </span>
                        ) : (
                          value?.toString() || 'N/A'
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Additional Details</h4>
                <div className="space-y-2">
                  {Object.entries(selectedItem).slice(Math.ceil(Object.entries(selectedItem).length / 2)).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {typeof value === 'string' && (key.includes('status') || key.includes('priority')) ? (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${key.includes('priority') ? getPriorityColor(value) : getStatusColor(value)}`}>
                            {value.charAt(0).toUpperCase() + value.slice(1)}
                          </span>
                        ) : (
                          value?.toString() || 'N/A'
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <Button variant="outline" onClick={closeModal}>Close</Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </Modal>
      )}

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3">
        <Button 
          size="lg" 
          className="rounded-full shadow-lg bg-purple-600 hover:bg-purple-700"
          onClick={() => openModal('quotationForm')}
        >
          <Plus className="w-5 h-5 mr-2" />
          Quick RFQ
        </Button>
      </div>

      {/* Additional Utility Modals */}
      {activeModal === 'vendorDetails' && (
        <Modal title="Vendor Information" size="max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Company Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Contact Person</p>
                    <p className="text-sm text-gray-600">John Smith</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-gray-600">john@steelcorp.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-gray-600">+1-555-0123</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Address</p>
                    <p className="text-sm text-gray-600">123 Industrial Ave, Steel City, SC 12345</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div>
                      <p className="text-sm font-medium">PO-001</p>
                      <p className="text-xs text-gray-500">Steel Beams - $15,000</p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Completed</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div>
                      <p className="text-sm font-medium">PO-015</p>
                      <p className="text-xs text-gray-500">Metal Sheets - $8,200</p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">In Transit</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Modal>
      )}

      {/* Analytics Modal */}
      {activeModal === 'analytics' && (
        <Modal title="Procurement Analytics" size="max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Spending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                  <p className="text-gray-500">Chart placeholder - Monthly spending trends</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Vendor Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Steel Corp</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{width: '92%'}}></div>
                      </div>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Concrete Co</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{width: '78%'}}></div>
                      </div>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Builders Ltd</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{width: '88%'}}></div>
                      </div>
                      <span className="text-sm font-medium">88%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Modal>
      )}
    </div>
  );
}