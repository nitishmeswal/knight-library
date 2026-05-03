"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

/**
 * StageModel
 * ----------
 * Replace the placeholder geometry with your own GLTF/GLB:
 *
 *   import { useGLTF } from "@react-three/drei";
 *   const { scene } = useGLTF("/models/your-model.glb");
 *   return <primitive ref={group} object={scene} />;
 *
 * The model reads `--scroll-progress` (0..1) from <html> which is
 * written by ScrollAnimations.tsx. Use it to drive rotation,
 * position, scale, morph targets, material params, etc.
 */
export default function StageModel() {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    const root =
      typeof document !== "undefined" ? document.documentElement : null;
    const raw = root?.style.getPropertyValue("--scroll-progress") ?? "0";
    const p = parseFloat(raw) || 0; // 0..1 across the whole page

    if (group.current) {
      // Map scroll 0..1 -> rotation & vertical drift
      group.current.rotation.y = p * Math.PI * 2;
      group.current.position.y = THREE.MathUtils.lerp(0, -1.2, p);
      group.current.scale.setScalar(THREE.MathUtils.lerp(1, 1.6, p));
    }

    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.4;
    }
  });

  return (
    <group ref={group}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial
          color="#7c5cff"
          metalness={0.4}
          roughness={0.2}
          flatShading
        />
      </mesh>
    </group>
  );
}
