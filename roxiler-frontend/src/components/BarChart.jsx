// import React, { useEffect, useState } from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import { fetchBarChart } from '../services/api';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const BarChart = ({ month }) => {
//   const [barData, setBarData] = useState([]);

//   useEffect(() => {
//     const loadBar = async () => {
//       const res = await fetchBarChart(month);
//       setBarData(res.data);
//     };
//     loadBar();
//   }, [month]);

//   const labels = [
//     '0-100', '101-200', '201-300', '301-400', '401-500',
//     '501-600', '601-700', '701-800', '801-900', '901-above'
//   ];

//   const values = labels.map(label => {
//     const range = label === '901-above' ? '901-above' : parseInt(label.split('-')[0]);
//     const item = barData.find(d => d._id === range || d._id === label);
//     return item ? item.count : 0;
//   });

//   const data = {
//     labels,
//     datasets: [
//       {
//         label: 'Items Count',
//         data: values,
//         backgroundColor: 'rgba(59, 130, 246, 0.6)',
//       },
//     ],
//   };

//   return (
//     <div className="bg-white p-4 shadow rounded">
//       <p className="font-medium mb-2">Price Range Distribution</p>
//       <Bar data={data} />
//     </div>
//   );
// };

// export default BarChart;



import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { fetchBarChart } from '../services/api';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ month }) => {
  const [barData, setBarData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBar = async () => {
      setLoading(true);
      try {
        const res = await fetchBarChart(month);
        setBarData(res.data);
      } catch (error) {
        console.error('Error loading bar chart:', error);
      } finally {
        setLoading(false);
      }
    };
    loadBar();
  }, [month]);

  const labels = [
    '0-100', '101-200', '201-300', '301-400', '401-500',
    '501-600', '601-700', '701-800', '801-900', '901-above'
  ];

  const values = labels.map(label => {
    const range = label === '901-above' ? '901-above' : parseInt(label.split('-')[0]);
    const item = barData.find(d => d._id === range || d._id === label);
    return item ? item.count : 0;
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Items Count',
        data: values,
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Price Range Distribution</h3>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="h-64">
          <Bar data={data} options={options} />
        </div>
      )}
    </div>
  );
};

export default BarChart;