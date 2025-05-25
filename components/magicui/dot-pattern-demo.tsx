"use client";

import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/magicui/dot-pattern";
import React from "react"; // Import React

interface DotPatternDemoProps {
  className?: string;
}

export function DotPatternDemo({ className }: DotPatternDemoProps) {
  return (
    <div className={cn(
      "relative flex w-full flex-col items-center justify-center bg-background", // Removed h-[500px], rounded-lg, border, overflow-hidden
      className
    )}>
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
        )}
      />
    </div>
  );
}
