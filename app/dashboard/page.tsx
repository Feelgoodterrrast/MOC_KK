"use client";

import { BarChart } from "../components/ApexChart/BarChart";
import { ExampleTable } from "../components/ExampleTable";
import StatsDashboard from "../components/StatsDashboard";

export default function Dashboard() {
  return (
    <div>
      <section className="stats mb-8">
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

      <section className="overview mb-8">
        <div className="grid lg:grid-cols-5 md:grid-cols-1 grid-cols-1 gap-4 mb-4">
          <div className="lg:col-span-3 md:col-span-1 col-span-1">
            <h1 className="text-2xl font-bold mb-2">ภาพรวมระบบ</h1>
            <StatsDashboard />
          </div>
          <div className="lg:col-span-2 md:col-span-1 col-span-1 flex flex-col">
            <h1 className="text-2xl font-bold mb-2">รายการสินค้าล่าสุด</h1>
            <div className="flex-grow">
              <ExampleTable />
            </div>
          </div>
        </div>
      </section>

      <section className="overview mb-8">
        <div className="grid lg:grid-cols-5 md:grid-cols-1 grid-cols-1 gap-4 mb-4">
          <div className="lg:col-span-2 md:col-span-1 col-span-1 flex flex-col">
           
          </div>
          <div className="lg:col-span-3 md:col-span-1 col-span-1 flex flex-col">
            <h1 className="text-2xl font-bold mb-2">รายการสินค้าล่าสุด</h1>
            <div className="flex-grow">
              <BarChart />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
