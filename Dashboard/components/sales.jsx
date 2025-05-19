import React from 'react';

const SalesDashboard = () => {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Sales Management Dashboard</h1>

      {/* Lead Generation */}
      <section className="bg-white shadow rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-2">Lead Generation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Lead Name" className="p-2 border rounded" />
          <select className="p-2 border rounded">
            <option value="">Source</option>
            <option value="ads">Ads</option>
            <option value="website">Website</option>
            <option value="referral">Referral</option>
          </select>
          <input type="email" placeholder="Email" className="p-2 border rounded" />
          <input type="tel" placeholder="Phone Number" className="p-2 border rounded" />
        </div>
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Add Lead</button>
      </section>

      {/* Opportunity Tracking */}
      <section className="bg-white shadow rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-2">Opportunity Tracking</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="text" placeholder="Opportunity Name" className="p-2 border rounded" />
          <select className="p-2 border rounded">
            <option value="">Stage</option>
            <option>New</option>
            <option>Contacted</option>
            <option>Proposal</option>
            <option>Won</option>
            <option>Lost</option>
          </select>
          <input type="number" placeholder="Forecast Value" className="p-2 border rounded" />
        </div>
        <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded">Update Opportunity</button>
      </section>

      {/* Quotation Management */}
      <section className="bg-white shadow rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-2">Quotation Management</h2>
        <input type="text" placeholder="Quotation Template Name" className="w-full p-2 border rounded mb-2" />
        <div className="flex gap-4">
          <button className="bg-yellow-500 text-white px-4 py-2 rounded">Email</button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded">Print</button>
        </div>
      </section>

      {/* Sales Orders */}
      <section className="bg-white shadow rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-2">Sales Orders</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Order ID" className="p-2 border rounded" />
          <input type="text" placeholder="Customer" className="p-2 border rounded" />
        </div>
        <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded">Submit Order</button>
      </section>

      {/* Delivery Challan/Note */}
      <section className="bg-white shadow rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-2">Delivery Challan / Note</h2>
        <input type="text" placeholder="Delivery Note Reference" className="w-full p-2 border rounded" />
      </section>

      {/* Invoicing */}
      <section className="bg-white shadow rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-2">Invoicing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Invoice No." className="p-2 border rounded" />
          <select className="p-2 border rounded">
            <option value="">Tax Type</option>
            <option value="gst">GST</option>
            <option value="vat">VAT</option>
          </select>
        </div>
        <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded">Generate Invoice</button>
      </section>

      {/* Payments */}
      <section className="bg-white shadow rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-2">Payments</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="text" placeholder="Invoice ID" className="p-2 border rounded" />
          <select className="p-2 border rounded">
            <option value="">Payment Type</option>
            <option>Advance</option>
            <option>Partial</option>
            <option>Full</option>
          </select>
          <input type="number" placeholder="Amount" className="p-2 border rounded" />
        </div>
        <button className="mt-4 bg-pink-600 text-white px-4 py-2 rounded">Record Payment</button>
      </section>

      {/* Customer Ledger */}
      <section className="bg-white shadow rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-2">Customer Ledger</h2>
        <input type="text" placeholder="Customer Name or ID" className="w-full p-2 border rounded mb-2" />
        <div className="text-gray-600 text-sm">Transaction history will appear here...</div>
      </section>
    </div>
  );
};

export default SalesDashboard;
