import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import axios from "axios"; 

const ChartComponent = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true); 
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API+"/api/Admin/analytics",{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('admin-token')}`
            }
        }); 
        const data = response.data.orders;

        const labels = [];
        const counts = [];

        for (let i = 6; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          labels.push(date.toLocaleDateString());
          counts.push(data[6 - i]);
        }
        
        setChartData({
          labels,
          datasets: [
            {
              label: "Number of Orders",
              data: counts,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              fill: true,
            },
          ],
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>Order Analytics</h2>
      <Line data={chartData} options={{ responsive: true }} />
    </div>
  );
};

export default ChartComponent;
