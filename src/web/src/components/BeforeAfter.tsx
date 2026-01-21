"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BeforeAfterProps {
  beforeText: string;
  afterText: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export function BeforeAfter({
  beforeText,
  afterText,
  beforeLabel = "OCR Raw",
  afterLabel = "Corregido",
  className,
}: BeforeAfterProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, []);

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between text-sm text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          {beforeLabel}
        </span>
        <span className="flex items-center gap-2">
          {afterLabel}
          <span className="w-2 h-2 rounded-full bg-green-500" />
        </span>
      </div>

      <div
        ref={containerRef}
        className="relative h-64 rounded-lg border overflow-hidden cursor-col-resize select-none"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* After (background - visible on right) */}
        <div className="absolute inset-0 p-4 bg-green-50 dark:bg-green-950/20">
          <div className="h-full overflow-auto">
            <p className="text-sm font-mono whitespace-pre-wrap text-green-800 dark:text-green-200">
              {afterText}
            </p>
          </div>
        </div>

        {/* Before (foreground - clips based on slider) */}
        <div
          className="absolute inset-0 p-4 bg-red-50 dark:bg-red-950/20"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <div className="h-full overflow-auto">
            <p className="text-sm font-mono whitespace-pre-wrap text-red-800 dark:text-red-200">
              {beforeText}
            </p>
          </div>
        </div>

        {/* Slider handle */}
        <motion.div
          className="absolute top-0 bottom-0 w-1 bg-primary cursor-col-resize z-10"
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={handleMouseDown}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary border-2 border-white shadow-lg flex items-center justify-center">
            <svg
              className="w-4 h-4 text-primary-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
              />
            </svg>
          </div>
        </motion.div>
      </div>

      <p className="text-xs text-center text-muted-foreground">
        Arrastra el slider para comparar
      </p>
    </div>
  );
}
