import React, { useState } from 'react';


const CustomerProfile = () => {
  const [customer, setCustomer] = useState({
    name: 'Amit Patil',
    phone: '+91 9876543210',
    email: 'amit@example.com',
    birthday: '1990-01-01',
    preferences: ['Veg', 'South Indian'],
    loyaltyPoints: 80,
  });

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-xl shadow-md mt-6">
      <h2 className="text-2xl font-semibold text-blue-600 mb-4">Customer Profile</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <p><strong>Name:</strong> {customer.name}</p>
          <p><strong>Phone:</strong> {customer.phone}</p>
          <p><strong>Email:</strong> {customer.email}</p>
          <p><strong>Birthday:</strong> {customer.birthday}</p>
          <p><strong>Preferences:</strong> {customer.preferences.join(', ')}</p>
        </div>
        <div>

          <div className="mt-4 space-x-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Send SMS</button>
            <button className="bg-green-500 text-white px-4 py-2 rounded">Send Email</button>
          </div>
        </div>
      </div>


    </div>
  );
};

export default CustomerProfile;