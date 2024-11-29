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

  // Detect connection speed
  useEffect(() => {
    const connection = navigator.connection || navigator.webkitConnection || navigator.mozConnection;
    if (connection) {
      const slowConnectionTypes = ["slow-2g", "2g"];
      setIsSlowConnection(slowConnectionTypes.includes(connection.effectiveType));
    }
  }, []);

  // Handle routing and loading
  useEffect(() => {
    if (status === "authenticated" && pathname !== "/dashboard") {
      setIsLoading(true);
      router.push("/dashboard");
    } else if (status === "unauthenticated" && pathname !== "/home") {
      setIsLoading(true);
      router.push("/home");
    } else {
      setIsLoading(false);
    }
  }, [status, pathname, router]);

  // Show spinner for slow connections or during loading
  if (isLoading || isSlowConnection) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-opacity-5">
        <Spinner size="lg" aria-label="Loading..." />
      </div>
    );
  }

  // Layout for unauthenticated users
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

  // Layout for authenticated users
  return <AuthLayout>{children}</AuthLayout>;
}
