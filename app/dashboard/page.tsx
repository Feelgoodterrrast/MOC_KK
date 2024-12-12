"use client";

import { useState, useEffect } from "react";
import { BarChart } from "../components/ApexChart/BarChart";
import AreaChart from "../components/ApexChart/AreaChart";
import PieChart from "../components/ApexChart/PieChart";
import { ActivityTable } from "../components/DataTable/ActivityLogTable";
import { countProduct } from "../api/mock/productService";
import { countPost } from "../api/mock/postService";
import { countUser } from "../api/mock/userSetvice";
import { Card } from "flowbite-react";

export default function Dashboard() {
  const [countProducts, setCountProducts] = useState(0);
  const [countPosts, setCountPosts] = useState(0);
  const [countUsers, setCountUsers] = useState(0);
  const seriesArea = [
    {
      name: "ในประเทศ",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: "ต่างประเทศ",
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
  const labelsPie = [
    "ข่าวทั่วไป",
    "กิจกรรม",
    "แคมเปญ",
    "เรื่องน่ารู้",
    "ข่าวภายใน",
  ];

  useEffect(() => {
    const getCountProduct = async () => {
      try {
        const data = await countProduct();
        setCountProducts(data);
      } catch (err) {
        console.log("err", err);
      }
    };

    const getCountPost = async () => {
      try {
        const data = await countPost();
        setCountPosts(data);
      } catch (err) {
        console.log("err", err);
      }
    };

    const getCountUser = async () => {
      try {
        const data = await countUser();
        setCountUsers(data);
      } catch (err) {
        console.log("err", err);
      }
    };

    getCountUser()
    getCountProduct();
    getCountPost();
  });

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
              {countProducts !== null ? countProducts : "Loading..."}
            </h5>
          </div>
          <div className="pl-6">
            <p className="font-normal text-gray-700 dark:text-gray-400 mb-2">
              รายการข่าวสารในระบบทั้งหมด
            </p>

            <h5 className="text-5xl font-bold tracking-tight text-purple-700">
            {countPosts !== null ? countPosts : "Loading..."}
            </h5>
          </div>
          <div className="pl-6">
            <p className="font-normal text-gray-700 dark:text-gray-400 mb-2">
              รายการผู้ใช้งานในระบบทั้งหมด
            </p>

            <h5 className="text-5xl font-bold tracking-tight text-indigo-700">
            {countUsers !== null ? countUsers : "Loading..."}
            </h5>
          </div>
        </div>
      </section>

      <section className="overview mb-12">
        <div className="grid lg:grid-cols-5 md:grid-cols-1 grid-cols-1 gap-4 mb-4">
          <div className="lg:col-span-3">
            <h1 className="text-2xl font-bold mb-2">การโพสต์ข่าวสาร</h1>
            <Card className="shadow-none rounded-xl">
              <PieChart series={seriesPie} labels={labelsPie} />
            </Card>
          </div>
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold mb-2">การค้าในและต่างประเทศ</h1>
            <Card className="shadow-none rounded-xl">
              <AreaChart series={seriesArea} categories={categoriesArea} />
            </Card>
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
