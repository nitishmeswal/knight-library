"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

const VOXEL_COUNT = 500;

function CorruptObject() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tmpColor = useMemo(() => new THREE.Color(), []);
  const group = useRef<THREE.Group>(null);

  const voxels = useMemo(() => {
    const items: { smooth: THREE.Vector3; glitched: THREE.Vector3; seed: number }[] = [];
    for (let i = 0; i < VOXEL_COUNT; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 1.2 + (Math.random() - 0.5) * 0.1;
      const smooth = new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );

      const gridSize = 0.2;
      const glitched = new THREE.Vector3(
        Math.round(smooth.x / gridSize) * gridSize + (Math.random() - 0.5) * 0.5,
        Math.round(smooth.y / gridSize) * gridSize + (Math.random() - 0.5) * 0.5,
        Math.round(smooth.z / gridSize) * gridSize + (Math.random() - 0.5) * 0.5
      );

      items.push({ smooth, glitched, seed: Math.random() });
    }
    return items;
  }, []);

  useFrame(({ camera, clock }, delta) => {
    const p = readProgressVar();
    const t = clock.elapsedTime;
    const corrupt = THREE.MathUtils.smoothstep(p, 0.1, 0.5);
    const rebuild = THREE.MathUtils.smoothstep(p, 0.6, 0.95);
    const blend = corrupt - rebuild;

    if (group.current) group.current.rotation.y += delta * 0.12;

    for (let i = 0; i < VOXEL_COUNT; i++) {
      const v = voxels[i];
      dummy.position.lerpVectors(v.smooth, v.glitched, Math.max(0, blend));

      const glitchRot = blend * Math.PI * 0.5;
      dummy.rotation.set(
        glitchRot * Math.sin(v.seed * 10),
        glitchRot * Math.cos(v.seed * 8),
        0
      );

      const smoothScale = 0.04;
      const voxelScale = 0.08;
      const s = THREE.MathUtils.lerp(smoothScale, voxelScale, Math.abs(blend));
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(i, dummy.matrix);

      const glitchColor = Math.random() < blend * 0.3;
      if (glitchColor) {
        tmpColor.setHSL(Math.random(), 1, 0.5);
      } else {
        tmpColor.setHSL(0.6 + v.seed * 0.1, 0.6, 0.5);
      }
      mesh.current?.setColorAt(i, tmpColor);
    }
    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true;
      if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
    }

    camera.position.z = THREE.MathUtils.lerp(5, 3.5, p);
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group}>
      <instancedMesh ref={mesh} args={[undefined, undefined, VOXEL_COUNT]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial metalness={0.5} roughness={0.2} />
      </instancedMesh>
    </group>
  );
}

export default function DigitalCorruptScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
      <color attach="background" args={["#04040c"]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 5]} intensity={1.4} />
      <Environment preset="warehouse" />
      <CorruptObject />
    </Canvas>
  );
}
