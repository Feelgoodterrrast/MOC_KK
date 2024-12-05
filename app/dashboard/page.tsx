"use client";

import { BarChart } from "../components/ApexChart/BarChart";
import AreaChart from "../components/ApexChart/AreaChart";
import PieChart from "../components/ApexChart/PieChart";
import { ExampleTable } from "../components/DataTable/ExampleTable";
import { ActivityTable } from "../components/DataTable/ActivityLogTable";
import { Card } from "flowbite-react";

export default function Dashboard() {
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
    <div>
      <section className="stats mb-12">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 divide-x border-y py-6">
          <div className="pl-6">
            <p className="font-normal text-gray-700 dark:text-gray-400 mb-2">
              ยอดขายทั้งหมด (บาท)
            </p>
            <h5 className="text-5xl font-bold tracking-tight text-green-700">
              157354.00
            </h5>
          </div>
          <div className="pl-6">
            <p className="font-normal text-gray-700 dark:text-gray-400 mb-2">
              รายการสินค้าในระบบทั้งหมด
            </p>

            <h5 className="text-5xl font-bold tracking-tight text-cyan-700">
              25
            </h5>
          </div>
          <div className="pl-6">
            <p className="font-normal text-gray-700 dark:text-gray-400 mb-2">
              รายการข่าวสารในระบบทั้งหมด
            </p>

            <h5 className="text-5xl font-bold tracking-tight text-purple-700">
              10
            </h5>
          </div>
          <div className="pl-6">
            <p className="font-normal text-gray-700 dark:text-gray-400 mb-2">
              รายการผู้ใช้งานในระบบทั้งหมด
            </p>

            <h5 className="text-5xl font-bold tracking-tight text-indigo-700">
              7
            </h5>
          </div>
        </div>
      </section>

      <section className="overview mb-12">
        <div className="grid lg:grid-cols-3 md:grid-cols-1 grid-cols-1 gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">การโพสต์ข่าวสาร</h1>
            <Card className="shadow-none rounded-xl">
              <PieChart series={seriesPie} labels={labelsPie} />
            </Card>
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-2">การค้าในและต่างประเทศ</h1>
            <Card className="shadow-none rounded-xl">
              <AreaChart series={seriesArea} categories={categoriesArea} />
            </Card>
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-2">รายการสินค้า</h1>
            <div className="flex-grow">
              <ExampleTable />
            </div>
          </div>
        </div>
      </section>

      <section className="overview mb-8">
        <div className="grid lg:grid-cols-5 md:grid-cols-1 grid-cols-1 gap-4 mb-4">
          <div className="lg:col-span-2 md:col-span-1 col-span-1 flex flex-col">
            <h1 className="text-2xl font-bold mb-2">ผู้ใช้งานระบบล่าสุด</h1>
            <ActivityTable />
          </div>
          <div className="lg:col-span-3 md:col-span-1 col-span-1 flex flex-col">
            <h1 className="text-2xl font-bold mb-2">ยอดขาย 30 วันล่าสุด</h1>
            <Card className="shadow-none rounded-xl">
              <BarChart />
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
