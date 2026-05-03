"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

/**
 * FloatingIcon3D
 * --------------
 * A small self-contained 3D icon (torus knot by default) that can sit
 * inline in a card — perfect for feature badges and empty states.
 * Rotates gently and reacts to hover.
 */
function Shape({ hovered }: { hovered: React.MutableRefObject<boolean> }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_s, delta) => {
    if (!ref.current) return;
    const target = hovered.current ? 1.15 : 1;
    ref.current.scale.lerp(new THREE.Vector3(target, target, target), 0.15);
    ref.current.rotation.x += delta * 0.4;
    ref.current.rotation.y += delta * 0.6;
  });
  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[0.6, 0.22, 120, 16]} />
      <meshPhysicalMaterial
        color="#7c5cff"
        metalness={0.8}
        roughness={0.15}
        clearcoat={1}
      />
    </mesh>
  );
}

export default function FloatingIcon3D({
  size = 160,
}: {
  size?: number;
}) {
  const hovered = useRef(false);
  return (
    <div
      style={{ width: size, height: size }}
      onMouseEnter={() => (hovered.current = true)}
      onMouseLeave={() => (hovered.current = false)}
    >
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 2.4], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 3, 3]} intensity={1.2} />
        <Environment preset="studio" />
        <Float rotationIntensity={0.6} floatIntensity={1.2} speed={1.5}>
          <Shape hovered={hovered} />
        </Float>
      </Canvas>
    </div>
  );
}
