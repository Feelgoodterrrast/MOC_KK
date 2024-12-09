"use client";

import { Sidebar } from "flowbite-react";
import { SidebarLinks } from "../api/mock/SidebarLink";

export default function AuthSidebar() {
  
  return (
    <div className={`fixed top-0 left-0 h-full z-50 bg-white border-r`}>
      <Sidebar
        className={`fixed top-[60px] rounded-none z-50 border-r bg-white`}
      >
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            {SidebarLinks.map((item, index) => (
              <Sidebar.Item
                href={item.link}
                icon={item.icon}
                label={item.label}
                key={index}
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
