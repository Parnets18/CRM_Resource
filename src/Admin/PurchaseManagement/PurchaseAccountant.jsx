import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, FileText, DollarSign, Calendar, CheckCircle, Clock, AlertCircle, Edit, Trash2, X } from "lucide-react";
import Nav from "../Nav";

export default function PurchaseAccountant() {
  const [invoices, setInvoices] = useState([
    { id: 1, vendor: "Steel Corp", invoiceNo: "INV-001", amount: 15000, dueDate: "2024-06-10", status: "pending" },
    { id: 2, vendor: "Concrete Co", invoiceNo: "INV-002", amount: 8500, dueDate: "2024-06-15", status: "overdue" },
    { id: 3, vendor: "Builders Ltd", invoiceNo: "INV-003", amount: 5200, dueDate: "2024-06-20", status: "paid" },
    { id: 4, vendor: "Equipment Rental", invoiceNo: "INV-004", amount: 12000, dueDate: "2024-06-25", status: "pending" },
    { id: 5, vendor: "Material Supply", invoiceNo: "INV-005", amount: 7800, dueDate: "2024-06-30", status: "pending" }
  ]);

  const [paymentStatus, setPaymentStatus] = useState([
    { id: 1, invoice: "INV-001", vendor: "Steel Corp", amount: 15000, paymentDate: "2024-06-08", status: "paid" },
    { id: 2, invoice: "INV-002", vendor: "Concrete Co", amount: 8500, paymentDate: "", status: "pending" },
    { id: 3, invoice: "INV-003", vendor: "Builders Ltd", amount: 5200, paymentDate: "2024-06-18", status: "paid" },
    { id: 4, invoice: "INV-004", vendor: "Equipment Rental", amount: 12000, paymentDate: "", status: "pending" },
    { id: 5, invoice: "INV-005", vendor: "Material Supply", amount: 7800, paymentDate: "", status: "pending" }
  ]);

  const [formData, setFormData] = useState({
    vendor: '',
    invoiceNo: '',
    amount: '',
    dueDate: '',
    description: ''
  });

  const [editModal, setEditModal] = useState({ isOpen: false, invoice: null });
  const [paymentModal, setPaymentModal] = useState({ isOpen: false, payment: null });
  const [scheduleModal, setScheduleModal] = useState({ isOpen: false, invoice: null });

  const [editFormData, setEditFormData] = useState({
    vendor: '',
    invoiceNo: '',
    amount: '',
    dueDate: ''
  });

  const [paymentFormData, setPaymentFormData] = useState({
    paymentDate: '',
    paymentMethod: 'bank_transfer',
    notes: ''
  });

  const [scheduleFormData, setScheduleFormData] = useState({
    scheduledDate: '',
    paymentMethod: 'bank_transfer',
    notes: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEditInputChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentInputChange = (e) => {
    setPaymentFormData({
      ...paymentFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleScheduleInputChange = (e) => {
    setScheduleFormData({
      ...scheduleFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (formData.vendor && formData.invoiceNo && formData.amount && formData.dueDate) {
      const newInvoice = {
        id: invoices.length + 1,
        vendor: formData.vendor,
        invoiceNo: formData.invoiceNo,
        amount: parseFloat(formData.amount),
        dueDate: formData.dueDate,
        status: 'pending'
      };
      setInvoices([...invoices, newInvoice]);
      
      const newPayment = {
        id: paymentStatus.length + 1,
        invoice: formData.invoiceNo,
        vendor: formData.vendor,
        amount: parseFloat(formData.amount),
        paymentDate: '',
        status: 'pending'
      };
      setPaymentStatus([...paymentStatus, newPayment]);
      
      setFormData({ vendor: '', invoiceNo: '', amount: '', dueDate: '', description: '' });
    }
  };

  const openEditModal = (invoice) => {
    setEditFormData({
      vendor: invoice.vendor,
      invoiceNo: invoice.invoiceNo,
      amount: invoice.amount.toString(),
      dueDate: invoice.dueDate
    });
    setEditModal({ isOpen: true, invoice });
  };

  const openPaymentModal = (payment) => {
    setPaymentFormData({
      paymentDate: new Date().toISOString().split('T')[0],
      paymentMethod: 'bank_transfer',
      notes: ''
    });
    setPaymentModal({ isOpen: true, payment });
  };

  const openScheduleModal = (invoice) => {
    setScheduleFormData({
      scheduledDate: '',
      paymentMethod: 'bank_transfer',
      notes: ''
    });
    setScheduleModal({ isOpen: true, invoice });
  };

  const handleEditSave = () => {
    if (editModal.invoice) {
      setInvoices(invoices.map(invoice => 
        invoice.id === editModal.invoice.id 
          ? { 
              ...invoice, 
              vendor: editFormData.vendor,
              invoiceNo: editFormData.invoiceNo,
              amount: parseFloat(editFormData.amount),
              dueDate: editFormData.dueDate
            }
          : invoice
      ));
      
      setPaymentStatus(paymentStatus.map(payment => 
        payment.id === editModal.invoice.id 
          ? { 
              ...payment, 
              vendor: editFormData.vendor,
              invoice: editFormData.invoiceNo,
              amount: parseFloat(editFormData.amount)
            }
          : payment
      ));
      
      setEditModal({ isOpen: false, invoice: null });
    }
  };

  const handlePaymentProcess = () => {
    if (paymentModal.payment) {
      setPaymentStatus(paymentStatus.map(payment => 
        payment.id === paymentModal.payment.id 
          ? { 
              ...payment, 
              status: 'paid', 
              paymentDate: paymentFormData.paymentDate
            }
          : payment
      ));
      
      setInvoices(invoices.map(invoice => 
        invoice.id === paymentModal.payment.id 
          ? { ...invoice, status: 'paid' }
          : invoice
      ));
      
      setPaymentModal({ isOpen: false, payment: null });
    }
  };

  const handleSchedulePayment = () => {
    if (scheduleModal.invoice && scheduleFormData.scheduledDate) {
      // In a real app, this would schedule the payment
      alert(`Payment scheduled for ${scheduleFormData.scheduledDate} via ${scheduleFormData.paymentMethod}`);
      setScheduleModal({ isOpen: false, invoice: null });
    }
  };

  const markAsPaid = (invoiceId) => {
    setPaymentStatus(paymentStatus.map(payment => 
      payment.id === invoiceId ? { ...payment, status: 'paid', paymentDate: new Date().toISOString().split('T')[0] } : payment
    ));
    setInvoices(invoices.map(invoice => 
      invoice.id === invoiceId ? { ...invoice, status: 'paid' } : invoice
    ));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'overdue':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'text-green-600 bg-green-50';
      case 'overdue':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-yellow-600 bg-yellow-50';
    }
  };

  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 ml-64">
      <div className="relative z-10 p-6">
   <Nav/>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Purchase Accounting Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage invoices, payments, and vendor relationships</p>
          </div>
          <Button variant="ghost" size="icon" className="text-gray-600 hover:bg-gray-100">
            <Bell className="w-5 h-5" />
          </Button>
        </div>

        {/* Invoice Entry Form */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Add New Vendor Invoice
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vendor Name</label>
                <input
                  type="text"
                  name="vendor"
                  value={formData.vendor}
                  onChange={handleInputChange}
                  placeholder="Enter vendor name"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Number</label>
                <input
                  type="text"
                  name="invoiceNo"
                  value={formData.invoiceNo}
                  onChange={handleInputChange}
                  placeholder="INV-001"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount ($)</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  step="0.01"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Brief description of goods/services"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleSubmit} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 h-12">
                  <FileText className="w-4 h-4 mr-2" />
                  Add Invoice
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Invoice Management Table */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Invoice Management
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {invoice.invoiceNo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {invoice.vendor}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                        ${invoice.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {invoice.dueDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                          {getStatusIcon(invoice.status)}
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          {invoice.status !== 'paid' && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => markAsPaid(invoice.id)}
                                className="bg-green-600 hover:bg-green-700 text-xs"
                              >
                                Mark Paid
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => openScheduleModal(invoice)}
                                className="bg-purple-600 hover:bg-purple-700 text-xs"
                              >
                                <Calendar className="w-3 h-3 mr-1" />
                                Schedule
                              </Button>
                            </>
                          )}
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-xs"
                            onClick={() => openEditModal(invoice)}
                          >
                            <Edit className="w-3 h-3" />
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

        {/* Payment Status Table */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Payment Status Tracking
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Date</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paymentStatus.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {payment.invoice}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payment.vendor}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                        ${payment.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payment.paymentDate || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                          {getStatusIcon(payment.status)}
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          {payment.status !== 'paid' && (
                            <Button
                              size="sm"
                              onClick={() => openPaymentModal(payment)}
                              className="bg-blue-600 hover:bg-blue-700 text-xs"
                            >
                              Process Payment
                            </Button>
                          )}
                          <Button size="sm" variant="outline" className="text-xs">
                            <Calendar className="w-3 h-3" />
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
      </div>

      {/* Edit Invoice Modal */}
      <Modal
        isOpen={editModal.isOpen}
        onClose={() => setEditModal({ isOpen: false, invoice: null })}
        title="Edit Invoice"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Vendor Name</label>
            <input
              type="text"
              name="vendor"
              value={editFormData.vendor}
              onChange={handleEditInputChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Number</label>
            <input
              type="text"
              name="invoiceNo"
              value={editFormData.invoiceNo}
              onChange={handleEditInputChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount ($)</label>
            <input
              type="number"
              name="amount"
              value={editFormData.amount}
              onChange={handleEditInputChange}
              step="0.01"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={editFormData.dueDate}
              onChange={handleEditInputChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button onClick={handleEditSave} className="flex-1 bg-purple-600 hover:bg-purple-700">
              Save Changes
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setEditModal({ isOpen: false, invoice: null })}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Process Payment Modal */}
      <Modal
        isOpen={paymentModal.isOpen}
        onClose={() => setPaymentModal({ isOpen: false, payment: null })}
        title="Process Payment"
      >
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Invoice: <span className="font-medium">{paymentModal.payment?.invoice}</span></p>
            <p className="text-sm text-gray-600">Vendor: <span className="font-medium">{paymentModal.payment?.vendor}</span></p>
            <p className="text-sm text-gray-600">Amount: <span className="font-medium text-green-600">${paymentModal.payment?.amount?.toLocaleString()}</span></p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Date</label>
            <input
              type="date"
              name="paymentDate"
              value={paymentFormData.paymentDate}
              onChange={handlePaymentInputChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
            <select
              name="paymentMethod"
              value={paymentFormData.paymentMethod}
              onChange={handlePaymentInputChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="bank_transfer">Bank Transfer</option>
              <option value="check">Check</option>
              <option value="credit_card">Credit Card</option>
              <option value="cash">Cash</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
            <textarea
              name="notes"
              value={paymentFormData.notes}
              onChange={handlePaymentInputChange}
              rows={3}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Payment notes or reference number..."
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button onClick={handlePaymentProcess} className="flex-1 bg-blue-600 hover:bg-blue-700">
              Process Payment
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setPaymentModal({ isOpen: false, payment: null })}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Schedule Payment Modal */}
      <Modal
        isOpen={scheduleModal.isOpen}
        onClose={() => setScheduleModal({ isOpen: false, invoice: null })}
        title="Schedule Payment"
      >
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Invoice: <span className="font-medium">{scheduleModal.invoice?.invoiceNo}</span></p>
            <p className="text-sm text-gray-600">Vendor: <span className="font-medium">{scheduleModal.invoice?.vendor}</span></p>
            <p className="text-sm text-gray-600">Amount: <span className="font-medium text-purple-600">${scheduleModal.invoice?.amount?.toLocaleString()}</span></p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Scheduled Payment Date</label>
            <input
              type="date"
              name="scheduledDate"
              value={scheduleFormData.scheduledDate}
              onChange={handleScheduleInputChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
            <select
              name="paymentMethod"
              value={scheduleFormData.paymentMethod}
              onChange={handleScheduleInputChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="bank_transfer">Bank Transfer</option>
              <option value="check">Check</option>
              <option value="credit_card">Credit Card</option>
              <option value="ach">ACH Transfer</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
            <textarea
              name="notes"
              value={scheduleFormData.notes}
              onChange={handleScheduleInputChange}
              rows={3}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Payment scheduling notes..."
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button onClick={handleSchedulePayment} className="flex-1 bg-purple-600 hover:bg-purple-700">
              Schedule Payment
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setScheduleModal({ isOpen: false, invoice: null })}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}