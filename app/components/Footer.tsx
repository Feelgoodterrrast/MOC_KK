"use client";

import { Footer } from "flowbite-react";
import { usePathname } from "next/navigation";

export default function FooterMain() {
  const pathname = usePathname();
  const isHomePage = pathname === "/home" || pathname === "/";

  return (
    <Footer
      container
      className={`shadow-none ${
        isHomePage ? "absolute bottom-0 bg-transparent border-none " : ""
      }`}
    >
      <Footer.Copyright
        className={`${isHomePage ? "text-white" : "text-gray-900"}`}
        href="#"
        by="สงวนลิขสิทธิ์® สำนักงานพาณิชย์จังหวัดขอนแก่น, 2567"
      />
      <Footer.LinkGroup className={`flex gap-6 ${isHomePage ? "text-white" : "text-gray-900"}`}>
        <Footer.Link href="#">เงื่อนใขการให้บริการ</Footer.Link>
        <Footer.Link href="#">คู่มือการใช้งาน</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
}
