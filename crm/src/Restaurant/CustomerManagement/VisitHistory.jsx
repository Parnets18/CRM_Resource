import React from 'react';

const visits = [
  { date: '2025-05-01', service: 'Dine-in' },
  { date: '2025-04-25', service: 'Takeaway' },
];

const VisitHistory = () => (
  <div className="mt-6">
    <h3 className="text-lg font-semibold text-blue-600 mb-2">Visit History</h3>
    <ul className="space-y-1">
      {visits.map((v, i) => (
        <li key={i} className="text-sm text-gray-700">
          {v.date} - {v.service}
        </li>
      ))}
    </ul>
  </div>
);

export default VisitHistory;