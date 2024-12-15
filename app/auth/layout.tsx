import Link from "next/link";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
      <main className="px-8 min-h-screen bg-black flex flex-col items-center text-white">
        <div className="w-full sm:w-1/2 xl:w-1/4">
          {children}
          <div className="flex w-full justify-center py-5">
            <Link className="text-white hover:text-slate-400 hover:underline" href="/">Go Home</Link>
          </div>
        </div>
      </main>
    );
  }