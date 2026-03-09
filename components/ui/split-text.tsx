"use client";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
  rootMargin?: string;
  textAlign?: "left" | "right" | "center" | "justify" | "start" | "end";
  onLetterAnimationComplete?: () => void;
  style?: React.CSSProperties;
  // Make these optional since the usage in `Hero.tsx` uses object literals
  animationFrom?: any; 
  animationTo?: any; 
}

export const SplitText = ({
  text,
  className,
  delay = 50,
  duration = 0.5,
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  onLetterAnimationComplete,
  style,
  animationFrom = { opacity: 0, scale: 0.9, y: 40 },
  animationTo = { opacity: 1, scale: 1, y: 0 },
}: SplitTextProps) => {
  const words = text.split(" ");
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: rootMargin as any });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <div
      ref={ref}
      className={cn("split-text inline-block overflow-hidden", className)}
      style={{ textAlign, whiteSpace: "normal", wordWrap: "break-word", ...style }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: {},
            visible: {},
          }}
          className="inline-block"
          style={{ marginRight: "0.25em" }}
        >
          {word.split("").map((letter, j) => (
            <motion.span
              key={`${i}-${j}`}
              variants={{
                hidden: animationFrom,
                visible: animationTo,
              }}
              transition={{
                 duration: duration, 
                 // Stagger each letter slightly
                 delay: (i * 0.1) + (j * 0.05) + (delay / 1000), 
                 ease: [0.2, 0.65, 0.3, 0.9],
              }}
              className="inline-block will-change-transform"
            >
              {letter}
            </motion.span>
          ))}
        </motion.span>
      ))}
    </div>
  );
};
