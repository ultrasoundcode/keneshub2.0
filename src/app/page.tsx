import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="bg-[#f4f4f5] min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <Hero />
      </div>
      <Footer />
    </main>
  );
}
