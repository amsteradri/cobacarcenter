"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

export const Navbar = () => {
    // 1. Removed hidden state logic as requested - Navbar is now always visible
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    });

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const offsetTop = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth"
            });
        }
    };

    const links = [
        { name: "Home", id: "home" },
        { name: "Galería", id: "gallery" },
        { name: "Sobre Nosotros", id: "about" },
        { name: "Reserva", id: "booking" },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 w-full transition-all duration-500 ease-in-out border-b",
                scrolled 
                    ? "bg-black/90 backdrop-blur-md border-white/10 py-4" 
                    : "bg-transparent border-transparent py-6"
            )}
        >
            {/* 1. Logo Section (Left) */}
            <div className="flex items-center gap-2 z-50">
                <a 
                    href="#home" 
                    onClick={(e) => handleScroll(e, "home")}
                    className="flex items-center gap-3 group"
                >
                    {/* Logo local desde /public */}
                    <img 
                        src="/logo.png" 
                        alt="Coba Car Center Logo" 
                        className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
                    />
                    <span style={{ fontFamily: 'var(--font-barlow)', fontStyle: 'italic', fontWeight: 800 }} className="text-3xl tracking-tight text-white uppercase">
                        COBA<span className="text-[#FFD700]">CAR</span>CENTER
                    </span>
                </a>
            </div>

            {/* 2. Navigation Links (Center) */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-10 text-sm font-medium tracking-wide">
                {links.map((link) => (
                    <a
                        key={link.name}
                        href={`#${link.id}`}
                        onClick={(e) => handleScroll(e, link.id)}
                        className="text-white/80 hover:text-[#FFD700] transition-colors relative group py-2 cursor-pointer"
                    >
                        {link.name}
                        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FFD700] scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left"></span>
                    </a>
                ))}
            </div>

            {/* 3. Mobile Menu Toggle (Right) */}
            <div className="md:hidden z-50 flex items-center">
                 <button className="text-white hover:text-[#FFD700] transition-colors p-2">
                    <div className="space-y-1.5 w-6">
                         <span className="block h-0.5 w-full bg-current"></span>
                         <span className="block h-0.5 w-full bg-current"></span>
                         <span className="block h-0.5 w-full bg-current"></span>
                    </div>
                 </button>
            </div>
            
             {/* 4. Desktop Right Side Placeholder/CTA */}
            <div className="hidden md:flex w-32 justify-end">
                 {/* Optional: Add a call to action button if needed later */}
            </div>

        </motion.nav>
    );
};
