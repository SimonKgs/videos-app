'use client';

import { useAuthStore } from "@/store";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

    const { user, isAuthenticated } = useAuthStore();
    const router = useRouter();

    if (isAuthenticated) {
      router.push(`/${user?.id}/videos`);
    }

    return (
      <main className="min-h-screen bg-black flex flex-col items-center text-white">
        <div className="w-full sm:w-1/2 xl:w-1/4">
          {children}
        </div>
      </main>
    );
  }