import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Receipt, Currency, PieChart, User, Mail, BarChart, X, Plus } from "lucide-react";
import Nav from "../Nav";

export default function SalesAccountant() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [formData, setFormData] = useState({});
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportType, setReportType] = useState('');
  
  const [outstandingBalances, setOutstandingBalances] = useState([
    { id: 1, client: "Acme Corp", amount: 45200, dueDate: "2024-04-15", status: "Pending" },
    { id: 2, client: "Global Tech", amount: 28750, dueDate: "2024-04-20", status: "Pending" },
    { id: 3, client: "Tech Solutions", amount: 67000, dueDate: "2024-04-25", status: "Overdue" },
    { id: 4, client: "Digital World", amount: 32500, dueDate: "2024-04-30", status: "Pending" }
  ]);

  const [recentPayments, setRecentPayments] = useState([
    { id: 1, client: "Skyline Ltd", amount: 150000, date: "2024-04-10", method: "Bank Transfer" },
    { id: 2, client: "NextGen Inc", amount: 75500, date: "2024-04-08", method: "Cheque" },
    { id: 3, client: "Future Corp", amount: 95000, date: "2024-04-05", method: "UPI" },
    { id: 4, client: "Smart Systems", amount: 42000, date: "2024-04-03", method: "Cash" }
  ]);

  const [invoices, setInvoices] = useState([
    { id: 1, invoiceNo: "INV-001", client: "Acme Corp", amount: 45200, date: "2024-03-15", status: "Sent" },
    { id: 2, invoiceNo: "INV-002", client: "Global Tech", amount: 28750, date: "2024-03-20", status: "Paid" },
    { id: 3, invoiceNo: "INV-003", client: "Tech Solutions", amount: 67000, date: "2024-03-25", status: "Overdue" }
  ]);

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
    setFormData({});
  };

  const openReportModal = (type) => {
    setReportType(type);
    setShowReportModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setFormData({});
  };

  const closeReportModal = () => {
    setShowReportModal(false);
    setReportType('');
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    
    if (modalType === 'invoice') {
      const newInvoice = {
        id: invoices.length + 1,
        invoiceNo: formData.invoiceNumber || `INV-${invoices.length + 1}`,
        client: formData.clientName || '',
        amount: parseFloat(formData.amount) || 0,
        date: formData.date || new Date().toISOString().split('T')[0],
        status: 'Sent'
      };
      setInvoices(prev => [...prev, newInvoice]);
    } else if (modalType === 'payment') {
      const newPayment = {
        id: recentPayments.length + 1,
        client: formData.client || '',
        amount: parseFloat(formData.amount) || 0,
        date: formData.date || new Date().toISOString().split('T')[0],
        method: formData.method || 'Bank Transfer'
      };
      setRecentPayments(prev => [...prev, newPayment]);
    }
    
    closeModal();
  };

  const markAsPaid = (id) => {
    setOutstandingBalances(prev => 
      prev.map(balance => 
        balance.id === id ? { ...balance, status: 'Paid' } : balance
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-6 ml-64">
     <Nav/>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Sales Management Dashboard</h2>
          <p className="text-gray-600">Financial tracking and reporting</p>
        </div>
        <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-200">
          <Bell className="w-5 h-5" />
        </Button>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Button 
          onClick={() => openModal('invoice')} 
          className="bg-purple-600 hover:bg-purple-700 text-white p-4 h-auto"
        >
          <Receipt className="w-5 h-5 mr-2" />
          Create Invoice
        </Button>
        <Button 
          onClick={() => openModal('payment')} 
          className="bg-green-600 hover:bg-green-700 text-white p-4 h-auto"
        >
          <Currency className="w-5 h-5 mr-2" />
          Record Payment
        </Button>
        <Button 
          onClick={() => openReportModal('gst')} 
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 h-auto"
        >
          <PieChart className="w-5 h-5 mr-2" />
          GST Report
        </Button>
        <Button 
          onClick={() => openReportModal('custom')} 
          className="bg-orange-600 hover:bg-orange-700 text-white p-4 h-auto"
        >
          <BarChart className="w-5 h-5 mr-2" />
          Custom Report
        </Button>
      </div>

      {/* Tables */}
      <div className="space-y-8">
        {/* Outstanding Balances Table */}
        <Card className="border border-purple-200 shadow-lg">
          <CardHeader className="bg-purple-50">
            <CardTitle className="text-xl text-gray-900">Outstanding Balances</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {outstandingBalances.map((balance) => (
                    <tr key={balance.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{balance.client}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{balance.amount.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{balance.dueDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          balance.status === 'Paid' ? 'bg-green-100 text-green-800' :
                          balance.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {balance.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {balance.status !== 'Paid' && (
                          <Button 
                            size="sm" 
                            onClick={() => markAsPaid(balance.id)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            Mark Paid
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Recent Payments Table */}
        <Card className="border border-green-200 shadow-lg">
          <CardHeader className="bg-green-50">
            <CardTitle className="text-xl text-gray-900">Recent Payments</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.client}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{payment.amount.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.method}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Received
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Invoices Table */}
        <Card className="border border-blue-200 shadow-lg">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-xl text-gray-900">Recent Invoices</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{invoice.invoiceNo}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.client}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{invoice.amount.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          invoice.status === 'Paid' ? 'bg-green-100 text-green-800' :
                          invoice.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {invoice.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto relative z-[10000]">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                {modalType === 'invoice' ? 'Create New Invoice' : 'Record Payment'}
              </h3>
              <Button variant="ghost" size="icon" onClick={closeModal}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="p-6 space-y-4">
              {modalType === 'invoice' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                    <input 
                      type="text" 
                      value={formData.clientName || ''}
                      onChange={(e) => handleInputChange('clientName', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Number</label>
                    <input 
                      type="text" 
                      value={formData.invoiceNumber || ''}
                      onChange={(e) => handleInputChange('invoiceNumber', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                    <input 
                      type="number" 
                      value={formData.amount || ''}
                      onChange={(e) => handleInputChange('amount', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input 
                      type="date" 
                      value={formData.date || ''}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
                    <select 
                      value={formData.client || ''}
                      onChange={(e) => handleInputChange('client', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Client</option>
                      <option value="Acme Corp">Acme Corp</option>
                      <option value="Global Tech">Global Tech</option>
                      <option value="Tech Solutions">Tech Solutions</option>
                      <option value="Digital World">Digital World</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount Received</label>
                    <input 
                      type="number" 
                      value={formData.amount || ''}
                      onChange={(e) => handleInputChange('amount', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Date</label>
                    <input 
                      type="date" 
                      value={formData.date || ''}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                    <select 
                      value={formData.method || ''}
                      onChange={(e) => handleInputChange('method', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Method</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Cheque">Cheque</option>
                      <option value="UPI">UPI</option>
                      <option value="Cash">Cash</option>
                    </select>
                  </div>
                </>
              )}
              
              <div className="flex gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={closeModal}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  type="button" 
                  onClick={handleSubmit}
                  className={`flex-1 ${modalType === 'invoice' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-green-600 hover:bg-green-700'} text-white`}
                >
                  {modalType === 'invoice' ? 'Create Invoice' : 'Record Payment'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative z-[10000]">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                {reportType === 'gst' ? 'Generate GST Report' : 'Generate Custom Report'}
              </h3>
              <Button variant="ghost" size="icon" onClick={closeReportModal}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                <input 
                  type="date" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                <input 
                  type="date" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {reportType === 'custom' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Select Report Type</option>
                      <option value="client-wise">Client-wise Report</option>
                      <option value="payment-summary">Payment Summary</option>
                      <option value="outstanding">Outstanding Balances</option>
                      <option value="monthly">Monthly Summary</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Client (Optional)</label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">All Clients</option>
                      <option value="Acme Corp">Acme Corp</option>
                      <option value="Global Tech">Global Tech</option>
                      <option value="Tech Solutions">Tech Solutions</option>
                      <option value="Digital World">Digital World</option>
                    </select>
                  </div>
                </>
              )}
              
              {reportType === 'gst' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">GST Period</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select Period</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="monthly">Monthly</option>
                    <option value="annual">Annual</option>
                  </select>
                </div>
              )}
              
              <div className="flex gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={closeReportModal}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  type="button" 
                  onClick={() => {
                    alert(`${reportType === 'gst' ? 'GST' : 'Custom'} report generated successfully!`);
                    closeReportModal();
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Generate Report
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}