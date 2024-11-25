import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const AnimalChart = ({ animalType }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(54, 162, 235, 0.5)');
    gradient.addColorStop(1, 'rgba(54, 162, 235, 0.1)');

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: `${animalType.charAt(0).toUpperCase() + animalType.slice(1)} Population`,
          data: [12, 19, 3, 5, 2, 3, 7],
          backgroundColor: gradient,
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }, [animalType]);

  return <canvas ref={chartRef} id="animalChart" width="200" height="200"></canvas>;
};

export default AnimalChart;