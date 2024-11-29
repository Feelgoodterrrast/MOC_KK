"use client";

import { Card } from "flowbite-react";
import { HiShoppingCart, HiNewspaper, HiUser } from "react-icons/hi";

export default function Dashboard() {
  return (
    <div>
      <div className="grid lg:grid-cols-3 md:grid-cols-1 grid-cols-1 gap-4">
        <div>
          <Card className="max-w-full min-h-40 relative shadow-sm-light rounded-2xl">
            <p className="font-normal text-gray-700 dark:text-gray-400">
              รายการสินค้าในระบบทั้งหมด
            </p>
            <HiShoppingCart
              size={100}
              color="navy"
              className="absolute right-0 bottom-0 bg-blue-200 rounded-tl-3xl rounded-br-2xl p-3 bg-opacity-50"
            />
            <h5 className="text-6xl font-bold tracking-tight text-gray-900 dark:text-white absolute bottom-4">
              20
            </h5>
          </Card>
        </div>
        <div>
          <Card className="max-w-full min-h-40 relative shadow-sm-light rounded-2xl">
            <p className="font-normal text-gray-700 dark:text-gray-400">
              รายการข่าวสารในระบบทั้งหมด
            </p>
            <HiNewspaper
              size={100}
              color="green"
              className="absolute right-0 bottom-0 bg-green-200 rounded-tl-3xl rounded-br-2xl p-3 bg-opacity-50"
            />
            <h5 className="text-6xl font-bold tracking-tight text-gray-900 dark:text-white absolute bottom-4">
              12
            </h5>
          </Card>
        </div>
        <div>
        <Card className="max-w-full min-h-40 relative shadow-sm-light rounded-2xl">
            <p className="font-normal text-gray-700 dark:text-gray-400">
              รายการผู้ใช้งานในระบบทั้งหมด
            </p>
            <HiUser
              size={100}
              color="dark"
              className="absolute right-0 bottom-0 bg-slate-200 rounded-tl-3xl rounded-br-2xl p-3 bg-opacity-50"
            />
            <h5 className="text-6xl font-bold tracking-tight text-gray-900 dark:text-white absolute bottom-4">
              7
            </h5>
          </Card>
        </div>
      </div>
    </div>
  );
}
