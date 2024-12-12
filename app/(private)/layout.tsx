'use client';
import { Navbar, Unauthorized } from "@/components";
import { useAuthStore } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    const { isAuthenticated } = useAuthStore();

    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/auth/login"); // Redirect to login if not authenticated
      }
    }, [isAuthenticated]);


    return (
      <div className="bg-zinc-300">
        <Navbar />
        {children}
      </div>
    );
  }