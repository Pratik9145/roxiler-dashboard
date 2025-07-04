// // src/components/TransactionsTable.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const TransactionsTable = ({ month }) => {
//   const [transactions, setTransactions] = useState([]);
//   const [search, setSearch] = useState('');
//   const [page, setPage] = useState(1);
//   const [limit] = useState(10);

//   const fetchTransactions = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/transactions', {
//         params: { month, search, page, limit },
//       });
//       setTransactions(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     setPage(1);
//     fetchTransactions();
//   }, [month, search]);

//   useEffect(() => {
//     fetchTransactions();
//   }, [page]);

//   return (
//     <div>
//       {/* UI here */}
//     </div>
//   );
// };

// export default TransactionsTable; // ✅ This line is mandatory

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionsTable = ({ month }) => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/transactions', {
        params: { month, search, page, limit },
      });
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchTransactions();
  }, [month, search]);

  useEffect(() => {
    fetchTransactions();
  }, [page]);

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="text-lg font-semibold text-gray-800">Transactions</h3>
          <input
            type="text"
            placeholder="Search transactions..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No transactions found
                  </td>
                </tr>
              ) : (
                transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{transaction.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{transaction.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{transaction.description}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">₹{transaction.price}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{transaction.category}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        transaction.sold ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.sold ? 'Sold' : 'Not Sold'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {!loading && transactions.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
          <span className="text-sm text-gray-700">Page {page}</span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded disabled:opacity-50 hover:bg-gray-200"
            >
              Previous
            </button>
            <button
              onClick={() => setPage(page + 1)}
              disabled={transactions.length < limit}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded disabled:opacity-50 hover:bg-blue-600"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionsTable;