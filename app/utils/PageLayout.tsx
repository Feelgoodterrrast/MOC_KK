"use client";

import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Spinner } from "flowbite-react";
import { ReactNode, useEffect, useState } from "react";
import NavigationBar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthLayout from "./AuthLayout";

export default function PageLayout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const [isSlowConnection, setIsSlowConnection] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.connection) {
      const connection = navigator.connection;
      const slowConnectionTypes = ["slow-2g", "2g"];
      setIsSlowConnection(slowConnectionTypes.includes(connection.effectiveType));
    }
  }, []);
  

  useEffect(() => {
    if (status === "authenticated" && !pathname.startsWith("/dashboard")) {
      setIsLoading(true);
      router.push("/dashboard");
    } else if (status === "unauthenticated" && pathname !== "/home") {
      setIsLoading(true);
      router.push("/home");
    } else {
      setIsLoading(false);
    }
  }, [status, pathname, router]);
  

  if (isLoading || isSlowConnection) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-opacity-5">
        <Spinner size="lg" aria-label="Loading..." />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col min-h-screen">
        <NavigationBar />
        <div
          className={`flex-1 overflow-y-auto ${
            pathname === "/home" || pathname === "/" ? "" : "pt-24"
          }`}
        >
          {children}
        </div>
        <Footer />
      </div>
    );
  }

  return <AuthLayout>{children}</AuthLayout>;
}
