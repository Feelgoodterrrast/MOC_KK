"use client";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { ReactNode } from "react";
import NavigationBar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PageLayout({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const isHomePage = pathname === "/home" || pathname === "/";

  if (!session) {
    return (
      <div className={`flex flex-col min-h-screen`}>
        <NavigationBar />
        <div
          className={`flex-1 overflow-y-auto
        ${isHomePage ? "" : "pt-24"}
      `}
        >
          {children}
        </div>
        <Footer />
      </div>
    );
  }
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
