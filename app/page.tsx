import { CtaLogin, Hero } from "@/components";

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center text-white">
      <Hero />
      <CtaLogin />
    </main>
  );
}
