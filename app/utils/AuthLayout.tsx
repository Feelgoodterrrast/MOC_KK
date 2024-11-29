"use client";

import { ReactNode } from "react";
import AuthSidebar from "../components/AuthSidebar";
import AuthNavbar from "../components/AuthNavbar";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:block w-64">
        <AuthSidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <AuthNavbar />
        <div className="flex-1 overflow-y-auto p-5">
          <div className="pt-16">{children}</div>
        </div>
      </div>
    </div>
  );
}
