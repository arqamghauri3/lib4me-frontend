import { Navbar } from "~/components/landing/Navbar";
import { Hero } from "~/components/landing/Hero";
import { Features } from "~/components/landing/Features";
import { Footer } from "~/components/landing/Footer";

export default function HomePage() {
  return (
    <main className="bg-background min-h-screen w-full">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </main>
  );
}
