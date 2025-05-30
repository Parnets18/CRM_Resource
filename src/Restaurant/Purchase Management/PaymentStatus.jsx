"use client";

import React, { useState } from "react";
import {
  Truck,
  Search,
  Check,
  AlertTriangle,
  Download,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import RestoNav from "../RestoNav";

export default function PendingPOsPayment() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMarkPaidDialogOpen, setIsMarkPaidDialogOpen] = useState(false);
  const [isMarkPendingDialogOpen, setIsMarkPendingDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [selectedPO, setSelectedPO] = useState(null);
  const [selectedPOs, setSelectedPOs] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentNotes, setPaymentNotes] = useState("");

  const poData = [
    {
      id: 1,
      poNumber: "PO001",
      supplier: "Fresh Farms",
      orderDate: "2025-05-01",
      deliveryDate: "2025-05-05",
      total: "$500.00",
      paymentStatus: "Pending",
      items: "Tomatoes, Lettuce",
      auditLog: [
        { action: "PO Created", date: "2025-05-01 09:00", user: "Admin" },
      ],
    },
    {
      id: 2,
      poNumber: "PO002",
      supplier: "Dairy Direct",
      orderDate: "2025-05-02",
      deliveryDate: "2025-05-06",
      total: "$300.00",
      paymentStatus: "Paid",
      items: "Milk, Cheese",
      auditLog: [
        { action: "PO Created", date: "2025-05-02 10:00", user: "Admin" },
        {
          action: "Payment Completed",
          date: "2025-05-03 14:00",
          user: "Manager",
        },
      ],
    },
    {
      id: 3,
      poNumber: "PO003",
      supplier: "Grain Co",
      orderDate: "2025-05-03",
      deliveryDate: "2025-05-07",
      total: "$450.00",
      paymentStatus: "Overdue",
      items: "Flour, Rice",
      auditLog: [
        { action: "PO Created", date: "2025-05-03 08:00", user: "Admin" },
      ],
    },
  ];

  const filteredPOs = poData.filter(
    (po) =>
      (po.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        po.supplier.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" ||
        po.paymentStatus.toLowerCase() === statusFilter.toLowerCase())
  );

  const handleMarkPaid = () => {
    setIsMarkPaidDialogOpen(false);
    setIsSuccessDialogOpen(true);
    setSelectedPOs([]);
    setPaymentNotes("");
    setTimeout(() => {
      setIsSuccessDialogOpen(false);
      setSelectedPO(null);
    }, 2000);
  };

  const handleMarkPending = () => {
    setIsMarkPendingDialogOpen(false);
    setIsSuccessDialogOpen(true);
    setSelectedPOs([]);
    setPaymentNotes("");
    setTimeout(() => {
      setIsSuccessDialogOpen(false);
      setSelectedPO(null);
    }, 2000);
  };

  const handleDownloadPOReport = (po) => {
    const content = `
Purchase Order Payment Report
-----------------------------
PO Number: ${po.poNumber}
Supplier: ${po.supplier}
Order Date: ${po.orderDate}
Delivery Date: ${po.deliveryDate}
Total: ${po.total}
Items: ${po.items}
Payment Status: ${po.paymentStatus}
Audit Log:
${po.auditLog
  .map(
    (log) =>
      `- ${log.action} by ${log.user} on ${log.date}${
        log.notes ? ` (Notes: ${log.notes})` : ""
      }`
  )
  .join("\n")}
-----------------------------
Generated on: ${new Date().toLocaleString()}
    `;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `PO_Payment_${po.poNumber}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleBulkSelection = (poId) => {
    setSelectedPOs((prev) =>
      prev.includes(poId) ? prev.filter((id) => id !== poId) : [...prev, poId]
    );
  };

  // Responsive PO Card for mobile
  const POCard = ({ po }) => (
    <div
      className={`border border-gray-200 rounded-lg p-4 mb-3 bg-white ${
        selectedPO?.id === po.id ? "ring-2 ring-purple-400" : ""
      }`}
      onClick={() => setSelectedPO(po)}
    >
      <div className="flex justify-between items-center">
        <span className="font-semibold text-black">{po.poNumber}</span>
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
            po.paymentStatus === "Paid"
              ? "border-green-500/50 text-green-700 bg-green-100"
              : po.paymentStatus === "Overdue"
              ? "border-red-500/50 text-red-700 bg-red-100"
              : "border-yellow-500/50 text-yellow-700 bg-yellow-100"
          }`}
        >
          {po.paymentStatus}
        </span>
      </div>
      <div className="text-sm text-gray-700">
        <span className="font-medium">Supplier:</span> {po.supplier}
      </div>
      <div className="flex flex-wrap gap-2 text-sm text-gray-700">
        <span>Order: {po.orderDate}</span>
        <span>Delivery: {po.deliveryDate}</span>
      </div>
      <div className="text-sm text-gray-700">
        <span className="font-medium">Items:</span> {po.items}
      </div>
      <div className="text-sm text-gray-700">
        <span className="font-medium">Total:</span> {po.total}
      </div>
      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          checked={selectedPOs.includes(po.id)}
          onChange={(e) => {
            e.stopPropagation();
            handleBulkSelection(po.id);
          }}
        />
        {po.paymentStatus !== "Paid" && (
          <button
            className="text-green-700 hover:bg-green-100 p-2 rounded-full"
            title="Mark as Paid"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPO(po);
              setIsMarkPaidDialogOpen(true);
            }}
          >
            <CheckCircle className="w-4 h-4" />
          </button>
        )}
        {po.paymentStatus === "Paid" && (
          <button
            className="text-yellow-700 hover:bg-yellow-100 p-2 rounded-full"
            title="Mark as Pending"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPO(po);
              setIsMarkPendingDialogOpen(true);
            }}
          >
            <XCircle className="w-4 h-4" />
          </button>
        )}
        <button
          className="text-purple-700 hover:bg-purple-100 p-2 rounded-full"
          title="Download Report"
          onClick={(e) => {
            e.stopPropagation();
            handleDownloadPOReport(po);
          }}
        >
          <Download className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white lg:ml-64 relative">
      <RestoNav />

      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-gray-100 to-white"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-600/10 to-transparent"></div>
      </div>

      <div className="relative z-10 p-4 sm:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 mt-12">
          <div>
            <h2 className="text-3xl font-bold text-black flex items-center">
              <Truck className="w-8 h-8 mr-3 text-purple-400" />
              Pending POs & Payments
            </h2>
            <p className="text-gray-700 mt-2">
              Track pending purchase orders and vendor payment statuses
            </p>
          </div>
          {selectedPOs.length > 0 && (
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center w-full sm:w-auto"
                onClick={() => setIsMarkPaidDialogOpen(true)}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark Paid ({selectedPOs.length})
              </button>
              <button
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg flex items-center w-full sm:w-auto"
                onClick={() => setIsMarkPendingDialogOpen(true)}
              >
                <XCircle className="w-4 h-4 mr-2" />
                Mark Pending ({selectedPOs.length})
              </button>
            </div>
          )}
        </div>

        <div className="bg-white/90 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden">
          <div className="p-4 sm:p-6">
            <h3 className="text-2xl font-semibold text-black mb-6">
              PO & Payment Management
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by PO Number or Supplier..."
                  className="w-full bg-gray-100 border border-gray-300 text-black rounded-lg pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-gray-100 border border-gray-300 text-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-48"
              >
                <option value="all">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="p-4 text-gray-700 w-12">
                      <input
                        type="checkbox"
                        onChange={(e) =>
                          setSelectedPOs(
                            e.target.checked
                              ? filteredPOs.map((po) => po.id)
                              : []
                          )
                        }
                        checked={
                          selectedPOs.length === filteredPOs.length &&
                          filteredPOs.length > 0
                        }
                      />
                    </th>
                    <th className="p-4 text-gray-700">PO Number</th>
                    <th className="p-4 text-gray-700">Supplier</th>
                    <th className="p-4 text-gray-700">Order Date</th>
                    <th className="p-4 text-gray-700">Delivery Date</th>
                    <th className="p-4 text-gray-700">Items</th>
                    <th className="p-4 text-gray-700">Total</th>
                    <th className="p-4 text-gray-700">Payment Status</th>
                    <th className="p-4 text-gray-700 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPOs.map((po) => (
                    <tr
                      key={po.id}
                      className="border-t border-gray-200 hover:bg-purple-100/50 cursor-pointer transition-colors duration-200"
                      onClick={() => setSelectedPO(po)}
                    >
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedPOs.includes(po.id)}
                          onChange={() => handleBulkSelection(po.id)}
                        />
                      </td>
                      <td className="p-4 text-black font-medium">
                        {po.poNumber}
                      </td>
                      <td className="p-4 text-black">{po.supplier}</td>
                      <td className="p-4 text-black">{po.orderDate}</td>
                      <td className="p-4 text-black">{po.deliveryDate}</td>
                      <td className="p-4 text-black">{po.items}</td>
                      <td className="p-4 text-black">{po.total}</td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium border ${
                            po.paymentStatus === "Paid"
                              ? "border-green-500/50 text-green-700 bg-green-100"
                              : po.paymentStatus === "Overdue"
                              ? "border-red-500/50 text-red-700 bg-red-100"
                              : "border-yellow-500/50 text-yellow-700 bg-yellow-100"
                          }`}
                        >
                          {po.paymentStatus}
                        </span>
                      </td>
                      <td className="p-4 text-right flex justify-end gap-2">
                        {po.paymentStatus !== "Paid" && (
                          <button
                            className="text-green-700 hover:bg-green-100 p-2 rounded-full"
                            title="Mark as Paid"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPO(po);
                              setIsMarkPaidDialogOpen(true);
                            }}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        {po.paymentStatus === "Paid" && (
                          <button
                            className="text-yellow-700 hover:bg-yellow-100 p-2 rounded-full"
                            title="Mark as Pending"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPO(po);
                              setIsMarkPendingDialogOpen(true);
                            }}
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          className="text-purple-700 hover:bg-purple-100 p-2 rounded-full"
                          title="Download Report"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadPOReport(po);
                          }}
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden mt-4">
              {filteredPOs.length === 0 ? (
                <div className="text-center py-12">
                  <Truck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No POs found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filter criteria.
                  </p>
                </div>
              ) : (
                filteredPOs.map((po) => <POCard key={po.id} po={po} />)
              )}
            </div>
          </div>
        </div>

        {selectedPO && (
          <div className="mt-6 bg-white/90 backdrop-blur-sm border border-purple-500/20 rounded-xl p-4 sm:p-6">
            <h3 className="text-xl font-semibold text-black mb-4">
              PO & Payment Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-700 text-sm">PO Number</p>
                <p className="text-black font-medium">{selectedPO.poNumber}</p>
              </div>
              <div>
                <p className="text-gray-700 text-sm">Supplier</p>
                <p className="text-black font-medium">{selectedPO.supplier}</p>
              </div>
              <div>
                <p className="text-gray-700 text-sm">Order Date</p>
                <p className="text-black font-medium">{selectedPO.orderDate}</p>
              </div>
              <div>
                <p className="text-gray-700 text-sm">Delivery Date</p>
                <p className="text-black font-medium">
                  {selectedPO.deliveryDate}
                </p>
              </div>
              <div>
                <p className="text-gray-700 text-sm">Items</p>
                <p className="text-black font-medium">{selectedPO.items}</p>
              </div>
              <div>
                <p className="text-gray-700 text-sm">Total</p>
                <p className="text-black font-medium">{selectedPO.total}</p>
              </div>
              <div>
                <p className="text-gray-700 text-sm">Payment Status</p>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium border ${
                    selectedPO.paymentStatus === "Paid"
                      ? "border-green-500/50 text-green-700 bg-green-100"
                      : selectedPO.paymentStatus === "Overdue"
                      ? "border-red-500/50 text-red-700 bg-red-100"
                      : "border-yellow-500/50 text-yellow-700 bg-yellow-100"
                  }`}
                >
                  {selectedPO.paymentStatus}
                </span>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-gray-700 text-sm">Audit Log</p>
              <div className="mt-2 space-y-2">
                {selectedPO.auditLog.map((log, index) => (
                  <div
                    key={index}
                    className="flex items-center text-sm text-gray-700"
                  >
                    <Clock className="w-4 h-4 mr-2 text-purple-400" />
                    <span>
                      {log.action} by {log.user} on {log.date}
                      {log.notes && <span> (Notes: {log.notes})</span>}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mark Paid Dialog */}
        {isMarkPaidDialogOpen && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white border border-purple-500/20 rounded-xl p-6 w-full max-w-md">
              <div className="flex items-center mb-4">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <h3 className="text-xl font-semibold text-black">
                  Mark Payment as Paid
                </h3>
              </div>
              <p className="text-gray-700 mb-4">
                Are you sure you want to mark{" "}
                {selectedPOs.length > 0
                  ? `${selectedPOs.length} selected POs`
                  : `the payment for ${selectedPO?.poNumber}`}{" "}
                as Paid?
              </p>
              <div className="mb-4">
                <label htmlFor="paymentNotes" className="text-gray-700 text-sm">
                  Payment Notes (Optional)
                </label>
                <input
                  id="paymentNotes"
                  className="w-full bg-gray-100 border border-gray-300 text-black rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={paymentNotes}
                  onChange={(e) => setPaymentNotes(e.target.value)}
                  placeholder="Enter any payment notes"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100"
                  onClick={() => setIsMarkPaidDialogOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                  onClick={() => handleMarkPaid(selectedPOs.length > 0)}
                >
                  Mark as Paid
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mark Pending Dialog */}
        {isMarkPendingDialogOpen && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white border border-purple-500/20 rounded-xl p-6 w-full max-w-md">
              <div className="flex items-center mb-4">
                <XCircle className="w-5 h-5 text-yellow-500 mr-2" />
                <h3 className="text-xl font-semibold text-black">
                  Mark Payment as Pending
                </h3>
              </div>
              <p className="text-gray-700 mb-4">
                Are you sure you want to mark{" "}
                {selectedPOs.length > 0
                  ? `${selectedPOs.length} selected POs`
                  : `the payment for ${selectedPO?.poNumber}`}{" "}
                as Pending?
              </p>
              <div className="mb-4">
                <label htmlFor="paymentNotes" className="text-gray-700 text-sm">
                  Payment Notes (Optional)
                </label>
                <input
                  id="paymentNotes"
                  className="w-full bg-gray-100 border border-gray-300 text-black rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={paymentNotes}
                  onChange={(e) => setPaymentNotes(e.target.value)}
                  placeholder="Enter any payment notes"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100"
                  onClick={() => setIsMarkPendingDialogOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg"
                  onClick={() => handleMarkPending(selectedPOs.length > 0)}
                >
                  Mark as Pending
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Dialog */}
        {isSuccessDialogOpen && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white border border-purple-500/20 rounded-xl p-6 w-full max-w-md">
              <div className="flex items-center mb-4">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <h3 className="text-xl font-semibold text-black">
                  Operation Successful
                </h3>
              </div>
              <p className="text-gray-700 mb-4">
                Payment status update completed successfully.
              </p>
              <div className="flex justify-end">
                <button
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                  onClick={() => setIsSuccessDialogOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
