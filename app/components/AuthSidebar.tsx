"use client"

import { useState, useEffect } from "react";
import { Sidebar } from "flowbite-react";
import { SidebarLinks } from "../api/mock/SidebarLink";

export default function AuthSidebar() {
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <div className="fixed top-0 left-0 h-full z-50 bg-white border-r">
      <Sidebar className="fixed top-[60px] rounded-none z-50 border-r bg-white">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            {SidebarLinks.map((item, index) => (
              <Sidebar.Item
                href={item.link}
                icon={item.icon}
                label={item.label}
                key={index}
                active={currentPath === item.link}
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
