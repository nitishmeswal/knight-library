"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

/**
 * OrbitScene
 * ----------
 * A small planet with a ring. The camera orbits around it continuously
 * as the user scrolls, giving each chapter a unique vantage point.
 */
function Planet() {
  const planet = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);

  useFrame(({ camera, clock }, delta) => {
    const p = readProgressVar();
    // Orbit azimuth 0..2π*1.25 + elevation from -30° -> +50°
    const az = p * Math.PI * 2.5 + clock.elapsedTime * 0.05;
    const el = THREE.MathUtils.lerp(-0.4, 0.9, p);
    const r = THREE.MathUtils.lerp(5.5, 3.8, Math.sin(p * Math.PI));

    camera.position.set(
      Math.cos(az) * Math.cos(el) * r,
      Math.sin(el) * r,
      Math.sin(az) * Math.cos(el) * r
    );
    camera.lookAt(0, 0, 0);

    if (planet.current) planet.current.rotation.y += delta * 0.12;
    if (ring.current) ring.current.rotation.z += delta * 0.06;
  });

  return (
    <group>
      <mesh ref={planet}>
        <sphereGeometry args={[1.2, 96, 96]} />
        <meshStandardMaterial
          color="#4a5cff"
          roughness={0.6}
          metalness={0.1}
          emissive="#1a1a4a"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh ref={ring} rotation-x={Math.PI / 2.6}>
        <ringGeometry args={[1.7, 2.2, 96]} />
        <meshBasicMaterial
          color="#c9b8ff"
          side={THREE.DoubleSide}
          transparent
          opacity={0.5}
        />
      </mesh>
      {/* Moon */}
      <mesh position={[2.6, 0.6, 0.4]}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial color="#e8e8ee" />
      </mesh>
    </group>
  );
}

export default function OrbitScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5.5], fov: 45 }}>
      <color attach="background" args={["#02020a"]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 4, 6]} intensity={1.8} />
      <Stars radius={50} depth={30} count={3000} factor={2} fade />
      <Environment preset="night" />
      <Planet />
    </Canvas>
  );
}
