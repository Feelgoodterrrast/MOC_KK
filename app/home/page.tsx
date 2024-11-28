"use client";

import { Button } from "flowbite-react";
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import home_bg from "@/public/images/home_bg.png";

export default function Home() {
  const { data: session } = useSession();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && session) {
      window.location.href = "/dashboard";
    }
  }, [isMounted, session]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className="relative flex flex-col min-h-screen items-center justify-center text-white">
        <Image
          src={home_bg}
          alt="Background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
          className="-z-10"
        />
        <div className="text-center">
          <h1 className="text-2xl font-semibold">ยินดีต้อนรับสู่ระบบ</h1>
          <h1 className="lg:text-4xl text-primary">MOC KHONKAEN</h1>
          <div className="w-full flex justify-center mt-4">
            <Button onClick={() => signIn()} className="px-4">
              เข้าสู่ระบบ
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
