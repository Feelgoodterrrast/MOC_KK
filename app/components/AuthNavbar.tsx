"use client";

import Link from "next/link";
import { Navbar } from "flowbite-react";
import Logo from "@/public/images/moc_logo.png";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

export default function AuthNavbar({
  onToggleSidebar,
}: {
  onToggleSidebar: () => void;
}) {
  const { data: session } = useSession();

  return (
    <Navbar
      fluid
      rounded
      className={`fixed top-0 left-0 w-full z-50 md:shadow-sm shadow-lg bg-white`}
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
          className="lg:flex hidden pl-10 text-gray-500 hover:text-gray-700 focus:outline-none mr-4"
          onClick={onToggleSidebar}
        >
          ☰
        </button>
      </Navbar.Brand>
      <button
          className="lg:hidden pl-10 text-gray-500 hover:text-gray-700 focus:outline-none mr-4"
          onClick={onToggleSidebar}
        >
          ☰
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
  );
}
