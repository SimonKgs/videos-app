export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
      <main className="min-h-screen bg-black flex flex-col items-center text-white">
        <div className="w-full sm:w-1/2 xl:w-1/4">
          {children}
        </div>
      </main>
    );
  }