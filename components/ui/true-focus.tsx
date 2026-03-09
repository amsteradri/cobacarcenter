"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, useAnimationFrame } from "framer-motion";
import { cn } from "@/lib/utils";

interface TrueFocusProps {
  sentence?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
  children?: React.ReactNode;
}

export const TrueFocus: React.FC<TrueFocusProps> = ({
  sentence = "True Focus",
  manualMode = false,
  blurAmount = 5,
  borderColor = "#FFD700",
  glowColor = "rgba(255, 215, 0, 0.6)",
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
  children,
}) => {
  const words = sentence.split(" ");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    if (!manualMode) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
      }, (animationDuration + pauseBetweenAnimations) * 1000);

      return () => clearInterval(interval);
    }
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

  useEffect(() => {
    if (currentIndex === null || currentIndex === -1) return;
    if (!wordRefs.current[currentIndex] || !containerRef.current) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = wordRefs.current[currentIndex]!.getBoundingClientRect();

    setFocusRect({
      x: activeRect.left - parentRect.left - 8,
      y: activeRect.top - parentRect.top - 4,
      width: activeRect.width + 16,
      height: activeRect.height + 8,
    });
  }, [currentIndex, words.length]);

  const handleMouseEnter = (index: number) => {
    if (manualMode) {
      setLastActiveIndex(index);
      setCurrentIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (manualMode) {
      setLastActiveIndex(null);
      setCurrentIndex(-1);
    }
  };

  return (
    <div
      className="relative flex gap-4 justify-center items-center flex-wrap cursor-pointer group"
      ref={containerRef}
      onMouseLeave={handleMouseLeave}
    >
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={index}
            ref={(el) => (wordRefs.current[index] = el)}
            className={cn(
              "relative text-4xl md:text-6xl font-black px-2 py-1 transition-all duration-300",
              !isActive && currentIndex !== -1 ? "blur-sm opacity-50 scale-95" : "scale-105 opacity-100 blur-0"
            )}
            style={{
              filter: !isActive && currentIndex !== -1 ? `blur(${blurAmount}px)` : "none",
            }}
            onMouseEnter={() => handleMouseEnter(index)}
          >
            {word}
          </span>
        );
      })}

      <motion.div
        className="absolute top-0 left-0 pointer-events-none border-[3px] rounded-lg -z-10 bg-transparent"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: currentIndex !== -1 ? 1 : 0,
        }}
        transition={{
          duration: animationDuration,
        }}
        style={{
          borderColor: borderColor,
          boxShadow: `0 0 4px ${glowColor}, 0 0 10px ${glowColor}, 0 0 30px ${glowColor}`,
        }}
      >
        <div
          className="absolute inset-0 rounded-lg -z-10 opacity-30"
          style={{
            backgroundColor: glowColor,
            filter: `blur(${blurAmount * 2}px)`,
          }}
        />
      </motion.div>
    </div>
  );
};