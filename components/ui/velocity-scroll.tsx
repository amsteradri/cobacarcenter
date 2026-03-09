"use client";

import { useScroll, useTransform, useMotionValue, useVelocity, useAnimationFrame, motion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ParallaxProps {
  children: string;
  baseVelocity: number;
  className?: string;
}

export function ParallaxText({ children, baseVelocity = 100, className }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useTransform(scrollVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });
  const x = useTransform(baseX, (v) => `${Math.floor(v)}%`);
  const directionFactor = useRef(1);
  const transform = useTransform(x, (v) => `translateX(${v})`);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (smoothVelocity.get() !== 0) {
      moveBy += smoothVelocity.get() * (moveBy > 0 ? 1 : -1);
    }
    
    if (moveBy < 0) {
      directionFactor.current = -1;
    } else if (moveBy > 0) {
      directionFactor.current = 1;
    }

    // Reset loop
    // Since we use % for translation, we want to reset baseX so it loops infinitely
    // The children are repeated enough times to cover the screen width
    // We need to reset when we have scrolled enough
  
    // Simple infinite loop trick:
    // If we scroll too far in one direction, reset baseX
    // This requires knowing the width of content, but with % we can just guess
    
    baseX.set(baseX.get() + moveBy);
  });
  
  // Wrap logic for infinite scroll
  // The motion value x is %, so we can use modulo logic
  const xInput = [0, 100]; // Map 0-100%
  // Actually simpler:
  // Render multiple copies and just let it scroll. 
  // For proper infinite scroll we need a wrapping logic on the motion value.
  
  // Revised wrap logic using useTransform
  const xSpring = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`); // Adjust wrap range based on content width

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap user-select-none">
      <motion.div className={cn("flex whitespace-nowrap gap-10", className)} style={{ x: xSpring }}>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
      </motion.div>
    </div>
  );
}

// Helper to wrap numbers
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function VelocityScroll({ text, default_velocity = 5, className }: { text: string, default_velocity?: number, className?: string }) {
  return (
    <section className="relative w-full overflow-hidden">
      <ParallaxText baseVelocity={default_velocity} className={className}>{text}</ParallaxText>
      <ParallaxText baseVelocity={-default_velocity} className={className}>{text}</ParallaxText>
    </section>
  );
}
