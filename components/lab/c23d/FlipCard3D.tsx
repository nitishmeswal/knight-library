"use client";

import { useState, ReactNode } from "react";

/**
 * FlipCard3D  — BETA
 * ------------------
 * A 3D-flipped card with independent front/back React children. Both
 * faces remain interactive. Click or hover (configurable) to flip.
 */
export default function FlipCard3D({
  front,
  back,
  trigger = "hover",
  className = "",
}: {
  front: ReactNode;
  back: ReactNode;
  trigger?: "hover" | "click";
  className?: string;
}) {
  const [flipped, setFlipped] = useState(false);

  const handlers =
    trigger === "hover"
      ? {
          onMouseEnter: () => setFlipped(true),
          onMouseLeave: () => setFlipped(false),
        }
      : { onClick: () => setFlipped((f) => !f) };

  return (
    <div
      {...handlers}
      className={`relative w-full h-full cursor-pointer ${className}`}
      style={{ perspective: 1200 }}
    >
      <div
        className="relative w-full h-full transition-transform duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ backfaceVisibility: "hidden" }}
        >
          {front}
        </div>
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {back}
        </div>
      </div>
    </div>
  );
}
