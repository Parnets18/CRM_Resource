import React, { useState } from 'react';
import Sales from './components/sales';
import Purchase from './components/Purchase';
import ProductMaster from './components/Inventory';

const SidebarMenu = ({ active, onSelect }) => {
  const items = [
    { id: 'dashboard', label: 'Dashboard ', icon: '📊' },
    { id: 'sales', label: 'Sales', icon: '💰' },
    { id: 'purchase', label: 'Purchase', icon: '🛒' },
    { id: 'inventory', label: 'Inventory', icon: '📦' },
    { id: 'crm', label: 'Customer Management', icon: '👥' },
    { id: 'hr', label: 'HR', icon: '🧑‍💼' },
    { id: 'attendance', label: 'Attendance', icon: '📅' },
    { id: 'payroll', label: 'Payroll', icon: '💳' },
    { id: 'finance', label: 'Accounts & Finance', icon: '📈' },
    { id: 'reporting', label: 'Reporting', icon: '📝' },
    { id: 'security', label: 'Role-based Security', icon: '🔐' },
    { id: 'alerts', label: 'Alerts & Integrations', icon: '🔔' },
  ];

  return (
    <div className="bg-gray-800 text-white w-64 p-4 space-y-2 h-screen fixed left-0 top-0 hidden md:block overflow-y-auto">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item.id)}
          className={`w-full text-left px-4 py-2 rounded flex items-center transition ${
            active === item.id ? 'bg-blue-600' : 'hover:bg-gray-700'
          }`}
        >
          <span className="mr-3">{item.icon}</span>
          {item.label}
        </button>
      ))}
    </div>
  );
};

const PageContent = ({ page }) => {
  switch (page) {
    case 'sales':
      return <Sales />;
    case 'purchase':
      return <Purchase />;
    case 'inventory':
      return <ProductMaster />;
    default:
      return (
        <div className="p-6 bg-white rounded shadow">
          <h2 className="text-2xl font-semibold capitalize">{page.replace(/-/g, ' ')}</h2>
          <p className="mt-4 text-gray-600">This is a placeholder for the "{page}" content.</p>
        </div>
      );
  }
};

const ResponsiveDashboard = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for medium and larger screens */}
      <SidebarMenu active={activePage} onSelect={setActivePage} />

      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow z-10 flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">ERP Dashboard</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-gray-600 hover:text-black text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Sidebar Drawer */}
      {sidebarOpen && (
        <div className="md:hidden fixed top-0 left-0 w-64 h-full bg-gray-800 text-white p-4 z-20 overflow-y-auto">
          <SidebarMenu active={activePage} onSelect={(id) => {
            setActivePage(id);
            setSidebarOpen(false);
          }} />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 ml-0 md:ml-64 mt-16 md:mt-0 overflow-y-auto p-4 h-screen">
        <PageContent page={activePage} />
      </main>
    </div>
  );
};

export default ResponsiveDashboard;
