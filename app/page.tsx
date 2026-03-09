// Remove strict client/server since it is server component (default).

import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { ParallaxScroll } from "@/components/sections/Gallery";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#FFD700] selection:text-black">
      {/* Navbar component is client-only and will handle scroll interactions */}
      <Navbar />

      <section id="home">
        <Hero />
      </section>
      
      {/* Gallery Section */}
      <section id="gallery">
        <ParallaxScroll />
      </section>
      
      {/* About Section */}
      <section id="about">
        <About />
      </section>
      
      {/* Contact Section */}
      <section id="booking">
        <Contact />
      </section>

      {/* Footer Placeholder */}
      <footer className="py-10 text-center text-neutral-500 text-sm border-t border-zinc-900 bg-black">
        <p>© {new Date().getFullYear()} Coba Car Center. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}
