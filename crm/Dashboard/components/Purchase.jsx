import React from 'react';

const PurchaseFlowDashboard = () => {
  const processSteps = [
    "Purchase Request",
    "Request Approval",
    "Purchase Order (PO)",
    "Goods Receipt Note (GRN)",
    "Purchase Invoice",
    "Vendor Payment",
  ];

  const features = [
    {
      title: "Multi-department PR Raising",
      description: "Allow each department to initiate purchase requests with appropriate categorization.",
    },
    {
      title: "PO Creation",
      description: "Supports rate comparison and a multi-level approval system before finalizing orders.",
    },
    {
      title: "GRN with Batch & Expiry",
      description: "On stock arrival, enter batch numbers and expiry dates for accurate tracking.",
    },
    {
      title: "Vendor Invoice Entry",
      description: "Input GST/VAT-compliant invoices linked with PO and GRN for traceability.",
    },
    {
      title: "Payment Handling",
      description: "Schedule payments with clear tracking of due dates, partials, and overdue items.",
    },
    {
      title: "Vendor Master",
      description: "Manage vendor documents, contact details, past orders, and payment history.",
    },
  ];

  return (
    <section className="p-4 md:p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">🧩 Purchase Process Flow</h2>

      {/* Process Flow */}
      <div className="flex flex-wrap justify-start gap-4 mb-8">
        {processSteps.map((step, index) => (
          <div key={index} className="bg-blue-100 text-blue-900 px-4 py-2 rounded-full text-sm font-medium">
            {step}
          </div>
        ))}
      </div>

      {/* Feature Cards */}
      <h3 className="text-xl font-semibold text-gray-700 mb-4">📌 Key Features</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, idx) => (
          <div key={idx} className="bg-gray-50 border rounded-xl p-4 shadow-sm hover:shadow-md transition">
            <h4 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h4>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PurchaseFlowDashboard;
