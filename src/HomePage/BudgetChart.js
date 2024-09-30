import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';

const BudgetChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#ffcd56', '#ff6384', '#36a2eb', '#fd6b19'],
      },
    ],
  });

  // Function to fetch data
  const fetchBudgetData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/budget');
      const data = response.data.myBudget;

      if (data.length) {
        setChartData({
          labels: data.map((item) => item.title),
          datasets: [
            {
              data: data.map((item) => item.budget),
              backgroundColor: ['#ffcd56', '#ff6384', '#36a2eb', '#fd6b19'],
            },
          ],
        });
      }
    } catch (error) {
      console.error('Error fetching budget data:', error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchBudgetData();
  }, []);

  return (
    <div>
      <Pie data={chartData} />
    </div>
  );
};

export default BudgetChart;