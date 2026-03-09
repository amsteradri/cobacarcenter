"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "smooth" });
};

import { Threads } from "@/components/ui/threads";
import { SplitText } from "@/components/ui/split-text";
import { TrueFocus } from "@/components/ui/true-focus";

export function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black text-white">
      
      {/* 1. Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
                // Updated image URL as requested
                backgroundImage: "url('https://leadingdetailing.com.au/wp-content/uploads/2023/01/325628762_496675025911547_1747191273589531751_n.jpg')", 
                opacity: 0.5
            }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
      </div>

      {/* 2. Threads Effect - Subtle background animation, kept only in Hero */}
      <div className="absolute inset-0 z-10 w-full h-full opacity-40 pointer-events-none">
         <Threads amplitude={1} distance={0} enableMouseInteraction={true} />
      </div>

      {/* 3. Main Content Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 w-full max-w-7xl mx-auto space-y-12 mt-20 md:mt-0">
        
        {/* Title: SplitText for entrance */}
        <div className="overflow-hidden py-2" aria-label="COBA CAR CENTER">
           <SplitText
              text="COBA CAR CENTER"
              className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tight text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] uppercase leading-[0.9]"
              style={{ fontFamily: 'var(--font-barlow)', fontStyle: 'italic', fontWeight: 800 }}
              delay={50}
              animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
              animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
              threshold={0.2}
              rootMargin="-50px"
              textAlign="center"
           />
        </div>

        {/* Subtitle: TrueFocus for emphasis */}
        <div className="relative h-16 w-full max-w-3xl flex items-center justify-center">
            <TrueFocus 
                sentence="Excelencia en cada detalle"
                manualMode={false}
                blurAmount={4}
                borderColor="#FFD700"
                glowColor="rgba(255, 215, 0, 0.4)"
                animationDuration={0.5}
                pauseBetweenAnimations={0.5}
            />
        </div>

        {/* Buttons: Simple, elegant */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-6 mt-8"
        >
            <button
                onClick={() => scrollTo("booking")}
                className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-[#FFD700] px-8 font-medium text-black transition-all duration-300 hover:bg-white hover:text-black focus:outline-none"
            >
                <span className="mr-2">Reservar Cita</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
                onClick={() => scrollTo("gallery")}
                className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-white/20 bg-white/5 px-8 font-medium text-white transition-all duration-300 hover:bg-white/10 hover:border-white/40 focus:outline-none backdrop-blur-sm"
            >
                <span>Ver Trabajos</span>
            </button>
        </motion.div>
      </div>
    </section>
  );
}
