"use client";
import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export const Threads = ({
  amplitude = 1,
  distance = 0,
  enableMouseInteraction = true,
}: {
  amplitude?: number;
  distance?: number;
  enableMouseInteraction?: boolean;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let frames = 0;
    
    // Config
    const waveLength = 200;
    const frequency = 0.005;
    const offset = 0;
    
    let speed = 0.1;
    let lines: any[] = [];
    
    class Line {
      x: number;
      y: number;
      offset: number;
      color: string;
      
      constructor(x: number, y: number, offset: number, color: string) {
        this.x = x;
        this.y = y;
        this.offset = offset;
        this.color = color;
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        for (let i = 0; i < width; i+=10) { // Optimization: step 10
            const y = this.y + Math.sin(i * frequency + this.offset + frames * speed) * (amplitude * 50) * Math.sin(frames * 0.01);
            ctx.lineTo(i, y);
        }
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }

    const init = () => {
        lines = [];
        for (let i = 0; i < 50; i++) {
             const color = `hsl(${Math.random() * 60 + 40}, 100%, 50%)`; // Yellow/Gold range
             lines.push(new Line(0, height / 2 + (Math.random() - 0.5) * height, i * (Math.PI * 2) / 50, color));
        }
    };
    init();

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      lines.forEach((line) => line.draw(ctx));
      frames++;
      requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        init();
    };
    
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [amplitude]);

  return (
    <div className={cn("fixed top-0 left-0 w-full h-full -z-10 opacity-30 pointer-events-none")}>
      <canvas ref={canvasRef} />
    </div>
  );
};