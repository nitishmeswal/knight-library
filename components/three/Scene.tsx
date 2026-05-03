"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment, OrbitControls } from "@react-three/drei";
import StageModel from "./StageModel";

/**
 * Scene
 * -----
 * Persistent Three.js canvas that lives behind the page.
 * Add your models inside <StageModel />. The model receives a
 * `scrollProgress` value (0..1) wired up via GSAP ScrollTrigger
 * by writing to a CSS variable on <html> (--scroll-progress).
 *
 * Tips:
 *  - Replace the placeholder mesh in StageModel with useGLTF(...).
 *  - Toggle <OrbitControls /> while authoring; remove for production.
 */
export default function Scene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#0a0a0f"]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} />

      <Suspense fallback={null}>
        <StageModel />
        <Environment preset="city" />
      </Suspense>

      {/* Comment this out for production / scroll-controlled cameras */}
      {process.env.NODE_ENV === "development" && (
        <OrbitControls enablePan={false} enableZoom={false} />
      )}
    </Canvas>
  );
}
