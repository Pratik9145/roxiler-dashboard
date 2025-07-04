import React, { useState } from 'react';
import TransactionsTable from './components/TransactionsTable';
import StatisticsCards from './components/StatisticsCards';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';

const App = () => {
  const [month, setMonth] = useState('March');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Roxiler Transactions Dashboard</h1>

          <div className="flex items-center gap-3">
            <label htmlFor="month" className="font-medium text-gray-700">Select Month:</label>
            <select
              id="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="px-4 py-2 border-2 border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 outline-none shadow-md bg-white text-gray-800 font-medium min-w-[120px]"
            >
              {months.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <StatisticsCards month={month} />
      <TransactionsTable month={month} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BarChart month={month} />
        <PieChart month={month} />
      </div>
    </div>
  );
};

export default App;
