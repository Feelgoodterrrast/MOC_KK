"use client";

import { ReactNode, useState } from "react";
import AuthSidebar from "../components/AuthSidebar";
import AuthNavbar from "../components/AuthNavbar";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => setSidebarVisible((prev) => !prev);
  const closeSidebar = () => setSidebarVisible(false);

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:block w-64">
        <AuthSidebar visible={isSidebarVisible} onClose={closeSidebar} />
      </div>
      <div className="flex-1 flex flex-col">
        <AuthNavbar onToggleSidebar={toggleSidebar} />
        <div className="flex-1 overflow-y-auto p-8">
          <div className="pt-16">{children}</div>
        </div>
      </div>
    </div>
  );
}
