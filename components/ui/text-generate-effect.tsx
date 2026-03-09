"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, SpringOptions, useSpring, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export const ScrollVelocity = ({
  children,
  velocity = 5,
  className,
}: {
  children: string;
  velocity?: number;
  className?: string;
}) => {
    // Basic wrapper for velocity scroll component previously created
    // Just exporting it with a different name to be safe or reusing
    return (
        <div className={cn("relative w-full overflow-hidden", className)}>
            <motion.div className="flex whitespace-nowrap">
                {/* Simplified version */}
                <h1 className="text-9xl font-bold uppercase">{children}</h1>
            </motion.div>
        </div>
    )
}

export const TypewriterEffect = ({
  words,
}: {
  words: {
    text: string;
    className?: string;
  }[];
}) => {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          opacity: 1,
        },
        {
          duration: 2,
          delay: stagger(0.2),
        }
      );
    }
  }, [isInView]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {words.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.split("").map((char, index) => (
                <motion.span
                  initial={{
                    opacity: 0,
                  }}
                  key={`char-${index}`}
                  className={cn(word.className, "opacity-0 hidden")}
                >
                  {char}
                </motion.span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </motion.div>
    );
  };
  return (
    <div className={cn("text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center")}>
      {renderWords()}
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn("inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-blue-500 ml-1")}
      ></motion.span>
    </div>
  );
};
import { useAnimate, stagger } from "framer-motion";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");
  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration ? duration : 1,
        delay: stagger(0.2),
      }
    );
  }, [scope.current]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="dark:text-white text-black opacity-0"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className=" dark:text-white text-black text-2xl leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};