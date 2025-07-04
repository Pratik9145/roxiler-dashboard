// import React, { useEffect, useState } from 'react';
// import { Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { fetchPieChart } from '../services/api';

// ChartJS.register(ArcElement, Tooltip, Legend);

// const PieChart = ({ month }) => {
//   const [pieData, setPieData] = useState([]);

//   useEffect(() => {
//     const loadPie = async () => {
//       const res = await fetchPieChart(month);
//       setPieData(res.data);
//     };
//     loadPie();
//   }, [month]);

//   const data = {
//     labels: pieData.map(d => d._id),
//     datasets: [
//       {
//         label: 'Category Distribution',
//         data: pieData.map(d => d.count),
//         backgroundColor: [
//           '#60A5FA', '#FBBF24', '#34D399', '#F87171', '#A78BFA',
//           '#F472B6', '#FCD34D', '#4ADE80', '#818CF8', '#FB923C'
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div className="bg-white p-4 shadow rounded">
//       <p className="font-medium mb-2">Category Distribution</p>
//       <Pie data={data} />
//     </div>
//   );
// };

// export default PieChart;


import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { fetchPieChart } from '../services/api';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ month }) => {
  const [pieData, setPieData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPie = async () => {
      setLoading(true);
      try {
        const res = await fetchPieChart(month);
        setPieData(res.data);
      } catch (error) {
        console.error('Error loading pie chart:', error);
      } finally {
        setLoading(false);
      }
    };
    loadPie();
  }, [month]);

  const data = {
    labels: pieData.map(d => d._id),
    datasets: [
      {
        label: 'Items',
        data: pieData.map(d => d.count),
        backgroundColor: [
          '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
          '#EC4899', '#6B7280', '#14B8A6', '#F97316', '#84CC16'
        ],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Category Distribution</h3>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="h-64">
          <Pie data={data} options={options} />
        </div>
      )}
    </div>
  );
};

export default PieChart;