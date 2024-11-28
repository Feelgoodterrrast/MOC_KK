"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Navbar, Button } from "flowbite-react";
import { NavLinks } from "../api/mock/Navlink";
import { useSession, signIn, signOut } from "next-auth/react";
import Logo from "@/public/images/moc_logo.png";
import Image from "next/image";

export default function Navigation() {
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pathname = usePathname();
  const isHomePage = pathname === "/home";

  return (
    <Navbar
      fluid
      rounded
      className={`navbar p-6 fixed top-0 left-0 w-full z-50 transition-colors duration-300
        ${scrolled ? "bg-slate-100 shadow-sm" : "bg-transparent"} 
        ${isHomePage && !scrolled ? "text-white" : "text-gray-900"}
      `}
    >
      <Navbar.Brand href="/home">
        <Image
          src={Logo}
          width={0}
          height={0}
          alt="Logo"
          className="w-10 h-auto"
        />
      </Navbar.Brand>
      <div className="flex md:order-2">
        {!session ? (
          <Button onClick={() => signIn()}>เข้าสู่ระบบ</Button>
        ) : (
          <Button onClick={() => signOut()}>ออกจากระบบ</Button>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {NavLinks.map((item, index) => (
          <Navbar.Link
            href={item.link}
            key={index}
            className={`${
              isHomePage && !scrolled ? "text-white" : "text-gray-900"
            }`}
          >
            {item.page}
          </Navbar.Link>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
}
