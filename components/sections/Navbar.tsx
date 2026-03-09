"use client";
import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        setMobileOpen(false);
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.getBoundingClientRect().top + window.scrollY,
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
        <>
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 w-full transition-all duration-500 ease-in-out border-b",
                scrolled || mobileOpen
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

            {/* 2. Navigation Links (Center - Desktop) */}
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
            <button
                className="md:hidden z-50 flex flex-col justify-center items-center w-10 h-10 gap-1.5 text-white hover:text-[#FFD700] transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
            >
                <motion.span
                    animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="block h-0.5 w-6 bg-current origin-center"
                />
                <motion.span
                    animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                    className="block h-0.5 w-6 bg-current"
                />
                <motion.span
                    animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="block h-0.5 w-6 bg-current origin-center"
                />
            </button>

            {/* 4. Desktop Right Side Placeholder */}
            <div className="hidden md:flex w-32 justify-end" />

        </motion.nav>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
            {mobileOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="fixed top-[72px] left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-b border-white/10 flex flex-col md:hidden"
                >
                    {links.map((link, i) => (
                        <motion.a
                            key={link.name}
                            href={`#${link.id}`}
                            onClick={(e) => handleScroll(e, link.id)}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.06, duration: 0.2 }}
                            className="px-8 py-5 text-lg font-medium text-white/80 hover:text-[#FFD700] hover:bg-white/5 border-b border-white/5 last:border-0 transition-colors cursor-pointer"
                        >
                            {link.name}
                        </motion.a>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
        </>
    );
};
