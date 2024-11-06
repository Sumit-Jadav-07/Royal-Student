import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { bottomNavigationActionClasses } from '@mui/material';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  // Define your data and options
  const data = {
    datasets: [
      {
        label: 'My First Dataset',
        data: [100],
        backgroundColor: [
          'rgb(255, 99, 132)',
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}`,
        },
      },
    },
  };

  return <Pie data={data} options={options}/>;
};

export default PieChart;
