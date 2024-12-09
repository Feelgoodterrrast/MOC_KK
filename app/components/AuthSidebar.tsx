"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "flowbite-react";
import { SidebarLinks } from "../api/mock/SidebarLink";

export default function AuthSidebar() {
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <div className="h-full z-50 bg-white border-r">
      <Sidebar className="fixed top-[60px] rounded-none z-50 border-r bg-white">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            {SidebarLinks.map((item, index) => (
              <Sidebar.Item
                href={item.link}
                icon={item.icon}
                label={item.label}
                key={index}
                className={`${
                  currentPath === item.link ? "bg-blue-100 text-blue-600 font-bold" : ""
                }`}
              >
                {item.page}
              </Sidebar.Item>
            ))}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
