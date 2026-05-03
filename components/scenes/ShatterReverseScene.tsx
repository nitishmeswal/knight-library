"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

const SHARD_COUNT = 250;

function GlassShards() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const data = useMemo(() => {
    const items: { assembled: THREE.Vector3; exploded: THREE.Vector3; spin: THREE.Vector3; seed: number }[] = [];
    const R = 1.5;
    for (let i = 0; i < SHARD_COUNT; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      items.push({
        assembled: new THREE.Vector3(
          R * Math.sin(phi) * Math.cos(theta),
          R * Math.sin(phi) * Math.sin(theta),
          R * Math.cos(phi)
        ),
        exploded: new THREE.Vector3(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 10
        ),
        spin: new THREE.Vector3(
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8
        ),
        seed: Math.random(),
      });
    }
    return items;
  }, []);

  useFrame(({ camera }) => {
    const p = readProgressVar();
    const shatter = THREE.MathUtils.smoothstep(p, 0.1, 0.6);
    const reverse = THREE.MathUtils.smoothstep(p, 0.6, 0.95);
    const blend = shatter - reverse;

    for (let i = 0; i < SHARD_COUNT; i++) {
      const d = data[i];
      dummy.position.lerpVectors(d.assembled, d.exploded, Math.max(0, blend));
      dummy.rotation.set(d.spin.x * blend, d.spin.y * blend, d.spin.z * blend);
      const s = 0.04 + d.seed * 0.06;
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(i, dummy.matrix);
    }
    if (mesh.current) mesh.current.instanceMatrix.needsUpdate = true;

    camera.position.z = THREE.MathUtils.lerp(4.5, 6, Math.abs(blend));
    camera.lookAt(0, 0, 0);
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, SHARD_COUNT]}>
      <tetrahedronGeometry args={[1, 0]} />
      <meshPhysicalMaterial
        color="#e0eeff"
        transmission={0.85}
        thickness={0.3}
        roughness={0.03}
        ior={1.5}
        transparent
        opacity={0.8}
      />
    </instancedMesh>
  );
}

export default function ShatterReverseScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 4.5], fov: 50 }}>
      <color attach="background" args={["#06060c"]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 5, 3]} intensity={1.6} color="#c9b8ff" />
      <Environment preset="studio" />
      <GlassShards />
    </Canvas>
  );
}
