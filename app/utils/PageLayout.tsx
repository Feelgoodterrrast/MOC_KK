"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { SessionProvider } from "next-auth/react";

export default function PageLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/home";

  return (
    <SessionProvider>
      <div className={isHomePage ? "bg-[#F4F8F3]" : ""}>
        <Navbar />

        <div
          className={`flex flex-col custom-min-h mx-auto ${
            !isHomePage ? "lg:pt-28 pt-24" : ""
          }`}
        >
          <div>{children}</div>
        </div>
        <Footer />
      </div>
    </SessionProvider>
  );
}
