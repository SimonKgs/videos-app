'use client';
import { Navbar, Unauthorized } from "@/components";
import { useAuthStore } from "@/store";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    const { isAuthenticated } = useAuthStore();


    return (
      <>
        {
        !isAuthenticated 
          ? 
          <Unauthorized />
          :
          <div className="bg-zinc-300">
            <Navbar />
            {children}
          </div>
        }
      </>
    );
  }