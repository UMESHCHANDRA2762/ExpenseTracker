import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import './ExpenseChart.css';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const ExpenseChart = ({ expenses }) => {
  // Prepare category-wise data for Pie Chart
  const categoryData = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + parseFloat(expense.amount);
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  // Prepare monthly data for Bar Chart
  const monthlyData = Array(12).fill(0);
  expenses.forEach((expense) => {
    const month = new Date(expense.date).getMonth(); // Get month (0-11)
    monthlyData[month] += parseFloat(expense.amount);
  });

  const barData = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    datasets: [
      {
        label: 'Expenses by Month',
        data: monthlyData,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="expense-chart">
      <h2>Expense Charts</h2>
      <div className="chart-container">
        <div className="chart">
          <h3>Category-wise Distribution</h3>
          <Pie data={pieData} key={JSON.stringify(pieData)} />
        </div>
        <div className="chart">
          <h3>Monthly Breakdown</h3>
          <Bar data={barData} key={JSON.stringify(barData)} />
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;
