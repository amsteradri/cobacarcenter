"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export const ParallaxScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const images = [
    "/cars/g63.jpg",
    "/cars/gt3.jpg",
    "/cars/gtr.jpg",
    "/cars/mercedes.jpg",
    "/cars/rs6.jpg",
    "/cars/rsq8.jpg",
  ];

  return (
    <div
      className={cn("w-full py-40 overflow-hidden bg-zinc-950 relative")} 
      ref={containerRef}
    >
        <div className="absolute top-10 left-10 md:left-20">
             <h3 className="text-4xl md:text-7xl font-bold text-white uppercase tracking-tighter">
                Galería
             </h3>
        </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-7xl mx-auto gap-10 px-10"
      >
        <div className="grid gap-10">
            <motion.div style={{ y: translateFirst }} className="relative rounded-2xl overflow-hidden aspect-[2/3]">
              <img src={images[0]} className="h-full w-full object-cover hover:scale-110 transition-transform duration-500" alt="Interior Detail" />
            </motion.div>
            <motion.div style={{ y: translateFirst }} className="relative rounded-2xl overflow-hidden aspect-[2/3]">
              <img src={images[1]} className="h-full w-full object-cover hover:scale-110 transition-transform duration-500" alt="Exterior Detail" />
            </motion.div>
        </div>
        <div className="grid gap-10 pt-20 md:pt-0">
            <motion.div style={{ y: translateSecond }} className="relative rounded-2xl overflow-hidden aspect-[2/3]">
              <img src={images[2]} className="h-full w-full object-cover hover:scale-110 transition-transform duration-500" alt="Car Side Profile" />
            </motion.div>
            <motion.div style={{ y: translateSecond }} className="relative rounded-2xl overflow-hidden aspect-[2/3]">
              <img src={images[3]} className="h-full w-full object-cover hover:scale-110 transition-transform duration-500" alt="BMW M4 Front" />
            </motion.div>
        </div>
        <div className="grid gap-10 pt-40 md:pt-0">
            <motion.div style={{ y: translateThird }} className="relative rounded-2xl overflow-hidden aspect-[2/3]">
              <img src={images[4]} className="h-full w-full object-cover hover:scale-110 transition-transform duration-500" alt="Dashboard Detail" />
            </motion.div>
            <motion.div style={{ y: translateThird }} className="relative rounded-2xl overflow-hidden aspect-[2/3]">
              <img src={images[5]} className="h-full w-full object-cover hover:scale-110 transition-transform duration-500" alt="Premium Finish" />
            </motion.div>
        </div>
      </div>
    </div>
  );
};
