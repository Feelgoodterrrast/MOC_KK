import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

interface PieChartProps {
  series: number[]; // Array of data for the pie chart
  labels: string[]; // Labels for the pie chart segments
}

const PieChart: React.FC<PieChartProps> = ({ series, labels }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
  
    const options = {
      series,
      chart: {
        height: 350,
        width: "100%",
        type: "pie",
      },
      labels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };
  
    const chart = new ApexCharts(chartRef.current, options);
    chart.render();
  
    // Cleanup chart instance on unmount
    return () => {
      chart.destroy();
    };
  }, [series, labels]); // Ensure dependencies are stable
  

  return <div id="chart" ref={chartRef}></div>;
};

export default PieChart;
