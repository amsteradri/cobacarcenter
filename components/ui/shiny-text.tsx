"use client";
import { cn } from "@/lib/utils";

interface ShinyTextProps {
  children: React.ReactNode;
  className?: string;
  shimmerWidth?: number;
}

export const ShinyText = ({
  children,
  className,
  shimmerWidth = 100,
}: ShinyTextProps) => {
  return (
    <span
      style={
        {
          "--shimmer-width": `${shimmerWidth}px`,
        } as React.CSSProperties
      }
      className={cn(
        "mx-auto max-w-md text-neutral-600/50 dark:text-neutral-400API/50 ",
        // Shimmer effect
        "animate-shimmer bg-clip-text text-transparent bg-[linear-gradient(110deg,#939393,45%,#1e2631,55%,#939393)] bg-[length:250%_100%] dark:bg-[linear-gradient(110deg,#939393,45%,#fff,55%,#939393)]",
        className
      )}
    >
      {children}
    </span>
  );
};