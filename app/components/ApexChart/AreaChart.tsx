import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

interface AreaChartProps {
  series: { name: string; data: number[] }[]; // Array of series data
  categories: string[]; // X-axis categories
}

const AreaChart: React.FC<AreaChartProps> = ({ series, categories }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const options = {
      series, // Dynamic series data
      chart: {
        height: 340,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories, // Dynamic x-axis categories
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    // Cleanup the chart instance on component unmount
    return () => {
      chart.destroy();
    };
  }, [series, categories]);

  return <div id="chart" ref={chartRef}></div>;
};

export default AreaChart;
