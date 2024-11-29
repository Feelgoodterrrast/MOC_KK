"use client";

import Link from "next/link";
import { Button, Navbar } from "flowbite-react";
import Logo from "@/public/images/moc_logo.png";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

export default function AuthNavbar() {
  const { data: session } = useSession();

  // console.log('session', session)

  return (
    <Navbar fluid rounded className={`fixed top-0 left-0 w-full z-50`}>
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
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link className="cursor-text">{session?.user?.email}</Navbar.Link>
        <Navbar.Link onClick={() => signOut()} className="cursor-pointer">ออกจากระบบ</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
