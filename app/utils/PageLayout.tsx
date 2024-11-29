"use client";

import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";
import NavigationBar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthLayout from "./AuthLayout";

export default function PageLayout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/home" || pathname === "/";

  useEffect(() => {
    if (status === "authenticated" && pathname !== "/dashboard") {
      router.push("/dashboard");
    } else if (status === "unauthenticated" && !isHomePage) {
      router.push("/home");
    }
  }, [status, pathname, router, isHomePage]);

  if (status === "loading") {
    return null; // Optionally, render a loading state while checking session
  }

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

  return <AuthLayout>{children}</AuthLayout>;
}
