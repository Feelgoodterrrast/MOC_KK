import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

interface RadialChartProps {
  series: number[]; // Accepts an array of numbers for the radial chart values
}

const RadialChart: React.FC<RadialChartProps> = ({ series }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const options = {
      series, // Use series from props
      chart: {
        height: 350,
        type: "radialBar",
        offsetY: -10,
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          dataLabels: {
            name: {
              fontSize: "16px",
              color: undefined,
              offsetY: 120,
            },
            value: {
              offsetY: 76,
              fontSize: "22px",
              color: undefined,
              formatter: function (val: string) {
                return `${val}%`;
              },
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          shadeIntensity: 0.15,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 65, 91],
        },
      },
      stroke: {
        dashArray: 4,
      },
      labels: ["Median Ratio"], 
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    // Cleanup chart instance on unmount
    return () => {
      chart.destroy();
    };
  }, [series]);

  return <div id="chart" ref={chartRef}></div>;
};

export default RadialChart;
