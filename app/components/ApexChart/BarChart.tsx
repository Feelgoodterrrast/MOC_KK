/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client";

import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function BarChart() {
  const option = {
    chart: {
      id: "apexchart-bar",
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
  };

  const series = [
    {
      type: "bar",
      name: "series-1",
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
    },
  ];

  return (
    <>
      <ApexChart options={option} series={series} height={340} width="100%" />
    </>
  );
}