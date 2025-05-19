import React from 'react';

const feedbacks = [
  { date: '2025-05-01', note: 'Great food and fast service!', rating: 5 },
  { date: '2025-04-25', note: 'Loved the ambience.', rating: 4 },
];

const FeedbackSection = () => (
  <div className="mt-6">
    <h3 className="text-lg font-semibold text-blue-600 mb-2">Customer Feedback</h3>
    <ul className="space-y-2">
      {feedbacks.map((f, i) => (
        <li key={i} className="p-2 border rounded shadow-sm">
          <p className="text-sm">{f.note}</p>
          <p className="text-xs text-gray-500">
            {f.date} • Rating: {f.rating}/5
          </p>
        </li>
      ))}
    </ul>
  </div>
);

export default FeedbackSection;