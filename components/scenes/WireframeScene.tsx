"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

/**
 * WireframeScene
 * --------------
 * A torus knot begins as a pure wireframe skeleton and materializes into
 * a glossy solid as the user scrolls. Camera tilts for dramatic parallax.
 */
function Knot() {
  const group = useRef<THREE.Group>(null);
  const wire = useRef<THREE.Mesh>(null);
  const solid = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshPhysicalMaterial>(null);

  useFrame(({ camera }, delta) => {
    const p = readProgressVar();
    if (group.current) {
      group.current.rotation.y += delta * 0.3;
      group.current.rotation.x += delta * 0.12;
    }
    if (wire.current) {
      (wire.current.material as THREE.MeshBasicMaterial).opacity =
        THREE.MathUtils.lerp(0.9, 0.12, p);
    }
    if (mat.current) {
      mat.current.opacity = THREE.MathUtils.lerp(0, 1, p);
      mat.current.transparent = true;
      mat.current.metalness = THREE.MathUtils.lerp(0.2, 0.95, p);
      mat.current.roughness = THREE.MathUtils.lerp(0.6, 0.05, p);
    }

    const tilt = (p - 0.5) * 0.6;
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, tilt, 0.06);
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group}>
      <mesh ref={wire}>
        <torusKnotGeometry args={[1.1, 0.32, 220, 24]} />
        <meshBasicMaterial
          color="#7c5cff"
          wireframe
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh ref={solid} scale={1.001}>
        <torusKnotGeometry args={[1.1, 0.32, 220, 24]} />
        <meshPhysicalMaterial
          ref={mat}
          color="#ffffff"
          clearcoat={1}
          clearcoatRoughness={0.1}
          transparent
          opacity={0}
        />
      </mesh>
    </group>
  );
}

export default function WireframeScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 4.5], fov: 45 }}>
      <color attach="background" args={["#06060a"]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 4, 6]} intensity={1.6} color="#c9b8ff" />
      <directionalLight position={[-5, -2, 3]} intensity={0.6} color="#5cffe1" />
      <Environment preset="night" />
      <Knot />
    </Canvas>
  );
}
