"use client";

import { Sidebar } from "flowbite-react";
import { SidebarLinks } from "../api/mock/SidebarLink";

export default function AuthSidebar({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  return (
    <div
      className={`fixed top-0 left-0 h-full z-50 bg-white border-r transform ${
        visible ? "translate-x-0" : "-translate-x-full"
      } transition-transform lg:translate-x-0 lg:static lg:block`}
    >
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
      <button
        className="absolute top-4 right-4 text-gray-500 lg:hidden"
        onClick={onClose}
      >
        ✕
      </button>
    </div>
  );
}
