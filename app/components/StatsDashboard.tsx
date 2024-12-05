import React from "react";
import AreaChart from "./ApexChart/AreaChart";
import PieChart from "./ApexChart/PieChart";
import { Card } from "flowbite-react";

export default function StatsDashboard() {
  const seriesArea = [
    {
      name: "series1",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: "series2",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ];

  const categoriesArea = [
    "2018-09-19T00:00:00.000Z",
    "2018-09-19T01:30:00.000Z",
    "2018-09-19T02:30:00.000Z",
    "2018-09-19T03:30:00.000Z",
    "2018-09-19T04:30:00.000Z",
    "2018-09-19T05:30:00.000Z",
    "2018-09-19T06:30:00.000Z",
  ];

  const seriesPie = [44, 55, 13, 43, 22];
  const labelsPie = ["Team A", "Team B", "Team C", "Team D", "Team E"];

  return (
    <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 gap-4">
      <div>
        <Card className="shadow-none rounded-xl">
          <p className="font-medium">สถิติยอดขาย</p>
          <AreaChart series={seriesArea} categories={categoriesArea} />
        </Card>
      </div>
      <div>
        <Card className="shadow-none rounded-xl justify-normal">
          <p className="font-medium">การโพสต์ข่าวสาร</p>
          {/* <RadialChart series={[75]} /> */}
          <PieChart series={seriesPie} labels={labelsPie} />
        </Card>
      </div>
    </div>
  );
}
