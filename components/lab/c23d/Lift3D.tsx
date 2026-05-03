"use client";

import { Canvas } from "@react-three/fiber";
import { Html, Float, OrbitControls } from "@react-three/drei";
import { ReactNode } from "react";

/**
 * Lift3D  — BETA
 * --------------
 * Wrap any React component to render it as a live HTML plane inside a
 * 3D scene. The component remains fully interactive (buttons, forms, etc)
 * while floating and tilting in 3D.
 *
 * Powered by <drei/Html transform>. This is the foundational primitive of
 * the Component-to-3D beta: any DOM tree → real 3D surface.
 *
 * Usage:
 *   <Lift3D>
 *     <YourCard />
 *   </Lift3D>
 */
export default function Lift3D({
  children,
  height = 480,
  float = true,
  controls = false,
}: {
  children: ReactNode;
  height?: number;
  float?: boolean;
  controls?: boolean;
}) {
  const inner = (
    <Html transform occlude distanceFactor={10}>
      <div style={{ transform: "scale(1)" }}>{children}</div>
    </Html>
  );

  return (
    <div style={{ height }} className="w-full">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 40 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 5, 4]} intensity={0.8} />
        {float ? (
          <Float rotationIntensity={0.5} floatIntensity={0.8} speed={1.2}>
            {inner}
          </Float>
        ) : (
          inner
        )}
        {controls && <OrbitControls enablePan={false} enableZoom={false} />}
      </Canvas>
    </div>
  );
}
