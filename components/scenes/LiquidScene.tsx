"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

/**
 * LiquidScene
 * -----------
 * A metallic blob distorted by procedural noise. Scroll modulates
 * distortion amplitude and color temperature from cool to warm.
 */
function Blob() {
  const ref = useRef<THREE.Mesh>(null);
  const mat = useRef<any>(null);

  useFrame(({ camera }, delta) => {
    const p = readProgressVar();
    if (ref.current) {
      ref.current.rotation.y += delta * 0.25;
      ref.current.rotation.x += delta * 0.15;
      const s = THREE.MathUtils.lerp(1, 1.25, p);
      ref.current.scale.setScalar(s);
    }
    if (mat.current) {
      mat.current.distort = THREE.MathUtils.lerp(0.15, 0.7, p);
      mat.current.speed = THREE.MathUtils.lerp(1.2, 4, p);
      const c = new THREE.Color().lerpColors(
        new THREE.Color("#5ca8ff"),
        new THREE.Color("#ff5c8a"),
        p
      );
      mat.current.color = c;
    }
    camera.position.z = THREE.MathUtils.lerp(4.5, 3.2, p);
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.25, 64]} />
      <MeshDistortMaterial
        ref={mat}
        color="#5ca8ff"
        metalness={0.9}
        roughness={0.1}
        distort={0.15}
        speed={1.2}
      />
    </mesh>
  );
}

export default function LiquidScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 4.5], fov: 45 }}>
      <color attach="background" args={["#05050a"]} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 5, 4]} intensity={1.3} />
      <Environment preset="sunset" />
      <Blob />
    </Canvas>
  );
}
