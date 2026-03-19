"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/component/AuthContext";
import Sidebar from "@/component/Sidebar";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";

export default function AdminLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user && pathname !== "/login") {
      router.push("/login");
    }
  }, [loading, user, router, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user && pathname !== "/login") {
    return null;
  }

  if (pathname === "/login") {
    return children;
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 overflow-y-auto bg-black">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
