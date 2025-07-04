// import React, { useEffect, useState } from 'react';
// import { fetchStatistics } from '../services/api';

// const StatisticsCards = ({ month }) => {
//   const [stats, setStats] = useState({});

//   useEffect(() => {
//     const loadStats = async () => {
//       const res = await fetchStatistics(month);
//       setStats(res.data || {});
//     };
//     loadStats();
//   }, [month]);

//   return (
//     <div className="grid sm:grid-cols-3 gap-4">
//       <div className="bg-white shadow p-4 rounded">
//         <p className="font-medium">Total Sale Amount</p>
//         <p className="text-xl font-bold">₹{stats.totalSaleAmount || 0}</p>
//       </div>
//       <div className="bg-white shadow p-4 rounded">
//         <p className="font-medium">Total Sold Items</p>
//         <p className="text-xl font-bold">{stats.soldItems || 0}</p>
//       </div>
//       <div className="bg-white shadow p-4 rounded">
//         <p className="font-medium">Total Not Sold Items</p>
//         <p className="text-xl font-bold">{stats.notSoldItems || 0}</p>
//       </div>
//     </div>
//   );
// };

// export default StatisticsCards;


import React, { useEffect, useState } from 'react';
import { fetchStatistics } from '../services/api';

const StatisticsCards = ({ month }) => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      try {
        const res = await fetchStatistics(month);
        setStats(res.data || {});
      } catch (error) {
        console.error('Error loading statistics:', error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, [month]);

  const cards = [
    {
      title: 'Total Sale Amount',
      value: `₹${stats.totalSaleAmount?.toLocaleString('en-IN') || 0}`,
      icon: '💰',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Total Sold Items',
      value: stats.soldItems || 0,
      icon: '✅',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Not Sold Items',
      value: stats.notSoldItems || 0,
      icon: '❌',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <div key={index} className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{card.title}</p>
              {loading ? (
                <div className="mt-2 h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
              ) : (
                <p className={`text-2xl font-bold ${card.color} mt-2`}>{card.value}</p>
              )}
            </div>
            <div className={`text-3xl p-3 rounded-full ${card.bgColor}`}>
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatisticsCards;