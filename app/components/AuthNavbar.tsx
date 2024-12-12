"use client";

import Link from "next/link";
import { Drawer, Navbar, Sidebar } from "flowbite-react";
import Logo from "@/public/images/moc_logo.png";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { SidebarLinks } from "../api/mock/SidebarLink";
import { HiMenuAlt2, HiMenuAlt3 } from "react-icons/hi";

export default function AuthNavbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  return (
    <>
      <Drawer open={isOpen} onClose={handleClose} className="z-50 border-r ">
        <Drawer.Header title="เมนู" titleIcon={() => <></>} />
        <Drawer.Items>
          <Sidebar className="[&>div]:bg-transparent [&>div]:p-0">
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
        </Drawer.Items>
      </Drawer>
      <Navbar
        fluid
        rounded
        className={`fixed top-0 left-0 w-full z-40 md:shadow-sm shadow-lg bg-white`}
      >
        <Navbar.Brand as={Link} href="/home">
          <Image
            src={Logo}
            width={0}
            height={0}
            className="mr-3 w-10"
            alt="Logo"
          />
          <span className="self-center whitespace-nowrap leading-4 font-semibold dark:text-white">
            กระทรวงพาณิชย์
            <br />
            จังหวัดขอนแก่น
          </span>
          <button
            className="lg:hidden md:flex hidden pl-6 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => setIsOpen(true)}
          >
            <HiMenuAlt2 size={20} />
          </button>
        </Navbar.Brand>
        <button
          className="lg:hidden md:hidden flex pl-6 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(true)}
        >
          <HiMenuAlt3 size={20} />
        </button>
        <Navbar.Collapse>
          <Navbar.Link className="cursor-default md:flex hidden list-none">
            {session?.user?.email}
          </Navbar.Link>
          <Navbar.Link
            onClick={() => signOut()}
            className="cursor-pointer text-red-500 hover:text-red-600 transition-all list-none"
          >
            ออกจากระบบ
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
