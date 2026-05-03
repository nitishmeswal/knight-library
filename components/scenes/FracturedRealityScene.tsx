"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { readProgressVar } from "@/lib/useScrollProgress";

const SLICE_COUNT = 20;

function SlicedObject() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const group = useRef<THREE.Group>(null);

  useFrame(({ camera, clock }, delta) => {
    const p = readProgressVar();
    const t = clock.elapsedTime;
    const glitch = THREE.MathUtils.lerp(0, 1, p);

    if (group.current) group.current.rotation.y += delta * 0.15;

    for (let i = 0; i < SLICE_COUNT; i++) {
      const frac = i / (SLICE_COUNT - 1);
      const y = (frac - 0.5) * 3;
      const offsetX = Math.sin(i * 2 + t * 3) * glitch * 0.4;
      const offsetZ = Math.cos(i * 1.5 + t * 2.5) * glitch * 0.3;
      dummy.position.set(offsetX, y, offsetZ);
      dummy.rotation.set(0, glitch * Math.sin(i + t) * 0.3, 0);
      dummy.scale.set(1.2, 3 / SLICE_COUNT - 0.01, 1.2);
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(i, dummy.matrix);
    }
    if (mesh.current) mesh.current.instanceMatrix.needsUpdate = true;

    camera.position.z = THREE.MathUtils.lerp(5, 3.5, p);
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group}>
      <instancedMesh ref={mesh} args={[undefined, undefined, SLICE_COUNT]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial
          color="#8866ff"
          metalness={0.7}
          roughness={0.1}
          clearcoat={1}
        />
      </instancedMesh>
    </group>
  );
}

export default function FracturedRealityScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
      <color attach="background" args={["#06060c"]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 5, 5]} intensity={1.4} />
      <Environment preset="studio" />
      <SlicedObject />
    </Canvas>
  );
}
