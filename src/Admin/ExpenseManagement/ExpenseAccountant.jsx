import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Banknote, Landmark, FileText, Calendar, Clock, Download, CheckCircle2, Plus, Eye } from "lucide-react";
import Nav from '../Nav';

export default function ExpenseAccountant() {
  const [expenses, setExpenses] = useState([
    { id: 1, type: "Fuel", amount: 2500, date: "2024-03-15", vendor: "Shell", paymentMethod: "Bank", reference: "BT001" },
    { id: 2, type: "Rent", amount: 15000, date: "2024-03-10", vendor: "Office Space Ltd", paymentMethod: "Bank", reference: "BT002" },
    { id: 3, type: "Utilities", amount: 3200, date: "2024-03-12", vendor: "Power Corp", paymentMethod: "Cash", reference: "CSH001" },
    { id: 4, type: "Vehicle", amount: 8500, date: "2024-03-08", vendor: "Car Service", paymentMethod: "Cheque", reference: "CHQ001" }
  ]);

  const [payments, setPayments] = useState([
    { id: 1, amount: 45000, method: "Bank", date: "2024-03-18", recipient: "Construction Co", status: "processed", reference: "PAY001" },
    { id: 2, amount: 12000, method: "Cash", date: "2024-03-17", recipient: "Material Supplier", status: "pending", reference: "PAY002" },
    { id: 3, amount: 8750, method: "Bank", date: "2024-03-16", recipient: "Equipment Rental", status: "processed", reference: "PAY003" },
    { id: 4, amount: 6200, method: "Cheque", date: "2024-03-14", recipient: "Office Supplies", status: "pending", reference: "PAY004" }
  ]);

  const [formData, setFormData] = useState({
    type: '',
    amount: '',
    date: '',
    vendor: '',
    paymentMethod: '',
    reference: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.type && formData.amount && formData.date && formData.vendor) {
      const newExpense = {
        id: expenses.length + 1,
        ...formData,
        amount: parseFloat(formData.amount)
      };
      setExpenses(prev => [newExpense, ...prev]);
      setFormData({
        type: '',
        amount: '',
        date: '',
        vendor: '',
        paymentMethod: '',
        reference: ''
      });
      alert('Expense recorded successfully!');
    } else {
      alert('Please fill in all required fields');
    }
  };

  const getStatusIcon = (status) => {
    return status === 'processed' ? (
      <CheckCircle2 className="text-green-600 w-4 h-4" />
    ) : (
      <Clock className="text-yellow-500 w-4 h-4" />
    );
  };

  const getPaymentIcon = (method) => {
    switch(method) {
      case 'Bank':
      case 'Bank Transfer':
        return <Landmark className="text-purple-600 w-4 h-4" />;
      case 'Cash':
        return <Banknote className="text-green-600 w-4 h-4" />;
      case 'Cheque':
        return <FileText className="text-blue-600 w-4 h-4" />;
      default:
        return <Banknote className="text-gray-600 w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-6 ml-64">
      <div className="max-w-7xl mx-auto">
       <Nav/>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Expense Management</h2>
            <p className="text-gray-600 mt-1">Accountant Portal</p>
          </div>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Today: {new Date().toLocaleDateString()}
          </Button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="xl:col-span-1">
            <Card className="border border-purple-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <Plus className="w-5 h-5 mr-2" />
                  Record New Expense
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expense Type *</label>
                    <select 
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="Fuel">Fuel</option>
                      <option value="Vehicle">Vehicle Maintenance</option>
                      <option value="Rent">Rent</option>
                      <option value="Utilities">Utilities</option>
                      <option value="Office Supplies">Office Supplies</option>
                      <option value="Equipment">Equipment</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹) *</label>
                    <input 
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      placeholder="Enter amount"
                      className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                    <input 
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vendor *</label>
                    <input 
                      type="text"
                      name="vendor"
                      value={formData.vendor}
                      onChange={handleInputChange}
                      placeholder="Vendor name"
                      className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                    <select 
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select Method</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Cash">Cash</option>
                      <option value="Cheque">Cheque</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reference Number</label>
                    <input 
                      type="text"
                      name="reference"
                      value={formData.reference}
                      onChange={handleInputChange}
                      placeholder="Reference number"
                      className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <Button onClick={handleSubmit} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3">
                    <Plus className="w-4 h-4 mr-2" />
                    Record Expense
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tables Section */}
          <div className="xl:col-span-2 space-y-6">
            {/* Expenses Table */}
            <Card className="border border-purple-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Recent Expenses
                  </span>
                  <span className="text-sm opacity-90">{expenses.length} entries</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Amount</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Vendor</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Payment</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Reference</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {expenses.map((expense, index) => (
                        <tr key={expense.id} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              {expense.type}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-semibold text-gray-900">₹{expense.amount.toLocaleString()}</td>
                          <td className="px-4 py-3 text-gray-700">{expense.vendor}</td>
                          <td className="px-4 py-3 text-gray-600">{new Date(expense.date).toLocaleDateString()}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center space-x-2">
                              {getPaymentIcon(expense.paymentMethod)}
                              <span className="text-sm text-gray-700">{expense.paymentMethod}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-gray-600 text-sm">{expense.reference || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Payments Table */}
            <Card className="border border-purple-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Banknote className="w-5 h-5 mr-2" />
                    Recent Payments
                  </span>
                  <span className="text-sm opacity-90">{payments.length} entries</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Amount</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Recipient</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Method</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Reference</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {payments.map((payment, index) => (
                        <tr key={payment.id} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                          <td className="px-4 py-3 font-semibold text-gray-900">₹{payment.amount.toLocaleString()}</td>
                          <td className="px-4 py-3 text-gray-700">{payment.recipient}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center space-x-2">
                              {getPaymentIcon(payment.method)}
                              <span className="text-sm text-gray-700">{payment.method}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-gray-600">{new Date(payment.date).toLocaleDateString()}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(payment.status)}
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                payment.status === 'processed' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {payment.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-gray-600 text-sm">{payment.reference}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-700">Total Expenses</p>
                      <p className="text-2xl font-bold text-blue-900">₹{expenses.reduce((sum, exp) => sum + exp.amount, 0).toLocaleString()}</p>
                    </div>
                    <FileText className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-700">Total Payments</p>
                      <p className="text-2xl font-bold text-green-900">₹{payments.reduce((sum, pay) => sum + pay.amount, 0).toLocaleString()}</p>
                    </div>
                    <Banknote className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-purple-200 bg-purple-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-700">Pending Payments</p>
                      <p className="text-2xl font-bold text-purple-900">{payments.filter(p => p.status === 'pending').length}</p>
                    </div>
                    <Clock className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}