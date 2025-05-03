import React, { useState } from 'react';

const Inventory = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [warehouseName, setWarehouseName] = useState('');
  const [zoneInput, setZoneInput] = useState('');
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [productAssignments, setProductAssignments] = useState([]);
  const [productInput, setProductInput] = useState({ name: '', quantity: 0 });
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Tomatoes', quantity: 100 },
    { id: 2, name: 'Cheese', quantity: 50 },
    { id: 3, name: 'Bread', quantity: 75 },
  ]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [stockChange, setStockChange] = useState(0);
  const [action, setAction] = useState(null);
  const [transferForm, setTransferForm] = useState({ source: '', destination: '', product: '', quantity: 0 });
  const [transferHistory, setTransferHistory] = useState([]);

  const addWarehouse = () => {
    const newWarehouse = {
      id: Date.now(),
      name: warehouseName,
      zones: zoneInput.split(',').map(z => z.trim()),
      stock: [],
    };
    setWarehouses([...warehouses, newWarehouse]);
    setWarehouseName('');
    setZoneInput('');
  };

  const assignProduct = () => {
    const updated = warehouses.map(wh => {
      if (wh.id === selectedWarehouse.id) {
        const updatedStock = [...wh.stock];
        const existing = updatedStock.find(p => p.name === productInput.name);
        if (existing) {
          existing.quantity += Number(productInput.quantity);
        } else {
          updatedStock.push({ name: productInput.name, quantity: Number(productInput.quantity) });
        }
        return { ...wh, stock: updatedStock };
      }
      return wh;
    });
    setWarehouses(updated);
    setProductAssignments([...productAssignments, { ...productInput, warehouseId: selectedWarehouse.id }]);
    setProductInput({ name: '', quantity: 0 });
  };

  const handleStockUpdate = () => {
    setInventory(prev =>
      prev.map(item =>
        item.id === selectedItem.id
          ? { ...item, quantity: action === 'in' ? item.quantity + stockChange : item.quantity - stockChange }
          : item
      )
    );
    setSelectedItem(null);
    setStockChange(0);
    setAction(null);
  };

  const handleTransfer = () => {
    if (!transferForm.source || !transferForm.destination || !transferForm.product || !transferForm.quantity || transferForm.source === transferForm.destination) {
      alert("Please fill all fields correctly.");
      return;
    }
    const newTransfer = {
      date: new Date().toLocaleString(),
      product: transferForm.product,
      quantity: transferForm.quantity,
      from: transferForm.source,
      to: transferForm.destination,
      status: "Transferred",
    };
    setTransferHistory(prev => [newTransfer, ...prev]);
    setTransferForm({ source: '', destination: '', product: '', quantity: 0 });
  };

  const warehouseNames = warehouses.map(w => w.name);
  const productNames = [...new Set(warehouses.flatMap(w => w.stock.map(p => p.name)))];

  return (
    <div className="p-4 md:p-6 space-y-12 max-w-7xl mx-auto">
      {/* Product Master */}
      <section className="bg-white shadow-lg rounded-xl p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">Product Master</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {['SKU', 'Barcode', 'HSN Code'].map((label, idx) => (
            <div key={idx}>
              <label className="block text-sm font-medium text-gray-700">{label}</label>
              <input type="text" className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700">Unit</label>
            <select className="mt-1 w-full p-2 border border-gray-300 rounded-md">
              <option>Kg</option>
              <option>Liters</option>
              <option>Pieces</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tax (%)</label>
            <input type="number" className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Serials</label>
            <textarea rows="2" className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Enter serial numbers, comma-separated"></textarea>
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Save Product</button>
          </div>
        </form>
      </section>

      {/* Stock In/Out Management */}
      <section className="bg-white p-4 md:p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Stock In/Out Management</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left">Item</th>
                <th className="px-6 py-3 text-left">Quantity</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map(item => (
                <tr key={item.id} className="border-b">
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.quantity}</td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600" onClick={() => { setSelectedItem(item); setAction('in'); }}>Stock In</button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => { setSelectedItem(item); setAction('out'); }}>Stock Out</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-md">
              <h2 className="text-lg font-semibold mb-4">{action === 'in' ? 'Stock In' : 'Stock Out'}: {selectedItem.name}</h2>
              <input type="number" className="w-full border p-2 rounded mb-4" placeholder="Enter quantity" value={stockChange} onChange={e => setStockChange(Number(e.target.value))} />
              <div className="flex justify-end gap-2">
                <button className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400" onClick={() => { setSelectedItem(null); setStockChange(0); setAction(null); }}>Cancel</button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleStockUpdate}>Confirm</button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Warehouse & Zone Management */}
      <section className="space-y-8">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Create Warehouse</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input type="text" placeholder="Warehouse Name" className="p-2 border rounded w-full" value={warehouseName} onChange={e => setWarehouseName(e.target.value)} />
            <input type="text" placeholder="Zones (comma-separated)" className="p-2 border rounded w-full" value={zoneInput} onChange={e => setZoneInput(e.target.value)} />
          </div>
          <button onClick={addWarehouse} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add Warehouse</button>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Warehouse List</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-2">Warehouse</th>
                  <th className="text-left px-4 py-2">Zones</th>
                  <th className="text-left px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {warehouses.map(wh => (
                  <tr key={wh.id} className="border-t">
                    <td className="px-4 py-2">{wh.name}</td>
                    <td className="px-4 py-2">{wh.zones.join(', ')}</td>
                    <td className="px-4 py-2">
                      <button onClick={() => setSelectedWarehouse(wh)} className="text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Assign Products</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedWarehouse && (
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">Assign Products to {selectedWarehouse.name}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" placeholder="Product Name" className="p-2 border rounded" value={productInput.name} onChange={e => setProductInput({ ...productInput, name: e.target.value })} />
              <input type="number" placeholder="Quantity" className="p-2 border rounded" value={productInput.quantity} onChange={e => setProductInput({ ...productInput, quantity: e.target.value })} />
            </div>
            <button onClick={assignProduct} className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">Add to Warehouse</button>
          </div>
        )}

        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Stock per Warehouse</h3>
          {warehouses.map(wh => (
            <div key={wh.id} className="mb-4">
              <h4 className="font-semibold text-gray-700">{wh.name}</h4>
              {wh.stock.length === 0 ? (
                <p className="text-sm text-gray-500">No stock assigned</p>
              ) : (
                <ul className="list-disc list-inside text-sm">
                  {wh.stock.map((item, idx) => (
                    <li key={idx}>{item.name} — {item.quantity}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Stock Transfer Section */}
      <section className="bg-white shadow-lg rounded-xl p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">Stock Transfer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {[{ label: "Source Location", value: transferForm.source, key: "source" }, { label: "Destination Location", value: transferForm.destination, key: "destination" }].map(({ label, value, key }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700">{label}</label>
              <select className="w-full p-2 border rounded" value={value} onChange={e => setTransferForm({ ...transferForm, [key]: e.target.value })}>
                <option value="">Select {label.split(' ')[0]}</option>
                {warehouseNames.map((name, i) => <option key={i} value={name}>{name}</option>)}
              </select>
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700">Product</label>
            <select className="w-full p-2 border rounded" value={transferForm.product} onChange={e => setTransferForm({ ...transferForm, product: e.target.value })}>
              <option value="">Select Product</option>
              
              {productNames.map((name, i) => <option key={i} value={name}>{name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input type="number" className="w-full p-2 border rounded" value={transferForm.quantity} onChange={e => setTransferForm({ ...transferForm, quantity: Number(e.target.value) })} />
          </div>
        </div>
        <div className="text-right">
          <button onClick={handleTransfer} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Transfer</button>
        </div>
      </section>

      {/* Transfer History Table */}
      <section className="bg-white shadow-lg rounded-xl p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">Transfer History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Product</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">From → To</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {transferHistory.length === 0 ? (
                <tr><td colSpan="5" className="text-center py-4 text-gray-500">No transfers yet.</td></tr>
              ) : (
                transferHistory.map((entry, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-4 py-2">{entry.date}</td>
                    <td className="px-4 py-2">{entry.product}</td>
                    <td className="px-4 py-2">{entry.quantity}</td>
                    <td className="px-4 py-2">{entry.from} → {entry.to}</td>
                    <td className="px-4 py-2">{entry.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Inventory;
