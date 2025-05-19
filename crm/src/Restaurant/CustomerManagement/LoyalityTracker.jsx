import React from 'react';

const LoyaltyTracker = ({ points }) => {
  const tier = points >= 100 ? 'Gold' : points >= 50 ? 'Silver' : 'Bronze';

  return (
    <div className="bg-gray-100 p-4 rounded">
      <p className="font-semibold">Loyalty Points: {points}</p>
      <p className="text-sm text-gray-600">Tier: {tier}</p>
      <div className="w-full bg-gray-300 rounded-full h-2.5 mt-2">
        <div
          className={`h-2.5 rounded-full ${
            tier === 'Gold' ? 'bg-yellow-400' : tier === 'Silver' ? 'bg-gray-500' : 'bg-orange-400'
          }`}
          style={{ width: `${Math.min(points, 100)}%` }}
        />
      </div>
    </div>
  );
};

export default LoyaltyTracker;