"use client";

import { Sidebar } from "flowbite-react";
import { SidebarLinks } from "../api/mock/SidebarLink";

export default function AuthSidebar() {
  return (
    <Sidebar className={`fixed top-[60px] rounded-none z-50`}>
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
  );
}
