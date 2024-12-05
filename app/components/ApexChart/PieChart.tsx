import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

interface PieChartProps {
  series: number[];
  labels: string[]; 
}

const PieChart: React.FC<PieChartProps> = ({ series, labels }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
  
    const options = {
      series,
      chart: {
        width: "100%",
        type: "pie",
      },
      labels,
    };
  
    const chart = new ApexCharts(chartRef.current, options);
    chart.render();
  
    return () => {
      chart.destroy();
    };
  }, [series, labels]); 
  

  return <div id="chart" ref={chartRef}></div>;
};

export default PieChart;
