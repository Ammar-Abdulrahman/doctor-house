import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Paper } from "@mui/material";
import { OrdersOvertimeChartResponse } from "@Types/Statistics";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const OrdersOvertimeChart: React.FC<OrdersOvertimeChartResponse> = ({
  data,
}) => {
  const chartData = {
    labels: Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`),
    datasets: data.map((yearData) => ({
      label: yearData.year,
      data: yearData.data[0].data,
      borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Random color for each year
      fill: false,
      tension: 0.1,
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Orders Over Time",
      },
    },
  };

  return (
    <Paper
      elevation={3}
      style={{
        height: "350px",
        padding: "20px",
        borderRadius: 12,
        //backgroundColor: "#F4F8F7"
      }}
    >
      <Line data={chartData} options={options} />
    </Paper>
  );
};

export default OrdersOvertimeChart;
