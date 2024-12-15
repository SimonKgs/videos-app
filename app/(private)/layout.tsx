'use client';
import { Navbar } from "@/components";
import { LoadingPage } from "@/components/shared/ui/loading/LoadingPage.component";
import { useAuthStore } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, loading, validateToken, token } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const validatingToken = async () => {
      await validateToken();
    };

    validatingToken();
    
  }, []);

  useEffect(() => {
    console.log('TOKEN', token)
    if (!loading && !isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [token]);

  // Show a loading spinner or blank screen while validating
  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="bg-zinc-400">
      <Navbar />
      {children}
    </div>
  );
}
