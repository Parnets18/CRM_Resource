import { useState } from "react";
import { Upload, Receipt, Clock, Wallet, AlertCircle, CheckCircle2, X, Eye, Plus } from "lucide-react";
import Nav from "../Nav";

export default function ExpenseSupervisor() {
  const [expenses, setExpenses] = useState([
    { 
      id: 1, 
      amount: 250, 
      description: "Construction materials", 
      category: "Materials", 
      date: "2024-03-15", 
      status: "pending",
      vendor: "ABC Suppliers",
      receipt: "receipt1.jpg"
    },
    { 
      id: 2, 
      amount: 120, 
      description: "Team lunch meeting", 
      category: "Food", 
      date: "2024-03-14", 
      status: "approved",
      vendor: "Local Restaurant",
      receipt: "receipt2.jpg"
    },
    { 
      id: 3, 
      amount: 450, 
      description: "Equipment rental", 
      category: "Equipment", 
      date: "2024-03-13", 
      status: "rejected",
      vendor: "Tool Rental Co",
      receipt: "receipt3.pdf"
    },
    { 
      id: 4, 
      amount: 80, 
      description: "Transportation cost", 
      category: "Transportation", 
      date: "2024-03-12", 
      status: "pending",
      vendor: "Taxi Service",
      receipt: "receipt4.jpg"
    }
  ]);

  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    date: '',
    vendor: '',
    receipt: null
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (formData.amount && formData.category && formData.description) {
      const newExpense = {
        id: expenses.length + 1,
        ...formData,
        amount: parseFloat(formData.amount),
        status: 'pending',
        receipt: uploadedFiles.length > 0 ? uploadedFiles[0].name : 'No receipt'
      };
      
      setExpenses(prev => [newExpense, ...prev]);
      setFormData({
        amount: '',
        category: '',
        description: '',
        date: '',
        vendor: '',
        receipt: null
      });
      setUploadedFiles([]);
      alert('Expense submitted successfully!');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'rejected': return <X className="w-4 h-4 text-red-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 ml-64">
     <Nav/>
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-radial from-purple-900/10 via-gray-100 to-white"></div>
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-purple-600/10 to-transparent"></div>
      </div>

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Expense Management</h2>
            <p className="text-gray-600">Site Supervisor Portal</p>
          </div>
          <button className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
            <AlertCircle className="w-6 h-6" />
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Expense Submission Form */}
          <div className="xl:col-span-1">
            <div className="bg-white/90 backdrop-blur-sm border border-purple-200 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <Plus className="w-5 h-5 text-purple-600" />
                <h3 className="text-xl font-semibold text-gray-900">Submit New Expense</h3>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="number" 
                    name="amount"
                    placeholder="Amount (₹)" 
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                    step="0.01"
                    required
                  />
                  <select 
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Materials">Materials</option>
                    <option value="Labor">Labor</option>
                    <option value="Equipment">Equipment</option>
                    <option value="Food">Food</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <input 
                  type="text" 
                  name="description"
                  placeholder="Description" 
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="date" 
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                    required
                  />
                  <input 
                    type="text" 
                    name="vendor"
                    placeholder="Vendor Name" 
                    value={formData.vendor}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  />
                </div>

                {/* File Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-400 transition-colors">
                  <label className="cursor-pointer block">
                    <Upload className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <p className="text-gray-700 font-medium">Upload Receipt/Bill</p>
                    <p className="text-xs text-gray-500 mt-1">JPG, PNG, PDF (max 5MB)</p>
                    <input 
                      type="file" 
                      className="hidden" 
                      multiple 
                      accept="image/*,application/pdf"
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>

                {/* Uploaded Files */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-lg">
                        <span className="text-sm text-gray-700 truncate">{file.name}</span>
                        <button 
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <button 
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg"
                >
                  Submit Expense
                </button>
              </div>
            </div>
          </div>

          {/* Expenses Table */}
          <div className="xl:col-span-2">
            <div className="bg-white/90 backdrop-blur-sm border border-purple-200 rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-purple-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Expense Records</h3>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {expenses.map((expense) => (
                      <tr key={expense.id} className="hover:bg-purple-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(expense.date).toLocaleDateString('en-IN')}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div className="max-w-xs truncate">{expense.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            {expense.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div className="max-w-xs truncate">{expense.vendor}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                          ₹{expense.amount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(expense.status)}
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(expense.status)}`}>
                              {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="flex items-center gap-1 text-purple-600 hover:text-purple-800 text-sm font-medium">
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white/90 backdrop-blur-sm border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  {/* <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div> */}
                  {/* <div>
                    <p className="text-sm text-gray-600">Approved</p>
                    <p className="text-xl font-bold text-gray-900">
                      ₹{expenses.filter(e => e.status === 'approved').reduce((sum, e) => sum + e.amount, 0).toFixed(2)}
                    </p>
                  </div> */}
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  {/* <div className="p-2 bg-yellow-100 rounded-lg">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div> */}
                  {/* <div>
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-xl font-bold text-gray-900">
                      ₹{expenses.filter(e => e.status === 'pending').reduce((sum, e) => sum + e.amount, 0).toFixed(2)}
                    </p>
                  </div> */}
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm border border-purple-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  {/* <div className="p-2 bg-purple-100 rounded-lg">
                    <Wallet className="w-6 h-6 text-purple-600" />
                  </div> */}
                  {/* <div>
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="text-xl font-bold text-gray-900">
                      ₹{expenses.reduce((sum, e) => sum + e.amount, 0).toFixed(2)}
                    </p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}