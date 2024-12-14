'use client';
import { Navbar } from "@/components";
import { useAuthStore } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, loading } = useAuthStore();
  const validateToken = useAuthStore((state) => state.validateToken);
  const router = useRouter();

  useEffect(() => {
    console.log('Validating token...');
    
    validateToken();
  }, [validateToken]);

  useEffect(() => {
    console.log("Loading:", loading);
  console.log("Is Authenticated:", isAuthenticated);
    if (!loading && !isAuthenticated) {
      router.push("/auth/login"); // Redirect only after validation completes
    }
  }, [loading, isAuthenticated, router]);

  // Show a loading spinner or blank screen while validating
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-zinc-300">
      <Navbar />
      {children}
    </div>
  );
}
